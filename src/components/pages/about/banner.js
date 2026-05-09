import { title, subtitle } from "@/components/primitives";
import Section from "@/layouts/section";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";

export default function AboutBanner() {
  return (
    <Section
      className="bg-grey-400 flex lg:h-[605px]"
      wrapperClass="flex items-center relative overflow-hidden gap-14 max-[667px]:flex-col max-[667px]:justify-center max-[667px]:gap-8 max-[667px]:px-6 max-[667px]:py-12"
    >
      <div className="inline-block max-w-xl justify-center">
        <h4 className={subtitle({ class: "font-semibold mb-4" })}>
          ATMI E-learning
        </h4>
        <div className="max-[667px]:hidden">
          <h1 className={title({ size: "lg" })}>Insight for Better</h1>
          <br />
          <h1 className={title({ size: "lg" })}>Generations</h1>
        </div>
        <h1
          className={title({
            size: "lg",
            class:
              "hidden max-[667px]:block max-[667px]:text-4xl max-[667px]:leading-tight",
          })}
        >
          Insight for Better
          <br />
          Generations
        </h1>
        <h4 className={subtitle({ class: "my-8 max-[667px]:my-6" })}>
          Kami dibentuk sebagai sebuah bentuk perhatian Mekari terhadap dunia
          pendidikan di Indonesia.
        </h4>
        <Button color="primary" className="mb-8 max-[667px]:mb-0 max-[667px]:w-full">
          Lihat profil perusahaan
        </Button>
      </div>
      <div className="hidden flex-grow justify-end md:flex max-[667px]:hidden">
        <Image
          className="object-contain"
          width={590}
          height={330}
          alt="About illustration"
          src="https://elearning.lspttvokasi.id/api/v1/images?path=files/training_cover/training-6.png"
        />
      </div>
    </Section>
  );
}
