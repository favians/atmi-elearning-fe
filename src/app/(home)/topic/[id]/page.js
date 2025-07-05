"use client";
import CTA from "@/components/pages/about/cta";
import AboutCategory from "@/components/pages/category/banner";
import { DetailTraining } from "@/components/pages/category/detail-training";
import { FAQ } from "@/components/pages/category/faq";
import { HowToJoin } from "@/components/pages/category/how-to-join";
import RecomendedCourse from "@/components/pages/category/recomended-course";
import TestimoniCategory from "@/components/pages/category/testimoni";
import {
  useGetDetailTraining,
  useGetTraining,
} from "@/hooks/home/useGetTraining";
import DefaultLayout from "@/layouts/default";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetDetailTraining({
    params: {
      training_id: id,
    },
  });

  const { data: dataTraining, isLoading: isLoadingTraining } = useGetTraining({
    params: {
      topic_id: data?.topic_id,
      limit: 4, // Limit to 4 recommended courses
    },
  });
  return (
    <DefaultLayout>
      <AboutCategory data={data} isLoading={isLoading} />
      <DetailTraining data={data} isLoading={isLoading} />
      <HowToJoin />
      <TestimoniCategory />
      <FAQ />
      <RecomendedCourse data={dataTraining} isLoading={isLoadingTraining} />
      <CTA />
    </DefaultLayout>
  );
}
