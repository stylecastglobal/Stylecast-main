import { NextResponse } from "next/server";

let MEMORY_DRAFT = {
  status: "submitted" as const,
  updatedAt: new Date().toISOString(),
};

export async function POST() {
  MEMORY_DRAFT = { status: "submitted", updatedAt: new Date().toISOString() };
  return NextResponse.json({ ok: true, draft: MEMORY_DRAFT });
}
