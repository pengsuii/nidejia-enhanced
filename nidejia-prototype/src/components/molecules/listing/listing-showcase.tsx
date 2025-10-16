"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/atomics/carousel";
import MagicBento from "@/components/atomics/magic-bento";
import Title from "@/components/atomics/title";
import ScrollFloat from "@/components/atomics/scroll-float";
import CardDeals from "@/components/molecules/card/card-deals";
import { Listing } from "@/interfaces/listing";
import { useGetAllListingQuery } from "@/services/listing.service";

interface ListingShowcaseProps {
  id: string;
  title: string;
  subtitle: string;
  params?: Record<string, any>;
}

function ListingShowcase({ id, title, subtitle, params = {} }: ListingShowcaseProps) {
  const{ data: listings } = useGetAllListingQuery(params);

  return (
    <section id={id} className="px-10 xl:container xl:mx-auto pt-16 pb-[100px]">
      <div className="flex justify-center text-center">
        <div>
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="top bottom"
            scrollEnd="bottom center"
            stagger={0.08}
            requireScroll
            textClassName="font-bold text-2xl leading-9 text-secondary"
            scrub
          >
            {title}
          </ScrollFloat>
          <h2 className="leading-6 text-subtitle">{subtitle}</h2>
        </div>
      </div>
      <Carousel className="w-full mt-[30px]">
        <CarouselContent>
          {listings?.data?.data.map((item: Listing, index: number) => (
            <CarouselItem key={index} className="basis-1/4">
              <MagicBento
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={false}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={500}
                particleCount={12}
                glowColor="225, 147, 87"
                className="h-full"
              >
                <CardDeals
                  image={item.attachments?.[0] || ""}
                  title={item.title}
                  slug={"/listing/" + item.slug}
                  price={item.price_per_day}
                  wide={item.sqft}
                  capacity={item.max_person}
                  wifi={item.wifi_speed}
                  priority={index === 0}
                />
              </MagicBento>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

export default ListingShowcase;
