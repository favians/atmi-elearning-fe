import { headline, subtitle, title } from "@/components/primitives";
import Section from "@/layouts/section";
import { Button } from "@nextui-org/button";
import React from "react";

export default function CTA() {
  return (
    <Section className="bg-grey-400" wrapperClass="p-16 text-center">
      <h3 className={title({ class: " mb-4" })}>
        Ingin belajar profesional
        <br />
        untuk karir yang lebih maju?
      </h3>
      <h4 className={subtitle({ class: "mb-6" })}>
        Kembangkan potensi diri bersama ATMI E-learning
      </h4>
      <Button color="primary">Gabung Sekarang</Button>
    </Section>
  );
}
