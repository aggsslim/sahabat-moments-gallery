import { useState, useCallback } from "react";
import { Camera } from "lucide-react";
import heroImage from "@/assets/gallery-hero.jpg";
import MonthBox from "@/components/MonthBox";
import { Photo, getPhotos, savePhoto, deletePhoto, MONTH_NAMES } from "@/lib/photoStorage";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [photos, setPhotos] = useState<Photo[]>(getPhotos);
  const { toast } = useToast();

  const handleUpload = useCallback(
    (dataUrl: string, month: number) => {
      const photo = savePhoto(dataUrl, month);
      setPhotos((prev) => [photo, ...prev]);
      toast({ title: `Foto ditambahkan ke ${MONTH_NAMES[month]}! 🎉` });
    },
    [toast]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deletePhoto(id);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      toast({ title: "Foto telah dihapus" });
    },
    [toast]
  );

  const photosByMonth = (month: number) =>
    photos.filter((p) => p.month === month);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-secondary">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Galeri Sahabat" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 to-background" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:py-18 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
            <Camera className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Kenangan Bersama</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
            Galeri Sahabat
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Simpan momen terbaik setiap bulan bersama sahabatmu.
          </p>
        </div>
      </header>

      {/* Monthly Grid */}
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-xl font-bold mb-6">📅 Kenangan per Bulan</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
          {Array.from({ length: 12 }, (_, i) => (
            <MonthBox
              key={i}
              month={i}
              photos={photosByMonth(i)}
              onUpload={handleUpload}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Klik kotak bulan untuk melihat & upload foto
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Galeri Sahabat &copy; {new Date().getFullYear()} — Simpan kenanganmu ✨
      </footer>
    </div>
  );
};

export default Index;
