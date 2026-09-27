/**
 * Randevu motoru — saf fonksiyonlar, test edilebilir.
 * Saatler "HH:MM", tarihler "YYYY-MM-DD" (yerel gün; saat dilimi kayması olmaması için parçalar ayrı ayrı işlenir).
 */
export type DaySchedule = { weekday: number; start: string; end: string; breakStart?: string | null; breakEnd?: string | null };
export type Booked = { time: string; duration: number };
export type Slot = { time: string; available: boolean; reason?: "gecti" | "dolu" };

export const toMin = (hhmm: string) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
export const toHHMM = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
export const parseDate = (iso: string) => { const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d); };
export const toISODate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
export const weekdayOf = (iso: string) => parseDate(iso).getDay();

const overlaps = (aStart: number, aEnd: number, bStart: number, bEnd: number) => aStart < bEnd && bStart < aEnd;

/** Bir hekimin belirli bir gündeki randevu slotları. */
export function generateSlots(schedules: DaySchedule[], dateISO: string, duration: number, booked: Booked[], now: Date = new Date(), step = 30): Slot[] {
  const wd = weekdayOf(dateISO);
  const days = schedules.filter((s) => s.weekday === wd);
  if (!days.length) return [];
  const today = toISODate(now) === dateISO;
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const out: Slot[] = [];
  for (const day of days) {
    const start = toMin(day.start), end = toMin(day.end);
    const bs = day.breakStart ? toMin(day.breakStart) : null, be = day.breakEnd ? toMin(day.breakEnd) : null;
    for (let t = start; t + duration <= end; t += step) {
      if (bs !== null && be !== null && overlaps(t, t + duration, bs, be)) continue;
      const time = toHHMM(t);
      if (today && t <= nowMin + 30) { out.push({ time, available: false, reason: "gecti" }); continue; }
      const busy = booked.some((b) => overlaps(t, t + duration, toMin(b.time), toMin(b.time) + b.duration));
      out.push(busy ? { time, available: false, reason: "dolu" } : { time, available: true });
    }
  }
  return out.sort((a, b) => toMin(a.time) - toMin(b.time));
}

/** Önümüzdeki N gün içinde hekimin çalıştığı günler. */
export function workingDates(schedules: DaySchedule[], from: Date, days = 14): string[] {
  const wds = new Set(schedules.map((s) => s.weekday));
  const out: string[] = [];
  for (let i = 0; i < days; i++) { const d = addDays(from, i); if (wds.has(d.getDay())) out.push(toISODate(d)); }
  return out;
}

/** Belirli bir slot hâlâ alınabilir mi? (Rezervasyon anında sunucuda tekrar kontrol edilir.) */
export function isSlotAvailable(schedules: DaySchedule[], dateISO: string, time: string, duration: number, booked: Booked[], now: Date = new Date()) {
  return generateSlots(schedules, dateISO, duration, booked, now).some((s) => s.time === time && s.available);
}

export const makeCode = (random = Math.random) => "NK-" + Array.from({ length: 6 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(random() * 32)]).join("");

export const WEEKDAYS_TR = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
export const fmtDateTR = (iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", weekday: "long" }) => parseDate(iso).toLocaleDateString("tr-TR", opts);
