import courseBundleImg from "@/assets/images/illustration/visi_misi.png";
import { headline, subtitle, title } from "@/components/primitives";
import Section from "@/layouts/section";
import Image from "next/image";

export default function VisiMisi() {
  return (
    <Section wrapperClass="p-16 gap-14 flex items-center">
      <div className="flex-1">
        <Image
          src={courseBundleImg}
          alt="Course Bundle Image"
          width={626}
          className="mx-auto"
        />
      </div>
      <div className="flex-1">
        <div className="mx-16">
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
