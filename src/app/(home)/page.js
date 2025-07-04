"use client";
import HomeBanner from "@/components/pages/home/banner";
import HomeCarousel from "@/components/pages/home/home-carousel";
import CustomerCounter from "@/components/pages/home/customer-counter";
import DefaultLayout from "@/layouts/default";
import Topics from "@/components/pages/home/topics";
import Partner from "@/components/pages/home/partner";
import Testimoni from "@/components/pages/home/testimoni";
import { useGetHome } from "@/hooks/home/useGetHome";
import { TopicProvider } from "@/context/topic-context";

export default function IndexPage() {
  const { data, isLoading } = useGetHome();

  return (
    <TopicProvider>
      <DefaultLayout isDark>
        <HomeBanner />
        <CustomerCounter data={data?.home_score} isLoading={isLoading} />
        <HomeCarousel />
        <Topics />
        <Partner data={data?.home_partner_list} isLoading={isLoading} />
        <Testimoni data={data?.home_review_list} isLoading={isLoading} />
      </DefaultLayout>
    </TopicProvider>
  );
}
