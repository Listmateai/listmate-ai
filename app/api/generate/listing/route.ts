import { NextRequest, NextResponse } from "next/server";

const SYSTEM = `
You write MLS-style listing descriptions for residential properties.
Be factual and neutral; avoid any Fair Housing risks (no references to protected classes,
schools "quality", crime/safety, religion, or steering). Output:
1) One concise paragraph (120–180 words)
2) Then 3 short bullet highlights.
`;

export async function POST(req: NextRequest) {
  try {
    const { property, preferences } = await req.json();

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: JSON.stringify({ property, preferences }) }
        ],
      }),
    });

    if (!r.ok) {
      const

