"use client";
import { useEffect, useState } from "react";
import { Sun } from "lucide-react";

const QUOTES = [
  "Healing is a matter of time, but it is sometimes also a matter of opportunity.",
  "The body heals with play, the mind heals with laughter, and the spirit heals with joy.",
  "A quiet mind is all you need. All else will happen rightly.",
  "Health is a state of complete harmony of the body, mind and spirit.",
  "Rest when you're weary. Refresh and renew yourself."
];

export default function Preloader() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<"logo" | "quote">("logo");
  const [quote, setQuote] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only show once per session
    const hasSeen = sessionStorage.getItem("preloader_shown");
    if (hasSeen) {
      setShow(false);
      return;
    }
    
    setShow(true);
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    sessionStorage.setItem("preloader_shown", "true");

    // Sequence: 0-1.5s Logo -> 1.5-3.5s Quote -> 3.5s Fade Out
    const stepTimer = setTimeout(() => {
      setStep("quote");
    }, 1500);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShow(false), 800);
    }, 3500);

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--bg-primary)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 32px",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.8s ease-in-out",
        pointerEvents: "none",
      }}
    >
      <div style={{ 
        position: "absolute", 
        inset: 0, 
        backgroundImage: "url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2500&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "grayscale(100%) contrast(1.1)",
        opacity: 0.3
      }}></div>
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(242, 239, 233, 0.75)" }}></div>
      
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {step === "logo" ? (
          <div className="animate-fade-up" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <Sun size={48} color="var(--accent-tertiary)" strokeWidth={1.5} />
            <h1 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 42, color: "var(--text-primary)", fontWeight: 400, margin: 0 }}>
              SoulSync
            </h1>
          </div>
        ) : (
          <div 
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 36px)",
              color: "var(--text-primary)",
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.4,
              animation: "fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            }}
          >
            "{quote}"
          </div>
        )}
      </div>
    </div>
  );
}
