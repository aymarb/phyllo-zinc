"use client";

import type React from "react";
import { useState } from "react";
import { Trash2, Edit2, Plus, X, Mail } from "lucide-react";

interface WhitelistEntry {
  id: string;
  name: string;
  email: string;
  addedDate: string;
}

export function WhitelistManager() {
  const [entries, setEntries] = useState<WhitelistEntry[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@phylloZinc.com",
      addedDate: "January 1, 2025",
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@phylloZinc.com",
      addedDate: "January 5, 2025",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<WhitelistEntry>({
    id: "",
    name: "",
    email: "",
    addedDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  });

  const handleOpenModal = (entry?: WhitelistEntry) => {
    if (entry) {
      setFormData(entry);
      setEditingId(entry.id);
    } else {
      setFormData({
        id: Date.now().toString(),
        name: "",
        email: "",
        addedDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingId) {
      setEntries(entries.map((e) => (e.id === editingId ? formData : e)));
    } else {
      setEntries([...entries, formData]);
    }

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this whitelist entry?")) {
      setEntries(entries.filter((e) => e.id !== id));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-light">Whitelist Management</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium w-fit"
        >
          <Plus className="w-4 h-4" />
          Add Whitelist
        </button>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Added Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-border hover:bg-green-50/30 transition"
                >
                  <td className="px-6 py-4 text-sm font-medium">
                    {entry.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {entry.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {entry.addedDate}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(entry)}
                        className="p-2 hover:bg-green-100 rounded transition text-green-700"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="p-2 hover:bg-red-100 rounded transition text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium">{entry.name}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Mail className="w-3 h-3" />
                  {entry.email}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(entry)}
                  className="p-2 hover:bg-green-100 rounded transition text-green-700"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-2 hover:bg-red-100 rounded transition text-red-700"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Added: {entry.addedDate}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg max-w-md w-full">
            <div className="bg-green-700 text-white p-6 flex items-center justify-between border-b border-green-600 rounded-t-lg">
              <h3 className="text-xl font-semibold">
                {editingId ? "Edit Whitelist" : "Add to Whitelist"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-green-600 rounded transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Person's name"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="user@phylloZinc.com"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>
            </div>

            <div className="bg-green-50 border-t border-border p-6 flex gap-3 justify-end rounded-b-lg">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-border rounded-lg hover:bg-green-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium"
              >
                {editingId ? "Update Entry" : "Add Entry"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
