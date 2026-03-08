import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact – Zyra Builds",
  description:
    "Get in touch with Zyra Builds. Discuss your commercial fit-out or interior project.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
