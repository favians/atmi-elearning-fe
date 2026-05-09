import courseBundleImg from "@/assets/images/illustration/visi_misi.png";
import { headline, subtitle, title } from "@/components/primitives";
import Section from "@/layouts/section";
import Image from "next/image";

export default function VisiMisi() {
  return (
    <Section wrapperClass="p-16 gap-14 flex items-center max-[667px]:flex-col max-[667px]:gap-8 max-[667px]:px-6 max-[667px]:py-12">
      <div className="flex-1 max-[667px]:w-full">
        <Image
          src={courseBundleImg}
          alt="Course Bundle Image"
          width={626}
          className="mx-auto max-[667px]:w-full max-[667px]:h-auto"
        />
      </div>
      <div className="flex-1 max-[667px]:w-full">
        <div className="mx-16 max-[667px]:mx-0">
          <h4 className={subtitle({ class: "font-semibold mb-1" })}>
            Visi kami
          </h4>
          <h3 className={headline({ class: "leading-9" })}>
            Menjadi media pembelajaran <br />
            utama dalam mewujudkan <br />
            generasi profesional yang unggul
          </h3>
        </div>
      </div>
    </Section>
  );
}
