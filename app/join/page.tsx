// app/join/page.tsx
//
// The actual page at yoursite.com/join — renders the connected JoinForm
// component (saves to Supabase as "pending" + still offers WhatsApp).

import JoinForm from "@/components/JoinForm";

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-[#111827]">
      <div className="max-w-md mx-auto">
        <div className="px-4 pt-8 pb-2">
          <h1 className="text-2xl font-extrabold text-white mb-2">
            List Your Business
          </h1>
          <p className="text-sm text-[#9CA8C0] leading-relaxed">
            Get discovered by customers across Namibia. Takes about 2 minutes —
            we review every submission before it goes live.
          </p>
        </div>
        <JoinForm />
      </div>
    </main>
  );
}
