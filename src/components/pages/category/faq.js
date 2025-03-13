import { headline } from "@/components/primitives";
import Section from "@/layouts/section";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Chip } from "@heroui/chip";

import React, { useState } from "react";

const items = [
  {
    key: "1",
    title: "Bagaimana mendaftar skema sertifikasi?",
    description:
      "Software akuntansi online adalah perangkat lunak untuk mencatat, mengolah, menampilkan data transaksi akuntansi bisnis untuk memberikan solusi bagi perusahaan terkait pembukuan, laporan keuangan, invoice dan neraca keuangan secara online serta real-time. Mekari Jurnal menjadi solusi untuk perusahaan dalam mengelola keuangan secara menyeluruh dari satu software mulai dari akuntansi, operasional keuangan, inventori & gudang dan perencanaan & analisa keuangan.",
  },
  {
    key: "2",
    title: "Apa persyaratan utama mendaftar di skema tertentu?",
    description:
      "Software akuntansi online adalah perangkat lunak untuk mencatat, mengolah, menampilkan data transaksi akuntansi bisnis untuk memberikan solusi bagi perusahaan terkait pembukuan, laporan keuangan, invoice dan neraca keuangan secara online serta real-time. Mekari Jurnal menjadi solusi untuk perusahaan dalam mengelola keuangan secara menyeluruh dari satu software mulai dari akuntansi, operasional keuangan, inventori & gudang dan perencanaan & analisa keuangan.",
  },
  {
    key: "3",
    title: "Apa saja yang harus disiapkan sebelum mendaftar?",
    description:
      "Software akuntansi online adalah perangkat lunak untuk mencatat, mengolah, menampilkan data transaksi akuntansi bisnis untuk memberikan solusi bagi perusahaan terkait pembukuan, laporan keuangan, invoice dan neraca keuangan secara online serta real-time. Mekari Jurnal menjadi solusi untuk perusahaan dalam mengelola keuangan secara menyeluruh dari satu software mulai dari akuntansi, operasional keuangan, inventori & gudang dan perencanaan & analisa keuangan.",
  },
  {
    key: "4",
    title:
      "Apakah saya akan langsung mendapatkan sertifikat setelah mengikuti sertifikasi?",
    description:
      "Software akuntansi online adalah perangkat lunak untuk mencatat, mengolah, menampilkan data transaksi akuntansi bisnis untuk memberikan solusi bagi perusahaan terkait pembukuan, laporan keuangan, invoice dan neraca keuangan secara online serta real-time. Mekari Jurnal menjadi solusi untuk perusahaan dalam mengelola keuangan secara menyeluruh dari satu software mulai dari akuntansi, operasional keuangan, inventori & gudang dan perencanaan & analisa keuangan.",
  },
];

export const FAQ = () => {
  const [key, setKey] = useState("1");
  return (
    <Section
      className={`my-16 max-w-[896px] mx-auto `}
      wrapperClass={`accordion ${`accordion-${key}`}`}
    >
      <div className="text-center">
        <Chip variant="bordered">FAQ</Chip>

        <h3 className={headline({ class: "mt-4 mb-6 mx-auto text-center" })}>
          Pertanyaan yang sering ditanyakan
        </h3>
      </div>
      <Accordion
        onSelectionChange={(value) => {
          setKey(value.size == 0 ? "" : value?.anchorKey);
        }}
        defaultExpandedKeys={[key]}
      >
        {items.map((item) => {
          return (
            <AccordionItem
              hideIndicator={true}
              startContent={<div>{key == item.key ? "-" : "+"}</div>}
              key={item.key}
              aria-label="Accordion 1"
              title={item?.title}
            >
              <div className="pl-[18px]"> {item?.description}</div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Section>
  );
};
