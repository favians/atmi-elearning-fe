import { title, subtitle } from "@/components/primitives";
import Section from "@/layouts/section";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";

export default function HomeBanner() {
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
        <Button color="primary" className="mb-8">
          Gabung Sekarang
        </Button>
      </div>
      <div className="flex-grow  justify-end flex">
        <div className="gap-5 flex ">
          <div className="grid gap-4 animate-rotateBottom ">
            <Image
              className="object-cover"
              width={256}
              height={360}
              loading="lazy"
              alt="NextUI hero Image with delay"
              src="https://images.unsplash.com/photo-1724709972210-4beb408de580?q=80&w=1087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <Image
              className="object-cover"
              width={256}
              height={360}
              loading="lazy"
              alt="NextUI hero Image with delay"
              src="https://images.unsplash.com/photo-1721332154161-847851ea188b?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <Image
              className="object-cover"
              width={256}
              height={360}
              loading="lazy"
              alt="NextUI hero Image with delay"
              src="https://images.unsplash.com/photo-1719937050792-a6a15d899281?q=80&w=1096&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <Image
              className="object-cover"
              width={256}
              height={360}
              loading="lazy"
              alt="NextUI hero Image with delay"
              src="https://plus.unsplash.com/premium_photo-1713184149457-ce10583b4ccd?q=80&w=1087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <Image
              className="object-cover"
              width={256}
              height={360}
              loading="lazy"
              alt="NextUI hero Image with delay"
              src="https://plus.unsplash.com/premium_photo-1675107359599-a2d0d8983c36?q=80&w=1087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
          <div className="grid gap-3 animate-rotateTop ">
            <Image
              className="object-cover"
              width={256}
              height={360}
              loading="lazy"
              alt="NextUI hero Image with delay"
              src="https://images.unsplash.com/photo-1709321954258-698bea8a21e6?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <Image
              className="object-cover"
              width={256}
              height={360}
              loading="lazy"
              alt="NextUI hero Image with delay"
              src="https://plus.unsplash.com/premium_photo-1692731798118-2880236d32a6?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <Image
              className="object-cover"
              width={256}
              height={360}
              loading="lazy"
              alt="NextUI hero Image with delay"
              src="https://images.unsplash.com/photo-1724961723763-014c951c1d5e?q=80&w=1282&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <Image
              className="object-cover"
              width={256}
              height={360}
              loading="lazy"
              alt="NextUI hero Image with delay"
              src="https://images.unsplash.com/photo-1725398927348-e369991c845b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <Image
              className="object-cover"
              width={256}
              height={360}
              loading="lazy"
              alt="NextUI hero Image with delay"
              src="https://images.unsplash.com/photo-1725053615193-7006e8e941ee?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
      </div>

      <div className="rounded-t-xl absolute top-0 h-28 w-full z-10 from-20%  bg-gradient-to-b from-dark-blue " />
      <div className="rounded-b-xl absolute bottom-0 h-28 w-full from-20%  z-10 bg-gradient-to-t from-dark-blue " />
    </Section>
  );
}
