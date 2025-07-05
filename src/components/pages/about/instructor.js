import { headline, subtitle } from "@/components/primitives";
import Section from "@/layouts/section";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Spinner } from "@heroui/spinner";

export default function Instructor({ data, isLoading }) {
  const pagination = {
    clickable: true,

    renderBullet: function (index, className) {
      if (data.length <= 4) {
        return "";
      }
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
      {isLoading ? (
        <div className="flex justify-center flex-1 items-center">
          <Spinner />
        </div>
      ) : (
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
          {data.map((item) => {
            return (
              <SwiperSlide key={item?.id}>
                <Card shadow="none" className="border-1">
                  <CardHeader className="flex gap-3 p-0 pt-4 items-center justify-center">
                    <Image
                      alt="nextui logo"
                      height={180}
                      radius="full"
                      src={item?.profile_picture_url}
                      width={180}
                    />
                  </CardHeader>
                  <CardBody className="text-center">
                    <h4 className={subtitle({ class: "font-semibold" })}>
                      {item?.name}
                    </h4>
                    <h4 className={subtitle({ class: "mb-6" })}>{item?.job}</h4>
                    <h4 className={subtitle()}>{item?.about}</h4>
                  </CardBody>
                  <CardFooter></CardFooter>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </Section>
  );
}
