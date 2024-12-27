import HomeBanner from "@/components/pages/home/banner";
import HomeCarousel from "@/components/pages/home/home-carousel";
import CustomerCounter from "@/components/pages/home/customer-counter";
import DefaultLayout from "@/layouts/default";
import Topics from "@/components/pages/home/topics";
import Partner from "@/components/pages/home/partner";
import Testimoni from "@/components/pages/home/testimoni";

export default function IndexPage() {
  return (
    <DefaultLayout isDark>
      <HomeBanner />
      <CustomerCounter />
      <HomeCarousel />
      <Topics />
      <Partner />
      <Testimoni />
    </DefaultLayout>
  );
}
