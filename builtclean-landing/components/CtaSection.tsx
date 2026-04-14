import WaitlistForm from "./WaitlistForm";

export default function CtaSection() {
  return (
    <section
      className="py-20 md:py-28 px-6 flex flex-col items-center text-center"
      style={{ borderTop: "1px solid #1a1a1a", background: "#0a0a0a" }}
    >
      <div className="w-full max-w-[600px] flex flex-col items-center gap-6">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Ready to build<br /> something clean?
        </h2>
        <p className="text-sm sm:text-base" style={{ color: "#666" }}>
          Join the waitlist. Be first. It&apos;s free.
        </p>
        <div className="w-full max-w-md">
          <WaitlistForm buttonText="Claim your spot" />
        </div>
      </div>
    </section>
  );
}
