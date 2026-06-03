import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Built Clean — AI Fitness Coach";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div style={{ color: "#666", fontSize: 24, letterSpacing: "0.2em", marginBottom: 40 }}>
          BUILTCLEAN
        </div>
        <div style={{ color: "#fff", fontSize: 110, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }}>
          Fitness that keeps
        </div>
        <div style={{ color: "#666", fontSize: 110, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }}>
          you coming back.
        </div>
        <div style={{ color: "#888", fontSize: 32, marginTop: 60 }}>
          The AI coach built for consistency.
        </div>
      </div>
    ),
    size
  );
}
