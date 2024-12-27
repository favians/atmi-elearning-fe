import {
  CompanyIcon,
  EducationIcon,
  ProfesionalIcon,
} from "@/components/icons";
import { headline, subtitle } from "@/components/primitives";
import Section from "@/layouts/section";

const data = [
  {
    title: "Lulusan baru",
    description:
      "Anda yang bersemangat penuh dan memiliki cita-cita besar untuk mulai meniti karir ataupun usaha yang sukses dan terus berkembang.",
    icon: <EducationIcon size={48} />,
  },
  {
    title: "Profesional",
    description:
      "Anda yang sudah berdedikasi dan ingin terus berinovasi untuk mengembangkan keahlian profesional agar semakin maju dalam karir.",
    icon: <ProfesionalIcon size={48} />,
  },
  {
    title: "Pemilik usaha",
    description:
      "Anda yang tak hentinya berjuang dan ingin terus mengembangkan potensi diri untuk kemajuan usaha yang semakin pesat.",
    icon: <CompanyIcon size={48} />,
  },
];
export default function Objective() {
  return (
    <Section wrapperClass="p-16 flex flex-col items-center">
      <h3 className={headline()}>ATMI E-learning dibuat untuk</h3>
      <div className="grid grid-cols-3 gap-8 mt-8">
        {data?.map((item) => {
          return (
            <div key={item.title} className="text-green p-6">
              {item?.icon}
              <h3 className={headline({ class: "mt-2", size: "sm" })}>
                {item?.title}
              </h3>
              <h4 className={subtitle({ class: "mt-2", color: "grey" })}>
                {item?.description}
              </h4>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
