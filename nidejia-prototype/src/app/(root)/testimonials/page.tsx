"use client";
import { Button } from "@/components/atomics/button";
import Title from "@/components/atomics/title";
import CardTestimonial from "@/components/molecules/card/card-testimonial";
import TestimonialFilter from "@/components/molecules/filter/testimonial-filter";
import TestimonialStatistics from "@/components/molecules/testimonial/testimonial-statistics";
import { motion } from "motion/react";
import Link from "next/link";
import { TestimonialProps, TestimonialStatistics as StatsProps, TestimonialFilters } from "@/interfaces/testimonial";
import testimonialsData from "@/json/testimonials.json";

export default function TestimonialsPage() {
  const testimonials: TestimonialProps[] = testimonialsData.data;
  const statistics: StatsProps = testimonialsData.statistics;

  return (
    <main>
      {/* Header Section */}
      <section className="px-10 xl:container xl:mx-auto mt-[200px]">
        <div className="flex justify-center text-center">
          <Title 
            title="What Our Customers Say" 
            subtitle="Real experiences from our happy customers" 
            section="" 
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-10 xl:container xl:mx-auto py-[50px]">
        <TestimonialStatistics
          averageRating={statistics.averageRating}
          totalReviews={statistics.totalReviews}
          satisfactionRate={statistics.satisfactionRate}
          verifiedReviews={statistics.verifiedReviews}
        />
      </section>

      {/* Filter Section */}
      <section className="px-10 xl:container xl:mx-auto py-[30px]">
        <TestimonialFilter onFilterChange={(filters) => {
          // Handle filter changes here
          console.log('Filters changed:', filters);
        }} />
      </section>

      {/* Testimonials Grid */}
      <section className="px-10 xl:container xl:mx-auto py-[50px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <CardTestimonial
                rating={testimonial.rating}
                review={testimonial.review}
                avatar={testimonial.avatar}
                username={testimonial.username}
                jobdesk={testimonial.jobdesk}
                isVerified={testimonial.isVerified}
                listingTitle={testimonial.listingTitle}
                date={testimonial.date}
                isFeatured={testimonial.isFeatured}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="default" size="button" className="shadow-button">
              Load More Testimonials
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-10 xl:container xl:mx-auto py-[50px]">
        <div className="bg-primary-foreground rounded-[20px] p-8 text-center">
          <h2 className="text-2xl font-bold text-secondary mb-4">
            Share Your Experience
          </h2>
          <p className="text-subtitle mb-6 max-w-2xl mx-auto">
            Have you stayed with us? We'd love to hear about your experience and help other customers make informed decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="button" className="shadow-button">
              <Link href="/listings">Find Your Next Stay</Link>
            </Button>
            <Button variant="third" size="button">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
