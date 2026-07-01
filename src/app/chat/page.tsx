"use client";
import { useState, useRef, useEffect } from "react";
import { Sun, Send, Bot, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  "I feel sad and don't know why"
];

export default function ChatPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialPrompt = params.get("prompt");
    
    if (initialPrompt && messages.length === 1) {
      window.history.replaceState({}, document.title, window.location.pathname);
      sendMessage(initialPrompt);
    }
  }, []);

  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (userStr) {
      setIsAuthorized(true);
      const disclaimerSeen = sessionStorage.getItem("disclaimer_seen");
      if (!disclaimerSeen) {
        setShowDisclaimer(true);
      }
    }
    setAuthChecked(true);
  }, []);

  const acceptDisclaimer = () => {
    sessionStorage.setItem("disclaimer_seen", "true");
    setShowDisclaimer(false);
  };

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
          content: "⚠️ I'm having trouble connecting right now. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!authChecked) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
        <Sun className="animate-pulse-glow" size={48} color="var(--accent-primary)" />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div style={{ 
        height: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        background: "var(--bg-primary)",
      }}>
        <div style={{ 
          position: "relative",
          zIndex: 1,
          padding: "64px 48px", 
          textAlign: "center", 
          maxWidth: 480, 
          background: "var(--bg-primary)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          boxShadow: "0 8px 30px rgba(0,0,0,0.05)"
        }}>
          <Sun size={40} color="var(--accent-tertiary)" style={{ margin: "0 auto 24px" }} />
          <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 36, fontWeight: 400, color: "var(--text-primary)", marginBottom: 16 }}>Sign In Required</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 15, marginBottom: 40, lineHeight: 1.7 }}>
            Your healing journey requires a sacred space. Please log in or create an account to start chatting with your personalized AI health companion.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <Link href="/login" className="btn-ghost" style={{ textDecoration: "none", padding: "12px 32px", borderRadius: 8 }}>Log In</Link>
            <Link href="/signup" className="btn-primary" style={{ textDecoration: "none", padding: "12px 32px", borderRadius: 8 }}>Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Disclaimer Popup Modal */}
      {showDisclaimer && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999999, display: "flex", alignItems: "center", justifyContent: "center",
          backgroundColor: "rgba(45, 42, 38, 0.5)", padding: 24, backdropFilter: "blur(4px)"
        }}>
          <div className="animate-fade-up" style={{
            background: "var(--bg-primary)", width: "100%", maxWidth: 500, padding: 40,
            border: "1px solid var(--border)", borderRadius: 16, boxShadow: "0 24px 60px rgba(0,0,0,0.1)",
            maxHeight: "90vh", overflowY: "auto"
          }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 32, color: "var(--text-primary)", marginBottom: 20 }}>Important Notice</h2>
            <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />
            <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: 20 }}>
              <p><strong style={{ color: "var(--text-primary)" }}>SoulSync is an AI holistic companion, not a medical professional.</strong></p>
              <p>The guidance, suggestions, and chat interactions provided by this platform are generated by artificial intelligence. They are meant for general wellness and mindfulness.</p>
              <p>This platform does not provide medical diagnoses or professional psychiatric advice. If you are experiencing a medical emergency, please contact a certified healthcare provider immediately.</p>
            </div>
            <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <Link href="/" className="btn-ghost" style={{ textDecoration: "none", padding: "10px 20px", borderRadius: 8 }}>Go Back</Link>
              <button onClick={acceptDisclaimer} className="btn-primary" style={{ padding: "10px 20px", borderRadius: 8 }}>I Understand</button>
            </div>
          </div>
        </div>
      )}

      {/* Modern AI Chat Layout */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        height: "100vh", 
        background: "var(--bg-primary)" 
      }}>
        
        {/* Header */}
        <header style={{
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-primary)",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <span>←</span> Home
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 22, color: "var(--text-primary)" }}>
            <Sun size={20} color="var(--accent-tertiary)" />
            SoulSync AI
          </div>
          <div style={{ width: 60 }} /> {/* Spacer for centering */}
        </header>

        {/* Chat History Area */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "40px 24px 120px", /* Extra bottom padding for input bar */
        }}>
          <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
            
            {/* Quick Prompts (Only visible if no user messages sent yet) */}
            {messages.length <= 1 && (
              <div style={{ marginTop: 40, marginBottom: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
                  {quickPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(p)}
                      style={{
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        padding: "16px",
                        textAlign: "left",
                        color: "var(--text-primary)",
                        fontSize: 14,
                        lineHeight: 1.5,
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--text-primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message List */}
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", gap: 20 }}>
                {/* Avatar */}
                <div style={{ 
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: msg.role === "ai" ? "var(--bg-secondary)" : "var(--text-primary)",
                  color: msg.role === "ai" ? "var(--text-primary)" : "var(--bg-primary)",
                  border: msg.role === "ai" ? "1px solid var(--border)" : "none"
                }}>
                  {msg.role === "ai" ? <Bot size={20} /> : <User size={20} />}
                </div>

                {/* Content */}
                <div style={{ 
                  flex: 1, 
                  paddingTop: 4,
                  color: "var(--text-primary)",
                  fontSize: 16,
                  lineHeight: 1.7,
                  fontFamily: "'Inter', 'Montserrat', sans-serif"
                }}>
                  <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14, color: msg.role === "ai" ? "var(--accent-tertiary)" : "var(--text-primary)" }}>
                    {msg.role === "ai" ? "SoulSync" : "You"}
                  </div>
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ 
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)"
                }}>
                  <Bot size={20} />
                </div>
                <div style={{ flex: 1, paddingTop: 12, display: "flex", gap: 6 }}>
                  {[0, 1, 2].map((d) => (
                    <span key={d} style={{
                      width: 8, height: 8, borderRadius: "50%", background: "var(--text-muted)",
                      display: "block", animation: "pulse 1.5s infinite ease-in-out", animationDelay: (d * 0.2) + "s"
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Floating Input Bar */}
        <div style={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top, var(--bg-primary) 70%, transparent)",
          padding: "0 24px 32px",
          pointerEvents: "none" // Let clicks pass through the gradient
        }}>
          <div style={{ 
            maxWidth: 800, 
            margin: "0 auto", 
            position: "relative",
            pointerEvents: "auto" // Re-enable clicks for the input box
          }}>
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: 24,
              padding: "8px 8px 8px 24px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
              transition: "border-color 0.3s ease"
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message SoulSync..."
                rows={1}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--text-primary)",
                  fontSize: 16,
                  resize: "none",
                  lineHeight: 1.5,
                  padding: "12px 0",
                  fontFamily: "'Inter', 'Montserrat', sans-serif",
                  maxHeight: 200
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                style={{
                  background: !input.trim() || loading ? "transparent" : "var(--text-primary)",
                  color: !input.trim() || loading ? "var(--text-muted)" : "var(--bg-primary)",
                  border: "none",
                  borderRadius: 16,
                  width: 44, height: 44,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: !input.trim() || loading ? "default" : "pointer",
                  transition: "all 0.2s ease",
                  marginLeft: 12,
                  marginBottom: 2
                }}
              >
                <Send size={18} />
              </button>
            </div>
            <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 12 }}>
              SoulSync can make mistakes. Always consult a real doctor for serious conditions.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
