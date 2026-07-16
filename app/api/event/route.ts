import { NextResponse } from "next/server";
import { recordEvent } from "@/lib/stats-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let name = "";
  try {
    // Aceita application/json e text/plain (navigator.sendBeacon).
    const text = await request.text();
    if (text) {
      const body = JSON.parse(text) as { event?: unknown };
      if (typeof body.event === "string") {
        name = body.event;
      }
    }
  } catch {
    // corpo inválido — ignora
  }

  if (!name) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  try {
    await recordEvent(name);
  } catch (err) {
    console.error("[event] falha ao registrar evento:", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
