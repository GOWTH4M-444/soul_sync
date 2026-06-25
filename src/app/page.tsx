"use client";
import Link from "next/link";
import { Sun } from "lucide-react";

const pillars = [
  {
    icon: "✨",
    label: "Soul",
    color: "#d68c67", // Terracotta
    glow: "rgba(214,140,103,0.3)",
    desc: "Spiritual clarity & purpose",
  },
  {
    icon: "🧠",
    label: "Mind",
    color: "#c4a47c", // Sand/Gold
    glow: "rgba(196,164,124,0.3)",
    desc: "Mental peace & emotional balance",
  },
  {
    icon: "💪",
    label: "Body",
    color: "#b08d65", // Darker Sand
    glow: "rgba(176,141,101,0.3)",
    desc: "Physical health & vitality",
  },
];

const features = [
  {
    icon: "🤖",
    title: "AI Health Companion",
    desc: "Chat with an empathetic AI that understands your true feelings and gives personalized holistic guidance.",
    color: "#b08d65",
  },
  {
    icon: "📋",
    title: "Smart Health Assessment",
    desc: "A guided check-in covering physical symptoms, emotional state, and spiritual wellness — all in one place.",
    color: "#c4a47c",
  },
  {
    icon: "🔔",
    title: "Intelligent Reminders",
    desc: "The AI tracks your routine and sends caring check-ins even when you're offline — like a health guardian.",
    color: "#d68c67",
  },
  {
    icon: "📈",
    title: "Predictive Care",
    desc: "ML models analyze your patterns to predict dips in health and suggest proactive remedies before problems worsen.",
    color: "#c4a47c",
  },
  {
    icon: <Sun size={24} />,
    title: "Holistic Remedies",
    desc: "Suggestions from Ayurveda, modern medicine, mindfulness, breathwork, and spiritual practices — all tailored to you.",
    color: "#b08d65",
  },
  {
    icon: "🔒",
    title: "Private & Secure",
    desc: "Your health data is encrypted and never sold. You own your journey.",
    color: "#4a3b32",
  },
];

