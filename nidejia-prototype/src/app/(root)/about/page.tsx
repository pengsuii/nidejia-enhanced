"use client";
import Title from "@/components/atomics/title";
import Image from "next/image";
import { Button } from "@/components/atomics/button";
import CardIndicator from "@/components/molecules/card/card-indicator";
import CardReview from "@/components/molecules/card/card-review";
import Link from "next/link";
import LightRays from "@/components/effects/LightRays";

const counters = [
  { icon: "/icons/global.svg", title: "30+", subtitle: "Cities Covered" },
  { icon: "/icons/house-2.svg", title: "2.5K+", subtitle: "Active Listings" },
  { icon: "/icons/people-2.svg", title: "4.8/5", subtitle: "Avg. Rating" },
  { icon: "/icons/security-user.svg", title: "24/7", subtitle: "Support" },
];

export default function AboutPage() {
  return (
    <main>
      {/* Header Simple Section */}
      <section className="relative mt-0 w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] pt-[180px] pb-[80px] min-h-[560px] overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[#0B0B13]" />
        <div className="absolute inset-0 -z-10">
          <LightRays
            raysOrigin="top-center"
            raysColor="#F59E0B"
            raysSpeed={1.2}
            lightSpread={5}
            rayLength={11}
            followMouse={true}
            mouseInfluence={0.08}
            noiseAmount={0.06}
            distortion={0.03}
          />
        </div>
        <div className="px-10 xl:container xl:mx-auto max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-bold text-white text-[36px] leading-[48px]">About Nidejia</h1>
          <p className="text-white/80 mt-3">
            Kami membantu siapa pun menemukan ruang hidup dan kerja yang nyaman, aman, dan terjangkau.
          </p>
          <div className="mt-6">
            <Button variant="default" size="button" className="shadow-button">
              <Link href="/featured">Mulai Jelajahi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className="px-10 xl:container xl:mx-auto py-[50px]">
        <div className="h-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {counters.map((c, i) => (
            <div key={i} className="bg-gray-light rounded-[20px] px-6 py-6">
              <div className="flex justify-center">
                <CardIndicator icon={c.icon} title={c.title} subtitle={c.subtitle} section="" variant="indicator" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="px-10 xl:container xl:mx-auto py-[30px]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bold text-secondary text-[28px] leading-[42px]">Cerita Kami</h2>
          <p className="text-subtitle mt-4 leading-7">
            Nidejia lahir dari kebutuhan akan platform yang transparan dan mudah digunakan untuk menemukan
            hunian dan ruang kerja. Kami memadukan data yang akurat, desain yang intuitif, dan dukungan manusia
            yang hangat agar proses pencarian terasa menyenangkan.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-gray-light rounded-[20px] p-6">
              <h3 className="font-semibold text-secondary mb-2">2024</h3>
              <p className="text-subtitle text-sm">Mulai riset dan validasi kebutuhan pengguna.</p>
            </div>
            <div className="bg-gray-light rounded-[20px] p-6">
              <h3 className="font-semibold text-secondary mb-2">2025</h3>
              <p className="text-subtitle text-sm">MVP rilis. 2.5K+ listing aktif di 30+ kota.</p>
            </div>
            <div className="bg-gray-light rounded-[20px] p-6">
              <h3 className="font-semibold text-secondary mb-2">Next</h3>
              <p className="text-subtitle text-sm">Skalakan kemitraan, verifikasi listing lebih ketat, dan pengalaman super-app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-10 xl:container xl:mx-auto py-[30px]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-bold text-secondary text-[28px] leading-[42px] text-center">Mengapa Memilih Nidejia</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-light rounded-[20px] p-6">
              <h3 className="font-semibold text-secondary mb-2">Verifikasi & Transparansi</h3>
              <p className="text-subtitle text-sm">Listing diverifikasi, harga dan biaya jelas sejak awal.</p>
            </div>
            <div className="bg-gray-light rounded-[20px] p-6">
              <h3 className="font-semibold text-secondary mb-2">Pencarian Cepat & Tepat</h3>
              <p className="text-subtitle text-sm">Filter detail (wifi, kapasitas, fasilitas) dan rekomendasi pintar.</p>
            </div>
            <div className="bg-gray-light rounded-[20px] p-6">
              <h3 className="font-semibold text-secondary mb-2">Dukungan 24/7</h3>
              <p className="text-subtitle text-sm">Tim kami siap membantu dari pencarian hingga pindah.</p>
            </div>
            <div className="bg-gray-light rounded-[20px] p-6">
              <h3 className="font-semibold text-secondary mb-2">Pembayaran Aman</h3>
              <p className="text-subtitle text-sm">Metode pembayaran tepercaya dengan perlindungan transaksi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Spotlight */}
      <section className="px-10 xl:container xl:mx-auto py-[30px]">
        <div className="flex justify-center text-center">
          <Title title="Mereka yang Bahagia" subtitle="Cerita singkat dari pelanggan kami" section="" />
        </div>
        <div className="mt-[30px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]">
          <CardReview rating={5} review="Pelayanan cepat, listing sesuai foto. Proses pindah jadi mudah!" avatar="/images/avatar-review.svg" username="Maya S." jobdesk="Content Creator" />
          <CardReview rating={4} review="Fitur filter-nya membantu banget cari kos sesuai budget." avatar="/images/avatar-review.svg" username="Rizky P." jobdesk="Mahasiswa" />
          <CardReview rating={5} review="Transparan dan aman. CS responsif 24 jam." avatar="/images/avatar-review.svg" username="Dewi S." jobdesk="Designer" />
        </div>
      </section>

      {/* Bottom Banner with CTA Overlay */}
      <section className="mt-0">
        <div className="relative w-full h-[420px] xl:h-[500px]">
          <Image
            src="/images/banner-about.jpeg"
            alt="About Nidejia banner"
            fill
            className="object-cover rounded-none"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center px-10">
            <div className="rounded-[20px] p-8 text-center w-full max-w-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Bergabung Bersama Kami</h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Ingin mulai mencari hunian atau mendaftarkan properti Anda? Mari wujudkan ruang hidup yang lebih nyaman.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="button" className="shadow-button">
                  <Link href="/featured">Cari Properti</Link>
                </Button>
                <Button variant="third" size="button">
                  <Link href="/sign-in">Jadi Mitra</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
