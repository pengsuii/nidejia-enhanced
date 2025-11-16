"use client";
import { Button } from "@/components/atomics/button";
import Title from "@/components/atomics/title";
import CardDeals from "@/components/molecules/card/card-deals";
import { useGetAllListingQuery } from "@/services/listing.service";
import Image from "next/image";
import Link from "next/link";

export default function ExplorePage() {
  const { data: listings, isLoading } = useGetAllListingQuery({});

  const allListings = listings?.data?.data || [];
  const featuredListings = allListings.slice(0, 4);
  const trendingListings = allListings.slice(4, 8);
  const recommendedListings = allListings.slice(8, 12);

  // Debug: Log data untuk melihat struktur
  console.log('Listings data:', {
    hasData: !!listings,
    dataLength: allListings.length,
    firstListing: allListings[0],
    storageUrl: process.env.NEXT_PUBLIC_STORAGE_BASE_URL
  });

  return (
    <main>
      {/* Header Section */}
      <section className="relative mt-0 w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] pt-[120px] pb-[60px] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#0B0B13] to-[#1a1a2e]" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#F59E0B]/20 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#3B82F6]/20 rounded-full blur-xl" />
        </div>
        <div className="px-10 xl:container xl:mx-auto max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-bold text-white text-[36px] leading-[48px] mb-4">
            Jelajahi Properti Terbaik
          </h1>
          <p className="text-white/80 text-lg">
            Temukan hunian dan ruang kerja yang sempurna dengan koleksi properti pilihan kami
          </p>
        </div>
      </section>


      {/* Featured Properties */}
      <section className="px-10 xl:container xl:mx-auto py-[30px]">
        <div className="flex justify-center text-center mb-8">
          <Title 
            title="Properti Unggulan" 
            subtitle="Pilihan terbaik dari koleksi kami" 
            section="" 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {featuredListings.length > 0 ? (
            featuredListings.map((listing: any) => (
              <CardDeals
                key={listing.id}
                image={listing.attachments?.[0] || null}
                title={listing.title}
                slug={`/listing/${listing.slug}`}
                price={listing.price_per_day}
                wide={listing.sqft}
                capacity={listing.max_person}
                wifi={listing.wifi_speed}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-subtitle text-lg">Belum ada properti unggulan tersedia</p>
              <p className="text-subtitle text-sm mt-2">Coba pilih kategori lain atau kembali lagi nanti</p>
            </div>
          )}
        </div>
      </section>

      {/* Trending Now */}
      <section className="px-10 xl:container xl:mx-auto py-[30px]">
        <div className="flex justify-center text-center mb-8">
          <Title 
            title="Trending Sekarang" 
            subtitle="Properti yang sedang populer" 
            section="" 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {trendingListings.map((listing: any) => (
            <CardDeals
              key={listing.id}
              image={listing.attachments?.[0] || null}
              title={listing.title}
              slug={`/listing/${listing.slug}`}
              price={listing.price_per_day}
              wide={listing.sqft}
              capacity={listing.max_person}
              wifi={listing.wifi_speed}
            />
          ))}
        </div>
      </section>

      {/* Recommended for You */}
      <section className="px-10 xl:container xl:mx-auto py-[30px]">
        <div className="flex justify-center text-center mb-8">
          <Title 
            title="Rekomendasi untuk Anda" 
            subtitle="Berdasarkan preferensi dan lokasi" 
            section="" 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {recommendedListings.map((listing: any) => (
            <CardDeals
              key={listing.id}
              image={listing.attachments?.[0] || null}
              title={listing.title}
              slug={`/listing/${listing.slug}`}
              price={listing.price_per_day}
              wide={listing.sqft}
              capacity={listing.max_person}
              wifi={listing.wifi_speed}
            />
          ))}
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="px-10 xl:container xl:mx-auto py-[30px]">
        <div className="bg-gradient-to-r from-primary to-[#F59E0B] rounded-[20px] p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Penawaran Spesial Hari Ini</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Dapatkan diskon hingga 50% untuk booking pertama dan nikmati fasilitas premium
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/featured">
              <Button variant="secondary" size="button">
                Lihat Penawaran
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="outline" size="button" className="border-white text-white hover:bg-white hover:text-primary">
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="px-10 xl:container xl:mx-auto py-[30px] text-center">
        <Button variant="default" size="button" className="shadow-button">
          Lihat Lebih Banyak
        </Button>
      </section>
    </main>
  );
}
