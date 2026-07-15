import { NextResponse } from "next/server";
import { recordVisit } from "@/lib/stats-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let visitorId = "";
  try {
    const body = (await request.json()) as { visitorId?: unknown };
    if (typeof body.visitorId === "string") {
      visitorId = body.visitorId.slice(0, 64);
    }
  } catch {
    // corpo ausente/ inválido — segue com id gerado no servidor
  }

  if (!visitorId) {
    visitorId = `anon:${crypto.randomUUID()}`;
  }

  try {
    await recordVisit(visitorId);
  } catch (err) {
    console.error("[track] falha ao registrar visita:", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
