import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { cn } from '../lib/utils'

type Props = {
  version: string | null
  book: string
  chapter: number
  onPrevious: () => void
  onNext: () => void
  maxChapter: number
}

type VerseData = { [key: string]: string }

export default function ChapterViewer({
  version,
  book,
  chapter,
  onPrevious,
  onNext,
  maxChapter,
}: Props) {
  const [verses, setVerses] = useState<VerseData>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          book,
          chapter: chapter.toString(),
        })

        if (version) {
          params.append('translation', version)
        }

        const res = await fetch(`https://www.bijbel-api.nl/api/chapter?${params.toString()}`)

        if (!res.ok) {
          throw new Error(`API gaf een fout terug: ${res.status}`)
        }

        const data = await res.json()

        if (!data.verses) {
          throw new Error('Geen verzen gevonden in response')
        }

        setVerses(data.verses)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Fout bij het laden van de bijbeltekst')
        }
        setVerses({})
      } finally {
        setLoading(false)
      }
    }

    fetchChapter()
  }, [book, chapter, version])

  return (
    <div className="max-w-5xl mx-auto">
      {/* Chapter Header */}
      <div className="flex items-center justify-between mb-12 bg-gradient-to-r from-card/80 via-card to-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg">
        <Button
          variant="ghost"
          onClick={onPrevious}
          disabled={chapter <= 1}
          className={cn(
            "flex items-center gap-3 px-6 py-4 text-base font-medium",
            "hover:bg-primary/10 hover:text-primary transition-all duration-200",
            "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
          Vorig
        </Button>

        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
            {book} {chapter}
          </h2>
          <p className="text-foreground/60 text-sm tracking-wide uppercase font-medium">
            {version && `${version} vertaling`}
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={onNext}
          disabled={chapter >= maxChapter}
          className={cn(
            "flex items-center gap-3 px-6 py-4 text-base font-medium",
            "hover:bg-primary/10 hover:text-primary transition-all duration-200",
            "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          )}
        >
          Volgende
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Content Area */}
      <div className="bg-gradient-to-b from-card to-card/95 rounded-2xl border border-border/50 shadow-xl overflow-hidden">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-6" />
              <p className="text-foreground/70 text-lg font-medium">Bijbeltekst laden...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-24">
            <div className="text-center max-w-md">
              <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-6" />
              <p className="text-destructive font-semibold mb-3 text-lg">Fout bij laden</p>
              <p className="text-foreground/70">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && Object.keys(verses).length > 0 && (
          <div className="px-12 py-16">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg prose-stone dark:prose-invert max-w-none">
                <div className="text-justify leading-8 space-y-1">
                  {Object.entries(verses).map(([verseNumber, text], index) => (
                    <span key={verseNumber} className="inline">
                      <sup className="text-primary/70 font-bold text-sm mx-1 select-none">
                        {verseNumber}
                      </sup>
                      <span className="text-foreground/95 font-serif text-xl leading-8">
                        {text}
                      </span>
                      {index < Object.entries(verses).length - 1 && " "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
