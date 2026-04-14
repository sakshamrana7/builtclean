import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="w-full py-8 px-6"
      style={{ borderTop: "1px solid #1a1a1a", background: "#0a0a0a" }}
    >
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        {/* Logo */}
        <a href="/">
          <Image
            src="/builtclean_logo.jpg"
            alt="BUILTCLEAN"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-150"
          />
        </a>

        {/* Links */}
        <nav className="flex items-center gap-6">
          {[
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Contact", href: "mailto:builtcleanai@gmail.com" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[#444] hover:text-[#888] transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Instagram + Copyright */}
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/builtclean.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#444] hover:text-[#888] transition-colors duration-150"
            aria-label="Built Clean on Instagram"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.75"/>
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.75"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
          </a>
          <span style={{ color: "#333" }}>
            &copy; 2025 Built Clean. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
