"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }} className="animate-float">🌿</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>
              Welcome Back
            </h1>
            <p style={{ color: "#64748b", fontSize: 15 }}>Sign in to continue your healing journey</p>
          </div>

          <div className="glass" style={{ padding: "36px 32px" }}>
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
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <button className="btn-primary" style={{ width: "100%", fontSize: 15, padding: "14px" }}>
              Sign In →
            </button>

            <div style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "#475569" }}>
              Don't have an account?{" "}
              <Link href="/signup" style={{ color: "#22c55e", fontWeight: 600, textDecoration: "none" }}>
                Sign up free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
