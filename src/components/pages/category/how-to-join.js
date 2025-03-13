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
    <Section wrapperClass="p-16 items-center">
      <h3 className={headline({ class: "mb-2 text-center" })}>
        Bagaimana cara bergabung di kelas live ini?
      </h3>
      <div className="flex items-center w-4/6 mx-auto my-10">
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
        <GoArrowRight size={80} color="blue" />
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

        <GoArrowRight size={80} color="blue" />
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

        <GoArrowRight size={80} color="blue" />
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
