import { useState, useCallback } from "react";
import { Camera } from "lucide-react";
import heroImage from "@/assets/gallery-hero.jpg";
import PhotoCard from "@/components/PhotoCard";
import UploadButton from "@/components/UploadButton";
import EmptyState from "@/components/EmptyState";
import { Photo, getPhotos, savePhoto, deletePhoto } from "@/lib/photoStorage";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [photos, setPhotos] = useState<Photo[]>(getPhotos);
  const { toast } = useToast();

  const handleUpload = useCallback(
    (dataUrl: string) => {
      const photo = savePhoto(dataUrl);
      setPhotos((prev) => [photo, ...prev]);
      toast({ title: "Foto berhasil diupload! 🎉" });
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-secondary">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Galeri Sahabat"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 to-background" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-5">
            <Camera className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Kenangan Bersama</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
            Galeri Sahabat
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            Simpan dan nikmati momen terbaik bersama sahabatmu di satu tempat.
          </p>
          <UploadButton onUpload={handleUpload} />
        </div>
      </header>

      {/* Gallery Section */}
      <main className="mx-auto max-w-5xl px-4 py-10">
        {photos.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              {photos.length} Foto Kenangan
            </h2>
          </div>
        )}

        {photos.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {photos.map((photo, i) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onDelete={handleDelete}
                index={i}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Galeri Sahabat &copy; {new Date().getFullYear()} — Simpan kenanganmu ✨
      </footer>
    </div>
  );
};

export default Index;
