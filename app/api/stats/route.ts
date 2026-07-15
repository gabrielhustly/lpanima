import { NextResponse } from "next/server";
import { getStats } from "@/lib/stats-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(stats, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[stats] falha ao ler estatísticas:", err);
    return NextResponse.json({ error: "stats_unavailable" }, { status: 500 });
  }
}
