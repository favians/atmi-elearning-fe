import { title, subtitle } from "@/components/primitives";
import Section from "@/layouts/section";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";

export default function AboutBanner() {
  return (
    <Section
      className="bg-grey-400 flex lg:h-[605px]"
      wrapperClass="flex items-center relative overflow-hidden  gap-14"
    >
      <div className="inline-block max-w-xl  justify-center">
        <h4 className={subtitle({ class: "font-semibold mb-4" })}>
          ATMI E-learning
        </h4>
        <h1 className={title({ size: "lg" })}>Insight for Better</h1>
        <br />
        <h1 className={title({ size: "lg" })}>Generations</h1>
        <h4 className={subtitle({ class: "my-8" })}>
          Kami dibentuk sebagai sebuah bentuk perhatian Mekari terhadap dunia
          pendidikan di Indonesia.
        </h4>
        <Button color="primary" className="mb-8">
          Lihat profil perusahaan
        </Button>
      </div>
      <div className="flex-grow  justify-end flex">
        <Image
          className="object-cover"
          width={590}
          height={330}
          loading="lazy"
          alt="NextUI hero Image with delay"
          src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
        />
      </div>
    </Section>
  );
}
