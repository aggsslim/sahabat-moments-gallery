import { useRef } from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface UploadButtonProps {
  onUpload: (dataUrl: string) => void;
}

const MAX_SIZE_MB = 5;

const UploadButton = ({ onUpload }: UploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
        toast({
          title: "Format tidak didukung",
          description: "Gunakan format JPG, PNG, atau WEBP.",
          variant: "destructive",
        });
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast({
          title: "Ukuran terlalu besar",
          description: `Maksimal ${MAX_SIZE_MB}MB per foto.`,
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <Button
        onClick={() => inputRef.current?.click()}
        size="lg"
        className="gap-2 rounded-full px-6 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <ImagePlus className="h-5 w-5" />
        Upload Foto
      </Button>
    </>
  );
};

export default UploadButton;
