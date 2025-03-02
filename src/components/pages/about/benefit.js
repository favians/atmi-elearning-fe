import {
  BriefcaseIcon,
  CertificateIcon,
  DashboardIcon,
  DraftIcon,
  EducationIcon,
  ProfesionalIcon,
} from "@/components/icons";
import { headline, subtitle } from "@/components/primitives";
import Section from "@/layouts/section";

const data = [
  {
    title: "Praktek Langsung",
    description:
      "Studi intensif terkait permasalahan dunia kerja dan usaha, lengkap dengan dokumen, kertas kerja, simulasi proyek, dan sebagainya.",
    icon: <DraftIcon size={48} />,
  },
  {
    title: "Keterampilan Profesional",
    description:
      "Sempurnakan keterampilan profesional Anda dengan beragam wawasan penting tentang praktik terbaik di dunia kerja dan usaha.",
    icon: <BriefcaseIcon size={48} />,
  },
  {
    title: "Kemudahan Akses",
    description:
      "Anda bisa mengakses kursus secara fleksibel di mana pun, kapan pun, lewat desktop maupun smatrphone Anda.",
    icon: <DashboardIcon size={48} />,
  },
  {
    title: "Pembelajaran dari Ahli",
    description:
      "Tak hanya konsep dan teori, pelajari juga praktik terbaik dengan belajar langsung dari ahlinya dan dapatkan inspirasi tak terbatas.",
    icon: <ProfesionalIcon size={48} />,
  },
  {
    title: "Sertifikat Penyelesaian",
    description:
      "Sertifikat eksklusif sebagai apresiasi atas penguasaan wawasan dan keterampilan yang sudah dipelajari.",
    icon: <CertificateIcon size={48} />,
  },
];
export default function Benefit() {
  return (
    <Section wrapperClass="p-16">
      <div className="w-3/4 mx-auto grid grid-cols-3 gap-8">
        <div className="text-green p-2">
          <h3 className={headline({ class: "leading-9" })}>
            Apa yang <br />
            akan Anda
            <br /> dapatkan?
          </h3>
        </div>
        {data?.map((item) => {
          return (
            <div key={item.title} className="text-green p-2">
              {item?.icon}
              <h3 className={headline({ class: "mt-2", size: "sm" })}>
                {item?.title}
              </h3>
              <h4 className={subtitle({ class: "mt-2" })}>
                {item?.description}
              </h4>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
