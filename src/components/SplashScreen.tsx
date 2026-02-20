import { useState, useEffect } from "react";
import { Camera, Heart, Sparkles, Star } from "lucide-react";
import heroImage from "@/assets/gallery-hero.jpg";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [phase, setPhase] = useState(0);
  // 0 = initial, 1 = bg in, 2 = logo in, 3 = text in, 4 = particles, 5 = fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 1100),
      setTimeout(() => setPhase(4), 1700),
      setTimeout(() => setPhase(5), 3000),
      setTimeout(() => onFinish(), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-700 ${
        phase >= 5 ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Background image with zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImage}
          alt=""
          className={`h-full w-full object-cover transition-all duration-[2500ms] ease-out ${
            phase >= 1 ? "opacity-15 scale-100" : "opacity-0 scale-125"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* Floating particles */}
      {phase >= 4 && (
        <>
          {[
            { top: "18%", left: "12%", icon: Sparkles, size: "h-5 w-5", color: "text-primary/40", anim: "animate-float-1" },
            { top: "25%", right: "18%", icon: Star, size: "h-4 w-4", color: "text-accent/50", anim: "animate-float-2" },
            { bottom: "28%", left: "20%", icon: Heart, size: "h-4 w-4", color: "text-primary/30", anim: "animate-float-3" },
            { bottom: "22%", right: "12%", icon: Sparkles, size: "h-6 w-6", color: "text-primary/25", anim: "animate-float-1" },
            { top: "40%", left: "8%", icon: Star, size: "h-3 w-3", color: "text-accent/35", anim: "animate-float-2" },
            { top: "35%", right: "8%", icon: Heart, size: "h-3.5 w-3.5", color: "text-primary/20", anim: "animate-float-3" },
          ].map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className={`absolute ${p.anim} opacity-0 animate-fade-in`}
                style={{
                  top: p.top, bottom: p.bottom, left: p.left, right: p.right,
                  animationDelay: `${i * 120}ms`,
                }}
              >
                <Icon className={`${p.size} ${p.color}`} />
              </div>
            );
          })}
        </>
      )}

      {/* Camera icon with ring pulse */}
      <div
        className={`relative mb-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          phase >= 2
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-50"
        }`}
      >
        <div className="rounded-full bg-primary/10 p-7 ring-2 ring-primary/20 backdrop-blur-sm">
          <Camera
            className={`h-14 w-14 sm:h-18 sm:w-18 text-primary transition-all duration-700 ${
              phase >= 3 ? "rotate-0 scale-100" : "-rotate-12 scale-90"
            }`}
          />
        </div>
        {/* Expanding rings */}
        <div
          className={`absolute inset-0 rounded-full ring-2 ring-primary/20 transition-all duration-[1200ms] ease-out ${
            phase >= 3 ? "scale-[2] opacity-0" : "scale-100 opacity-60"
          }`}
        />
        <div
          className={`absolute inset-0 rounded-full ring-1 ring-accent/20 transition-all duration-[1500ms] ease-out ${
            phase >= 3 ? "scale-[2.5] opacity-0" : "scale-100 opacity-40"
          }`}
          style={{ transitionDelay: "200ms" }}
        />
      </div>

      {/* Title with letter spacing animation */}
      <h1
        className={`text-4xl sm:text-6xl font-extrabold tracking-tight transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          phase >= 3
            ? "opacity-100 translate-y-0 tracking-tight"
            : "opacity-0 translate-y-8 tracking-widest"
        }`}
      >
        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
          Galeri Sahabat
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className={`mt-4 text-muted-foreground text-lg sm:text-xl transition-all duration-700 ease-out delay-150 ${
          phase >= 3
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        Kenangan indah bersama ✨
      </p>

      {/* Loading bar */}
      <div
        className={`mt-10 w-32 h-1 rounded-full overflow-hidden bg-muted transition-opacity duration-500 ${
          phase >= 4 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-[1200ms] ease-out"
          style={{ width: phase >= 4 ? "100%" : "0%" }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
