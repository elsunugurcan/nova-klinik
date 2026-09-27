import { describe, it, expect } from "vitest";
import { generateSlots, workingDates, isSlotAvailable, makeCode, toMin, toHHMM, weekdayOf, type DaySchedule } from "./slots";

const sched: DaySchedule[] = [
  { weekday: 1, start: "09:00", end: "12:00", breakStart: "10:30", breakEnd: "11:00" },
  { weekday: 3, start: "14:00", end: "16:00" },
];
const monday = "2026-10-05"; // Pazartesi
const past = new Date(2026, 8, 1, 8, 0);

describe("saat yardımcıları", () => {
  it("HH:MM ↔ dakika dönüşümü", () => { expect(toMin("09:30")).toBe(570); expect(toHHMM(570)).toBe("09:30"); expect(toHHMM(0)).toBe("00:00"); });
  it("haftanın günü yerel tarihten hesaplanır", () => { expect(weekdayOf(monday)).toBe(1); expect(weekdayOf("2026-10-04")).toBe(0); });
});

describe("slot üretimi", () => {
  it("çalışılmayan günde slot yok", () => { expect(generateSlots(sched, "2026-10-06", 30, [], past)).toEqual([]); });
  it("30 dk adımlarla üretir, molayı atlar, süreyi bitişe sığdırır", () => {
    const s = generateSlots(sched, monday, 30, [], past).map((x) => x.time);
    expect(s).toEqual(["09:00", "09:30", "10:00", "11:00", "11:30"]);
  });
  it("60 dk hizmette molaya taşan slotlar çıkar", () => {
    const s = generateSlots(sched, monday, 60, [], past).map((x) => x.time);
    expect(s).toEqual(["09:00", "09:30", "11:00"]);
  });
  it("dolu randevular çakışan slotları kapatır", () => {
    const s = generateSlots(sched, monday, 30, [{ time: "09:30", duration: 45 }], past);
    expect(s.find((x) => x.time === "09:30")?.available).toBe(false);
    expect(s.find((x) => x.time === "10:00")?.available).toBe(false); // 09:30–10:15 ile çakışır
    expect(s.find((x) => x.time === "09:00")?.available).toBe(true);
    expect(s.find((x) => x.time === "10:00")?.reason).toBe("dolu");
  });
  it("bugün için geçmiş saatler ve 30 dk içindekiler kapalıdır", () => {
    const now = new Date(2026, 9, 5, 9, 40); // Pazartesi 09:40
    const s = generateSlots(sched, monday, 30, [], now);
    expect(s.find((x) => x.time === "09:30")?.reason).toBe("gecti");
    expect(s.find((x) => x.time === "10:00")?.reason).toBe("gecti");
    expect(s.find((x) => x.time === "11:00")?.available).toBe(true);
  });
  it("isSlotAvailable rezervasyon anında doğrular", () => {
    expect(isSlotAvailable(sched, monday, "09:00", 30, [], past)).toBe(true);
    expect(isSlotAvailable(sched, monday, "09:00", 30, [{ time: "09:00", duration: 30 }], past)).toBe(false);
    expect(isSlotAvailable(sched, monday, "10:30", 30, [], past)).toBe(false); // mola
    expect(isSlotAvailable(sched, monday, "12:00", 30, [], past)).toBe(false); // mesai dışı
  });
});

describe("çalışma günleri ve kod", () => {
  it("14 gün içinde yalnızca programdaki günler", () => {
    const d = workingDates(sched, new Date(2026, 9, 5), 14);
    expect(d).toEqual(["2026-10-05", "2026-10-07", "2026-10-12", "2026-10-14"]);
  });
  it("randevu kodu NK- ile başlar, karışabilecek karakterler yoktur", () => {
    const c = makeCode(() => 0.999);
    expect(c).toMatch(/^NK-[A-Z2-9]{6}$/); expect(c).not.toMatch(/[01IO]/);
  });
});
