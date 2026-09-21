import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { CartProvider } from "@/hooks/useCart";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { StickyCartBar } from "@/components/layout/StickyCartBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RUNA - Campus Marketplace",
  description: "Food, groceries, printing & campus services at LASUSTECH. Student-powered delivery.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "RUNA" },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0C231D" },
    { media: "(prefers-color-scheme: dark)", color: "#0C231D" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#0C231D]">
        <CartProvider>
          <Header />
          <main className="flex-1 mx-auto w-full max-w-[720px] px-4 pb-28 pt-4">{children}</main>
          <StickyCartBar />
          <BottomNav />
        </CartProvider>
        <Toaster position="top-center" richColors closeButton toastOptions={{ style: { borderRadius: "12px", fontFamily: "var(--font-inter)" } }} />
      </body>
    </html>
  );
}
