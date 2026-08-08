import type { Metadata } from "next";
import "./globals.css";
import { ScrollManager } from "./scroll-manager";

export const metadata: Metadata = {
  title: "Stock Token Radar",
  description: "A source-backed directory for researching tokenized stock instruments on Robinhood Chain.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><ScrollManager />{children}</body>
    </html>
  );
}
