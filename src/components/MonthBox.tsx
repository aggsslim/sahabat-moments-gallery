import { useRef, useState } from "react";
import { ImagePlus, Plus, X, Calendar, Trash2, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Photo, formatDate, MONTH_NAMES } from "@/lib/photoStorage";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MonthBoxProps {
  month: number;
  year: number;
  photos: Photo[];
  onUpload: (dataUrl: string, month: number, year: number) => void;
  onDelete: (id: string) => void;
}

const MonthBox = ({ month, year, photos, onUpload, onDelete }: MonthBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
        toast({ title: "Format tidak didukung", description: "Gunakan JPG, PNG, atau WEBP.", variant: "destructive" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "Ukuran terlalu besar", description: "Maksimal 5MB per foto.", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) onUpload(e.target.result as string, month, year);
      };
      reader.readAsDataURL(file);
    });
  };

  const isCurrentMonth = new Date().getMonth() === month && new Date().getFullYear() === year;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goNext = () => {
    if (lightboxIndex !== null && lightboxIndex < photos.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            className={`group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 aspect-square transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:photo-card-shadow-hover active:scale-[0.97] ${
              isCurrentMonth
                ? "border-primary/50 bg-primary/5 animate-pulse-glow"
                : "border-border bg-card hover:border-primary/30 hover:bg-primary/5"
            }`}
          >
            <span className="text-sm font-bold mb-1">{MONTH_NAMES[month]}</span>

            {photos.length > 0 ? (
              <div className="relative w-full flex-1 min-h-0">
                <div className="grid grid-cols-2 gap-1 w-full h-full">
                  {photos.slice(0, 4).map((photo) => (
                    <div key={photo.id} className="relative overflow-hidden rounded-md aspect-square">
                      <img src={photo.dataUrl} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                {photos.length > 4 && (
                  <div className="absolute bottom-1 right-1 rounded-full bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5">
                    +{photos.length - 4}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <ImagePlus className="h-8 w-8 opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-300" />
                <span className="text-xs">Kosong</span>
              </div>
            )}

            <span className="text-xs text-muted-foreground mt-1">
              {photos.length} foto
            </span>
          </button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {MONTH_NAMES[month]}
            </DialogTitle>
          </DialogHeader>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 py-4 text-primary font-semibold hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <Plus className="h-5 w-5" />
            Upload Foto ke {MONTH_NAMES[month]}
          </button>

          {photos.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Belum ada foto di bulan ini. Yuk upload!
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
              {photos.map((photo, index) => (
                <div key={photo.id} className="group/photo relative overflow-hidden rounded-lg photo-card-shadow">
                  {/* Clickable image for lightbox */}
                  <button
                    onClick={() => openLightbox(index)}
                    className="w-full cursor-pointer focus:outline-none"
                  >
                    <img src={photo.dataUrl} alt="Foto kenangan" className="aspect-square w-full object-cover transition-transform duration-300 group-hover/photo:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity">
                      <div className="rounded-full bg-background/80 p-2 backdrop-blur-sm">
                        <ZoomIn className="h-5 w-5 text-foreground" />
                      </div>
                    </div>
                  </button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="absolute top-2 right-2 rounded-full bg-destructive/90 p-1.5 text-destructive-foreground opacity-0 group-hover/photo:opacity-100 transition-all hover:bg-destructive hover:scale-110 cursor-pointer z-10">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus foto ini?</AlertDialogTitle>
                        <AlertDialogDescription>Foto akan dihapus secara permanen.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(photo.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover/photo:opacity-100 transition-opacity">
                    <span className="text-primary-foreground text-xs font-medium">{formatDate(photo.uploadedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Lightbox overlay */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 backdrop-blur-sm animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 rounded-full bg-background/20 p-2 text-background hover:bg-background/40 transition-colors cursor-pointer z-10"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-background/80 text-sm font-medium">
            {lightboxIndex + 1} / {photos.length}
          </div>

          {/* Previous */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 sm:left-6 rounded-full bg-background/20 p-2 text-background hover:bg-background/40 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Image */}
          <img
            src={photos[lightboxIndex].dataUrl}
            alt="Foto kenangan"
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain photo-card-shadow animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {lightboxIndex < photos.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 sm:right-6 rounded-full bg-background/20 p-2 text-background hover:bg-background/40 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Date */}
          <div className="absolute bottom-4 text-background/70 text-sm">
            {formatDate(photos[lightboxIndex].uploadedAt)}
          </div>
        </div>
      )}
    </>
  );
};

export default MonthBox;
