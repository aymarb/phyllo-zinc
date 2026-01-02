"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Trash2, Edit2, Plus, X, Upload, Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="w-full h-48 bg-green-50/50 rounded-lg animate-pulse">Loading editor...</div>,
});

// --- 1. DEFINE CLIENT-SIDE LIMITS (must match server) ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];
// Create a string for the 'accept' prop
const ACCEPTED_FILE_TYPES = ALLOWED_MIME_TYPES.join(',');


// Type definition for the Article
interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime?: string;
  status?: string;
}

// Function to get the base URL - empty for same-origin requests
const getBaseUrl = () => "";

// Editor toolbar modules
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};

export function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Article>({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    category: "Research",
    readTime: "8 min read",
    status: "published",
  });

  // DATA FETCHING (unchanged)
  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${getBaseUrl()}/api/articles`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      } else {
        console.error("Failed to fetch articles:", res.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  // MODAL/FORM HANDLERS (unchanged)
  const handleOpenModal = (article?: Article) => {
    if (article) {
      setFormData(article);
      setEditingId(article.id);
    } else {
      setFormData({
        id: "",
        title: "",
        excerpt: "",
        content: "",
        image: "",
        date: new Date().toISOString().split("T")[0],
        author: "",
        category: "Research",
        readTime: "8 min read",
        status: "published",
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
        id: "", title: "", excerpt: "", content: "", image: "", date: new Date().toISOString().split("T")[0], author: "", category: "Research", readTime: "8 min read", status: "published",
    });
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  };

  // --- UPDATED IMAGE UPLOAD HANDLER ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Always clear file input
    }
    if (!file) return;

    // --- 2. CLIENT-SIDE VALIDATION ---
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      alert(`Invalid file type. Please upload one of: ${ALLOWED_MIME_TYPES.join(', ')}`);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert(`File is too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
      return;
    }

    setIsUploading(true);
    try {
      // We pass the filename to the API route
      const res = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        headers: {
          'Content-Type': file.type, // Send correct content type
          'Content-Length': file.size.toString(), // Send file size
        },
        body: file,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to upload file.');
      }
      
      // Set the new public Supabase URL to the form
      setFormData((prev) => ({
        ...prev,
        image: data.url,
      }));

    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error uploading image: ${errorMessage}`);
    } finally {
      setIsUploading(false);
    }
  };

  // CUD LOGIC (unchanged)
  const handleSave = async () => {
    if (!formData.title || !formData.excerpt || !formData.author || !formData.content) {
      alert("Please fill in all required fields (Title, Excerpt, Content, Author).");
      return;
    }
    
    setIsLoading(true);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${getBaseUrl()}/api/articles/${editingId}` : `${getBaseUrl()}/api/articles`;
    
    const dataToSend = {
      ...formData,
      id: editingId ? editingId : uuidv4(),
    };

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        alert(`Article ${editingId ? "updated" : "created"} successfully!`);
        await fetchArticles();
        handleCloseModal();
      } else {
        const errorData = await res.json();
        alert(`Failed to save article: ${errorData.message || res.statusText}`);
      }
    } catch (error) {
      alert("Network error: Could not connect to the API.");
      console.error("Save error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article? This cannot be undone.")) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${getBaseUrl()}/api/articles/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Article deleted successfully!");
        await fetchArticles();
      } else {
        const errorData = await res.json();
        alert(`Failed to delete article: ${errorData.message || res.statusText}`);
      }
    } catch (error) {
      alert("Network error: Could not connect to the API.");
      console.error("Delete error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // UI RENDERING
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-light">Manage Articles</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4" />
          New Article
        </button>
      </div>

      {isLoading && articles.length === 0 ? (
        <div className="text-center p-12 text-muted-foreground">Loading articles...</div>
      ) : articles.length === 0 ? (
        <div className="text-center p-12 border border-border rounded-lg bg-green-50/50">
            <h2 className="text-xl font-semibold text-muted-foreground">No articles found in database.</h2>
            <p className="text-sm text-muted-foreground mt-2">Click "New Article" to add your first post.</p>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-green-50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Author</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b border-border hover:bg-green-50/30 transition"
                  >
                    <td className="px-6 py-4 text-sm font-medium line-clamp-1">{article.title}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{article.author}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{article.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenModal(article)}
                          className="p-2 hover:bg-green-100 rounded transition text-green-700"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
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
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-green-700 text-white p-6 flex items-center justify-between border-b border-green-600 z-10">
              <h3 className="text-xl font-semibold">
                {editingId ? "Edit Article" : "Create New Article"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-green-600 rounded transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Article title"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief summary of the article"
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content *</label>
                {isModalOpen && (
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={handleContentChange}
                    placeholder="Full article content..."
                    modules={quillModules}
                  />
                )}
              </div>
              
              {/* --- 3. UPDATED IMAGE UPLOAD FIELD --- */}
              <div>
                <label className="block text-sm font-medium mb-2">Article Image</label>
                <div className="space-y-3">
                  {/* Image preview */}
                  {formData.image && !isUploading && (
                    <div className="relative w-full h-48 bg-green-50 rounded-lg border border-border overflow-hidden">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, image: "" }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Uploading State */}
                  {isUploading && (
                    <div className="w-full h-48 bg-green-50/50 rounded-lg border border-border flex flex-col items-center justify-center">
                      <Loader2 className="w-8 h-8 text-green-700 animate-spin" />
                      <p className="text-sm text-muted-foreground mt-2">Uploading image...</p>
                    </div>
                  )}

                  {/* Upload Button */}
                  {!formData.image && !isUploading && (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center cursor-pointer hover:bg-green-50/50 transition"
                    >
                      <Upload className="w-8 h-8 text-green-700 mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">
                        Click to upload image
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Max 5MB. (JPG, PNG, WEBP, GIF)
                      </p>
                    </div>
                  )}

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={ACCEPTED_FILE_TYPES} // Use the variable
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  
                  {/* URL Display (optional) */}
                  {formData.image && !isUploading && (
                    <input
                        type="text"
                        value={formData.image}
                        readOnly
                        placeholder="Image URL"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background/50 text-muted-foreground focus:outline-none text-sm"
                      />
                  )}
                </div>
              </div>

              {/* Other form fields... */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Author *</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Author name"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700"
                  >
                    <option>Research</option>
                    <option>Agriculture</option>
                    <option>Botany</option>
                    <option>Methods</option>
                    <option>Sustainability</option>
                    <option>Nutrition</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Read Time</label>
                    <input
                      type="text"
                      name="readTime"
                      value={formData.readTime || ''}
                      onChange={handleInputChange}
                      placeholder="e.g., 8 min read"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-green-50 border-t border-border p-6 flex gap-3 justify-end z-10">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-border rounded-lg hover:bg-green-50 transition font-medium"
                disabled={isLoading || isUploading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium"
                disabled={isLoading || isUploading}
              >
                {isLoading ? "Saving..." : isUploading ? "Uploading..." : editingId ? "Update Article" : "Create Article"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}