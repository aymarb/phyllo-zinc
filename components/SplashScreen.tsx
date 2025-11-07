"use client";
import Image from 'next/image';

interface SplashScreenProps {
  isLoading: boolean;
}

/**
 * Komponen UI untuk Splash Screen.
 * Menggunakan transisi CSS untuk fade-out.
 */
export function SplashScreen({ isLoading }: SplashScreenProps) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-1000 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Logo dengan animasi pulse */}
      <div className="animate-pulse">
        <Image
          src="/phyllozinc.png" // Mengambil logo dari folder /public
          alt="PhylloZinc Logo"
          width={128} 
          height={128}
          priority // Memberitahu Next.js untuk memuat gambar ini lebih awal
        />
      </div>
    </div>
  );
}