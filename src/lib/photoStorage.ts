export interface Photo {
  id: string;
  dataUrl: string;
  uploadedAt: string; // ISO string
  month: number; // 0-11
}

const STORAGE_KEY = "galeri-sahabat-photos";

export function getPhotos(): Photo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePhoto(dataUrl: string, month: number): Photo {
  const photos = getPhotos();
  const photo: Photo = {
    id: crypto.randomUUID(),
    dataUrl,
    uploadedAt: new Date().toISOString(),
    month,
  };
  photos.unshift(photo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  return photo;
}

export const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export function deletePhoto(id: string): void {
  const photos = getPhotos().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
}

export function formatDate(isoString: string): string {
  const d = new Date(isoString);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}