export default function HomePage() {
  return (
    <main style={{ paddingTop: 64 }}>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "95vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative orbs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,164,124,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(214,140,103,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Badge */}
        <div
          className="glass"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 18px",
            borderRadius: 99,
            fontSize: 13,
            fontWeight: 500,
            color: "var(--accent-secondary)",
            marginBottom: 32,
            border: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--accent-primary)",
              display: "inline-block",
              animation: "pulse-glow 2s infinite",
            }}
          />
          AI-Powered Holistic Health Platform
        </div>

        {/* Headline */}
        <h1
          className="section-title"
          style={{ maxWidth: 800, marginBottom: 24 }}
        >
          Heal Your{" "}
          <span className="text-gradient-accent">Soul</span>,{" "}
          <span className="text-gradient-accent">Mind</span> &{" "}
          <span className="text-gradient-accent">Body</span>
          {" "}— Together
        </h1>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 18,
            maxWidth: 620,
            lineHeight: 1.7,
            marginBottom: 44,
          }}
        >
          SoulSync is your personal AI health companion that listens deeply,
          understands your true feelings, and creates a holistic care plan —
          covering spiritual, mental, and physical wellness.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 70 }}>
          <Link href="/assess" className="btn-primary" style={{ fontSize: 16, padding: "14px 32px", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <Sun size={18} /> Start Your Health Check
          </Link>
          <Link href="/chat" className="btn-ghost" style={{ fontSize: 16, padding: "14px 32px", textDecoration: "none" }}>
            💬 Talk to AI Companion
          </Link>
        </div>

        {/* Three pillars */}
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {pillars.map((p) => (
            <div
              key={p.label}
              className="glass"
              style={{
                padding: "20px 32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                minWidth: 150,
                border: `1px solid ${p.color}33`,
                boxShadow: `0 4px 20px ${p.glow}`,
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${p.glow}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${p.glow}`;
              }}
            >
              <div style={{ fontSize: 32 }} className="animate-float">{p.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 18, color: p.color }}>{p.label}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center" }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "80px 24px" }} id="features">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              Everything You Need to{" "}
              <span className="text-gradient-accent">Truly Heal</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
              A comprehensive platform that treats you as a whole person —
              not just a list of symptoms.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {features.map((f, i) => (
              <div
                key={i}
                className="glass"
                style={{
                  padding: 28,
                  transition: "transform 0.3s, border-color 0.3s",
                  cursor: "default",
                  animationDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.borderColor = `${f.color}66`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-light)";
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `${f.color}1a`,
                    border: `1px solid ${f.color}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    marginBottom: 16,
                    color: f.color
                  }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 10, color: "var(--text-primary)" }}>
                  {f.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 24px", background: "var(--bg-card-solid)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              How <span className="text-gradient-accent">SoulSync</span> Works
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 700, margin: "0 auto" }}>
            {[
              {
                step: "01",
                title: "Tell Us How You Feel",
                desc: "Use our guided form to describe your physical symptoms, emotional state, and spiritual feelings. No judgment — just honesty.",
                color: "#c4a47c",
              },
              {
                step: "02",
                title: "AI Understands Your True State",
                desc: "Our AI reads between the lines — detecting hidden pain, emotional patterns, and underlying causes beyond what you explicitly said.",
                color: "#b08d65",
              },
              {
                step: "03",
                title: "Get a Personalized Care Plan",
                desc: "Receive tailored remedies, routines, and guidance across all three dimensions — spiritual practices, mental exercises, and physical treatments.",
                color: "#d68c67",
              },
              {
                step: "04",
                title: "AI Tracks & Reminds You",
                desc: "Your AI companion checks in daily, adjusts your plan based on progress, and sends reminders even when you're offline.",
                color: "#4a3b32",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 24, alignItems: "flex-start", paddingBottom: 40, position: "relative" }}
              >
                {/* Line connector */}
                {i < 3 && (
                  <div
                    style={{
                      position: "absolute",
                      left: 25,
                      top: 52,
                      width: 2,
                      height: "calc(100% - 12px)",
                      background: `linear-gradient(to bottom, ${item.color}66, transparent)`,
                    }}
                  />
                )}
                <div
                  style={{
                    minWidth: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `${item.color}1a`,
                    border: `2px solid ${item.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 14,
                    color: item.color,
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </div>
                <div style={{ paddingTop: 12 }}>
                  <h3 style={{ fontWeight: 600, fontSize: 18, color: "var(--text-primary)", marginBottom: 8 }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: 15 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="container">
          <div
            className="glass"
            style={{
              textAlign: "center",
              padding: "60px 40px",
              background: "linear-gradient(135deg, rgba(196,164,124,0.1), rgba(214,140,103,0.08))",
              border: "1px solid var(--border)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(196,164,124,0.15) 0%, transparent 70%)",
              }}
            />
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20, color: "var(--accent-primary)" }} className="animate-float">
              <Sun size={48} strokeWidth={1.5} />
            </div>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              Begin Your Healing Journey <span className="text-gradient-accent">Today</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 500, margin: "0 auto 36px" }}>
              Thousands of people are already healing holistically with SoulSync.
              Your journey to complete wellness starts with one honest check-in.
            </p>
            <Link href="/signup" className="btn-primary" style={{ fontSize: 16, padding: "16px 40px", textDecoration: "none" }}>
              Start Healing — It's Free
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "32px 24px",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: 13,
        }}
      >
        <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
          <span style={{ color: "var(--accent-primary)", fontWeight: 600, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 18, display: "flex", alignItems: "center", gap: 6 }}>
            <Sun size={16} /> SoulSync
          </span>
        </div>
        <p>
          ⚠️ SoulSync provides wellness guidance only. It is not a substitute for professional medical advice, diagnosis, or treatment.
        </p>
        <p style={{ marginTop: 8 }}>© 2026 SoulSync. All rights reserved.</p>
      </footer>
    </main>
  );
}
