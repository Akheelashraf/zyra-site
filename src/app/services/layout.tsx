import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services – Zyra Builds",
  description:
    "Commercial fit-out, restaurant and office interiors, renovation, and exhibition stand design. Structured execution across Saudi Arabia.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
