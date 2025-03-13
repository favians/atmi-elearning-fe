"use client";
import CTA from "@/components/pages/about/cta";
import AboutCategory from "@/components/pages/category/banner";
import { DetailTraining } from "@/components/pages/category/detail-training";
import { FAQ } from "@/components/pages/category/faq";
import { HowToJoin } from "@/components/pages/category/how-to-join";
import RecomendedCourse from "@/components/pages/category/recomended-course";
import TestimoniCategory from "@/components/pages/category/testimoni";
import DefaultLayout from "@/layouts/default";

export default function CategoryPage() {
  return (
    <DefaultLayout>
      <AboutCategory />
      <DetailTraining />
      <HowToJoin />
      <TestimoniCategory />
      <FAQ />
      <RecomendedCourse />
      <CTA />
    </DefaultLayout>
  );
}
