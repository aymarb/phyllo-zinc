"use client";

import { useState, useEffect } from "react";
import { SplashScreen } from "@/components/SplashScreen";

/**
 * Komponen ini mengelola state 'loading' untuk splash screen
 * dan membungkus seluruh aplikasi.
 */
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Timer untuk menyembunyikan splash screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // ubah durasi

    return () => clearTimeout(timer); // Bersihkan timer
  }, []);

  return (
    <>
      <SplashScreen isLoading={isLoading} />
      {children}
    </>
  );
}
