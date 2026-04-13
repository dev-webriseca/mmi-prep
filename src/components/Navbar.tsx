"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="navbar-brand">
            <div className="navbar-brand-icon">🩺</div>
            <span>
              Maryam&apos;s <span style={{ color: "var(--accent-primary-light)" }}>MMI Prep</span>
            </span>
          </div>
        </Link>
        <ul className="navbar-links">
          <li>
            <Link
              href="/"
              className={`navbar-link ${pathname === "/" ? "active" : ""}`}
            >
              Practice
            </Link>
          </li>
          <li>
            <Link
              href="/random"
              className={`navbar-link ${pathname === "/random" ? "active" : ""}`}
            >
              🎲 Random
            </Link>
          </li>
          <li>
            <Link
              href="/tips"
              className={`navbar-link ${pathname === "/tips" ? "active" : ""}`}
            >
              Tips &amp; Strategy
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
