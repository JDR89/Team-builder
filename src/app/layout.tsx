import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { LineSeparator } from "@/components/ui/LineSeparator";
import { PlayerProvider } from "@/context/PlayerContext";
import { NavigationBar } from "@/components/ui/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Armador de equipos",
  description: "Web app para armar equipos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="business">
      <body className={inter.className}>
        <PlayerProvider>
          <Navbar />

          <LineSeparator />
          {children}
          <NavigationBar/>
        </PlayerProvider>
      </body>
    </html>
  );
}
