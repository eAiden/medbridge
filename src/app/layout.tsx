import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "MedBridge — Healthcare Financing Navigator",
  description:
    "Find government medical assistance programs, generate guarantee letters, and crowdfund hospital bills — all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${atkinson.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50 font-[family-name:var(--font-atkinson)]">
        <main className="flex-1 pb-20">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
