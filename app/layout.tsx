import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Info dashboard",
  icons: {
    icon: "/favicon.ico", // This is where you point to your custom favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Sidebar */}
        <TooltipProvider>
          <div className="flex h-screen bg-white text-white">
            <Sidebar />
            <main className="flex-1 overflow-auto max-h-screen">
              <div className="p-8">{children}</div>
            </main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
