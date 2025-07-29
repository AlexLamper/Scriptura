"use client"

import { useEffect, useState } from 'react'
import BibleSelector from '../../../components/study/BibleSelector'
import ChapterViewer from '../../../components/study/ChapterViewer'

export default function Index() {
  const [versions, setVersions] = useState<string[]>([])
  const [books, setBooks] = useState<string[]>([])
  const [chapters, setChapters] = useState<number[]>([])
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)
  const [selectedBook, setSelectedBook] = useState('Genesis')
  const [selectedChapter, setSelectedChapter] = useState(1)

  // Fetch versions and books on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resVersions = await fetch('https://www.bijbel-api.nl/api/versions')
        const dataVersions = await resVersions.json()
        setVersions(dataVersions)

        const resBooks = await fetch('https://www.bijbel-api.nl/api/books')
        const dataBooks = await resBooks.json()
        setBooks(dataBooks)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // Fetch chapters when book changes
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch(
          `https://www.bijbel-api.nl/api/chapters?book=${selectedBook}`
        )
        const data = await res.json()
        setChapters(data)
      } catch (error) {
        console.error('Error fetching chapters:', error)
      }
    }

    if (selectedBook) fetchChapters()
  }, [selectedBook])

  return (
    <div className="min-h-screen">

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <BibleSelector
          versions={versions}
          books={books}
          chapters={chapters}
          selectedVersion={selectedVersion}
          selectedBook={selectedBook}
          selectedChapter={selectedChapter}
          onVersionChange={(version) => setSelectedVersion(version)}
          onBookChange={(book) => {
            setSelectedBook(book)
            setSelectedChapter(1)
          } }
          onChapterChange={setSelectedChapter} loadingVersions={false} loadingBooks={false} loadingChapters={false}        />

        <ChapterViewer
          version={selectedVersion}
          book={selectedBook}
          chapter={selectedChapter}
          maxChapter={Math.max(...chapters)}
        />
      </div>
    </div>
  )
}
