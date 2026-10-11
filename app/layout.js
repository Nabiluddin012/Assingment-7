import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "বাজার দর — আজকের দাম",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম ও দামের পরিবর্তন এক জায়গায়।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="light">
    <body
    className={`${hind.className} flex min-h-screen flex-col bg-base-100 text-base-content`}>
    <Navbar />
    <PriceTicker />
    <div className="flex-1">{children}</div>
    <Footer />
    </body>
    </html>
  );
}