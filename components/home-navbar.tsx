"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // adjust path sesuai project-mu
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // hindari hydration mismatch

  const user = session?.user;
  const isAdmin = user?.emailVerified;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-green-700 flex items-center justify-center">
            <img
              src="/phyllozinc.png"
              alt="PhylloZinc logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-lg">PhylloZinc</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex gap-8 text-sm items-center">
          <a href="#background" className="hover:text-green-700 transition">
            Background
          </a>
          <a href="#method" className="hover:text-green-700 transition">
            Method
          </a>
          <a href="#benefits" className="hover:text-green-700 transition">
            Benefits
          </a>
          <a href="#contact" className="hover:text-green-700 transition">
            Contact
          </a>
          <a href="/virtual-lab" className="hover:text-green-700 transition">
            Virtual Lab
          </a>
          {/* Admin Dashboard */}
          {isAdmin && (
            <Link
              href="/admin"
              className="text-green-700 font-medium hover:text-green-800 transition"
            >
              Dashboard
            </Link>
          )}

          {/* Auth Button */}
          {session ? (
            <button
              onClick={handleSignOut}
              className="text-red-700 font-medium hover:text-green-800 transition"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth"
              className="text-green-700 font-medium hover:text-green-800 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
