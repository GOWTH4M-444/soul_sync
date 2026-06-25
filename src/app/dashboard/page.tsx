"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Sun } from "lucide-react";

const mockData = {
  name: "Alex",
  streak: 7,
  score: 68,
  pillars: [
    { label: "Soul", value: 60, color: "#d68c67", icon: "✨", trend: "+5%" },
    { label: "Mind", value: 72, color: "#c4a47c", icon: "🧠", trend: "+12%" },
    { label: "Body", value: 55, color: "#b08d65", icon: "💪", trend: "-3%" },
  ],
  reminders: [
    { time: "08:00 AM", task: "Morning breathing exercise (5 min)", done: true },
    { time: "12:00 PM", task: "Mindful lunch — no screens", done: true },
    { time: "03:00 PM", task: "Drink 2 glasses of water", done: false },
    { time: "06:00 PM", task: "Evening walk (20 min)", done: false },
    { time: "09:00 PM", task: "Gratitude journaling", done: false },
    { time: "10:00 PM", task: "Sleep preparation — no phone 30 min before bed", done: false },
  ],
  insights: [
    { icon: "⚠️", text: "Your stress levels have been high for 3 days. Consider a breathing session today.", color: "#d68c67" },
    { icon: "✅", text: "Great job! You completed 7 days of your morning routine.", color: "#c4a47c" },
    { icon: "💡", text: "Your sleep quality improves when you journal before bed. Keep it up!", color: "#b08d65" },
  ],
  recentRemedies: [
    { title: "4-7-8 Breathing Technique", category: "Mental", desc: "For anxiety relief" },
    { title: "Warm Ginger & Turmeric Tea", category: "Physical", desc: "For inflammation & digestion" },
    { title: "Morning Sun Gazing (5 min)", category: "Spiritual", desc: "For grounding & energy alignment" },
  ],
};

export default function DashboardPage() {
  const completedCount = mockData.reminders.filter((r) => r.done).length;

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 80, minHeight: "100vh", padding: "80px 24px 60px" }}>
        <div className="container">
          {/* Welcome header */}
          <div style={{ marginBottom: 36, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                Good morning, {mockData.name} <Sun size={28} className="text-gradient-accent" />
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: 15 }}>
                Day {mockData.streak} streak · Your holistic health overview
              </p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <Link href="/assess" className="btn-ghost" style={{ fontSize: 14, padding: "10px 20px", textDecoration: "none" }}>
                📋 New Check-in
              </Link>
              <Link href="/chat" className="btn-primary" style={{ fontSize: 14, padding: "10px 20px", textDecoration: "none" }}>
                💬 Talk to AI
              </Link>
            </div>
          </div>

          {/* Overall score */}
          <div
            className="glass"
            style={{
              padding: "28px 32px",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 32,
              flexWrap: "wrap",
              background: "linear-gradient(135deg, rgba(196,164,124,0.1), rgba(214,140,103,0.08))",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 56, fontWeight: 700, color: "var(--accent-primary)", lineHeight: 1 }}>
                {mockData.score}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>Overall Wellness Score</div>
            </div>
            <div style={{ width: 1, height: 60, background: "rgba(74, 59, 50, 0.1)" }} />
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 14, color: "var(--text-primary)", marginBottom: 12 }}>
                Your wellness is <strong style={{ color: "var(--accent-secondary)" }}>recovering</strong>. 
                Physical health needs attention. Keep your routine!
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 99, background: "rgba(196,164,124,0.15)", color: "var(--accent-primary)" }}>
                  🔥 {mockData.streak} day streak
                </span>
                <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 99, background: "rgba(214,140,103,0.15)", color: "var(--accent-secondary)" }}>
                  {completedCount}/{mockData.reminders.length} tasks done
                </span>
              </div>
            </div>
          </div>

          {/* Three Pillar Scores */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
            {mockData.pillars.map((p) => (
              <div
                key={p.label}
                className="glass"
                style={{ padding: 24, textAlign: "center", border: `1px solid ${p.color}44`, background: "var(--bg-card)" }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 20, color: "var(--text-primary)", marginBottom: 4 }}>{p.label}</div>
                <div style={{ position: "relative", height: 6, background: "rgba(74, 59, 50, 0.1)", borderRadius: 99, margin: "12px 0" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${p.value}%`, background: p.color, borderRadius: 99 }} />
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: p.color }}>{p.value}</div>
                <div style={{ fontSize: 12, color: p.trend.startsWith("+") ? "var(--accent-primary)" : "var(--accent-secondary)", marginTop: 4 }}>
                  {p.trend} this week
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {/* Today's Routine */}
            <div className="glass" style={{ padding: 24, background: "var(--bg-card)" }}>
              <h3 style={{ fontWeight: 600, fontSize: 17, color: "var(--text-primary)", marginBottom: 20 }}>
                📅 Today's Routine
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {mockData.reminders.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      opacity: r.done ? 0.6 : 1,
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: `2px solid ${r.done ? "var(--accent-primary)" : "rgba(74, 59, 50, 0.2)"}`,
                        background: r.done ? "var(--accent-primary)" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 11,
                        color: "#fff",
                      }}
                    >
                      {r.done && "✓"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: r.done ? "var(--text-muted)" : "var(--text-primary)", textDecoration: r.done ? "line-through" : "none" }}>
                        {r.task}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="glass" style={{ padding: 24, background: "var(--bg-card)" }}>
                <h3 style={{ fontWeight: 600, fontSize: 17, color: "var(--text-primary)", marginBottom: 16 }}>
                  🤖 AI Insights
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {mockData.insights.map((ins, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "12px 14px",
                        borderRadius: 10,
                        background: `${ins.color}15`,
                        border: `1px solid ${ins.color}33`,
                        fontSize: 13,
                        color: "var(--text-primary)",
                        lineHeight: 1.5,
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <span>{ins.icon}</span>
                      <span>{ins.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Remedies */}
              <div className="glass" style={{ padding: 24, background: "var(--bg-card)" }}>
                <h3 style={{ fontWeight: 600, fontSize: 17, color: "var(--text-primary)", marginBottom: 16 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Sun size={18} /> Recent Remedies</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {mockData.recentRemedies.map((rem, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 0",
                        borderBottom: i < 2 ? "1px solid var(--border-light)" : "none",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>
                          {rem.title}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                          {rem.category} · {rem.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
