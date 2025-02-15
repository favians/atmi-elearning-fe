import { StarIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import Section from "@/layouts/section";
import { Card, CardBody, CardHeader } from "@heroui/card";

export default function CustomerCounter() {
  const data = [
    {
      title: "4.9",
      icon: <StarIcon color="#F59E0B" />,
      description: "Rating \nkepuasan peserta",
    },
    {
      title: "23.000+",
      description: "Peserta telah berkembang \nbersama kami",
    },
    { title: "80+", description: "Pengajar \nbersertifikat BNSP" },
    {
      title: "70+",
      description: "Kursus bersertifikat dengan \nberagam topik",
    },
  ];
  return (
    <Section
      className="bg-cyan-blue flex lg:h-[280px]"
      wrapperClass="flex items-center "
    >
      <div className="grid grid-cols-4 w-full gap-4">
        {data.map((item) => {
          return (
            <Card
              radius="sm"
              shadow="none"
              key={item?.title}
              className="py-4 col-span-1"
            >
              <CardHeader className="flex justify-center gap-2">
                <h3
                  className={title({ color: "blue", class: "font-semibold" })}
                >
                  {item?.title}
                </h3>
                {item?.icon}
              </CardHeader>
              <CardBody className="py-1">
                <h4
                  className={subtitle({
                    class: "text-center whitespace-pre-wrap",
                  })}
                >
                  {item?.description}
                </h4>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
