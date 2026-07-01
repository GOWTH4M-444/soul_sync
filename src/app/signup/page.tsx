"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sun } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      
      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem("user", JSON.stringify(data.user)); 
        sessionStorage.setItem("justLoggedIn", "true");
        window.dispatchEvent(new Event("authStateChange"));
        router.push("/profile");
      } else {
        const error = await res.json();
        alert(error.error || "Signup failed");
        setLoading(false);
      }
    } catch (err) {
      console.error("Signup fetch error:", err);
      alert("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      
      {/* Right Form Panel (Reversed for variation) */}
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
                Join SoulSync
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: 16 }}>Create an account to begin your holistic journey.</p>
            </div>

            <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: 12 }}>Full Name</label>
                <input
                  type="text"
                  style={{
                    width: "100%", background: "transparent", border: "none", borderBottom: "1px solid var(--border)",
                    padding: "8px 0", fontSize: 16, color: "var(--text-primary)", outline: "none", transition: "border-color 0.3s"
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = "var(--text-primary)"}
                  onBlur={(e) => e.target.style.borderBottomColor = "var(--border)"}
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

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
                {loading ? "Creating Account..." : "Sign Up"}
              </button>

              <div style={{ textAlign: "center", marginTop: 32, fontSize: 14, color: "var(--text-muted)" }}>
                Already have an account?{" "}
                <Link href="/login" style={{ color: "var(--text-primary)", fontWeight: 500, textDecoration: "none", borderBottom: "1px solid var(--text-primary)", paddingBottom: 2 }}>
                  Sign in here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Art Panel */}
      <div style={{ 
        flex: "0 0 45%", 
        display: "none", 
        backgroundImage: "url('https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=2500&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderLeft: "1px solid var(--border)",
        position: "relative"
      }} className="hidden-mobile desktop-panel-block">
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(45, 42, 38, 0.15)" }}></div>
        <div style={{ position: "absolute", top: 40, right: 40, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 24, color: "var(--bg-primary)", letterSpacing: "1px" }}>SoulSync</span>
          <Sun size={28} color="var(--bg-primary)" strokeWidth={1.5} />
        </div>
      </div>

    </div>
  );
}
