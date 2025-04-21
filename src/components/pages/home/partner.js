import { title } from "@/components/primitives";
import Section from "@/layouts/section";
import { Image } from "@heroui/image";
import React from "react";

export default function Partner({ data, isLoading }) {
  return (
    <Section wrapperClass="p-16 flex items-center flex-col">
      <h1
        className={title({
          class: "text-center mx-auto font-semibold",
          size: "sm",
        })}
      >
        Telah bekerja sama dengan berbagai <br />
        perusahaan dan akademisi terkemuka di Indonesia
      </h1>
      <div className="flex w-2/3 flex-wrap gap-10 justify-center items-center   mt-8">
        {data?.map((item, index) => (
          <Image
            key={index}
            alt={item?.partner_name}
            className="rounded-xl mb-1"
            src={item?.partner_logo_url}
            height={56}
          />
        ))}
      </div>
    </Section>
  );
}
