import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meteo React",
  description: "A simple weather app built with React and Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
