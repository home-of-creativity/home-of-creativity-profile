import type { Copy } from "./i18n";

/** Google Drive folder: ريلز */
export const REELS_DRIVE_FOLDER =
  "https://drive.google.com/drive/folders/1bKLLyIYzKK2cnQ7OoOzJAbqA_EU9ZJ-e";

export type ReelItem = {
  id: string;
  fileId: string;
  title: Copy;
};

export const reelsDriveVideos: ReelItem[] = [
  {
    id: "abu-shaker-top-list",
    fileId: "1SEMFtey4DNCC2UvcDWZBAg8nV1d6FI58",
    title: { en: "Abu Shaker — Top List", ar: "أبو شاكر — توب ليست" },
  },
  {
    id: "donuts-world-identity",
    fileId: "1r2ldL5-zSFMRu8zIxV7ZmXlbSSTY7yPf",
    title: { en: "Visual identity — Donuts World", ar: "الهوية البصرية — عالم الدونات" },
  },
  {
    id: "home-of-creativity-showreel",
    fileId: "1Z8ox9xn5y5eLFMuu6VzhWmF2W1nVF01q",
    title: { en: "Home of Creativity — work overview", ar: "لمحة عن أعمال بيت الإبداع" },
  },
];

export function reelDrivePreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function reelDriveOpenUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/view`;
}
