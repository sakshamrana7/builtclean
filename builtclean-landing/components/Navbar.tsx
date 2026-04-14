"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "#0a0a0a", borderBottom: "1px solid #1a1a1a" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <Image
              src="/builtclean_logo.jpg"
              alt="BUILTCLEAN"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#666] hover:text-white transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#waitlist"
              className="h-9 px-5 rounded-full bg-white text-black text-sm font-semibold hover:bg-[#e5e5e5] transition-colors duration-150 flex items-center"
            >
              Join waitlist
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 text-white"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className="block w-5 h-px bg-white transition-all duration-150"
              style={menuOpen ? { transform: "translateY(6px) rotate(45deg)" } : {}}
            />
            <span
              className="block w-5 h-px bg-white transition-all duration-150"
              style={menuOpen ? { opacity: 0 } : {}}
            />
            <span
              className="block w-5 h-px bg-white transition-all duration-150"
              style={menuOpen ? { transform: "translateY(-6px) rotate(-45deg)" } : {}}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden overflow-hidden transition-all duration-200"
        style={{
          maxHeight: menuOpen ? "300px" : "0",
          borderBottom: menuOpen ? "1px solid #1a1a1a" : "none",
        }}
      >
        <nav className="px-6 pb-5 pt-2 flex flex-col gap-4" style={{ background: "#0a0a0a" }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-[#666] hover:text-white transition-colors duration-150 py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setMenuOpen(false)}
            className="mt-1 h-10 px-5 rounded-full bg-white text-black text-sm font-semibold hover:bg-[#e5e5e5] transition-colors duration-150 flex items-center justify-center w-full"
          >
            Join waitlist
          </a>
        </nav>
      </div>
    </header>
  );
}
