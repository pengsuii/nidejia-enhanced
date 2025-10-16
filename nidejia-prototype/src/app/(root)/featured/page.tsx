"use client"
import ListingShowcase from '@/components/molecules/listing/listing-showcase';
import { Button } from '@/components/atomics/button';
import Link from 'next/link';

// export const metadata = {
//   title: 'Featured — Nidejia',
//   description: 'Pilihan listing unggulan di Nidejia',
// };

export default function FeaturedPage() {
  return (
    <main>
      <section className="px-10 xl:container xl:mx-auto mt-[140px]">
        <div className="flex justify-center text-center">
        </div>
      </section>
      <section className="px-10 xl:container xl:mx-auto mt-6">
        <div className="w-full bg-gradient-to-r from-[#FFF7F0] to-[#F0F7FF] border border-gray-100 rounded-3xl px-6 py-5 xl:px-10 xl:py-7 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-secondary text-lg xl:text-xl">Promo Minggu Ini</h3>
            <p className="text-subtitle text-sm xl:text-base">Kurasi unggulan diperbarui tiap 24 jam. Temukan pilihan terbaik untukmu.</p>
          </div>
          <div>
            <Button variant="default" size="button" className="shadow-button">
              <Link href="/">Explore All</Link>
            </Button>
          </div>
        </div>
      </section>

      <ListingShowcase
        id="featured-section"
        title="Top Picks for You"
        subtitle="Temukan listing terbaik pilihan kami"
        params={{ featured: true, strategy: 'score', limit: 12, offset: 0 }}
      />
    </main>
  );
}


