import { headline, subtitle } from "@/components/primitives";
import Section from "@/layouts/section";
import React from "react";

import imageJoin1 from "@/assets/images/illustration/how_to_join_1.png";
import imageJoin2 from "@/assets/images/illustration/how_to_join_2.png";
import imageJoin3 from "@/assets/images/illustration/how_to_join_3.png";
import imageJoin4 from "@/assets/images/illustration/how_to_join_4.png";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";

export const HowToJoin = () => {
  return (
    <Section
      className="max-[667px]:hidden"
      wrapperClass="p-16 items-center max-[667px]:px-6 max-[667px]:py-12"
    >
      <h3 className={headline({ class: "mb-2 text-center" })}>
        Bagaimana cara bergabung di kelas live ini?
      </h3>
      <div className="flex items-center w-4/6 mx-auto my-10 max-[667px]:w-full max-[667px]:flex-col max-[667px]:gap-6">
        <div>
          <div className="px-7">
            <Image
              src={imageJoin1}
              alt="Course Bundle Image"
              width={550}
              className="mx-auto"
            />
          </div>
          <h4 className={subtitle({ class: "font-semibold text-center mt-3" })}>
            Membeli
            <br />
            kelas live ini
          </h4>
        </div>
        <GoArrowRight size={80} color="blue" className="max-[667px]:rotate-90" />
        <div>
          <div className="px-7">
            <Image
              src={imageJoin2}
              alt="Course Bundle Image"
              width={550}
              className="mx-auto"
            />
          </div>
          <h4 className={subtitle({ class: "font-semibold text-center mt-3" })}>
            Anda akan
            <br />
            mendapatkan link
          </h4>
        </div>

        <GoArrowRight size={80} color="blue" className="max-[667px]:rotate-90" />
        <div>
          <div className="px-7">
            <Image
              src={imageJoin3}
              alt="Course Bundle Image"
              width={550}
              className="mx-auto"
            />
          </div>
          <h4 className={subtitle({ class: "font-semibold text-center mt-3" })}>
            Hadir pada saat kelas
            <br />
            live dilaksanakan
          </h4>
        </div>

        <GoArrowRight size={80} color="blue" className="max-[667px]:rotate-90" />
        <div>
          <div className="px-7">
            <Image
              src={imageJoin4}
              alt="Course Bundle Image"
              width={550}
              className="mx-auto"
            />
          </div>
          <h4 className={subtitle({ class: "font-semibold text-center mt-3" })}>
            Dapatkan sertifikat dan
            <br />
            terautomasi LinkedIn
          </h4>
        </div>
      </div>
    </Section>
  );
};
