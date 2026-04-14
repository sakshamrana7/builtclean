import WaitlistForm from "./WaitlistForm";

export default function Hero() {
  return (
    <section
      id="waitlist"
      className="flex flex-col items-center text-center px-6 py-24 md:py-32 lg:py-40"
      style={{ background: "#0a0a0a" }}
    >
      <div className="w-full max-w-[860px] flex flex-col items-center gap-8">
        {/* Early access badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-[#999] border border-[#2a2a2a]"
          style={{ background: "#111" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
            aria-hidden="true"
          />
          Now accepting early access
        </div>

        {/* H1 */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          <span className="text-white">Fitness that keeps</span>
          <br />
          <span style={{ color: "#888" }}>you coming back.</span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: "#666" }}>
          BUILTCLEAN is an AI coach built around your life, not an ideal version of it.
          It adapts your plan daily, nudges you when it counts, and measures progress in
          habits, not just PRs.
        </p>

        {/* Waitlist form */}
        <div className="w-full max-w-md">
          <WaitlistForm buttonText="Get early access" />
        </div>

        {/* Social proof */}
        <p className="text-xs" style={{ color: "#444" }}>
          This is where consistency starts.{" "}
          <span style={{ color: "#555" }}>Free forever for early members.</span>
        </p>
      </div>
    </section>
  );
}
