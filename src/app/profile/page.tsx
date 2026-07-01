"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { User, Sun, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const goals = [
  "Reduce Anxiety", "Improve Sleep", "Heal Gut Health", 
  "Find Daily Purpose", "Increase Energy", "Manage Physical Pain"
];

const tones = [
  { id: "clinical", label: "Clinical & Direct", desc: "Science-backed, straightforward medical advice." },
  { id: "warm", label: "Warm & Empathetic", desc: "Nurturing, gentle, and highly supportive." },
  { id: "spiritual", label: "Deeply Spiritual", desc: "Focuses on energy, soul connection, and higher purpose." },
];

const history = [
  { date: "Today", focus: "Physical Body", status: "Pain level 8/10 in Legs" },
  { date: "Yesterday", focus: "Mental & Emotional", status: "Stress level 9/10" },
  { date: "3 Days Ago", focus: "Spiritual & Soul", status: "Feeling disconnected" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    gender: "",
    contact: "",
    age: "",
    goal: "",
    location: "",
    coreGoals: ["Reduce Anxiety", "Improve Sleep"] as string[],
    aiTone: "warm"
  });
  
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setForm((prev) => ({ ...prev, ...data.profile, coreGoals: data.profile.coreGoals || prev.coreGoals, aiTone: data.profile.aiTone || prev.aiTone }));
          setIsEditing(false);
        } else {
          const userStr = sessionStorage.getItem("user");
          if (userStr) {
            try {
              const user = JSON.parse(userStr);
              setForm((prev) => ({ ...prev, name: user.name || "" }));
            } catch (e) {}
          }
          setIsEditing(true);
        }
      })
      .catch(() => {
        setIsEditing(true);
      });
  }, []);

  const toggleGoal = (g: string) => {
    setForm(prev => ({
      ...prev,
      coreGoals: prev.coreGoals.includes(g) 
        ? prev.coreGoals.filter(x => x !== g) 
        : [...prev.coreGoals, g]
    }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSaved(true);
        setIsEditing(false);
        setTimeout(() => setSaved(false), 3000);

        const userStr = sessionStorage.getItem("user");
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            sessionStorage.setItem("user", JSON.stringify({ ...user, name: form.name }));
            window.dispatchEvent(new Event("authStateChange"));
          } catch (e) {}
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ 
        paddingTop: 80, minHeight: "100vh", paddingBottom: 64, backgroundColor: "var(--bg-primary)"
      }}>
        
        {/* Decorative Header Art */}
        <div style={{
          width: "100%", height: 320, 
          backgroundImage: "url('https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=2500&q=80')",
          backgroundSize: "cover", backgroundPosition: "center 40%",
          position: "relative", marginBottom: 48,
          borderBottom: "1px solid var(--border)"
        }}>
          {/* Subtle dark overlay so white text pops if we used it, but here we use a gradient to blend into the beige bottom */}
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.2)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)" }} />
          
          <div className="container" style={{ maxWidth: 1000, height: "100%", display: "flex", alignItems: "flex-end", paddingBottom: 32, position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, padding: "0 24px" }}>
              <div style={{ background: "rgba(242, 239, 233, 0.85)", backdropFilter: "blur(8px)", padding: "24px 32px", border: "1px solid var(--border)", boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}>
                <h1 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 400, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1 }}>
                  Your Identity.
                </h1>
                <p style={{ color: "var(--text-primary)", fontSize: 16, opacity: 0.9, margin: 0 }}>
                  Personalize your holistic journey.
                </p>
              </div>
              <button 
                onClick={(e) => handleSave(e as any)}
                className="btn-primary" 
                style={{ fontSize: 14, padding: "14px 32px", display: "flex", gap: 12, alignItems: "center", boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
              >
                {saved ? <><CheckCircle2 size={18} /> Saved</> : "Save Preferences"}
              </button>
            </div>
          </div>
        </div>

        <div className="container" style={{ maxWidth: 1000 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
            
            {/* Profile Basics */}
            <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", padding: "48px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
                <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 32, fontWeight: 400, color: "var(--text-primary)", margin: 0 }}>Details</h2>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "1px", cursor: "pointer" }}>
                    Edit Details
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
                  <div>
                    <div style={{ color: "var(--text-muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Name</div>
                    <div style={{ color: "var(--text-primary)", fontSize: 20 }}>{form.name || "—"}</div>
                    <div style={{ height: 1, background: "var(--border)", marginTop: 12 }} />
                  </div>
                  <div>
                    <div style={{ color: "var(--text-muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Age & Gender</div>
                    <div style={{ color: "var(--text-primary)", fontSize: 20 }}>{form.age || "—"} {form.gender ? `(${form.gender})` : ""}</div>
                    <div style={{ height: 1, background: "var(--border)", marginTop: 12 }} />
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: 12 }}>Name</label>
                      <input
                        type="text"
                        style={{
                          width: "100%", background: "transparent", border: "none", borderBottom: "1px solid var(--text-primary)",
                          padding: "8px 0", fontSize: 18, color: "var(--text-primary)", outline: "none"
                        }}
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: 12 }}>Age</label>
                      <input
                        type="text"
                        style={{
                          width: "100%", background: "transparent", border: "none", borderBottom: "1px solid var(--text-primary)",
                          padding: "8px 0", fontSize: 18, color: "var(--text-primary)", outline: "none"
                        }}
                        placeholder="e.g. 28"
                        value={form.age}
                        onChange={(e) => setForm({ ...form, age: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
                    {form.name && (
                      <button type="button" onClick={() => setIsEditing(false)} className="btn-ghost" style={{ padding: "12px 24px" }}>
                        Cancel
                      </button>
                    )}
                    <button type="submit" className="btn-primary" style={{ padding: "12px 32px" }}>
                      Save
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 64 }}>
              {/* Core Goals */}
              <div>
                <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 32, fontWeight: 400, color: "var(--text-primary)", marginBottom: 16 }}>Core Goals</h2>
                <p style={{ color: "var(--text-muted)", fontSize: 15, marginBottom: 32 }}>Select the primary goals you want your AI to help you achieve.</p>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {goals.map((g) => (
                    <button
                      key={g}
                      onClick={() => toggleGoal(g)}
                      style={{
                        padding: "16px 24px", fontSize: 14, cursor: "pointer",
                        border: "1px solid var(--border)",
                        background: form.coreGoals.includes(g) ? "var(--bg-primary)" : "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        transition: "all 0.3s",
                        boxShadow: form.coreGoals.includes(g) ? "inset 0 0 0 1px var(--text-primary)" : "none",
                        display: "flex", alignItems: "center", gap: 12
                      }}
                    >
                      <div style={{ 
                        width: 16, height: 16, border: "1px solid var(--text-primary)", 
                        background: form.coreGoals.includes(g) ? "var(--text-primary)" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        {form.coreGoals.includes(g) && <span style={{ color: "var(--bg-primary)", fontSize: 10 }}>✓</span>}
                      </div>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Personality */}
              <div>
                <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 32, fontWeight: 400, color: "var(--text-primary)", marginBottom: 16 }}>AI Tone</h2>
                <p style={{ color: "var(--text-muted)", fontSize: 15, marginBottom: 32 }}>How would you like your AI guide to communicate with you?</p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {tones.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setForm(prev => ({ ...prev, aiTone: t.id }))}
                      style={{
                        padding: "24px 32px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 8,
                        border: "1px solid var(--border)",
                        background: form.aiTone === t.id ? "var(--bg-primary)" : "var(--bg-secondary)",
                        boxShadow: form.aiTone === t.id ? "inset 0 0 0 1px var(--text-primary)" : "none",
                        transition: "all 0.3s",
                      }}
                    >
                      <div style={{ fontSize: 18, color: "var(--text-primary)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        {t.label}
                        {form.aiTone === t.id && <Sun size={20} color="var(--accent-tertiary)" />}
                      </div>
                      <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>
                        {t.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Assessment History */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 64 }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 32, fontWeight: 400, color: "var(--text-primary)", marginBottom: 40 }}>Recent Check-ins</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 40, borderLeft: "1px solid var(--border)", paddingLeft: 40, marginLeft: 20 }}>
                {history.map((h, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: -46, top: 4, width: 12, height: 12, borderRadius: "50%", background: "var(--bg-primary)", border: "2px solid var(--text-primary)" }} />
                    <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", marginBottom: 12 }}>{h.date}</div>
                    <div style={{ fontSize: 20, color: "var(--text-primary)", marginBottom: 8 }}>{h.focus}</div>
                    <div style={{ fontSize: 15, color: "var(--text-muted)" }}>{h.status}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
