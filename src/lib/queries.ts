import { db, schema } from "@/db";
import { eq, and, desc, inArray, ne } from "drizzle-orm";
import type { Doctor, Service } from "@/db/schema";

export const allServices = () => db.select().from(schema.services).orderBy(schema.services.sortOrder).all();
export const getService = (slug: string) => db.select().from(schema.services).where(eq(schema.services.slug, slug)).get() ?? null;
export const allDoctors = () => db.select().from(schema.doctors).orderBy(schema.doctors.sortOrder).all();
export const getDoctor = (slug: string) => db.select().from(schema.doctors).where(eq(schema.doctors.slug, slug)).get() ?? null;
export const allPosts = () => db.select().from(schema.posts).orderBy(desc(schema.posts.publishedAt)).all();
export const getPost = (slug: string) => db.select().from(schema.posts).where(eq(schema.posts.slug, slug)).get() ?? null;

export function doctorsForService(serviceId: number): Doctor[] {
  const ids = db.select({ id: schema.doctorServices.doctorId }).from(schema.doctorServices).where(eq(schema.doctorServices.serviceId, serviceId)).all().map((r) => r.id);
  return ids.length ? db.select().from(schema.doctors).where(inArray(schema.doctors.id, ids)).orderBy(schema.doctors.sortOrder).all() : [];
}
export function servicesForDoctor(doctorId: number): Service[] {
  const ids = db.select({ id: schema.doctorServices.serviceId }).from(schema.doctorServices).where(eq(schema.doctorServices.doctorId, doctorId)).all().map((r) => r.id);
  return ids.length ? db.select().from(schema.services).where(inArray(schema.services.id, ids)).orderBy(schema.services.sortOrder).all() : [];
}
export const schedulesForDoctor = (doctorId: number) => db.select().from(schema.schedules).where(eq(schema.schedules.doctorId, doctorId)).all();
export const bookedFor = (doctorId: number, date: string) =>
  db.select({ time: schema.appointments.time, duration: schema.appointments.duration }).from(schema.appointments)
    .where(and(eq(schema.appointments.doctorId, doctorId), eq(schema.appointments.date, date), ne(schema.appointments.status, "iptal"))).all();
