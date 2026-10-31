import { CalendarPlus, MapPin, Navigation, Sparkles, Gem, Sun, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { wedding, WeddingEvent } from "./data";
import { Reveal, Ornament } from "./Reveal";

function icsStamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function addToCalendar() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invite//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding`,
    `DTSTAMP:${icsStamp(new Date().toISOString())}`,
    `DTSTART:${icsStamp(wedding.dateISO)}`,
    `DTEND:${icsStamp(wedding.endISO)}`,
    `SUMMARY:${wedding.groom.name} & ${wedding.bride.name} — Wedding Celebrations`,
    `LOCATION:${wedding.venue.name}, ${wedding.venue.address}`,
    "DESCRIPTION:Wedding celebrations of Abhishek and Sudeepa.\\n\\n• Aashirwad: Wednesday, 25th November 11:00 AM onwards\\n• Ring Ceremony: Wednesday, 25th November 6:00 PM onwards\\n• Haldi: Thursday, 26th November 8:00 AM onwards\\n• Wedding: Thursday, 26th November 6:00 PM onwards",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "abhishek-sudeepa-wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
}

const eventIcons = [Sun, Gem, Sparkles, Heart];

export function EventDetails() {
  return (
    <section className="relative px-5 py-20">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <Ornament label="When & Where" />
          <h2 className="text-primary mt-5 text-4xl font-light">The celebration</h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-xs text-xs tracking-wide">
            Join us as we celebrate two days of sacred ceremonies and timeless moments
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-gold/30 bg-card shadow-luxe mt-8 overflow-hidden rounded-[2rem] border">
            <div className="from-primary to-emerald-ink bg-gradient-to-br px-6 py-7 text-center">
              <p className="text-gold/80 text-[0.6rem] tracking-[0.45em] uppercase">
                Save the date
              </p>
              <p className="text-ivory font-display mt-2 text-5xl font-light">25 & 26</p>
              <p className="text-ivory/85 text-sm tracking-[0.35em] uppercase">
                November 2026
              </p>
            </div>

            <div className="divide-gold/15 divide-y">
              {wedding.events.map((evt: WeddingEvent, idx: number) => {
                const Icon = eventIcons[idx % eventIcons.length] ?? Sparkles;
                return (
                  <div key={evt.title} className="flex items-start gap-4 px-6 py-4.5">
                    <span className="bg-secondary text-primary mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/20">
                      <Icon className="h-4 w-4 text-gold" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-primary font-medium text-base tracking-wide">
                          {evt.title}
                        </p>
                        <span className="text-gold font-medium text-xs tracking-wider whitespace-nowrap">
                          {evt.time}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs mt-0.5">{evt.day}</p>
                      {evt.note && (
                        <p className="text-foreground/70 text-[0.75rem] mt-1 italic">
                          {evt.note}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="flex items-start gap-4 px-6 py-4.5 bg-secondary/30">
                <span className="bg-secondary text-primary mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/20">
                  <MapPin className="h-4 w-4 text-gold" />
                </span>
                <div className="min-w-0">
                  <p className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase">
                    Venue
                  </p>
                  <p className="text-foreground text-sm font-medium">{wedding.venue.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                    {wedding.venue.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 pt-3 pb-6">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={addToCalendar}
                className="from-primary to-emerald-ink text-ivory shadow-gold flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r py-4 text-xs tracking-[0.3em] uppercase cursor-pointer"
              >
                <CalendarPlus className="h-4 w-4" />
                Add to calendar
              </motion.button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="border-gold/30 bg-card shadow-luxe mt-6 overflow-hidden rounded-[2rem] border">
            <div className="relative">
              <img
                src="/images/map-preview.jpg"
                alt={`Map to ${wedding.venue.name}`}
                loading="lazy"
                width={1024}
                height={768}
                className="h-48 w-full object-cover"
              />
              <div className="from-card absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            </div>
            <div className="px-6 pt-2 pb-6 text-center">
              <p className="text-primary text-xl font-medium">{wedding.venue.name}</p>
              <p className="text-muted-foreground mt-1 text-xs max-w-xs mx-auto leading-relaxed">
                {wedding.venue.address}
              </p>
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={wedding.venue.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="border-gold/50 text-primary hover:bg-secondary mt-5 inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-xs tracking-[0.3em] uppercase transition-colors"
              >
                <Navigation className="h-4 w-4" />
                Get directions
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
