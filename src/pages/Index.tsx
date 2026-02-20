import { useState, useCallback } from "react";
import { Camera, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/gallery-hero.jpg";
import MonthBox from "@/components/MonthBox";
import SplashScreen from "@/components/SplashScreen";
import { Photo, getPhotos, savePhoto, deletePhoto, MONTH_NAMES } from "@/lib/photoStorage";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [photos, setPhotos] = useState<Photo[]>(getPhotos);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showSplash, setShowSplash] = useState(true);
  const { toast } = useToast();

  const handleUpload = useCallback(
    (dataUrl: string, month: number, year: number) => {
      const photo = savePhoto(dataUrl, month, year);
      setPhotos((prev) => [photo, ...prev]);
      toast({ title: `Foto ditambahkan ke ${MONTH_NAMES[month]} ${year}! 🎉` });
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

  const photosByMonthAndYear = (month: number) =>
    photos.filter((p) => p.month === month && (p.year === selectedYear || p.year === undefined));

  const totalPhotosThisYear = photos.filter(
    (p) => p.year === selectedYear || p.year === undefined
  ).length;

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div className="min-h-screen">
        {/* Hero Section */}
        <header className="relative overflow-hidden bg-secondary">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Galeri Sahabat"
              className="h-full w-full object-cover opacity-30 animate-hero-parallax"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 to-background" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 py-14 sm:py-18 text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4 opacity-0 animate-slide-up-fade"
              style={{ animationDelay: "100ms" }}
            >
              <Camera className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Kenangan Bersama</span>
              <Sparkles className="h-3.5 w-3.5 text-accent animate-float-2" />
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 opacity-0 animate-slide-up-fade"
              style={{ animationDelay: "250ms" }}
            >
              Galeri Sahabat
            </h1>
            <p
              className="text-muted-foreground text-lg max-w-md mx-auto opacity-0 animate-slide-up-fade"
              style={{ animationDelay: "400ms" }}
            >
              Simpan momen terbaik setiap bulan bersama sahabatmu.
            </p>
          </div>
        </header>

        {/* Monthly Grid */}
        <main className="mx-auto max-w-5xl px-4 py-10">
          {/* Year Selector */}
          <div
            className="flex items-center justify-between mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "500ms" }}
          >
            <h2 className="text-xl font-bold">📅 Kenangan per Bulan</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full transition-transform duration-200 hover:scale-110 active:scale-95"
                onClick={() => setSelectedYear((y) => y - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-lg font-bold min-w-[4rem] text-center">{selectedYear}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full transition-transform duration-200 hover:scale-110 active:scale-95"
                onClick={() => setSelectedYear((y) => y + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={`${selectedYear}-${i}`}
                className="opacity-0 animate-slide-up-fade"
                style={{ animationDelay: `${600 + i * 60}ms` }}
              >
                <MonthBox
                  month={i}
                  year={selectedYear}
                  photos={photosByMonthAndYear(i)}
                  onUpload={handleUpload}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>

          <div
            className="mt-6 text-center text-sm text-muted-foreground opacity-0 animate-fade-up"
            style={{ animationDelay: "1400ms" }}
          >
            {totalPhotosThisYear} foto di tahun {selectedYear} · Klik kotak bulan untuk melihat & upload
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t py-6 text-center text-sm text-muted-foreground">
          Galeri Sahabat &copy; {new Date().getFullYear()} — Simpan kenanganmu ✨
        </footer>
      </div>
    </>
  );
};

export default Index;
