import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ArticlePreviewProps {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
}

export function ArticlePreview({ id, title, excerpt, image, date }: ArticlePreviewProps) {
  return (
    <Link href={`/articles/${id}`}>
      <div className="group cursor-pointer h-full">
        <div className="border border-border rounded-lg overflow-hidden hover:border-green-300 transition bg-background h-full flex flex-col">
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-green-50">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <p className="text-xs text-muted-foreground mb-3">{date}</p>
            <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-green-700 transition">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{excerpt}</p>

            {/* See More Button */}
            <div className="flex items-center gap-2 text-green-700 font-medium text-sm group-hover:gap-3 transition-all">
              <span>See More</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
