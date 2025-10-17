import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "events.json");

async function ensureFile() {
  try {
    await fs.access(FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(FILE, "[]", "utf8");
  }
}

export async function GET() {
  await ensureFile();
  const raw = await fs.readFile(FILE, "utf8");
  let events = [];
  try { events = JSON.parse(raw) } catch (e) { events = [] }
  return NextResponse.json(events);
}

export async function POST(request) {
  await ensureFile();
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  if (!body.title) {
    return NextResponse.json({ error: "title required" }, { status: 400 })
  }

  const raw = await fs.readFile(FILE, "utf8");
  let events = [];
  try { events = JSON.parse(raw) } catch (e) { events = [] }

  const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now())
  const newEvent = {
    id,
    title: body.title,
    date: body.date || null,
    description: body.description || "",
    createdAt: new Date().toISOString(),
    ...body,
  }

  events.push(newEvent)
  await fs.writeFile(FILE, JSON.stringify(events, null, 2), "utf8")

  return NextResponse.json(newEvent, { status: 201 })
}
