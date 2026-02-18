import { useState, useEffect } from "react";
import { Camera, Heart, Sparkles } from "lucide-react";
import heroImage from "@/assets/gallery-hero.jpg";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [phase, setPhase] = useState(0);
  // 0 = initial, 1 = logo in, 2 = text in, 3 = sparkles, 4 = fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 2600),
      setTimeout(() => onFinish(), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        phase >= 4 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background image subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImage}
          alt=""
          className={`h-full w-full object-cover transition-all duration-[2000ms] ${
            phase >= 1 ? "opacity-10 scale-105" : "opacity-0 scale-110"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Floating sparkles */}
      {phase >= 3 && (
        <>
          <div className="absolute top-[20%] left-[15%] animate-float-1">
            <Sparkles className="h-5 w-5 text-primary/40" />
          </div>
          <div className="absolute top-[30%] right-[20%] animate-float-2">
            <Sparkles className="h-4 w-4 text-accent/50" />
          </div>
          <div className="absolute bottom-[25%] left-[25%] animate-float-3">
            <Heart className="h-4 w-4 text-primary/30" />
          </div>
          <div className="absolute bottom-[35%] right-[15%] animate-float-1">
            <Sparkles className="h-6 w-6 text-primary/25" />
          </div>
        </>
      )}

      {/* Camera icon */}
      <div
        className={`relative mb-6 transition-all duration-700 ease-out ${
          phase >= 1
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-75"
        }`}
      >
        <div className="rounded-full bg-primary/10 p-6 ring-2 ring-primary/20">
          <Camera
            className={`h-12 w-12 sm:h-16 sm:w-16 text-primary transition-transform duration-500 ${
              phase >= 2 ? "rotate-0" : "-rotate-12"
            }`}
          />
        </div>
        {/* Pulse ring */}
        <div
          className={`absolute inset-0 rounded-full ring-2 ring-primary/30 transition-all duration-1000 ${
            phase >= 2 ? "scale-150 opacity-0" : "scale-100 opacity-100"
          }`}
        />
      </div>

      {/* Title */}
      <h1
        className={`text-4xl sm:text-5xl font-extrabold tracking-tight transition-all duration-700 ease-out delay-100 ${
          phase >= 2
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        Galeri Sahabat
      </h1>

      {/* Subtitle */}
      <p
        className={`mt-3 text-muted-foreground text-lg transition-all duration-700 ease-out delay-200 ${
          phase >= 2
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        Kenangan indah bersama ✨
      </p>

      {/* Loading dots */}
      <div
        className={`mt-8 flex items-center gap-2 transition-all duration-500 ${
          phase >= 3 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
};

export default SplashScreen;
