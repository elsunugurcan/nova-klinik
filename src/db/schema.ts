import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const services = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),          // Estetik | Dermatoloji | Lazer | Saç
  summary: text("summary").notNull(),
  description: text("description").notNull(),    // Markdown
  duration: integer("duration").notNull(),       // dakika
  icon: text("icon").notNull(),                  // lucide ikon adı
  sortOrder: integer("sort_order").notNull().default(0),
  highlights: text("highlights", { mode: "json" }).$type<string[]>().notNull(),
  faqs: text("faqs", { mode: "json" }).$type<{ q: string; a: string }[]>().notNull(),
});

export const doctors = sqliteTable("doctors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  title: text("title").notNull(),                // Uzm. Dr., Op. Dr., Dr.
  specialty: text("specialty").notNull(),
  bio: text("bio").notNull(),
  education: text("education", { mode: "json" }).$type<string[]>().notNull(),
  languages: text("languages").notNull(),
  experienceYears: integer("experience_years").notNull(),
  color: text("color").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const doctorServices = sqliteTable("doctor_services", {
  doctorId: integer("doctor_id").notNull().references(() => doctors.id),
  serviceId: integer("service_id").notNull().references(() => services.id),
}, (t) => ({ pk: primaryKey({ columns: [t.doctorId, t.serviceId] }) }));

export const schedules = sqliteTable("schedules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  doctorId: integer("doctor_id").notNull().references(() => doctors.id),
  weekday: integer("weekday").notNull(),         // 0 Pazar … 6 Cumartesi
  start: text("start").notNull(),                // "09:00"
  end: text("end").notNull(),
  breakStart: text("break_start"),
  breakEnd: text("break_end"),
});

export const appointments = sqliteTable("appointments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull().unique(),
  serviceId: integer("service_id").notNull().references(() => services.id),
  doctorId: integer("doctor_id").notNull().references(() => doctors.id),
  date: text("date").notNull(),                  // YYYY-MM-DD
  time: text("time").notNull(),                  // HH:MM
  duration: integer("duration").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  note: text("note"),
  status: text("status").notNull().default("bekliyor"), // bekliyor | onaylandi | tamamlandi | iptal
  kvkk: integer("kvkk", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  tags: text("tags", { mode: "json" }).$type<string[]>().notNull(),
  authorId: integer("author_id").references(() => doctors.id),
  publishedAt: text("published_at").notNull(),
});

export type Service = typeof services.$inferSelect;
export type Doctor = typeof doctors.$inferSelect;
export type Schedule = typeof schedules.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Post = typeof posts.$inferSelect;
