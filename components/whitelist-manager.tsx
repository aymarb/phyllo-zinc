"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus, X, Mail } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

// Type for data fetched from DB
interface WhitelistEntry {
  id: string;
  email: string;
  emailVerified: boolean;
}

export function WhitelistManager() {
  const [entries, setEntries] = useState<WhitelistEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  const currentUserEmail = session?.user.email;
  useEffect(() => {
    const fetchWhitelist = async () => {
      try {
        const res = await fetch("/api/whitelist");
        const data = await res.json();
        const filtered = data.filter(
          (entry: any) => entry.email !== currentUserEmail,
        );
        setEntries(filtered);
      } catch (err) {
        console.error("Failed to fetch whitelist:", err);
      }
    };
    fetchWhitelist();
  }, []);

  const handleOpenModal = () => {
    setEmailInput("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddWhitelist = async () => {
    if (!emailInput) {
      alert("Please enter an email address");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/whitelist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput }),
      });
      if (!res.ok) throw new Error("Failed to add whitelist");
      const newEntry = await res.json();
      setEntries((prev) => [...prev, newEntry]);
      handleCloseModal();
    } catch (err) {
      console.error(err);
      alert("Failed to add whitelist entry.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/whitelist/${id}`, { method: "DELETE" });
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to remove whitelist entry.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-light">Manage Administrators</h2>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium w-fit"
        >
          <Plus className="w-4 h-4" />
          Add Email
        </button>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-border hover:bg-green-50/30 transition"
                >
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {entry.email}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 hover:bg-red-100 rounded transition text-red-700"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="text-center py-6 text-muted-foreground text-sm"
                  >
                    No whitelisted emails yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden grid gap-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="border border-border rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {entry.email}
              </div>
              <button
                onClick={() => handleDelete(entry.id)}
                className="p-2 hover:bg-red-100 rounded transition text-red-700"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            No whitelisted emails yet.
          </p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg max-w-md w-full">
            {/* Header */}
            <div className="bg-green-700 text-white p-6 flex items-center justify-between border-b border-green-600 rounded-t-lg">
              <h3 className="text-xl font-semibold">Add Whitelist Email</h3>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-green-600 rounded transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="user@phylloZinc.com"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="bg-green-50 border-t border-border p-6 flex gap-3 justify-end rounded-b-lg">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-border rounded-lg hover:bg-green-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWhitelist}
                disabled={isLoading}
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium disabled:opacity-60"
              >
                {isLoading ? "Adding..." : "Add Email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
