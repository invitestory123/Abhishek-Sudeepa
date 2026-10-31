import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { Aurora } from "@/components/Aurora";
import { Petals } from "./Petals";
import { wedding } from "./data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.4 });

  const glowY = useTransform(smooth, [0, 1], ["0%", "22%"]);
  const garlandY = useTransform(smooth, [0, 1], ["0%", "-10%"]);
  const textY = useTransform(smooth, [0, 1], ["0%", "80%"]);
  const textOpacity = useTransform(smooth, [0, 0.55], [1, 0]);
  const coupleY = useTransform(smooth, [0, 1], ["0%", "-18%"]);
  const coupleScale = useTransform(smooth, [0, 1], [1, 1.12]);

  return (
    <section
      ref={ref}
      className="bg-emerald-deep relative flex h-[100svh] min-h-[660px] w-full flex-col items-center overflow-hidden"
    >
      <Aurora intensity={0.8} />
      <div className="from-emerald-ink/80 via-emerald-deep/40 to-emerald-ink/95 absolute inset-0 bg-gradient-to-b" />
      <motion.div
        aria-hidden
        style={{
          y: glowY,
          background:
            "radial-gradient(ellipse at 50% 80%, oklch(0.93 0.05 92 / 0.55), transparent 62%)",
        }}
        className="absolute bottom-0 left-1/2 h-[62%] w-[130%] -translate-x-1/2 rounded-t-full blur-2xl pointer-events-none"
      />

      <Petals count={12} />

      {/* Decorative top garland positioned well above text with no overlap */}
      <motion.img
        src="/images/garland.png"
        alt=""
        aria-hidden
        style={{ y: garlandY }}
        className="pointer-events-none absolute -top-14 sm:-top-20 left-1/2 w-[115%] max-w-[480px] -translate-x-1/2 opacity-85 z-0"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center px-6 pt-36 sm:pt-40 text-center">
        {/* Soft contrast backing to make all text pop crisply */}
        <div className="pointer-events-none absolute top-28 left-1/2 -translate-x-1/2 w-72 h-56 bg-emerald-ink/70 rounded-full blur-3xl -z-10" />

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="flex flex-col items-center w-full"
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="text-ivory font-medium text-xs tracking-[0.4em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            Together with their families
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 flex flex-col items-center leading-[0.85] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
          >
            <span className="text-gold-foil font-display text-[4rem] sm:text-[4.5rem] font-light tracking-wide">
              {wedding.groom.name}
            </span>
            <span className="font-script text-gold my-1 text-3xl sm:text-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              and
            </span>
            <span className="text-gold-foil font-display text-[4rem] sm:text-[4.5rem] font-light tracking-wide">
              {wedding.bride.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1, duration: 0.9 }}
            className="rule-gold mt-6 w-40 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9 }}
            className="text-ivory mt-5 text-sm sm:text-base font-medium tracking-[0.35em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            {wedding.heroDateLabel}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.9 }}
            className="text-gold-soft mt-2 text-xs font-normal tracking-[0.25em] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
          >
            {wedding.cityState}
          </motion.p>
        </motion.div>

        <motion.img
          src="/images/couple-hero.png"
          alt="Watercolour illustration of the couple"
          width={1024}
          height={1408}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: coupleY, scale: coupleScale }}
          className="mt-auto w-[88%] max-w-[340px] brightness-110 contrast-105 drop-shadow-[0_24px_40px_rgba(0,0,0,0.4)]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity: textOpacity }}
        className="text-gold/80 absolute bottom-4 z-20 flex flex-col items-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
      >
        <span className="text-[0.55rem] tracking-[0.4em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
