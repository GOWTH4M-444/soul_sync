"use client";
import Link from "next/link";
import { useState } from "react";
import { Sun } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/assess", label: "Health Check" },
  { href: "/chat", label: "AI Companion" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 24px",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border-light)",
        background: "rgba(253, 252, 251, 0.85)", // Light glass background
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div
            className="animate-pulse-glow"
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <Sun size={20} strokeWidth={2.5} />
          </div>
          <span
            className="text-gradient-accent"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            SoulSync
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden-mobile">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link" style={{ textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/login" className="btn-ghost" style={{ fontSize: 14, padding: "9px 20px", textDecoration: "none" }}>
            Sign In
          </Link>
          <Link href="/signup" className="btn-primary" style={{ fontSize: 14, padding: "9px 20px", textDecoration: "none" }}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
