"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const INITIAL_REMINDERS = [
  { time: "08:00 AM", task: "Morning breathing exercise (5 min)", done: true },
  { time: "12:00 PM", task: "Mindful lunch — no screens", done: true },
  { time: "03:00 PM", task: "Drink 2 glasses of water", done: false },
  { time: "06:00 PM", task: "Evening walk (20 min)", done: false },
  { time: "09:00 PM", task: "Gratitude journaling", done: false },
  { time: "10:00 PM", task: "Sleep preparation — no phone 30 min before bed", done: false },
];

const mockData = {
  streak: 7,
  pillars: [
    { label: "Soul", value: 60, icon: "✨", trend: "+5%", image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80" },
    { label: "Mind", value: 72, icon: "🧠", trend: "+12%", image: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34cb?auto=format&fit=crop&w=800&q=80" },
    { label: "Body", value: 55, icon: "💪", trend: "-3%", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" },
  ],
  insights: [
    { icon: "⚠️", text: "Your stress levels have been high for 3 days. Consider a breathing session today." },
    { icon: "✅", text: "Great job! You completed 7 days of your morning routine." },
    { icon: "💡", text: "Your sleep quality improves when you journal before bed. Keep it up!" },
  ],
  recentRemedies: [
    { title: "4-7-8 Breathing Technique", category: "Mental", desc: "For anxiety relief" },
    { title: "Warm Ginger & Turmeric Tea", category: "Physical", desc: "For inflammation & digestion" },
    { title: "Morning Sun Gazing (5 min)", category: "Spiritual", desc: "For grounding & energy alignment" },
  ],
};

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("Good morning");
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);
  const completedCount = reminders.filter((r) => r.done).length;
  const dynamicScore = 60 + Math.floor((completedCount / reminders.length) * 25); 

  const toggleTask = (index: number) => {
    setReminders(prev => {
      const next = [...prev];
      next[index] = { ...next[index], done: !next[index].done };
      return next;
    });
  };

  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }
    
    try {
      setUserName(JSON.parse(userStr).name);
    } catch (e) {}

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else if (hour < 22) setGreeting("Good evening");
    else setGreeting("Good night");

    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        if (!data.profile) {
          router.push("/profile");
        } else {
          setIsAuthorized(true);
        }
      })
      .catch(() => {
        router.push("/profile");
      });
  }, [router]);

  if (!isAuthorized) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
        <Sun className="animate-pulse-glow" size={48} color="var(--accent-primary)" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ 
        paddingTop: 64, minHeight: "100vh", paddingBottom: 64, backgroundColor: "var(--bg-primary)"
      }}>
        {/* Rich Japanese aesthetic header */}
        <div style={{
          width: "100%", paddingBottom: 48, marginBottom: 48,
          backgroundImage: "url('https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=2500&q=80')",
          backgroundSize: "cover", backgroundPosition: "center 60%",
          position: "relative",
          borderBottom: "1px solid var(--border)"
        }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.2)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)" }} />
          
          <div className="container" style={{ maxWidth: 1100, position: "relative", zIndex: 1, paddingTop: 100 }}>
            <div style={{ 
              display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, padding: "0 24px"
            }}>
              <div style={{ background: "rgba(242, 239, 233, 0.85)", backdropFilter: "blur(8px)", padding: "24px 32px", border: "1px solid var(--border)", boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}>
                <h1 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 400, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1 }}>
                  {greeting}, {userName}.
                </h1>
                <p style={{ color: "var(--text-primary)", fontSize: 16, opacity: 0.9, margin: 0 }}>
                  Day {mockData.streak} of your healing journey.
                </p>
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link href="/profile" className="btn-primary" style={{ textDecoration: "none", padding: "12px 24px", background: "rgba(242, 239, 233, 0.85)", color: "var(--text-primary)", backdropFilter: "blur(8px)", border: "1px solid var(--border)", boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}>
                  Profile
                </Link>
                <Link href="/assess" className="btn-primary" style={{ textDecoration: "none", padding: "12px 24px", boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}>
                  New Check-in
                </Link>
                <Link href="/chat" className="btn-primary" style={{ textDecoration: "none", padding: "12px 24px", background: "var(--text-primary)", color: "var(--bg-primary)", boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}>
                  Talk to AI
                </Link>
              </div>
            </div>

            <div style={{
                marginTop: 64,
                display: "flex",
                alignItems: "center",
                gap: 48,
                flexWrap: "wrap",
                background: "var(--bg-primary)",
                padding: "32px 48px",
                border: "1px solid var(--border)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.05)"
              }}
            >
              <div style={{ textAlign: "center", minWidth: 120 }}>
                <div style={{ fontSize: 72, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1 }}>
                  {dynamicScore}
                </div>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", marginTop: 12 }}>Wellness Score</div>
              </div>
              <div style={{ width: 1, height: 80, background: "var(--border)" }} className="hidden-mobile" />
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ fontSize: 20, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: "var(--text-primary)", marginBottom: 16, lineHeight: 1.6 }}>
                  Your wellness is recovering. Deepen your practice today.
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 12, padding: "8px 16px", border: "1px solid var(--border)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {mockData.streak} Day Streak
                  </span>
                  <span style={{ fontSize: 12, padding: "8px 16px", border: "1px solid var(--border)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {completedCount}/{reminders.length} Tasks Done
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={{ maxWidth: 1100 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, marginBottom: 80 }}>
            {mockData.pillars.map((p) => {
              const radius = 60;
              const circumference = 2 * Math.PI * radius;
              const offset = circumference - (p.value / 100) * circumference;

              return (
                <div
                  key={p.label}
                  style={{ 
                    height: 420,
                    position: "relative",
                    border: "1px solid var(--border)",
                    backgroundImage: `url('${p.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex", 
                    flexDirection: "column",
                    justifyContent: "space-between",
                    overflow: "hidden"
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(242, 239, 233, 1) 100%)" }} />
                  
                  <div style={{ position: "relative", zIndex: 1, padding: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 36, color: "var(--bg-primary)", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
                      {p.label}
                    </div>
                  </div>

                  <div style={{ 
                    position: "relative", zIndex: 1, 
                    padding: "32px",
                    display: "flex", flexDirection: "column", alignItems: "center"
                  }}>
                    <div style={{ position: "relative", width: 120, height: 120 }}>
                      <svg width="120" height="120" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
                        <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(45, 42, 38, 0.1)" strokeWidth="1.5" />
                        <circle 
                          cx="70" cy="70" r={radius} 
                          fill="none" 
                          stroke="var(--text-primary)" 
                          strokeWidth="2.5" 
                          strokeDasharray={circumference} 
                          strokeDashoffset={offset} 
                          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                        />
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        <span style={{ fontSize: 32, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: "var(--text-primary)" }}>{p.value}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 24, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                      {p.trend} this week
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="desktop-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }}>
            
            {/* Journal / Routine Section */}
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              
              {/* Weekly Trend Graph */}
              <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", padding: "40px" }}>
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 24, color: "var(--text-primary)", margin: "0 0 32px 0" }}>
                  Weekly Wellness Trend
                </h3>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 160, paddingBottom: 12, borderBottom: "1px solid var(--border)", gap: 8 }}>
                  {[
                    { day: "M", val: 50 }, { day: "T", val: 65 }, { day: "W", val: 40 },
                    { day: "T", val: 70 }, { day: "F", val: 85 }, { day: "S", val: 60 },
                    { day: "S", val: 75 }
                  ].map((d, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: 12 }}>
                      <div style={{ 
                        width: "100%", maxWidth: 32, height: `${d.val}%`, 
                        background: i === 6 ? "var(--text-primary)" : "rgba(45, 42, 38, 0.15)",
                        transition: "height 1s ease-out" 
                      }} />
                      <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase" }}>{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Routine */}
              <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", padding: "48px 40px" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 40 }}>
                  <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 32, color: "var(--text-primary)", margin: 0 }}>
                    Today's Practice
                  </h3>
                  <span style={{ fontSize: 13, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</span>
                </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {reminders.map((r, i) => (
                  <div
                    key={i}
                    onClick={() => toggleTask(i)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 24,
                      opacity: r.done ? 0.5 : 1,
                      cursor: "pointer",
                      padding: "24px 0",
                      borderBottom: "1px solid var(--border)",
                      transition: "opacity 0.3s"
                    }}
                  >
                    <div
                      style={{
                        width: 24, height: 24,
                        border: "1px solid var(--text-primary)",
                        background: r.done ? "var(--text-primary)" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.3s",
                        flexShrink: 0
                      }}
                    >
                      {r.done && <span style={{ fontSize: 14, color: "var(--bg-primary)" }}>✓</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, color: "var(--text-primary)", textDecoration: r.done ? "line-through" : "none", transition: "all 0.3s" }}>
                        {r.task}
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", flexShrink: 0 }}>{r.time}</div>
                  </div>
                ))}
              </div>
            </div>
            </div>

            {/* Insights and Remedies */}
            <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 32, color: "var(--text-primary)", marginBottom: 32 }}>
                  AI Insights
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {mockData.insights.map((ins, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "32px",
                        border: "1px solid var(--border)",
                        background: "var(--bg-primary)",
                        color: "var(--text-primary)",
                        lineHeight: 1.7,
                        display: "flex",
                        flexDirection: "column",
                        gap: 24,
                        fontSize: 15
                      }}
                    >
                      <div>{ins.text}</div>
                      <button 
                        onClick={() => router.push(`/chat?prompt=${encodeURIComponent(`I noticed my insight said: "${ins.text}". Can we discuss this?`)}`)}
                        style={{ alignSelf: "flex-start", background: "transparent", border: "none", borderBottom: "1px solid var(--text-primary)", color: "var(--text-primary)", padding: "0 0 6px 0", fontSize: 12, textTransform: "uppercase", letterSpacing: "1px", cursor: "pointer", transition: "opacity 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "0.7"}
                        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
                      >
                        Discuss with AI
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 32, color: "var(--text-primary)", marginBottom: 32 }}>
                  Recommended Remedies
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid var(--border)" }}>
                  {mockData.recentRemedies.map((rem, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "32px 0",
                        borderBottom: "1px solid var(--border)",
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr",
                        gap: 24
                      }}
                    >
                      <div style={{ fontSize: 13, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
                        {rem.category}
                      </div>
                      <div>
                        <div style={{ fontSize: 18, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: "var(--text-primary)", marginBottom: 8 }}>
                          {rem.title}
                        </div>
                        <div style={{ fontSize: 14, color: "var(--text-muted)" }}>
                          {rem.desc}
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
