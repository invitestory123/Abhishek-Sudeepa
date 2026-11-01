import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Disc3, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { wedding } from "./data";

export interface MusicPlayerHandle {
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
  isPlaying: boolean;
}

export const MusicPlayer = forwardRef<MusicPlayerHandle>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn("Autoplay was prevented by browser policy:", err);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  useImperativeHandle(ref, () => ({
    play,
    pause,
    toggle,
    isPlaying,
  }));

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/audio/wedding-music.m4a" type="audio/mp4" />
        <source src="/audio/wedding-music.mp4" type="audio/mp4" />
        <source src="/audio/wedding-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Music Control Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-5 right-5 z-40"
      >
        <motion.button
          onClick={toggle}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          className={`group flex items-center gap-2 rounded-full border px-3.5 py-2.5 backdrop-blur-md shadow-luxe transition-all duration-300 cursor-pointer ${
            isPlaying
              ? "bg-emerald-ink/90 border-gold/70 text-gold shadow-gold ring-1 ring-gold/40"
              : "bg-emerald-ink/75 border-gold/30 text-ivory/80 hover:border-gold/60"
          }`}
          aria-label={isPlaying ? "Mute music" : "Play music"}
          title={wedding.music ? `${wedding.music.title} - ${wedding.music.artist}` : "Wedding Music"}
        >
          <Disc3
            className={`h-4 w-4 text-gold ${isPlaying ? "animate-spin" : ""}`}
            style={{ animationDuration: "3.5s" }}
          />
          <span className="text-[0.62rem] font-medium tracking-widest uppercase">
            {isPlaying ? "Music ON" : "Music OFF"}
          </span>
          {isPlaying ? (
            <Volume2 className="h-3.5 w-3.5 text-gold" />
          ) : (
            <VolumeX className="h-3.5 w-3.5 opacity-60" />
          )}
        </motion.button>
      </motion.div>
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";

