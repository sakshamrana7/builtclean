import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://builtclean.app"),
  title: "Built Clean — AI Fitness Coach for Consistency",
  description:
    "Your AI coach that learns you, adapts to you, and shows up every day. Built for consistency, not perfection. Join the waitlist.",
  openGraph: {
    title: "Built Clean — AI Fitness Coach for Consistency",
    description:
      "Your AI coach that learns you, adapts to you, and shows up every day. Built for consistency, not perfection. Join the waitlist.",
    url: "https://builtclean.app",
    siteName: "Built Clean",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Built Clean — AI Fitness Coach",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Built Clean — AI Fitness Coach for Consistency",
    description:
      "Your AI coach that learns you, adapts to you, and shows up every day. Built for consistency, not perfection.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%230a0a0a'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-family='system-ui' font-size='16' font-weight='800' fill='white'>bc</text></svg>" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ background: "#0a0a0a", color: "#ffffff" }}>
        {children}
      </body>
    </html>
  );
}
