import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects – Zyra Builds",
  description:
    "Selected commercial spaces by Zyra Builds — hospitality interiors, office upgrades, and exhibition spaces across Saudi Arabia.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
