const BASE_URL = "https://bijbel-api.nl/api";

export async function getRandomVerse() {
  const res = await fetch(`${BASE_URL}/random`);
  return res.json();
}

export async function getVerse(book: string, chapter: number, verse: number) {
  const res = await fetch(`${BASE_URL}/verse?book=${book}&chapter=${chapter}&verse=${verse}`);
  return res.json();
}

export async function getPassage(book: string, chapter: number, start: number, end: number) {
  const res = await fetch(`${BASE_URL}/passage?book=${book}&chapter=${chapter}&start=${start}&end=${end}`);
  return res.json();
}

export async function getBooks() {
  const res = await fetch(`${BASE_URL}/books`);
  return res.json();
}

export async function getChapters(book: string) {
  const res = await fetch(`${BASE_URL}/chapters?book=${book}`);
  return res.json();
}

export async function getVerses(book: string, chapter: number) {
  const res = await fetch(`${BASE_URL}/verses?book=${book}&chapter=${chapter}`);
  return res.json();
}

export async function searchBible(query: string) {
  const res = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
  return res.json();
}

export async function getDayText(seed?: string) {
  const url = seed ? `${BASE_URL}/daytext?seed=${seed}` : `${BASE_URL}/daytext`;
  const res = await fetch(url);
  return res.json();
}

export async function getVersions() {
  const res = await fetch(`${BASE_URL}/versions`);
  return res.json();
}

export async function getChapter(book: string, chapter: number) {
  const res = await fetch(`${BASE_URL}/chapter?book=${book}&chapter=${chapter}`);
  return res.json();
}