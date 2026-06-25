"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Sun } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are SoulSync, a deeply empathetic and knowledgeable holistic health AI companion. Your purpose is to help users heal their soul (spiritual), mind (mental), and body (physical) health as a unified whole.

When a user shares their problems:
1. Listen with deep empathy — acknowledge their feelings first before giving advice
2. Ask clarifying questions to understand the ROOT cause, not just the surface symptom
3. Identify whether the problem is primarily spiritual, mental, physical, or a combination
4. Give practical, actionable holistic remedies covering all relevant dimensions
5. Suggest breathing exercises, mindfulness, diet changes, physical remedies, spiritual practices as appropriate
6. Always remind them they are not alone and healing takes time
7. If someone shows signs of crisis, gently suggest professional help while still being supportive
8. Be warm, caring, non-judgmental — like a wise, compassionate health guide

Format your responses clearly with sections when giving remedies. Use emojis sparingly but meaningfully. Never diagnose — only suggest and support.`;

const quickPrompts = [
  "I've been feeling very anxious and can't sleep",
  "I feel spiritually empty and lost",
  "I have chronic back pain and stress",
  "I feel sad and don't know why",
  "My digestion has been very poor lately",
  "I feel disconnected from my purpose in life",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content:
        "Welcome, I'm SoulSync — your holistic AI health companion.\n\nI'm here to listen and help you heal — body, mind, and soul. Please share what you're experiencing. There's no judgment here — be as honest as you feel comfortable being.\n\nHow are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const userMsg: Message = { role: "user", content: userText, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role === "ai" ? "model" : "user",
            content: m.content,
          })),
          systemPrompt: SYSTEM_PROMPT,
        }),
      });

      const data = await response.json();
      const aiMsg: Message = {
        role: "ai",
        content: data.reply || "I'm sorry, I couldn't respond right now. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "⚠️ I'm having trouble connecting right now. Please check your API key setup and try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          paddingTop: 64,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          maxWidth: 860,
          margin: "0 auto",
          padding: "64px 16px 0",
        }}
      >
        {/* Header */}
        <div
          className="glass"
          style={{
            padding: "16px 24px",
            margin: "16px 0",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            className="animate-pulse-glow"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              flexShrink: 0,
            }}
          >
            <Sun size={24} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16, color: "var(--text-primary)" }}>
              SoulSync AI Companion
            </div>
            <div style={{ fontSize: 12, color: "var(--accent-primary)", display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--accent-primary)",
                  display: "inline-block",
                }}
              />
              Online — Here for you 24/7
            </div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-muted)", textAlign: "right" }}>
            <div>Soul · Mind · Body</div>
            <div style={{ color: "var(--text-muted)" }}>Holistic Healing</div>
          </div>
        </div>

        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10, paddingLeft: 4 }}>
              💡 Quick start — tap a topic:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(p)}
                  style={{
                    background: "rgba(196,164,124,0.1)",
                    border: "1px solid rgba(196,164,124,0.3)",
                    borderRadius: 99,
                    color: "var(--text-primary)",
                    fontSize: 13,
                    padding: "7px 14px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "var(--font-montserrat), sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(196,164,124,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(196,164,124,0.1)";
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            paddingBottom: 16,
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-end",
                gap: 10,
              }}
            >
              {msg.role === "ai" && (
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  <Sun size={18} strokeWidth={2.5} />
                </div>
              )}
              <div className={msg.role === "user" ? "chat-user" : "chat-ai"}>
                <p
                  style={{
                    whiteSpace: "pre-wrap",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  {msg.content}
                </p>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    marginTop: 6,
                    textAlign: msg.role === "user" ? "right" : "left",
                  }}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <Sun size={18} strokeWidth={2.5} />
              </div>
              <div className="chat-ai" style={{ padding: "14px 18px" }}>
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="typing-dot"
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "var(--text-muted)",
                        display: "block",
                        animationDelay: `${d * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div
          className="glass"
          style={{
            padding: "12px 16px",
            marginBottom: 16,
            display: "flex",
            gap: 12,
            alignItems: "flex-end",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share how you're feeling — body, mind, or soul..."
            rows={2}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-primary)",
              fontSize: 14,
              fontFamily: "var(--font-montserrat), sans-serif",
              resize: "none",
              lineHeight: 1.6,
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="btn-primary"
            style={{
              padding: "10px 20px",
              fontSize: 14,
              flexShrink: 0,
              opacity: !input.trim() || loading ? 0.5 : 1,
            }}
          >
            Send ↑
          </button>
        </div>

        {/* Disclaimer */}
        <div style={{ textAlign: "center", fontSize: 11, color: "var(--text-muted)", paddingBottom: 12 }}>
          ⚠️ SoulSync provides wellness guidance only — not medical diagnosis or treatment.
        </div>
      </div>
    </>
  );
}
