/**
 * stats-store — contagem de visitas para a página /dados.
 *
 * Persiste em Vercel KV / Upstash Redis (via REST) quando as variáveis de
 * ambiente estão configuradas. Sem elas (ex.: dev local), cai em um store
 * em memória para o mecanismo funcionar durante o desenvolvimento.
 *
 * Variáveis aceitas (qualquer um dos pares):
 *   - KV_REST_API_URL / KV_REST_API_TOKEN            (Vercel KV)
 *   - UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN (Upstash)
 */

const REST_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const HAS_KV = Boolean(REST_URL && REST_TOKEN);

const DAYS_WINDOW = 7;

export type DayStat = {
  date: string;
  pageviews: number;
  visitors: number;
};

export type EventStat = {
  name: string;
  total: number;
  today: number;
};

export type Stats = {
  totalPageviews: number;
  totalVisitors: number;
  todayPageviews: number;
  todayVisitors: number;
  days: DayStat[];
  events: EventStat[];
  persistent: boolean;
  updatedAt: string;
};

/* ── Helpers de data (fuso America/Sao_Paulo) ── */

function dayKey(date = new Date()): string {
  // en-CA gera YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function lastNDays(n: number): string[] {
  const out: string[] = [];
  const now = Date.now();
  for (let i = n - 1; i >= 0; i--) {
    out.push(dayKey(new Date(now - i * 86_400_000)));
  }
  return out;
}

/* ── Backend: Vercel KV / Upstash via REST ── */

type PipelineCmd = (string | number)[];

async function kvPipeline(cmds: PipelineCmd[]): Promise<unknown[]> {
  const res = await fetch(`${REST_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmds),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`KV pipeline falhou: ${res.status}`);
  }
  const data = (await res.json()) as Array<{ result?: unknown; error?: string }>;
  return data.map((d) => d.result);
}

function sanitizeEventName(name: string): string {
  return name.replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 64);
}

/* ── Backend: memória (fallback dev) ── */

type MemStore = {
  pvTotal: number;
  pvByDay: Record<string, number>;
  visitorsTotal: Set<string>;
  visitorsByDay: Record<string, Set<string>>;
  eventsTotal: Record<string, number>;
  eventsByDay: Record<string, Record<string, number>>;
};

const globalForMem = globalThis as unknown as { __statsMem?: MemStore };

function mem(): MemStore {
  if (!globalForMem.__statsMem) {
    globalForMem.__statsMem = {
      pvTotal: 0,
      pvByDay: {},
      visitorsTotal: new Set(),
      visitorsByDay: {},
      eventsTotal: {},
      eventsByDay: {},
    };
  }
  return globalForMem.__statsMem;
}

/* ── API pública ── */

export async function recordVisit(visitorId: string): Promise<void> {
  const today = dayKey();

  if (HAS_KV) {
    await kvPipeline([
      ["INCR", "pv:total"],
      ["INCR", `pv:day:${today}`],
      ["PFADD", "visitors:total", visitorId],
      ["PFADD", `visitors:day:${today}`, visitorId],
      // Expira as chaves diárias em ~40 dias para não acumular indefinidamente.
      ["EXPIRE", `pv:day:${today}`, 60 * 60 * 24 * 40],
      ["EXPIRE", `visitors:day:${today}`, 60 * 60 * 24 * 40],
    ]);
    return;
  }

  const store = mem();
  store.pvTotal += 1;
  store.pvByDay[today] = (store.pvByDay[today] ?? 0) + 1;
  store.visitorsTotal.add(visitorId);
  (store.visitorsByDay[today] ??= new Set()).add(visitorId);
}

export async function recordEvent(rawName: string): Promise<void> {
  const name = sanitizeEventName(rawName);
  if (!name) return;
  const today = dayKey();

  if (HAS_KV) {
    await kvPipeline([
      ["SADD", "ev:names", name],
      ["INCR", `ev:total:${name}`],
      ["INCR", `ev:day:${name}:${today}`],
      ["EXPIRE", `ev:day:${name}:${today}`, 60 * 60 * 24 * 40],
    ]);
    return;
  }

  const store = mem();
  store.eventsTotal[name] = (store.eventsTotal[name] ?? 0) + 1;
  (store.eventsByDay[name] ??= {})[today] = (store.eventsByDay[name]?.[today] ?? 0) + 1;
}

export async function getStats(): Promise<Stats> {
  const days = lastNDays(DAYS_WINDOW);
  const today = days[days.length - 1];

  if (HAS_KV) {
    const cmds: PipelineCmd[] = [
      ["GET", "pv:total"],
      ["PFCOUNT", "visitors:total"],
      ...days.map((d) => ["GET", `pv:day:${d}`] as PipelineCmd),
      ...days.map((d) => ["PFCOUNT", `visitors:day:${d}`] as PipelineCmd),
    ];
    const res = await kvPipeline(cmds);

    const totalPageviews = toInt(res[0]);
    const totalVisitors = toInt(res[1]);
    const dayStats: DayStat[] = days.map((date, i) => ({
      date,
      pageviews: toInt(res[2 + i]),
      visitors: toInt(res[2 + days.length + i]),
    }));

    const events = await getEventsKV(today);
    return finalize(totalPageviews, totalVisitors, dayStats, events, today, true);
  }

  const store = mem();
  const dayStats: DayStat[] = days.map((date) => ({
    date,
    pageviews: store.pvByDay[date] ?? 0,
    visitors: store.visitorsByDay[date]?.size ?? 0,
  }));

  const events: EventStat[] = Object.keys(store.eventsTotal)
    .map((name) => ({
      name,
      total: store.eventsTotal[name] ?? 0,
      today: store.eventsByDay[name]?.[today] ?? 0,
    }))
    .sort((a, b) => b.total - a.total);

  return finalize(store.pvTotal, store.visitorsTotal.size, dayStats, events, today, false);
}

async function getEventsKV(today: string): Promise<EventStat[]> {
  const namesRes = await kvPipeline([["SMEMBERS", "ev:names"]]);
  const names = (namesRes[0] as string[] | null) ?? [];
  if (names.length === 0) return [];

  const cmds: PipelineCmd[] = [
    ...names.map((n) => ["GET", `ev:total:${n}`] as PipelineCmd),
    ...names.map((n) => ["GET", `ev:day:${n}:${today}`] as PipelineCmd),
  ];
  const res = await kvPipeline(cmds);

  return names
    .map((name, i) => ({
      name,
      total: toInt(res[i]),
      today: toInt(res[names.length + i]),
    }))
    .sort((a, b) => b.total - a.total);
}

/* ── util ── */

function toInt(v: unknown): number {
  const n = Number(v ?? 0);
  return Number.isFinite(n) ? n : 0;
}

function finalize(
  totalPageviews: number,
  totalVisitors: number,
  days: DayStat[],
  events: EventStat[],
  today: string,
  persistent: boolean,
): Stats {
  const todayStat = days.find((d) => d.date === today);
  return {
    totalPageviews,
    totalVisitors,
    todayPageviews: todayStat?.pageviews ?? 0,
    todayVisitors: todayStat?.visitors ?? 0,
    days,
    events,
    persistent,
    updatedAt: new Date().toISOString(),
  };
}
