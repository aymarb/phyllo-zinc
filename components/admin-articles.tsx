"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Trash2, Edit2, Plus, X, Upload } from "lucide-react";
import { v4 as uuidv4 } from "uuid"; // UUID for generating unique IDs

// Type definition for the Article fetched from the database
interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string; // Stored as URL/path
  date: string; // Stored as text/string
  author: string;
  category: string;
  readTime?: string;
  status?: string;
}

// Function to get the base URL, defaulting to localhost:3000
const getBaseUrl = () => process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Article>({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    category: "Research",
    readTime: "8 min read", // Default value
    status: "published", // Default value
  });

  // ----------------------------------------
  // DATA FETCHING (R - READ)
  // ----------------------------------------

  // Function to fetch all articles from the new API
  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${getBaseUrl()}/api/articles`, {
        cache: 'no-store' // Always get fresh data for the Admin panel
      });
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      } else {
        console.error("Failed to fetch articles:", res.statusText);
        // Fallback or error state handling
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch articles on initial component load
  useEffect(() => {
    fetchArticles();
  }, []);

  // ----------------------------------------
  // MODAL/FORM HANDLERS
  // ----------------------------------------

  const handleOpenModal = (article?: Article) => {
    if (article) {
      // Editing an existing article
      setFormData(article);
      setImagePreview(article.image);
      setEditingId(article.id);
    } else {
      // Creating a new article (reset form)
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
      setImagePreview("");
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setImagePreview("");
    // Clear the form data
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

  // ----------------------------------------
  // CUD LOGIC (CREATE, UPDATE, DELETE)
  // ----------------------------------------

  const handleSave = async () => {
    // Basic validation check (Zod will handle full validation on the backend)
    if (!formData.title || !formData.excerpt || !formData.author || !formData.content) {
      alert("Please fill in all required fields (Title, Excerpt, Content, Author).");
      return;
    }
    
    setIsLoading(true);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${getBaseUrl()}/api/articles/${editingId}` : `${getBaseUrl()}/api/articles`;
    
    // Prepare data, ensuring a new ID is generated for POST requests
    const dataToSend = {
      ...formData,
      // Only generate ID for POST if it's missing
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
        await fetchArticles(); // Re-fetch the list to update the table
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
        await fetchArticles(); // Re-fetch the list
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


  // NOTE: Image Upload logic remains client-side only (base64 or dummy path) 
  // as actual file storage is complex and outside the scope of this refactor.
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would upload the file to storage (e.g., S3 or Vercel Blob) 
      // and get a URL back. For this example, we save the dummy path/URL.
      const imageUrl = `/images/uploaded-temp-${Date.now()}.${file.name.split('.').pop()}`;
      setFormData((prev) => ({
        ...prev,
        // In a proper app, you'd use the final URL from the storage service here.
        image: imageUrl, 
      }));
      setImagePreview(URL.createObjectURL(file)); // Display local preview
    }
  };


  // ----------------------------------------
  // UI RENDERING
  // ----------------------------------------
  
  return (
    <div className="space-y-6">
      {/* Header */}
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

      {isLoading ? (
        <div className="text-center p-12 text-muted-foreground">Loading articles...</div>
      ) : articles.length === 0 ? (
        <div className="text-center p-12 border border-border rounded-lg bg-green-50/50">
            <h2 className="text-xl font-semibold text-muted-foreground">No articles found in database.</h2>
            <p className="text-sm text-muted-foreground mt-2">Click "New Article" to add your first post.</p>
        </div>
      ) : (
        /* Articles Table */
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

      {/* Modal - The modal structure remains largely the same, but now calls handleSave */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-green-700 text-white p-6 flex items-center justify-between border-b border-green-600">
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
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Full article content (supports HTML)"
                  rows={6}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700 font-mono text-sm"
                  required
                />
              </div>
              
              {/* Image Upload field: only handles paths/URLs, not actual file storage */}
              <div>
                <label className="block text-sm font-medium mb-2">Article Image</label>
                <div className="space-y-3">
                  {(imagePreview || formData.image) && (
                    <div className="relative w-full h-48 bg-green-50 rounded-lg border border-border overflow-hidden">
                      <img
                        src={imagePreview || formData.image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          setImagePreview("");
                          setFormData((prev) => ({ ...prev, image: "" }));
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center cursor-pointer hover:bg-green-50/50 transition"
                  >
                    <Upload className="w-8 h-8 text-green-700 mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">
                      Click to upload image
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Placeholder URL/Path only. Actual file storage not implemented.
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  {/* Manual Image URL Input */}
                  <input
                      type="text"
                      name="image"
                      value={formData.image || ''}
                      onChange={handleInputChange}
                      placeholder="Or enter image URL/path (e.g., /article-image.jpg)"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700 text-sm"
                    />
                </div>
              </div>

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
            <div className="sticky bottom-0 bg-green-50 border-t border-border p-6 flex gap-3 justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-border rounded-lg hover:bg-green-50 transition font-medium"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : editingId ? "Update Article" : "Create Article"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}