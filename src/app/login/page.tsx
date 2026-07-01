"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sun } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      
      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem("user", JSON.stringify(data.user)); 
        sessionStorage.setItem("justLoggedIn", "true");
        window.dispatchEvent(new Event("authStateChange"));
        router.push("/dashboard");
      } else {
        const error = await res.json();
        alert(error.error || "Login failed");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      alert("Something went wrong. Please check the terminal for errors.");
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      
      {/* Left Art Panel */}
      <div style={{ 
        flex: "0 0 45%", 
        display: "none", 
        backgroundImage: "url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2500&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRight: "1px solid var(--border)",
        position: "relative"
      }} className="hidden-mobile desktop-panel-block">
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(45, 42, 38, 0.15)" }}></div>
        <div style={{ position: "absolute", top: 40, left: 40, display: "flex", alignItems: "center", gap: 12 }}>
          <Sun size={28} color="var(--bg-primary)" strokeWidth={1.5} />
          <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 24, color: "var(--bg-primary)", letterSpacing: "1px" }}>SoulSync</span>
        </div>
      </div>

      {/* Right Form Panel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "40px" }}>
        
        {/* Mobile Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 64 }} className="mobile-only-logo">
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <Sun size={28} color="var(--accent-primary)" strokeWidth={1.5} />
            <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 24, color: "var(--text-primary)", letterSpacing: "1px" }}>SoulSync</span>
          </Link>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 420 }}>
            
            <div style={{ marginBottom: 48 }}>
              <h1 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 48, fontWeight: 400, color: "var(--text-primary)", marginBottom: 12 }}>
                Welcome Back
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: 16 }}>Sign in to continue your healing journey.</p>
            </div>

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: 12 }}>Email</label>
                <input
                  type="email"
                  style={{
                    width: "100%", background: "transparent", border: "none", borderBottom: "1px solid var(--border)",
                    padding: "8px 0", fontSize: 16, color: "var(--text-primary)", outline: "none", transition: "border-color 0.3s"
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = "var(--text-primary)"}
                  onBlur={(e) => e.target.style.borderBottomColor = "var(--border)"}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: 12 }}>Password</label>
                <input
                  type="password"
                  style={{
                    width: "100%", background: "transparent", border: "none", borderBottom: "1px solid var(--border)",
                    padding: "8px 0", fontSize: 16, color: "var(--text-primary)", outline: "none", transition: "border-color 0.3s"
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = "var(--text-primary)"}
                  onBlur={(e) => e.target.style.borderBottomColor = "var(--border)"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: "100%", marginTop: 16, padding: "16px", fontSize: 14 }} 
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <div style={{ textAlign: "center", marginTop: 32, fontSize: 14, color: "var(--text-muted)" }}>
                Don't have an account?{" "}
                <Link href="/signup" style={{ color: "var(--text-primary)", fontWeight: 500, textDecoration: "none", borderBottom: "1px solid var(--text-primary)", paddingBottom: 2 }}>
                  Create one here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
