import { useState } from "react";
import { Trash2, Calendar } from "lucide-react";
import { Photo, formatDate } from "@/lib/photoStorage";
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

interface PhotoCardProps {
  photo: Photo;
  onDelete: (id: string) => void;
  index: number;
}

const PhotoCard = ({ photo, onDelete, index }: PhotoCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-card photo-card-shadow hover:photo-card-shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={photo.dataUrl}
          alt="Foto kenangan"
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
      </div>

      {/* Overlay with delete button */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="absolute top-2 right-2 rounded-full bg-destructive/90 p-2 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-destructive hover:scale-110 cursor-pointer">
            <Trash2 className="h-4 w-4" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus foto ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Foto ini akan dihapus secara permanen dan tidak bisa dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(photo.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Date badge */}
      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-1.5 text-primary-foreground text-sm font-medium">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(photo.uploadedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
