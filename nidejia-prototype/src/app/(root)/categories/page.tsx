"use client";
import { Button } from "@/components/atomics/button";
import ScrollFloat from "@/components/atomics/scroll-float";
import Title from "@/components/atomics/title";
import CardIndicator from "@/components/molecules/card/card-indicator";
import { CategoriesProps } from "@/interfaces/landing-page";
import categories from "@/json/categories.json";
import Link from "next/link";
import { motion } from "motion/react";


export default function CategoriesPage() {
  return (
    <main>
      <section className="px-10 xl:container xl:mx-auto mt-[200px]">
        <div className="flex justify-center text-center">
          <Title title="Categories" subtitle="We provide everything" section="" />
        </div>
      </section>

      <section id="categories-section" className="bg-background">
        <div className="px-10 xl:container xl:mx-auto py-[50px]">
          <div className="flex items-center justify-end">
            <Button variant="default" size="button" className="shadow-button">
              <Link href="/featured">Explore All</Link>
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-[30px]">
            {categories.data.map((item: CategoriesProps, index: number) => (
              <motion.div
                key={index}
                data-scroll-float="item"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
              >
                <CardIndicator
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                  section="categories"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


