/**
 * Website content: Projects / portfolio for Zyra Builds
 * Edit this file to update the Projects section.
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Placeholder Project",
    description: "Project description will go here.",
  },
  // Add more projects as needed
];
