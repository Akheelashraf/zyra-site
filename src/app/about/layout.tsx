import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About – Zyra Builds",
  description:
    "Zyra Builds delivers structured commercial interiors for growing businesses. Built on clarity, execution discipline, and reliable delivery across Saudi Arabia.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
