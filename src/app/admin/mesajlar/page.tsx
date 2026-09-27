import { db, schema } from "@/db";
import { desc } from "drizzle-orm";
import { markRead } from "../actions";
export const dynamic = "force-dynamic";
export default function Page() {
  const list = db.select().from(schema.messages).orderBy(desc(schema.messages.id)).all();
  return <div className="space-y-3">{list.length === 0 && <div className="card p-10 text-center text-stone2">Henüz mesaj yok.</div>}{list.map((m) => <div key={m.id} className={`card p-5 ${m.isRead ? "opacity-60" : ""}`}><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="font-semibold">{m.subject}</div><div className="text-xs text-stone2">{m.name} · {m.email}{m.phone ? ` · ${m.phone}` : ""} · {new Date(m.createdAt + "Z").toLocaleString("tr-TR")}</div></div>{!m.isRead && <form action={async () => { "use server"; await markRead(m.id); }}><button className="btn-outline !py-1.5 text-xs">Okundu</button></form>}</div><p className="mt-3 whitespace-pre-line text-sm text-ink/75">{m.body}</p></div>)}</div>;
}
