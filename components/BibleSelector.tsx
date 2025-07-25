import { ChevronDown } from 'lucide-react'
import { cn } from '../lib/utils'

type Props = {
  versions: string[]
  books: string[]
  chapters: number[]
  selectedVersion: string | null
  selectedBook: string
  selectedChapter: number
  onVersionChange: (v: string) => void
  onBookChange: (b: string) => void
  onChapterChange: (c: number) => void
}

export default function BibleSelector({
  versions,
  books,
  chapters,
  selectedVersion,
  selectedBook,
  selectedChapter,
  onVersionChange,
  onBookChange,
  onChapterChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Version Selector */}
      <div className="relative">
        <label className="block text-sm font-semibold text-foreground/60 mb-3 tracking-wide uppercase">
          Vertaling
        </label>
        <div className="relative">
          <select
            value={selectedVersion || ''}
            onChange={(e) => onVersionChange(e.target.value)}
            className={cn(
              "w-full appearance-none bg-gradient-to-b from-card to-card/95 border border-border/50 rounded-xl px-5 py-4",
              "text-foreground shadow-lg transition-all duration-300 font-medium",
              "hover:border-primary/40 hover:shadow-xl focus:border-primary focus:ring-2 focus:ring-primary/20",
              "focus:outline-none cursor-pointer backdrop-blur-sm"
            )}
          >
            <option value="" disabled>
              Selecteer vertaling
            </option>
            {versions.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/40 pointer-events-none" />
        </div>
      </div>

      {/* Book Selector */}
      <div className="relative">
        <label className="block text-sm font-semibold text-foreground/60 mb-3 tracking-wide uppercase">
          Boek
        </label>
        <div className="relative">
          <select
            value={selectedBook}
            onChange={(e) => onBookChange(e.target.value)}
            className={cn(
              "w-full appearance-none bg-gradient-to-b from-card to-card/95 border border-border/50 rounded-xl px-5 py-4",
              "text-foreground shadow-lg transition-all duration-300 font-medium",
              "hover:border-primary/40 hover:shadow-xl focus:border-primary focus:ring-2 focus:ring-primary/20",
              "focus:outline-none cursor-pointer backdrop-blur-sm"
            )}
          >
            {books.map((book) => (
              <option key={book} value={book}>
                {book}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/40 pointer-events-none" />
        </div>
      </div>

      {/* Chapter Selector */}
      <div className="relative">
        <label className="block text-sm font-semibold text-foreground/60 mb-3 tracking-wide uppercase">
          Hoofdstuk
        </label>
        <div className="relative">
          <select
            value={selectedChapter}
            onChange={(e) => onChapterChange(Number(e.target.value))}
            className={cn(
              "w-full appearance-none bg-gradient-to-b from-card to-card/95 border border-border/50 rounded-xl px-5 py-4",
              "text-foreground shadow-lg transition-all duration-300 font-medium",
              "hover:border-primary/40 hover:shadow-xl focus:border-primary focus:ring-2 focus:ring-primary/20",
              "focus:outline-none cursor-pointer backdrop-blur-sm"
            )}
          >
            {chapters.map((c) => (
              <option key={c} value={c}>
                Hoofdstuk {c}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/40 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
