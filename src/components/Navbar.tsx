"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Sun } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/assess", label: "Health Check" },
  { href: "/chat", label: "AI Companion" },
];

const DAILY_SUGGESTIONS = [
  "Take a deep breath and relax your shoulders.",
  "Drink a glass of water to stay hydrated.",
  "Step outside for 5 minutes of fresh air.",
  "Write down one thing you're grateful for today.",
  "Stretch your legs and rest your eyes from the screen."
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{name: string} | null>(null);
  const [mounted, setMounted] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    // Pick a random suggestion on load so it changes occasionally
    setSuggestionIndex(Math.floor(Math.random() * DAILY_SUGGESTIONS.length));
    
    const checkAuth = () => {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {}
      } else {
        setUser(null);
      }
    };
    
    checkAuth();
    
    window.addEventListener("authStateChange", checkAuth);
    return () => window.removeEventListener("authStateChange", checkAuth);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("profileData");
    setUser(null);
    window.dispatchEvent(new Event("authStateChange"));
    router.push("/");
  };

  return (
    <>
      <div style={{ background: "var(--text-primary)", color: "var(--bg-primary)", padding: "8px 24px", fontSize: 13, textAlign: "center", fontWeight: 500, letterSpacing: "0.5px", position: "fixed", top: 0, left: 0, right: 0, zIndex: 101 }}>
        ✨ Tip of the day: {DAILY_SUGGESTIONS[suggestionIndex]}
      </div>

      <nav style={{ 
        position: "fixed", 
        top: 34, /* Below the suggestion banner */
        left: 0, 
        right: 0, 
        height: 64, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        padding: "0 32px", 
        zIndex: 100,
        background: "var(--bg-primary)",
        borderBottom: "1px solid var(--border)"
      }}>
        
        {/* LOGO */}
        <Link href="/" style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 8, 
          textDecoration: "none",
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          fontSize: 22,
          fontWeight: 400,
          color: "var(--text-primary)"
        }}>
          <Sun size={20} color="var(--text-primary)" />
          SoulSync
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`nav-link ${pathname === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          
          <div style={{ width: 1, height: 24, background: "var(--border)" }} />
          
          {mounted && user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
              <Link href="/profile" style={{ textDecoration: "none" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--text-primary)", color: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 500, fontSize: 14 }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </Link>
              <button 
                onClick={handleLogout}
                style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 12, textTransform: "uppercase", cursor: "pointer", letterSpacing: "0.5px" }}
              >
                Logout
              </button>
            </div>
          ) : mounted && pathname !== "/login" && pathname !== "/signup" ? (
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Link href="/login" className="nav-link">Log In</Link>
              <Link href="/signup" className="btn-primary" style={{ padding: "8px 24px", fontSize: 12, textDecoration: "none" }}>
                Begin
              </Link>
            </div>
          ) : null}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", display: "none" /* Handled by CSS */ }}
        >
          <div style={{ fontSize: 24 }}>☰</div>
        </button>
      </nav>
      
      {/* Spacer to prevent content from going under fixed navbar (34px banner + 64px nav) */}
      <div style={{ height: 98 }} />
    </>
  );
}
