"use server";
import { z } from "zod";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";
import { generateSlots, isSlotAvailable, workingDates, makeCode, type Slot } from "@/lib/slots";
import { bookedFor, schedulesForDoctor } from "@/lib/queries";

/** Bir hekim + hizmet için tarih listesi ve seçili günün slotları. */
export async function getAvailability(doctorId: number, serviceId: number, date?: string): Promise<{ dates: string[]; date: string | null; slots: Slot[] }> {
  const sched = schedulesForDoctor(doctorId);
  const service = db.select().from(schema.services).where(eq(schema.services.id, serviceId)).get();
  if (!service) return { dates: [], date: null, slots: [] };
  const dates = workingDates(sched, new Date(), 21);
  const chosen = date && dates.includes(date) ? date : dates[0] ?? null;
  if (!chosen) return { dates, date: null, slots: [] };
  return { dates, date: chosen, slots: generateSlots(sched, chosen, service.duration, bookedFor(doctorId, chosen)) };
}

const bookingSchema = z.object({
  serviceId: z.number().int().positive(),
  doctorId: z.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Tarih seçin"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Saat seçin"),
  name: z.string().trim().min(3, "Ad soyad en az 3 karakter"),
  phone: z.string().transform((v) => v.replace(/[\s\-()]/g, "")).pipe(z.string().regex(/^(\+90|0)?5\d{9}$/, "Telefon 05xx xxx xx xx biçiminde olmalı")),
  email: z.string().trim().email("Geçerli bir e-posta girin").optional().or(z.literal("")),
  note: z.string().trim().max(500, "Not en fazla 500 karakter").optional(),
  kvkk: z.literal(true, { message: "KVKK aydınlatma metnini onaylamanız gerekir" }),
});
export type BookingErrors = Record<string, string>;

export async function bookAppointment(raw: unknown): Promise<{ ok: true; code: string } | { ok: false; errors: BookingErrors }> {
  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) { const errors: BookingErrors = {}; for (const i of parsed.error.issues) errors[String(i.path[0] ?? "form")] = i.message; return { ok: false, errors }; }
  const d = parsed.data;
  const service = db.select().from(schema.services).where(eq(schema.services.id, d.serviceId)).get();
  const doctor = db.select().from(schema.doctors).where(eq(schema.doctors.id, d.doctorId)).get();
  if (!service || !doctor) return { ok: false, errors: { form: "Hizmet veya hekim bulunamadı." } };
  const offers = db.select().from(schema.doctorServices).where(eq(schema.doctorServices.doctorId, d.doctorId)).all().some((r) => r.serviceId === d.serviceId);
  if (!offers) return { ok: false, errors: { form: "Bu hekim seçilen hizmeti vermiyor." } };

  // Çift rezervasyonu önlemek için kontrol + ekleme tek işlemde
  try {
    const code = db.transaction((tx) => {
      const sameDay = tx.select().from(schema.appointments).where(eq(schema.appointments.doctorId, d.doctorId)).all().filter((a) => a.date === d.date && a.status !== "iptal").map((a) => ({ time: a.time, duration: a.duration }));
      if (!isSlotAvailable(schedulesForDoctor(d.doctorId), d.date, d.time, service.duration, sameDay)) throw new Error("slot");
      const code = makeCode();
      tx.insert(schema.appointments).values({ code, serviceId: d.serviceId, doctorId: d.doctorId, date: d.date, time: d.time, duration: service.duration, name: d.name, phone: d.phone.replace(/^\+90/, "0").replace(/^5/, "05"), email: d.email || null, note: d.note || null, kvkk: true }).run();
      return code;
    });
    return { ok: true, code };
  } catch (e) {
    if ((e as Error).message === "slot") return { ok: false, errors: { time: "Bu saat az önce dolmuş görünüyor; lütfen başka bir saat seçin." } };
    throw e;
  }
}

export async function cancelAppointment(code: string, phone: string): Promise<{ ok: boolean; error?: string }> {
  const a = db.select().from(schema.appointments).where(eq(schema.appointments.code, code.trim().toUpperCase())).get();
  if (!a || a.phone !== phone.replace(/\s/g, "")) return { ok: false, error: "Randevu bulunamadı. Kod ve telefonu kontrol edin." };
  if (a.status === "iptal") return { ok: false, error: "Bu randevu zaten iptal edilmiş." };
  db.update(schema.appointments).set({ status: "iptal" }).where(eq(schema.appointments.id, a.id)).run();
  return { ok: true };
}

const contactSchema = z.object({
  name: z.string().trim().min(3, "Ad soyad en az 3 karakter"),
  email: z.string().trim().email("Geçerli bir e-posta girin"),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(3, "Konu girin"),
  body: z.string().trim().min(10, "Mesaj en az 10 karakter"),
  kvkk: z.literal(true, { message: "KVKK onayı gerekli" }),
});
export async function sendMessage(raw: unknown): Promise<{ ok: true } | { ok: false; errors: BookingErrors }> {
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) { const errors: BookingErrors = {}; for (const i of parsed.error.issues) errors[String(i.path[0] ?? "form")] = i.message; return { ok: false, errors }; }
  const d = parsed.data;
  db.insert(schema.messages).values({ name: d.name, email: d.email, phone: d.phone || null, subject: d.subject, body: d.body }).run();
  return { ok: true };
}
