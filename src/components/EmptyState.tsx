import { Camera } from "lucide-react";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
    <div className="rounded-full bg-secondary p-6 mb-5">
      <Camera className="h-12 w-12 text-primary" />
    </div>
    <h3 className="text-xl font-bold mb-2">Belum ada foto</h3>
    <p className="text-muted-foreground max-w-xs">
      Mulai upload foto kenangan bersama sahabatmu dan simpan momen terbaik di sini!
    </p>
  </div>
);

export default EmptyState;
