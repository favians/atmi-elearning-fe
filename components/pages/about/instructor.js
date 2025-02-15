import { headline, subtitle } from "@/components/primitives";
import Section from "@/layouts/section";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";

export default function Instructor() {
  const SLIDES = Array.from(Array(12).keys());
  const pagination = {
    clickable: true,

    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + "</div>";
    },
  };
  return (
    <Section wrapperClass="p-16 items-center">
      <h3 className={headline({ class: "mb-2 text-center" })}>
        Instruktur kami
      </h3>
      <h4 className={subtitle({ class: "text-center mb-8" })}>
        Berbagai macam praktisi yang ahli di bidangnya telah menjadi mitra
        <br /> akademi kami
      </h4>

      <Swiper
        slidesPerView={4}
        slidesPerGroup={4}
        pagination={pagination}
        spaceBetween={32}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={1000}
        modules={[Autoplay, Pagination]}
      >
        {SLIDES.map((item) => {
          return (
            <SwiperSlide key={item}>
              <Card shadow="none" className="border-1">
                <CardHeader className="flex gap-3 p-0 pt-4 items-center justify-center">
                  <Image
                    alt="nextui logo"
                    height={180}
                    radius="full"
                    src="https://media.licdn.com/dms/image/v2/D5603AQEhBYaldyR_rg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1712338616576?e=2147483647&v=beta&t=bziv00oSahHbPawEkrwZwMN3C2ReWGTKRTRhBkro66k"
                    width={180}
                  />
                </CardHeader>
                <CardBody className="text-center">
                  <h4 className={subtitle({ class: "font-semibold" })}>
                    Faviansyah Bambangos
                  </h4>
                  <h4 className={subtitle({ class: "mb-6" })}>
                    HR Manager • MAP Indonesia
                  </h4>
                  <h4 className={subtitle()}>
                    Mengakomodir +150 kandidat dari alumni ATMI E-learning
                  </h4>
                </CardBody>
                <CardFooter></CardFooter>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Section>
  );
}
