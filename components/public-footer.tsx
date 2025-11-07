import React from "react";
import Link from "next/link";
import { Leaf, Instagram, Facebook, Youtube } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="py-12 px-6 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-6 gap-8 mb-8">
          
          {/* Kolom 1: span 2 dari 6 */}
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2 font-semibold">
              <img
                src="/phyllozinc.png"
                alt="PhylloZinc Logo"
                className="w-8 h-8 rounded-full object-cover"
              />

              <span>PhylloZinc Research</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Advancing sustainable solutions for environmental challenges
              through innovative green chemistry.
            </p>
          </div>

          {/* Kolom 2: Tetap (span 1 dari 6) */}
          <div className="space-y-2">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <a
                  href="/#background"
                  className="hover:text-green-700 transition"
                >
                  Background
                </a>
              </li>
              <li>
                <a href="/#method" className="hover:text-green-700 transition">
                  Methodology
                </a>
              </li>
              <li>
                <a
                  href="/#benefits"
                  className="hover:text-green-700 transition"
                >
                  Benefits
                </a>
              </li>
              <li>
                <Link
                  href="/virtual-lab"
                  className="hover:text-green-700 transition"
                >
                  Virtual Lab
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Dibuat lebih lebar (span 2 dari 6) untuk logo */}
          <div className="space-y-2 md:col-span-2 h-full flex items-center"> 
            <img
              src="/Logo.png"
              alt="Logo"
              className="max-h-16 max-w-full object-contain" 
            />
          </div>

          {/* Kolom 4: Tetap (span 1 dari 6) */}
          <div className="space-y-2">
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/pkmreugm_phyllozinc/"
                className="w-10 h-10 bg-green-50 border border-border rounded-lg flex items-center justify-center hover:bg-green-100 transition"
                title="Instagram"
              >
                <Instagram className="w-5 h-5 text-green-700" />
              </a>
              <a
                href="https://www.tiktok.com/@pkmreugm_phyllozinc?is_from_webapp=1&sender_device=pc"
                className="w-10 h-10 bg-green-50 border border-border rounded-lg flex items-center justify-center hover:bg-green-100 transition"
                title="TikTok"
              >
                <span className="text-green-700 font-bold">TK</span>
              </a>
              <a
                href="https://www.youtube.com/@pkmreugm_phyllozinc"
                className="w-10 h-10 bg-green-50 border border-border rounded-lg flex items-center justify-center hover:bg-green-100 transition"
                title="YouTube"
              >
                <Youtube className="w-5 h-5 text-green-700" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61578299128790&sk=about"
                className="w-10 h-10 bg-green-50 border border-border rounded-lg flex items-center justify-center hover:bg-green-100 transition"
                title="Facebook"
              >
                <Facebook className="w-5 h-5 text-green-700" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 PhylloZinc Research. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}