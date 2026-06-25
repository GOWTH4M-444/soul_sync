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
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    physicalAreas: [] as string[],
    painLevel: 3,
    energyLevel: 5,
    selectedEmotion: "",
    stressLevel: 5,
    sleepQuality: 5,
    spiritualState: "",
    freeText: "",
    duration: "",
  });

  const totalSteps = 4;

  const toggleArea = (area: string) => {
    setForm((prev) => ({
      ...prev,
      physicalAreas: prev.physicalAreas.includes(area)
        ? prev.physicalAreas.filter((a) => a !== area)
        : [...prev.physicalAreas, area],
    }));
  };

  const handleSubmit = () => {
    const summary = encodeURIComponent(
      `I need holistic health help. Here's my current state:\n\n` +
      `🔴 Physical: I'm experiencing issues in: ${form.physicalAreas.join(", ") || "no specific area"}\n` +
      `Pain level: ${form.painLevel}/10. Energy level: ${form.energyLevel}/10.\n\n` +
      `🧠 Mental/Emotional: I feel ${form.selectedEmotion || "mixed emotions"}.\n` +
      `Stress level: ${form.stressLevel}/10. Sleep quality: ${form.sleepQuality}/10.\n\n` +
      `✨ Spiritual: ${form.spiritualState || "not specified"}\n\n` +
      `In my own words: ${form.freeText || "Please help me understand what I'm going through."}\n` +
      `Duration of these feelings: ${form.duration || "some time"}.`
    );
    router.push(`/chat?prompt=${summary}`);
  };

  const SliderField = ({
    label, value, onChange, min = 1, max = 10,
    leftLabel, rightLabel, color = "var(--accent-primary)",
  }: {
    label: string; value: number; onChange: (v: number) => void;
    min?: number; max?: number; leftLabel: string; rightLabel: string; color?: string;
  }) => (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <label style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)" }}>{label}</label>
        <span
          style={{
            fontWeight: 700,
            fontSize: 18,
            color,
            minWidth: 28,
            textAlign: "center",
          }}
        >
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          accentColor: color,
          background: `linear-gradient(to right, ${color} ${((value - min) / (max - min)) * 100}%, rgba(74, 59, 50, 0.1) ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{leftLabel}</span>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{rightLabel}</span>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          paddingTop: 80,
          paddingBottom: 60,
          padding: "80px 24px 60px",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, color: "var(--accent-primary)" }}>
              <Sun size={48} strokeWidth={1.5} />
            </div>
            <h1
              className="section-title"
              style={{ fontSize: 32, marginBottom: 12 }}
            >
              Holistic Health Check
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: 15 }}>
              Answer honestly — this helps your AI companion understand your complete wellbeing
            </p>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              {["Physical", "Mental", "Spiritual", "Your Words"].map((s, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 12,
                    fontWeight: step > i ? 600 : 400,
                    color: step > i ? "var(--accent-primary)" : "var(--text-muted)",
                    textAlign: "center",
                    flex: 1,
                    transition: "color 0.3s",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
            <div style={{ height: 4, background: "rgba(74, 59, 50, 0.1)", borderRadius: 99, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${((step - 1) / (totalSteps - 1)) * 100}%`,
                  background: "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))",
                  borderRadius: 99,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>

          {/* Step panels */}
          <div className="glass" style={{ padding: "36px 32px" }}>
            {/* STEP 1: Physical */}
            {step === 1 && (
              <div className="animate-fade-up">
                <h2 style={{ fontWeight: 600, fontSize: 22, marginBottom: 8, color: "var(--accent-primary)" }}>
                  💪 Physical Health
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 28 }}>
                  Where in your body do you feel discomfort or issues?
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
                  {bodyAreas.map((area) => (
                    <button
                      key={area}
                      onClick={() => toggleArea(area)}
                      style={{
                        padding: "9px 16px",
                        borderRadius: 99,
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                        border: `1px solid ${form.physicalAreas.includes(area) ? "var(--accent-primary)" : "var(--border)"}`,
                        background: form.physicalAreas.includes(area)
                          ? "rgba(196,164,124,0.15)"
                          : "transparent",
                        color: form.physicalAreas.includes(area) ? "var(--accent-primary)" : "var(--text-muted)",
                        transition: "all 0.2s",
                        fontFamily: "var(--font-montserrat), sans-serif",
                      }}
                    >
                      {area}
                    </button>
                  ))}
                </div>

                <SliderField
                  label="Pain / Discomfort Level"
                  value={form.painLevel}
                  onChange={(v) => setForm({ ...form, painLevel: v })}
                  leftLabel="No pain"
                  rightLabel="Severe pain"
                  color="#d68c67"
                />
                <SliderField
                  label="Energy Level"
                  value={form.energyLevel}
                  onChange={(v) => setForm({ ...form, energyLevel: v })}
                  leftLabel="Exhausted"
                  rightLabel="Energetic"
                  color="#c4a47c"
                />

                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", display: "block", marginBottom: 10 }}>
                    How long have you had these symptoms?
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Today", "Few days", "1-2 weeks", "1 month", "Several months", "Over a year"].map((d) => (
                      <button
                        key={d}
                        onClick={() => setForm({ ...form, duration: d })}
                        style={{
                          padding: "8px 16px",
                          borderRadius: 99,
                          fontSize: 13,
                          cursor: "pointer",
                          border: `1px solid ${form.duration === d ? "var(--accent-primary)" : "var(--border)"}`,
                          background: form.duration === d ? "rgba(196,164,124,0.15)" : "transparent",
                          color: form.duration === d ? "var(--accent-primary)" : "var(--text-muted)",
                          transition: "all 0.2s",
                          fontFamily: "var(--font-montserrat), sans-serif",
                        }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Mental */}
            {step === 2 && (
              <div className="animate-fade-up">
                <h2 style={{ fontWeight: 600, fontSize: 22, marginBottom: 8, color: "var(--accent-secondary)" }}>
                  🧠 Mental & Emotional Health
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 28 }}>
                  Your emotional state matters. How are you really feeling?
                </p>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", display: "block", marginBottom: 14 }}>
                    Select your dominant emotion:
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {emotionOptions.map((e) => (
                      <button
                        key={e.label}
                        onClick={() => setForm({ ...form, selectedEmotion: e.label })}
                        style={{
                          padding: "10px 16px",
                          borderRadius: 12,
                          fontSize: 14,
                          cursor: "pointer",
                          border: `1px solid ${form.selectedEmotion === e.label ? "var(--accent-primary)" : "var(--border)"}`,
                          background: form.selectedEmotion === e.label ? "rgba(196,164,124,0.15)" : "rgba(255,255,255,0.4)",
                          color: form.selectedEmotion === e.label ? "var(--accent-primary)" : "var(--text-muted)",
                          transition: "all 0.2s",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 4,
                          fontFamily: "var(--font-montserrat), sans-serif",
                        }}
                      >
                        <span style={{ fontSize: 24 }}>{e.emoji}</span>
                        <span style={{ fontSize: 12, fontWeight: 500 }}>{e.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <SliderField
                  label="Stress Level"
                  value={form.stressLevel}
                  onChange={(v) => setForm({ ...form, stressLevel: v })}
                  leftLabel="Very calm"
                  rightLabel="Extremely stressed"
                  color="#d68c67"
                />
                <SliderField
                  label="Sleep Quality (last 7 days)"
                  value={form.sleepQuality}
                  onChange={(v) => setForm({ ...form, sleepQuality: v })}
                  leftLabel="Terrible sleep"
                  rightLabel="Excellent sleep"
                  color="#b08d65"
                />
              </div>
            )}

            {/* STEP 3: Spiritual */}
            {step === 3 && (
              <div className="animate-fade-up">
                <h2 style={{ fontWeight: 600, fontSize: 22, marginBottom: 8, color: "var(--accent-tertiary)" }}>
                  ✨ Spiritual & Soul Health
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 28 }}>
                  True health begins with the soul. How is your inner world?
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {spiritualSignals.map((s) => (
                    <button
                      key={s}
                      onClick={() => setForm({ ...form, spiritualState: s })}
                      style={{
                        padding: "14px 20px",
                        borderRadius: 12,
                        fontSize: 14,
                        cursor: "pointer",
                        border: `1px solid ${form.spiritualState === s ? "var(--accent-tertiary)" : "var(--border)"}`,
                        background: form.spiritualState === s ? "rgba(214,140,103,0.12)" : "rgba(255,255,255,0.4)",
                        color: form.spiritualState === s ? "var(--accent-tertiary)" : "var(--text-muted)",
                        textAlign: "left",
                        transition: "all 0.2s",
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {form.spiritualState === s ? "✓ " : "○ "}{s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Free text */}
            {step === 4 && (
              <div className="animate-fade-up">
                <h2 style={{ fontWeight: 600, fontSize: 22, marginBottom: 8, color: "var(--accent-primary)" }}>
                  💬 In Your Own Words
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 28 }}>
                  Describe anything that's been bothering you. The AI will read this with care and without judgment.
                </p>

                <textarea
                  className="input-glass"
                  rows={8}
                  placeholder="Tell me anything... What has been weighing on you? What pain are you carrying? What do you wish was different? There's no right or wrong answer here."
                  value={form.freeText}
                  onChange={(e) => setForm({ ...form, freeText: e.target.value })}
                  style={{ resize: "vertical", fontFamily: "var(--font-montserrat), sans-serif", lineHeight: 1.7 }}
                />

                {/* Summary preview */}
                <div
                  className="glass-dark"
                  style={{ padding: 20, marginTop: 24, borderRadius: 12 }}
                >
                  <div style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 600, marginBottom: 12 }}>
                    📋 Your Assessment Summary
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "var(--text-muted)" }}>
                    <div>💪 <strong style={{ color: "var(--text-primary)" }}>Physical:</strong> {form.physicalAreas.length > 0 ? form.physicalAreas.join(", ") : "Not specified"} · Pain: {form.painLevel}/10 · Energy: {form.energyLevel}/10</div>
                    <div>🧠 <strong style={{ color: "var(--text-primary)" }}>Mental:</strong> {form.selectedEmotion || "Not specified"} · Stress: {form.stressLevel}/10 · Sleep: {form.sleepQuality}/10</div>
                    <div>✨ <strong style={{ color: "var(--text-primary)" }}>Spiritual:</strong> {form.spiritualState || "Not specified"}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 36,
                gap: 12,
              }}
            >
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="btn-ghost"
                style={{ opacity: step === 1 ? 0.3 : 1 }}
              >
                ← Back
              </button>

              {step < totalSteps ? (
                <button onClick={() => setStep((s) => s + 1)} className="btn-primary">
                  Continue →
                </button>
              ) : (
                <button onClick={handleSubmit} className="btn-primary" style={{ padding: "12px 28px", display: "flex", alignItems: "center", gap: 8 }}>
                  <Sun size={16} /> Get My Holistic Care Plan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
