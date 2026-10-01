function encodeFile(file: string): string {
  return encodeURIComponent(file.replace(/ /g, '_'));
}

/** Resized image URL. Commons file names resolve through Special:FilePath; full URLs pass through. */
export function photoUrl(file: string, width: number): string {
  if (/^https?:\/\//.test(file)) return file;
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeFile(file)}?width=${width}`;
}

export function photoSourcePage(file: string): string {
  if (/^https?:\/\//.test(file)) return file;
  return `https://commons.wikimedia.org/wiki/File:${encodeFile(file)}`;
}