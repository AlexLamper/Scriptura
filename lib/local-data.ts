import fs from 'fs/promises';
import path from 'path';
import { getBookNameVariants } from './book-mapping';

const DATA_DIR = path.join(process.cwd(), 'data');

// Simple in-memory cache to prevent re-reading files on every request
const cache: Record<string, FlatVerse[] | NestedData> = {};

// Interfaces
interface FlatVerse {
  book_name: string;
  book: number;
  chapter: number;
  verse: number;
  text: string;
}

interface NestedBook {
  chapters: {
    [key: string]: {
      verses: {
        [key: string]: string;
      };
    };
  };
}

interface NestedData {
  books: {
    [key: string]: NestedBook;
  };
}

async function getBibleData(version: string) {
  // Normalize version name to match filename (e.g. "Staten Vertaling" -> "statenvertaling")
  const versionKey = version.toLowerCase().replace(/\s+/g, ''); 
  
  if (cache[versionKey]) {
      return cache[versionKey];
  }

  // Try to find the file in bibles or commentaries
  const biblesDir = path.join(DATA_DIR, 'bibles');
  const commentariesDir = path.join(DATA_DIR, 'commentaries');
  
  let filePath: string | null = null;
  
  try {
    // Check bibles first
    await fs.mkdir(biblesDir, { recursive: true });
    const bibleFiles = await fs.readdir(biblesDir);
    let match = bibleFiles.find(f => {
        const normalizedFile = f.toLowerCase().replace(/[-_]/g, '').replace('.json', '');
        const normalizedKey = versionKey.replace(/[-_]/g, '');
        return normalizedFile === normalizedKey;
    });

    if (match) {
        filePath = path.join(biblesDir, match);
    } else {
        // Check commentaries
        await fs.mkdir(commentariesDir, { recursive: true });
        const commentaryFiles = await fs.readdir(commentariesDir);
        match = commentaryFiles.find(f => {
            const normalizedFile = f.toLowerCase().replace(/[-_]/g, '').replace('.json', '');
            const normalizedKey = versionKey.replace(/[-_]/g, '');
            return normalizedFile === normalizedKey;
        });
        if (match) {
            filePath = path.join(commentariesDir, match);
        }
    }
    
    if (!filePath) {
        return null;
    }

    const stats = await fs.stat(filePath);
    let data;

    if (stats.isDirectory()) {
        const files = await fs.readdir(filePath);
        const mergedData: Record<string, any> = {};
        
        for (const file of files) {
            if (file.endsWith('.json')) {
                try {
                    const content = await fs.readFile(path.join(filePath, file), 'utf-8');
                    const json = JSON.parse(content);
                    // Use the id from json or filename as key
                    const key = json.id || file.replace('.json', '');
                    mergedData[key] = json;
                } catch (e) {
                    console.error(`[LocalData] Error parsing ${file} in ${filePath}`, e);
                }
            }
        }
        data = mergedData;
    } else {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        data = JSON.parse(fileContent);
    }
    
    cache[versionKey] = data;
    return data;
  } catch (error) {
    console.error(`[LocalData] Error reading file for ${version}:`, error);
    return null;
  }
}

export async function getVersions() {
  try {
    const biblesDir = path.join(DATA_DIR, 'bibles');
    await fs.mkdir(biblesDir, { recursive: true });
    const files = await fs.readdir(biblesDir);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
  } catch (error) {
    console.error('Error listing versions:', error);
    return [];
  }
}

export async function getBooks(version: string) {
  try {
    const data = await getBibleData(version);
    if (!data) return [];

    const flatData = Array.isArray(data) ? data : (data.verses && Array.isArray(data.verses) ? data.verses : null);

    if (flatData) {
        // Flat structure: Extract unique book names
        const books = new Set<string>();
        (flatData as FlatVerse[]).forEach(v => books.add(v.book_name));
        const result = Array.from(books);
        return result;
    } else if (data.books) {
        // Nested structure with 'books' key
        const result = Object.keys(data.books);
        return result;
    } else {
        // Fallback for simple object structure
        return Object.keys(data);
    }
  } catch (error) {
    console.error(`[LocalData] Error in getBooks for ${version}:`, error);
    return [];
  }
}

