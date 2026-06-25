"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }} className="animate-float">🌟</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>
              Start Your Journey
            </h1>
            <p style={{ color: "#64748b", fontSize: 15 }}>Create your free holistic health account</p>
          </div>

          <div className="glass" style={{ padding: "36px 32px" }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 8 }}>Your Name</label>
              <input
                type="text"
                className="input-glass"
                placeholder="What should we call you?"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 8 }}>Email</label>
              <input
                type="email"
                className="input-glass"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 8 }}>Password</label>
              <input
                type="password"
                className="input-glass"
                placeholder="Create a strong password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button className="btn-primary" style={{ width: "100%", fontSize: 15, padding: "14px" }}>
              🌿 Create Account — It's Free
            </button>

            <p style={{ fontSize: 11, color: "#334155", textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
              By signing up you agree to our Terms of Service.<br />
              Your data is private and never sold.
            </p>

            <div style={{ textAlign: "center", marginTop: 16, fontSize: 14, color: "#475569" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#22c55e", fontWeight: 600, textDecoration: "none" }}>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
