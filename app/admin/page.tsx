"use client";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AdminArticles } from "@/components/admin-articles";
import { WhitelistManager } from "@/components/whitelist-manager";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AdminPage() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  const isAdmin = session?.user?.emailVerified;
  if (isPending) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </main>
    );
  }

  if (!session || !isAdmin) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-green-700 transition"
          >
            <Leaf className="w-6 h-6 text-green-700" />
            <span className="font-semibold text-lg">Green Synthesis</span>
          </Link>
          <div className="flex gap-4 text-sm">
            <Link href="/" className="hover:text-green-700 transition">
              Home
            </Link>
            <Link href="/articles" className="hover:text-green-700 transition">
              Articles
            </Link>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-light mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage articles, accounts, and content for your research
              publication
            </p>
          </div>

          {/* Tab Navigation */}
          <AdminPageTabs />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <Leaf className="w-5 h-5 text-green-700" />
                Green Synthesis Research
              </div>
              <p className="text-sm text-muted-foreground">
                Advancing sustainable solutions for environmental challenges
                through innovative green chemistry.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-green-700 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles"
                    className="hover:text-green-700 transition"
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <a
                    href="/#contact"
                    className="hover:text-green-700 transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Contact</h4>
              <a
                href="mailto:research@greensynthesis.org"
                className="text-sm text-green-700 hover:underline"
              >
                research@greensynthesis.org
              </a>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Green Synthesis Research. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function AdminPageTabs() {
  const [activeTab, setActiveTab] = useState<"articles" | "accounts">(
    "articles",
  );

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-border">
        <button
          onClick={() => setActiveTab("articles")}
          className={`px-4 py-3 font-medium border-b-2 transition ${
            activeTab === "articles"
              ? "border-green-700 text-green-700"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Articles
        </button>
        <button
          onClick={() => setActiveTab("accounts")}
          className={`px-4 py-3 font-medium border-b-2 transition ${
            activeTab === "accounts"
              ? "border-green-700 text-green-700"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Accounts
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "articles" && <AdminArticles />}
      {activeTab === "accounts" && <WhitelistManager />}
    </div>
  );
}
