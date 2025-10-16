"use client";
import { Button } from "@/components/atomics/button";
import GlareHover from "@/components/atomics/glare-hover";
import { Input } from "@/components/atomics/input";
import { Separator } from "@/components/atomics/separator";
import SplitText from "@/components/atomics/split-text";
import Title from "@/components/atomics/title";
import CardBenefit from "@/components/molecules/card/card-benefit";
import CardIndicator from "@/components/molecules/card/card-indicator";
import CardPurpose from "@/components/molecules/card/card-purpose";
import CardReview from "@/components/molecules/card/card-review";
import ListingShowcase from "@/components/molecules/listing/listing-showcase";
import ScrollFloat from "@/components/atomics/scroll-float";
import { CategoriesProps } from "@/interfaces/landing-page";
import categories from "@/json/categories.json";
import Image from "next/image";
import Link from "next/link";

function Home() {
  return (
    <main>
      <section
        id="hero-section"
        className={`bg-primary-foreground bg-cover lg:bg-contain bg-right bg-no-repeat bg-[url('/images/bg-image.svg')] min-h-[750px] max-h-[750px] xl:max-h-[850px]`}
      >
        <div className="pt-[226px] container mx-auto">
          <div className="max-w-[555px]">
            <div className="mb-6">
              <SplitText
                text="Find Glorious Living And Loving Space"
                tag="h1"
                className="font-bold text-secondary text-[55px] leading-[82.5px]"
                splitType="chars"
                delay={50}
                duration={0.8}
                ease="power3.out"
                from={{ opacity: 0, y: 60, rotationX: -90 }}
                to={{ opacity: 1, y: 0, rotationX: 0 }}
                threshold={0.1}
                rootMargin="-50px"
                textAlign="left"
              />
            </div>
            <SplitText
              text="Dolor house comfortable si amet with cheap price that also lorem when you need grow."
              tag="h2"
              className="text-lg leading-8 text-secondary mb-8"
              delay={200}
              duration={2}
              ease="power3.out"
              splitType="lines"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
              onLetterAnimationComplete={() => {
                console.log('Subtitle animation completed!');
              }}
            />
            <div className="pt-[50px] flex items-center">
              <div className="grow">
                <Input
                  placeholder="Search by city or country..."
                  variant="hero"
                />
              </div>
              <GlareHover
                glareColor="#fcfe9f"
                glareOpacity={0.4}
                glareAngle={-30}
                glareSize={250}
                transitionDuration={750}
                playOnce={false}
              >
                <Button variant="default" size="hero">
                  Explore
                </Button>
              </GlareHover>
            </div>
          </div>
        </div>
      </section>

      <section
        id="indicator-section"
        className="px-10 xl:container xl:mx-auto -mt-16 pb-9"
      >
        <div className="h-[128px] flex justify-center xl:justify-between items-center space-x-6 xl:space-x-12 bg-white shadow-indicator rounded-[20px] px-9 py-5 xl:px-[50px] xl:py-[29px]">
          <CardIndicator
            icon="/icons/house-2.svg"
            title="382M"
            subtitle="Kos Available"
            variant="indicator"
            section=""
            useCountUp={true}
            countUpFrom={0}
            countUpDuration={2.5}
            countUpSeparator=""
          />
          <Separator orientation="vertical" className="bg-separator" />
          <CardIndicator
            icon="/icons/people-2.svg"
            title="9/10"
            subtitle="People Happy"
            variant="indicator"
            section=""
            useCountUp={true}
            countUpFrom={0}
            countUpDuration={2.5}
            countUpSeparator=""
          />
          <Separator orientation="vertical" className="bg-separator" />
          <CardIndicator
            icon="/icons/security-user.svg"
            title="100%"
            subtitle="High Security"
            variant="indicator"
            section=""
            useCountUp={true}
            countUpFrom={0}
            countUpDuration={2.5}
            countUpSeparator=""
          />
          <Separator orientation="vertical" className="bg-separator" />
          <CardIndicator
            icon="/icons/global.svg"
            title="183"
            subtitle="Countries"
            variant="indicator"
            section=""
            useCountUp={true}
            countUpFrom={0}
            countUpDuration={2.5}
            countUpSeparator=""
          />
        </div>
      </section>

      <ListingShowcase
        id="deals-section"
        title="Our Latest Deals"
        subtitle="Explore the beauty of architecture and living love"
      />

      <section id="categories-section" className="bg-gray-light">
        <div className="px-10 xl:container xl:mx-auto py-[50px]">
          <div className="flex items-center justify-between">
            <div>
              <ScrollFloat
                animationDuration={1}
                ease='back.inOut(2)'
                scrollStart='top bottom'
                scrollEnd='bottom center'
                stagger={0.08}
                requireScroll
                containerClassName=""
                textClassName="text-xl font-semibold leading-6 text-secondary"
                scrub
              >
                Categories
              </ScrollFloat>
              <h2 className="text-base leading-6 text-subtitle">We provide everything</h2>
            </div>
            <div>
              <Button variant="default" size="button" className="shadow-button">
                Explore All
              </Button>
            </div>
          </div>

            <div className="mt-[30px] grid grid-cols-3 xl:grid-cols-4 gap-[30px]">
              {categories.data.map((item: CategoriesProps, index: number) => (
                <div key={index} data-scroll-float="item">
                  <CardIndicator
                    icon={item.icon}
                    title={item.title}
                    subtitle={item.subtitle}
                    section="categories"
                  />
                </div>
              ))}
            </div>
        </div>
      </section>

      <section
        id="benefits-section"
        className="px-10 xl:container xl:mx-auto mt-[100px]"
      >
        <div className="flex justify-between gap-4">
          <div className="max-w-[320px] xl:max-w-[383px]">
            <h1 className="font-bold text-[28px] leading-[42px] max-w-[350px]">
              Huge Benefits That Make You Feel Happier
            </h1>
            <ul className="mt-[30px] space-y-5">
              <CardBenefit benefit="Checking faster without depositing" />
              <CardBenefit benefit="24/7 security guarding your place" />
              <CardBenefit benefit="Fast-internet access without lagging" />
              <CardBenefit benefit="High standard of layout of houses" />
              <CardBenefit benefit="All other benefits, we promise" />
            </ul>
            <div className="mt-[30px] flex items-center space-x-3 xl:space-x-[14px]">
              <Button
                variant="default"
                size="header"
                className="flex items-center"
              >
                <Image
                  src="/icons/message-notif.svg"
                  alt="message-notif"
                  height={0}
                  width={0}
                  className="h-5 w-5 mr-2.5"
                />
                Call Sales
              </Button>
              <Button variant="third" size="header">
                All Benefits
              </Button>
            </div>
          </div>
          <div className="max-w-[650px] grid grid-cols-2 gap-6 xl:gap-[30px]">
            <CardPurpose
              image="/images/image-benefit-1.svg"
              title="House for Office and Living"
              purpose="18,309"
            />
            <CardPurpose
              image="/images/image-benefit-2.svg"
              title="House Nearby with Mall"
              purpose="84,209"
            />
            <CardPurpose
              image="/images/image-benefit-3.svg"
              title="House Historical Building"
              purpose="22,409"
            />
            <CardPurpose
              image="/images/image-benefit-4.svg"
              title="Landed House with Park"
              purpose="47,584"
            />
          </div>
        </div>
      </section>

      <section id="review-section" className="container mx-auto my-[100px]">
        <div className="flex justify-center text-center">
          <Title
            title="Happy Customers"
            subtitle={`We’d love to come back again soon`}
            section=""
          />
        </div>
        <div className="mt-[30px] grid grid-cols-3 gap-[30px]">
          <div className="space-y-[30px]">
            <CardReview
              rating={4}
              review="I was not so sure if there was a beautiful bedroom, but it was really great experience."
              avatar="/images/avatar-review.svg"
              username="Evelin Bie"
              jobdesk="Full-Time Traveler"
            />
            <CardReview
              rating={4}
              review="It’s just amazing, will be back."
              avatar="/images/avatar-review.svg"
              username="Evelin Bie"
              jobdesk="Full-Time Traveler"
            />
            <CardReview
              rating={4}
              review="I was not so sure if there was a beautiful bedroom, but it was really great experience."
              avatar="/images/avatar-review.svg"
              username="Evelin Bie"
              jobdesk="Full-Time Traveler"
            />
          </div>
          <div className="space-y-[30px]">
            <CardReview
              rating={5}
              review="Price was too low yet luxury."
              avatar="/images/avatar-review.svg"
              username="Evelin Bie"
              jobdesk="Full-Time Traveler"
            />
            <CardReview
              rating={4}
              review="I was not so sure if there was a beautiful bedroom, but it was really great experience."
              avatar="/images/avatar-review.svg"
              username="Evelin Bie"
              jobdesk="Full-Time Traveler"
            />
            <CardReview
              rating={5}
              review="During covid I was stayed here and I got a lot of full of supports that I need to keep my body healthy."
              avatar="/images/avatar-review.svg"
              username="Evelin Bie"
              jobdesk="Full-Time Traveler"
            />
          </div>
          <div className="space-y-[30px]">
            <CardReview
              rating={4}
              review="I was not so sure if there was a beautiful bedroom, but it was really great experience."
              avatar="/images/avatar-review.svg"
              username="Evelin Bie"
              jobdesk="Full-Time Traveler"
            />
            <CardReview
              rating={4}
              review="It’s just amazing, will be back."
              avatar="/images/avatar-review.svg"
              username="Evelin Bie"
              jobdesk="Full-Time Traveler"
            />
            <CardReview
              rating={4}
              review="I was not so sure if there was a beautiful bedroom, but it was really great experience."
              avatar="/images/avatar-review.svg"
              username="Evelin Bie"
              jobdesk="Full-Time Traveler"
            />
          </div>
        </div>
        
        {/* View All Testimonials Button */}
        <div className="text-center mt-8">
          <Button variant="default" size="button" className="shadow-button">
            <Link href="/testimonials">View All Testimonials</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

export default Home;
