import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  const { messages, systemPrompt } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { reply: "⚙️ No API key configured. Please add GEMINI_API_KEY to your .env.local file." },
      { status: 200 }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    });

    let history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // Gemini requires the history to start with a 'user' message.
    // If the first message in the chat is the AI greeting, remove it from the API history.
    while (history.length > 0 && history[0].role === "model") {
      history.shift();
    }
    const lastMsg = messages[messages.length - 1];

    const chat = model.startChat({
      history,
      generationConfig: {
        temperature: 0.85,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const result = await chat.sendMessage([{ text: lastMsg.content }]);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    
    // Check for rate limit / quota exceeded
    if (err.message?.includes("429 Too Many Requests") || err.message?.includes("quota")) {
      return NextResponse.json(
        { reply: "⏳ Wow, you're chatting fast! We've hit the temporary rate limit for the Gemini AI. Please wait about 30 seconds and try again!" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { reply: `⚠️ API Error: ${err.message || "Failed to connect to Gemini."}` },
      { status: 200 }
    );
  }
}
