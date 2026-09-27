import CancelForm from "./CancelForm";
export const metadata = { title: "Randevu iptali", robots: { index: false } };
export default function Page() {
  return <section className="container-x py-12"><div className="mx-auto max-w-md"><div className="eyebrow">Randevu</div><h1 className="mt-2 font-serif text-3xl font-bold">Randevu iptali</h1><p className="mt-2 text-sm text-ink/65">Randevu kodunuz ve kayıtlı telefon numaranızla iptal edebilirsiniz. 24 saat öncesine kadar ücretsizdir.</p><div className="mt-6"><CancelForm /></div></div></section>;
}
