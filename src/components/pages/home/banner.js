import { title, subtitle } from "@/components/primitives";
import Section from "@/layouts/section";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import IMG1 from "@/assets/images/heroImage/IMG1.png";
import IMG2 from "@/assets/images/heroImage/IMG2.jpg";
import IMG3 from "@/assets/images/heroImage/IMG3.jpg";
import IMG4 from "@/assets/images/heroImage/IMG4.jpg";
import IMG5 from "@/assets/images/heroImage/IMG5.jpg";
import IMG6 from "@/assets/images/heroImage/IMG6.jpg";
import IMG7 from "@/assets/images/heroImage/IMG7.jpg";
import IMG8 from "@/assets/images/heroImage/IMG8.jpg";
import IMG9 from "@/assets/images/heroImage/IMG9.jpg";
import IMG10 from "@/assets/images/heroImage/IMG10.jpg";

export default function HomeBanner() {
  const imagesLeft = [IMG1, IMG2, IMG3, IMG4, IMG5];
  const imagesRight = [IMG6, IMG7, IMG8, IMG9, IMG10];
  return (
    <Section
      className="bg-dark-blue flex lg:h-[605px]"
      wrapperClass="flex items-center relative overflow-hidden  gap-14"
    >
      <div className="inline-block max-w-xl  justify-center">
        <h4
          className={subtitle({ class: "font-semibold mb-4", color: "white" })}
        >
          ATMI Learning
        </h4>
        <h1 className={title({ color: "white", size: "lg" })}>
          Platform belajar
        </h1>
        <br />
        <h1 className={title({ color: "white", size: "lg" })}>
          profesional terbaik untuk&nbsp;
        </h1>
        <br />
        <h1 className={title({ color: "white", size: "lg" })}>
          karir lebih maju
        </h1>
        <h4 className={subtitle({ class: "my-8", color: "white" })}>
          Menyediakan berbagai kursus dan sertifikasi terbaik untuk membantu
          individu dan usaha berkembang tanpa batas
        </h4>
        <Button
          color="primary"
          className="mb-8"
          onPress={() =>
            window.open("https://forms.gle/q43rtuwZqPn2TXjg7", "_blank")
          }
        >
          Gabung Sekarang
        </Button>
      </div>
      <div className="flex-grow  justify-end flex">
        <div className="gap-5 flex ">
          <div className="grid gap-4 animate-rotateBottom ">
            {imagesLeft.map((img, i) => (
              <Image
                key={i}
                src={img.src}
                width={256}
                height={360}
                className="object-cover"
                alt="Hero image"
              />
            ))}
          </div>
          <div className="grid gap-3 animate-rotateTop ">
            {imagesRight.map((img, i) => (
              <Image
                key={i}
                src={img.src}
                width={256}
                height={360}
                className="object-cover"
                alt="Hero image"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-t-xl absolute top-0 h-28 w-full z-10 from-20%  bg-gradient-to-b from-dark-blue " />
      <div className="rounded-b-xl absolute bottom-0 h-28 w-full from-20%  z-10 bg-gradient-to-t from-dark-blue " />
    </Section>
  );
}
