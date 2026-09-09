// app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#111827] text-white flex flex-col">
      <div className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full">
        <h1 className="text-4xl font-extrabold mb-4">Namibia Business Directory</h1>
        <p className="text-lg text-[#9CA8C0] mb-8">
          Find trusted businesses across Namibia. List your business to get discovered.
        </p>

        <div className="bg-[#131C30] border border-[#1E2A42] p-6 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
          <p className="text-[#9CA8C0]">
            Your website is live. Next we'll add search, categories, and business listings.
          </p>
        </div>

        <Link
          href="/join"
          className="inline-block bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition"
        >
          List Your Business
        </Link>
      </div>

      <footer className="border-t border-[#1E2A42] py-6 text-center text-xs text-[#6B7A99]">
        allinone TRUST 905 &nbsp;•&nbsp; Instagram: @allinone.trust.905 &nbsp;•&nbsp; WhatsApp: 085 7758 227
      </footer>
    </main>
  );
}
