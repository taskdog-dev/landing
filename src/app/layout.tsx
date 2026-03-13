import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🐕 TaskDog: Give it a task. Get a PR.",
  description:
    "TaskDog is an autonomous AI engineer that turns backlog tasks into pull requests. Install the GitHub App and watch your backlog start moving.",
  openGraph: {
    title: "🐕TaskDog — Give it a task. Get a PR.",
    description:
      "🐕TaskDog is an autonomous AI engineer that turns backlog tasks into pull requests. Install the GitHub App and watch your backlog start moving.",
    url: "https://taskdog.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🐕TaskDog — Give it a task. Get a PR.",
    description:
      "TaskDog is an autonomous AI engineer that turns backlog tasks into pull requests. Install the GitHub App and watch your backlog start moving.",
  },
  alternates: {
    canonical: "https://taskdog.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "TaskDog",
              url: "https://taskdog.dev",
              description:
                "Autonomous AI engineer that turns backlog tasks into pull requests.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
