"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type DayStat = {
  date: string;
  pageviews: number;
  visitors: number;
};

type EventStat = {
  name: string;
  total: number;
  today: number;
};

type Stats = {
  totalPageviews: number;
  totalVisitors: number;
  todayPageviews: number;
  todayVisitors: number;
  days: DayStat[];
  events: EventStat[];
  persistent: boolean;
  updatedAt: string;
};

const REFRESH_MS = 5000;

const EVENT_LABELS: Record<string, string> = {
  cta_hero_click: "CTA Hero (topo)",
  cta_final_click: "CTA Final",
  cta_header_click: "CTA Cabeçalho",
  cta_sticky_click: "CTA Fixo (flutuante)",
  feature_click: "Clique em card de recurso",
};

function eventLabel(name: string): string {
  return EVENT_LABELS[name] ?? name;
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat("pt-BR").format(n);
}

function formatTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Sao_Paulo",
    }).format(new Date(iso));
  } catch {
    return "--:--:--";
  }
}

function formatDay(date: string): string {
  const [, month, day] = date.split("-");
  return `${day}/${month}`;
}

export default function DadosPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);
  const [pulse, setPulse] = useState(false);
  const prevTotal = useRef<number | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/stats", { cache: "no-store" });
      if (!res.ok) throw new Error("bad status");
      const data = (await res.json()) as Stats;
      setError(false);
      setStats((prev) => {
        if (prev && data.totalPageviews !== prev.totalPageviews) {
          setPulse(true);
          window.setTimeout(() => setPulse(false), 700);
        }
        return data;
      });
      prevTotal.current = data.totalPageviews;
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    load();
    const id = window.setInterval(load, REFRESH_MS);
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load]);

  const maxPv = Math.max(1, ...(stats?.days.map((d) => d.pageviews) ?? [1]));
  const clickEvents = (stats?.events ?? []).filter((e) => e.name.includes("click"));

  return (
    <main className="min-h-screen bg-lp-bg px-5 py-10 text-lp-text sm:px-8 sm:py-14">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="lp-eyebrow text-lp-accent">Painel interno</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-lp-text sm:text-4xl">
              Dados de acesso
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-lp-border bg-lp-bg-elev px-3 py-1.5 text-xs text-lp-muted">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                error ? "bg-red-500" : "bg-hustly-lime"
              } ${!error ? "animate-pulse" : ""}`}
            />
            {error
              ? "Sem conexão"
              : `Ao vivo · atualizado ${stats ? formatTime(stats.updatedAt) : "--:--:--"}`}
          </div>
        </header>

        {!stats && !error && (
          <p className="text-lp-muted">Carregando…</p>
        )}

        {stats && (
          <>
            <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard
                label="Visitantes (total)"
                value={formatNumber(stats.totalVisitors)}
                highlight
                pulse={pulse}
              />
              <StatCard
                label="Acessos (total)"
                value={formatNumber(stats.totalPageviews)}
                pulse={pulse}
              />
              <StatCard
                label="Visitantes hoje"
                value={formatNumber(stats.todayVisitors)}
              />
              <StatCard
                label="Acessos hoje"
                value={formatNumber(stats.todayPageviews)}
              />
            </section>

            <section className="mt-8 rounded-2xl border border-lp-border bg-lp-bg-elev p-5 sm:p-6">
              <h2 className="mb-5 font-display text-lg font-semibold text-lp-text">
                Últimos 7 dias
              </h2>
              <ul className="space-y-3">
                {stats.days.map((d) => (
                  <li key={d.date} className="flex items-center gap-3">
                    <span className="w-12 shrink-0 text-xs text-lp-muted">
                      {formatDay(d.date)}
                    </span>
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-hustly-lime transition-all duration-500"
                        style={{ width: `${(d.pageviews / maxPv) * 100}%` }}
                      />
                    </div>
                    <span className="w-24 shrink-0 text-right text-xs text-lp-muted">
                      {formatNumber(d.pageviews)} acessos
                    </span>
                    <span className="hidden w-24 shrink-0 text-right text-xs text-lp-accent sm:block">
                      {formatNumber(d.visitors)} visit.
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl border border-lp-border bg-lp-bg-elev p-5 sm:p-6">
              <h2 className="mb-5 font-display text-lg font-semibold text-lp-text">
                Cliques nos botões (CTAs)
              </h2>
              {clickEvents.length === 0 ? (
                <p className="text-sm text-lp-muted">
                  Nenhum clique registrado ainda.
                </p>
              ) : (
                <ul className="space-y-3">
                  {clickEvents.map((ev) => (
                    <li
                      key={ev.name}
                      className="flex items-center justify-between gap-3 border-b border-lp-border pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-sm text-lp-text">
                        {eventLabel(ev.name)}
                      </span>
                      <span className="flex items-baseline gap-3">
                        <span className="font-display text-xl font-bold tabular-nums text-hustly-lime">
                          {formatNumber(ev.total)}
                        </span>
                        <span className="w-20 text-right text-xs text-lp-muted">
                          {formatNumber(ev.today)} hoje
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {!stats.persistent && (
              <p className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
                ⚠️ Modo temporário (memória): os números zeram a cada deploy/reinício.
                Configure o Vercel KV / Upstash Redis para persistir os dados.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  highlight,
  pulse,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  pulse?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 transition-colors sm:p-5 ${
        highlight
          ? "border-hustly-lime/40 bg-hustly-lime/10"
          : "border-lp-border bg-lp-bg-elev"
      } ${pulse && highlight ? "ring-2 ring-hustly-lime" : ""}`}
    >
      <p className="text-xs text-lp-muted">{label}</p>
      <p
        className={`mt-1 font-display text-3xl font-bold tabular-nums sm:text-4xl ${
          highlight ? "text-hustly-lime" : "text-lp-text"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
