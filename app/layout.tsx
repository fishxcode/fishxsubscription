import type { Metadata, Viewport } from "next";
import { ThemeScript } from "@/components/site/theme-script";
import { publicEnv } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.NEXT_PUBLIC_APP_URL),
  title: publicEnv.NEXT_PUBLIC_APP_NAME,
  description: "FishXCode AI subscription foundation",
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1f1713" },
    { media: "(prefers-color-scheme: light)", color: "#f8f1e7" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
