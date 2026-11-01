export interface WeddingEvent {
  title: string;
  day: string;
  time: string;
  note?: string;
}

export const wedding = {
  groom: {
    name: "Abhishek",
    fullName: "Abhishek",
    role: "The Groom",
    line: "",
    note: "Carrying grace in his stride and a heart full of love, meet our dashing groom.",
    image: "/images/groom.jpg",
  },
  bride: {
    name: "Sudeepa",
    fullName: "Sudeepa",
    role: "The Bride",
    line: "",
    note: "Fiercely loyal, effortlessly kind, and notoriously picky; meet our beautiful bride.",
    image: "/images/bride.jpg",
  },
  // Wednesday, 25 November 2026, 11:00 AM IST (Celebrations start)
  dateISO: "2026-11-25T11:00:00+05:30",
  // Thursday, 26 November 2026, 6:00 PM IST (Wedding ceremony)
  weddingDateISO: "2026-11-26T18:00:00+05:30",
  endISO: "2026-11-26T23:59:00+05:30",
  dateLabel: "25 & 26 November 2026",
  heroDateLabel: "26th November 2026",
  heroImage: "/images/opening-couple.jpg",
  cityState: "Chandrapur, Maharashtra",
  music: {
    title: "Kudmayi",
    artist: "Rocky Aur Rani Kii Prem Kahaani",
    src: "/audio/wedding-music.m4a",
  },
  events: [
    {
      title: "Aashirwad",
      day: "Wednesday, 25th November",
      time: "11:00 AM onwards",
      note: "Sacred blessings as new beginnings unfold",
    },
    {
      title: "Ring Ceremony",
      day: "Wednesday, 25th November",
      time: "6:00 PM onwards",
      note: "An evening of love, rings, and celebration",
    },
    {
      title: "Haldi",
      day: "Thursday, 26th November",
      time: "8:00 AM onwards",
      note: "Sun-kissed smiles, haldi glow, and joyful laughter",
    },
    {
      title: "Wedding",
      day: "Thursday, 26th November",
      time: "6:00 PM onwards",
      note: "The auspicious vows and sacred pheras",
    },
  ] as WeddingEvent[],
  venue: {
    name: "Hotel Blue Paradise",
    address: "Mul Road, Near Bhavanji Bhai School, Chandrapur, Maharashtra - 442401",
    mapUrl: "https://maps.app.goo.gl/UR1ydysvvZayDw7A7?g_st=aw",
  },
};
