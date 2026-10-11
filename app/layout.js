import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata = {
  title: "বাজার দর — আজকের দাম",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম ও দামের পরিবর্তন এক জায়গায়।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="light">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&text=%F0%9F%AB%98%F0%9F%AB%99%F0%9F%AB%9A&display=swap"
        />
      </head>
      <body
        className={`${hind.variable} flex min-h-screen flex-col bg-[#f1f5ef] text-gray-900`}
      >
        <Navbar />
        <PriceTicker />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}