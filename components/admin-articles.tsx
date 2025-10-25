"use client"

import type React from "react"

import { useState } from "react"
import { Trash2, Edit2, Plus, X } from "lucide-react"

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  category: string
}

export function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: "1",
      title: "Green Synthesis Breakthrough: Sustainable ZnO Nanoparticle Production",
      excerpt: "Our latest research demonstrates a novel approach to synthesizing zinc oxide nanoparticles...",
      content: "Full article content here...",
      image: "/article-green-synthesis.jpg",
      date: "October 15, 2025",
      author: "Dr. Sarah Chen",
      category: "Research",
    },
    {
      id: "2",
      title: "Methane Mitigation in Livestock: The Role of Nanoparticles",
      excerpt: "Methane emissions from ruminant livestock are a major contributor to climate change...",
      content: "Full article content here...",
      image: "/article-methane-mitigation.jpg",
      date: "September 28, 2025",
      author: "Prof. James Mitchell",
      category: "Agriculture",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Article>({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    category: "Research",
  })

  const handleOpenModal = (article?: Article) => {
    if (article) {
      setFormData(article)
      setEditingId(article.id)
    } else {
      setFormData({
        id: Date.now().toString(),
        title: "",
        excerpt: "",
        content: "",
        image: "",
        date: new Date().toISOString().split("T")[0],
        author: "",
        category: "Research",
      })
      setEditingId(null)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleSave = () => {
    if (!formData.title || !formData.excerpt || !formData.author) {
      alert("Please fill in all required fields")
      return
    }

    if (editingId) {
      setArticles(articles.map((a) => (a.id === editingId ? formData : a)))
    } else {
      setArticles([...articles, formData])
    }

    handleCloseModal()
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setArticles(articles.filter((a) => a.id !== id))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-light">Manage Articles</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium"
        >
          <Plus className="w-4 h-4" />
          New Article
        </button>
      </div>

      {/* Articles Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Author</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-border hover:bg-green-50/30 transition">
                  <td className="px-6 py-4 text-sm font-medium line-clamp-1">{article.title}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{article.author}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{article.date}</td>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-green-700 text-white p-6 flex items-center justify-between border-b border-green-600">
              <h3 className="text-xl font-semibold">{editingId ? "Edit Article" : "Create New Article"}</h3>
              <button onClick={handleCloseModal} className="p-1 hover:bg-green-600 rounded transition">
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
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Full article content (supports HTML)"
                  rows={6}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700 font-mono text-sm"
                />
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
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="/article-image.jpg"
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
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium"
              >
                {editingId ? "Update Article" : "Create Article"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
