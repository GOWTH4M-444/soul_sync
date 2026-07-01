"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { Sun } from "lucide-react";

const bodyAreas = [
  "Head / Brain", "Eyes", "Ears", "Throat / Voice", "Chest / Heart",
  "Lungs / Breathing", "Stomach / Digestion", "Liver / Kidneys",
  "Back / Spine", "Arms / Hands", "Legs / Feet", "Skin", "Immune System",
];

const emotionOptions = [
  { emoji: "😭", label: "Deeply Sad" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😔", label: "Hopeless" },
  { emoji: "😶", label: "Numb / Empty" },
  { emoji: "😤", label: "Overwhelmed" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "🙂", label: "Okay" },
  { emoji: "😊", label: "Content" },
  { emoji: "😄", label: "Joyful" },
];

const spiritualSignals = [
  "I feel disconnected from my purpose",
  "I feel spiritually empty or lost",
  "I lack motivation and meaning",
  "I feel alone even around others",
  "I'm questioning my beliefs",
  "I feel at peace spiritually",
  "I feel guided and connected",
];

export default function AssessPage() {
  const router = useRouter();
  const [priority, setPriority] = useState<"Physical" | "Mental" | "Spiritual" | null>(null);
  const [form, setForm] = useState({
    physicalAreas: [] as string[],
    painLevel: 5,
    energyLevel: 5,
    duration: "",
    selectedEmotion: "",
    stressLevel: 5,
    sleepQuality: 5,
    spiritualState: "",
  });

  const toggleArea = (area: string) => {
    setForm((prev) => ({
      ...prev,
      physicalAreas: prev.physicalAreas.includes(area)
        ? prev.physicalAreas.filter((a) => a !== area)
        : [...prev.physicalAreas, area],
    }));
  };

  const handleSubmit = async () => {
    let summary = `I need holistic health help. My primary focus is ${priority} health.\n\n`;

    if (priority === "Physical") {
      summary += `🔴 Physical: I'm experiencing issues in: ${form.physicalAreas.join(", ") || "no specific area"}\n`;
      summary += `Pain level: ${form.painLevel}/10. Energy level: ${form.energyLevel}/10. Duration: ${form.duration || "unspecified"}.`;
    } else if (priority === "Mental") {
      summary += `🧠 Mental/Emotional: I feel ${form.selectedEmotion || "mixed emotions"}.\n`;
      summary += `Stress level: ${form.stressLevel}/10. Sleep quality: ${form.sleepQuality}/10.`;
    } else if (priority === "Spiritual") {
      summary += `✨ Spiritual: ${form.spiritualState || "not specified"}`;
    }

    try {
      await fetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary, answers: form }),
      });
    } catch {
      // Continue to chat even if save fails.
    }

    router.push(`/chat?prompt=${encodeURIComponent(summary)}`);
  };

  // Custom Editorial Slider
  const SliderField = ({
    label, value, onChange, min = 1, max = 10, leftLabel, rightLabel
  }: any) => {
    const percentage = ((value - min) / (max - min)) * 100;
    
    return (
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <label style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 28, color: "var(--text-primary)" }}>{label}</label>
          <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 24, color: "var(--text-primary)" }}>{value}</span>
        </div>
        
        {/* Custom Track */}
        <div style={{ position: "relative", height: 1, backgroundColor: "var(--border)", width: "100%", marginBottom: 16 }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: 1, backgroundColor: "var(--text-primary)", width: `${percentage}%`, transition: "width 0.2s" }} />
          
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            style={{ 
              position: "absolute", top: -10, left: 0, width: "100%", height: 20,
              opacity: 0, cursor: "pointer", zIndex: 2
            }}
          />
          
          {/* Custom Thumb */}
          <div style={{
            position: "absolute", top: -4, left: `calc(${percentage}% - 4px)`, width: 8, height: 8, borderRadius: "50%",
            backgroundColor: "var(--text-primary)", pointerEvents: "none", transition: "left 0.2s", zIndex: 1
          }} />
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)" }}>{leftLabel}</span>
          <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)" }}>{rightLabel}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          paddingTop: 140,
          paddingBottom: 100,
          backgroundColor: "var(--bg-primary)"
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }} className="container">
          
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <h1 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(48px, 6vw, 64px)", fontWeight: 400, color: "var(--text-primary)", marginBottom: 16, lineHeight: 1 }}>
              Check-in.
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
              Take a moment to reflect on your current state. We'll guide you from here.
            </p>
          </div>

          <div style={{ padding: "64px 0", borderTop: "1px solid var(--border)", borderBottom: priority ? "none" : "1px solid var(--border)" }}>
            
            {!priority ? (
              <div className="animate-fade-up">
                <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 32, fontWeight: 400, marginBottom: 48, color: "var(--text-primary)", textAlign: "center" }}>
                  Where should we focus today?
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <button onClick={() => setPriority("Physical")} style={{ padding: "40px", border: "1px solid var(--border)", background: "var(--bg-secondary)", cursor: "pointer", display: "flex", alignItems: "center", gap: 32, transition: "all 0.3s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 0 0 1px var(--border)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "none"}>
                    <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 32, color: "var(--text-primary)", fontStyle: "italic", opacity: 0.5 }}>01</div>
                    <div style={{ textAlign: "left", flex: 1 }}>
                      <div style={{ fontSize: 24, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: "var(--text-primary)", marginBottom: 8 }}>Physical Body</div>
                      <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>Pain, discomfort, illness, or energy levels</div>
                    </div>
                  </button>
                  <button onClick={() => setPriority("Mental")} style={{ padding: "40px", border: "1px solid var(--border)", background: "var(--bg-secondary)", cursor: "pointer", display: "flex", alignItems: "center", gap: 32, transition: "all 0.3s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 0 0 1px var(--border)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "none"}>
                    <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 32, color: "var(--text-primary)", fontStyle: "italic", opacity: 0.5 }}>02</div>
                    <div style={{ textAlign: "left", flex: 1 }}>
                      <div style={{ fontSize: 24, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: "var(--text-primary)", marginBottom: 8 }}>Mental & Emotional</div>
                      <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>Stress, anxiety, mood, or sleep quality</div>
                    </div>
                  </button>
                  <button onClick={() => setPriority("Spiritual")} style={{ padding: "40px", border: "1px solid var(--border)", background: "var(--bg-secondary)", cursor: "pointer", display: "flex", alignItems: "center", gap: 32, transition: "all 0.3s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 0 0 1px var(--border)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "none"}>
                    <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 32, color: "var(--text-primary)", fontStyle: "italic", opacity: 0.5 }}>03</div>
                    <div style={{ textAlign: "left", flex: 1 }}>
                      <div style={{ fontSize: 24, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: "var(--text-primary)", marginBottom: 8 }}>Spiritual & Soul</div>
                      <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>Purpose, meaning, connection, or beliefs</div>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-fade-up">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 64 }}>
                  <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 40, fontWeight: 400, color: "var(--text-primary)", margin: 0 }}>
                    {priority === "Physical" && "Physical Health"}
                    {priority === "Mental" && "Mental & Emotional"}
                    {priority === "Spiritual" && "Spiritual & Soul"}
                  </h2>
                  <button onClick={() => setPriority(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 11, textTransform: "uppercase", letterSpacing: "1px" }}>
                    Change Focus
                  </button>
                </div>

                {priority === "Physical" && (
                  <div>
                    <p style={{ color: "var(--text-muted)", fontSize: 14, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 24 }}>Where in your body do you feel discomfort?</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 80 }}>
                      {bodyAreas.map((area) => (
                        <button
                          key={area}
                          onClick={() => toggleArea(area)}
                          style={{
                            padding: "12px 24px", fontSize: 14, cursor: "pointer",
                            border: "1px solid var(--border)",
                            background: form.physicalAreas.includes(area) ? "var(--bg-secondary)" : "transparent",
                            color: "var(--text-primary)",
                            transition: "all 0.2s",
                            boxShadow: form.physicalAreas.includes(area) ? "inset 0 0 0 1px var(--text-primary)" : "none",
                          }}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                    <SliderField label="Discomfort Level" value={form.painLevel} onChange={(v: number) => setForm({ ...form, painLevel: v })} leftLabel="No pain" rightLabel="Severe pain" />
                    <SliderField label="Energy Level" value={form.energyLevel} onChange={(v: number) => setForm({ ...form, energyLevel: v })} leftLabel="Exhausted" rightLabel="Energetic" />
                    
                    <div style={{ marginBottom: 32, marginTop: 80 }}>
                      <p style={{ color: "var(--text-muted)", fontSize: 14, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 24 }}>How long have you had these symptoms?</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                        {["Today", "Few days", "1-2 weeks", "1 month", "Several months", "Over a year"].map((d) => (
                          <button
                            key={d}
                            onClick={() => setForm({ ...form, duration: d })}
                            style={{
                              padding: "12px 24px", fontSize: 14, cursor: "pointer",
                              border: "1px solid var(--border)",
                              background: form.duration === d ? "var(--bg-secondary)" : "transparent",
                              color: "var(--text-primary)",
                              transition: "all 0.2s",
                              boxShadow: form.duration === d ? "inset 0 0 0 1px var(--text-primary)" : "none",
                            }}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {priority === "Mental" && (
                  <div>
                    <p style={{ color: "var(--text-muted)", fontSize: 14, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 24 }}>Select your dominant emotion:</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 80 }}>
                      {emotionOptions.map((e) => (
                        <button
                          key={e.label}
                          onClick={() => setForm({ ...form, selectedEmotion: e.label })}
                          style={{
                            padding: "16px 24px", fontSize: 15, cursor: "pointer",
                            border: "1px solid var(--border)",
                            background: form.selectedEmotion === e.label ? "var(--bg-secondary)" : "transparent",
                            color: "var(--text-primary)",
                            display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s",
                            boxShadow: form.selectedEmotion === e.label ? "inset 0 0 0 1px var(--text-primary)" : "none",
                          }}
                        >
                          <span style={{ fontSize: 18 }}>{e.emoji}</span>
                          <span>{e.label}</span>
                        </button>
                      ))}
                    </div>
                    <SliderField label="Stress Level" value={form.stressLevel} onChange={(v: number) => setForm({ ...form, stressLevel: v })} leftLabel="Very calm" rightLabel="Extremely stressed" />
                    <SliderField label="Sleep Quality (Last 7 Days)" value={form.sleepQuality} onChange={(v: number) => setForm({ ...form, sleepQuality: v })} leftLabel="Terrible sleep" rightLabel="Excellent sleep" />
                  </div>
                )}

                {priority === "Spiritual" && (
                  <div>
                    <p style={{ color: "var(--text-muted)", fontSize: 14, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 24 }}>How is your inner world?</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {spiritualSignals.map((s) => (
                        <button
                          key={s}
                          onClick={() => setForm({ ...form, spiritualState: s })}
                          style={{
                            padding: "24px 32px", fontSize: 16, cursor: "pointer", textAlign: "left",
                            border: "1px solid var(--border)",
                            background: form.spiritualState === s ? "var(--bg-secondary)" : "transparent",
                            color: "var(--text-primary)",
                            transition: "all 0.2s",
                            boxShadow: form.spiritualState === s ? "inset 0 0 0 1px var(--text-primary)" : "none",
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ marginTop: 80, paddingTop: 48, borderTop: "1px solid var(--border)", textAlign: "center" }}>
                  <button onClick={handleSubmit} className="btn-primary" style={{ padding: "16px 64px", fontSize: 14 }}>
                    Submit Check-in & Talk to AI
                  </button>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 24, fontStyle: "italic" }}>
                    Your answers will be securely transferred to your AI guide.
                  </p>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}
