"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";
const PASS = process.env.ADMIN_PASSWORD ?? "nova123";
export async function login(fd: FormData) { if (String(fd.get("password")) !== PASS) redirect("/admin/login?hata=1"); cookies().set("nk_admin", "1", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 8 * 3600 }); redirect("/admin"); }
export async function logout() { cookies().delete("nk_admin"); redirect("/admin/login"); }
export async function isAdmin() { return cookies().get("nk_admin")?.value === "1"; }
export async function setStatus(id: number, status: string) { if (!(await isAdmin())) return; db.update(schema.appointments).set({ status }).where(eq(schema.appointments.id, id)).run(); revalidatePath("/admin"); }
export async function markRead(id: number) { if (!(await isAdmin())) return; db.update(schema.messages).set({ isRead: true }).where(eq(schema.messages.id, id)).run(); revalidatePath("/admin/mesajlar"); }