export async function getChapters(version: string, bookName: string) {
  try {
    const data = await getBibleData(version);
    if (!data) return [];
    
    const flatData = Array.isArray(data) ? data : (data.verses && Array.isArray(data.verses) ? data.verses : null);

    if (flatData) {
        // Flat structure
        const chapters = new Set<number>();
        const lowerBookName = bookName.toLowerCase();
        
        // Try direct match first
        (flatData as FlatVerse[]).forEach(v => {
            if (v.book_name.toLowerCase() === lowerBookName) {
                chapters.add(v.chapter);
            }
        });
        
        // If no chapters found, try variants
        if (chapters.size === 0) {
             const variants = getBookNameVariants(bookName);
             for (const variant of variants) {
                 if (variant.toLowerCase() === lowerBookName) continue;
                 
                 const lowerVariant = variant.toLowerCase();
                 (flatData as FlatVerse[]).forEach(v => {
                    if (v.book_name.toLowerCase() === lowerVariant) {
                        chapters.add(v.chapter);
                    }
                });
                if (chapters.size > 0) break;
             }
        }

        const result = Array.from(chapters).sort((a, b) => a - b);
        return result;
    } else {
        // Nested structure
        const booksData = data.books || data;
        let bookKey = Object.keys(booksData).find(k => k.toLowerCase() === bookName.toLowerCase());
        
        if (!bookKey) {
            const variants = getBookNameVariants(bookName);
            for (const variant of variants) {
                bookKey = Object.keys(booksData).find(k => k.toLowerCase() === variant.toLowerCase());
                if (bookKey) break;
            }
        }

        if (!bookKey || !booksData[bookKey]) return [];
        
        const book = booksData[bookKey];
        const chaptersObj = book.chapters || book; // Handle if chapters are direct or nested
        const result = Object.keys(chaptersObj).map(Number).sort((a, b) => a - b);
        return result;
    }
  } catch (error) {
    console.error(`[LocalData] Error in getChapters for ${version}/${bookName}:`, error);
    return [];
  }
}

export async function getChapter(version: string, bookName: string, chapterNumber: number) {
  try {
    const data = await getBibleData(version);
    if (!data) return null;
    
    const flatData = Array.isArray(data) ? data : (data.verses && Array.isArray(data.verses) ? data.verses : null);

    if (flatData) {
        // Flat structure
        const lowerBookName = bookName.toLowerCase();
        let verses = (flatData as FlatVerse[]).filter(v => 
            v.book_name.toLowerCase() === lowerBookName && v.chapter === Number(chapterNumber)
        );

        if (verses.length === 0) {
             const variants = getBookNameVariants(bookName);
             for (const variant of variants) {
                 if (variant.toLowerCase() === lowerBookName) continue;
                 
                 verses = (flatData as FlatVerse[]).filter(v => 
                    v.book_name.toLowerCase() === variant.toLowerCase() && v.chapter === Number(chapterNumber)
                );
                if (verses.length > 0) break;
             }
        }

        if (verses.length === 0) {
            return null;
        }

        // Transform to map
        const versesMap: Record<string, string> = {};
        verses.forEach(v => {
            versesMap[v.verse.toString()] = v.text;
        });
        
        return { verses: versesMap };
    } else {
        // Nested structure
        const booksData = data.books || data;
        let bookKey = Object.keys(booksData).find(k => k.toLowerCase() === bookName.toLowerCase());
        
        if (!bookKey) {
            const variants = getBookNameVariants(bookName);
            for (const variant of variants) {
                bookKey = Object.keys(booksData).find(k => k.toLowerCase() === variant.toLowerCase());
                if (bookKey) break;
            }
        }

        if (!bookKey) return null;
        
        const book = booksData[bookKey];
        const chaptersObj = book.chapters || book;
        const chapterData = chaptersObj[chapterNumber.toString()] || chaptersObj[chapterNumber];
        
        if (!chapterData) return null;

        // If chapterData has 'verses' property, use it, otherwise assume it IS the verses map
        const versesMap = chapterData.verses || chapterData;
        
        return { verses: versesMap };
    }
  } catch (error) {
    console.error(`[LocalData] Error in getChapter for ${version}/${bookName}/${chapterNumber}:`, error);
    return null;
  }
}

// Keep getCommentary for backward compatibility if needed, but getChapter now handles both
export async function getCommentary(source: string, bookName: string, chapterNumber: number) {
    const result = await getChapter(source, bookName, chapterNumber);
    // Return the verses map directly, as expected by the commentary component
    return result ? result.verses : null;
}

export async function getCommentaries() {
  try {
    const commentariesDir = path.join(DATA_DIR, 'commentaries');
    await fs.mkdir(commentariesDir, { recursive: true });
    const dirents = await fs.readdir(commentariesDir, { withFileTypes: true });
    return dirents
      .filter(dirent => dirent.name.endsWith('.json') || dirent.isDirectory())
      .map(dirent => dirent.name.replace('.json', ''));
  } catch (error) {
    console.error('Error listing commentaries:', error);
    return [];
  }
}

export async function getBibleSummary(bookName: string) {
  try {
    const summaryPath = path.join(DATA_DIR, 'bible_summary.json');
    const fileContent = await fs.readFile(summaryPath, 'utf-8');
    const summaryData = JSON.parse(fileContent);
    
    // Try direct match
    if (summaryData[bookName]) {
        return summaryData[bookName];
    }

    // Try variants
    const variants = getBookNameVariants(bookName);
    for (const variant of variants) {
        if (summaryData[variant]) {
            return summaryData[variant];
        }
    }
    
    return null;
  } catch (error) {
    console.error('Error reading bible summary:', error);
    return null;
  }
}
