"use client";
import Link from "next/link";
import Image from "next/image";
import { Sun } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [toastMessage, setToastMessage] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const justLoggedIn = sessionStorage.getItem("justLoggedIn");
    const userStr = sessionStorage.getItem("user");

    if (justLoggedIn) {
      let name = "Alex";
      if (userStr) {
        try { name = JSON.parse(userStr).name; setIsLoggedIn(true); } catch(e) {}
      }
      
      const hour = new Date().getHours();
      let greeting = "Good morning";
      if (hour >= 12 && hour < 18) greeting = "Good afternoon";
      else if (hour >= 18 && hour < 22) greeting = "Good evening";
      else if (hour >= 22) greeting = "Good night";
      
      setToastMessage(`${greeting}, ${name}! Authentication completed successfully.`);
      sessionStorage.removeItem("justLoggedIn");
      
      setTimeout(() => {
        setToastMessage("");
      }, 5000);
    } else if (userStr) {
      setIsLoggedIn(true);
    } else if (!userStr) {
      // Show guest prompt if not logged in
      const timer = setTimeout(() => {
        setGuestMessage("Please sign in or get started to begin your wellness journey.");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main style={{ paddingTop: 64 }}>
      {/* Toast Notification (Login Success) */}
      {toastMessage && (
        <div style={{
          position: "fixed", top: 80, right: 24, zIndex: 9999,
          background: "var(--bg-card)", border: "1px solid var(--accent-primary)",
          padding: "16px 24px", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <Sun size={20} color="var(--accent-primary)" />
          <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{toastMessage}</span>
        </div>
      )}

      {/* Guest Notification Popup */}
      {guestMessage && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          background: "var(--bg-card)", border: "1px solid var(--border)",
          padding: "16px 24px", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <div className="animate-pulse-glow" style={{ background: "rgba(214,140,103,0.1)", padding: 8, borderRadius: "50%" }}>
            <Sun size={20} color="var(--accent-primary)" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginRight: 8 }}>
            <span style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 14 }}>Welcome to SoulSync!</span>
            <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{guestMessage}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="/login" style={{ background: "var(--text-primary)", color: "var(--bg-primary)", padding: "6px 14px", borderRadius: 4, fontSize: 13, fontWeight: 500, textTransform: "uppercase", textDecoration: "none", transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "0.8"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Sign In
            </Link>
            <button onClick={() => setGuestMessage("")} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "4px", fontSize: 16 }}>
              ✕
            </button>
          </div>
        </div>
      )}
      
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "160px 24px 60px",
          position: "relative",
          marginTop: -80, // Offset for navbar
          backgroundImage: "url('https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=2500&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(242, 239, 233, 0.75)" }}></div>
        <div className="container animate-fade-up" style={{ position: "relative", zIndex: 1, maxWidth: 900, textAlign: "center" }}>
            <h1
              className="section-title"
              style={{ marginBottom: 40, fontSize: "clamp(48px, 8vw, 96px)", color: "var(--text-primary)" }}
            >
              Heal Your Soul,<br />Mind & Body
            </h1>

            <p
              style={{
                color: "var(--text-primary)",
                fontSize: 18,
                lineHeight: 1.8,
                marginBottom: 56,
                maxWidth: 600,
                margin: "0 auto 56px",
                fontWeight: 500,
                opacity: 0.85
              }}
            >
              SoulSync is a minimalist AI health companion that listens deeply,
              understands your true feelings, and helps you find balance in the space between.
            </p>

            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
              <Link href={isLoggedIn ? "/assess" : "/login"} className="btn-primary" style={{ textDecoration: "none" }}>
                Begin Journey
              </Link>
              <Link href="/chat" className="btn-ghost" style={{ textDecoration: "none", borderColor: "var(--text-primary)" }}>
                Talk to AI
              </Link>
            </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section style={{ padding: "120px 24px", backgroundColor: "var(--bg-primary)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 64 }}>
          {pillars.map((p, i) => (
            <div key={p.label} style={{ textAlign: "center", padding: "40px 0", borderTop: "1px solid var(--border)" }}>
              <div style={{ fontSize: 32, marginBottom: 24, filter: "grayscale(100%) opacity(0.8)" }}>{p.icon}</div>
              <h3 style={{ fontSize: 28, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", marginBottom: 16 }}>{p.label}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.8 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── IMMERSIVE DIVIDER ── */}
      <section style={{ 
          padding: "160px 24px", 
          borderTop: "1px solid var(--border)", 
          borderBottom: "1px solid var(--border)",
          backgroundImage: "url('https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=2500&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative"
        }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(45, 42, 38, 0.75)" }}></div>
        <div className="container" style={{ maxWidth: 800, textAlign: "center", position: "relative", zIndex: 1 }}>
           <h2 className="section-title" style={{ marginBottom: 40, fontSize: "clamp(36px, 6vw, 72px)", color: "var(--bg-primary)" }}>The Space Between</h2>
           <p style={{ fontSize: 20, color: "var(--bg-secondary)", lineHeight: 1.9, marginBottom: 64, opacity: 0.9 }}>
             Healing isn't just about treating symptoms. It is about aligning your true self with nature, listening to the silence, and finding balance within.
           </p>
           <Link href={isLoggedIn ? "/assess" : "/login"} className="btn-beige" style={{ textDecoration: "none", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", border: "none" }}>
             Start Healing
           </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: "64px 24px",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: 13,
        }}
      >
        <p style={{ marginBottom: 16 }}>
          ⚠️ SoulSync provides wellness guidance only. It is not a substitute for professional medical advice or complete health treatment. We can assist in finding local hospital residencies if requested.
        </p>
        <p>© 2026 SoulSync. All rights reserved.</p>
      </footer>
    </main>
  );
}
