import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Race Atlas | Find Your Next Race",
  description: "Discover upcoming marathons, half marathons, 10Ks, 5Ks, trail races and more around the world.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
