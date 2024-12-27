import AboutBanner from "@/components/pages/about/banner";
import Benefit from "@/components/pages/about/benefit";
import CTA from "@/components/pages/about/cta";
import Instructor from "@/components/pages/about/instructor";
import Objective from "@/components/pages/about/objective";
import VisiMisi from "@/components/pages/about/visi-misi";
import DefaultLayout from "@/layouts/default";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <AboutBanner />
      <VisiMisi />
      <Objective />
      <Instructor />
      <Benefit />
      <CTA />
    </DefaultLayout>
  );
}
