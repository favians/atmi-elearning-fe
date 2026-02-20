import { title } from "@/components/primitives";
import Section from "@/layouts/section";
import { Image } from "@heroui/image";
import React, { useMemo } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

export default function Partner({ data = [], isLoading }) {
  // bagi data jadi 2 bagian
  const { firstRow, secondRow } = useMemo(() => {
    const half = Math.ceil(data.length / 2);
    return {
      firstRow: data.slice(0, half),
      secondRow: data.slice(half),
    };
  }, [data]);

  const sliderConfig = {
    modules: [Autoplay],
    spaceBetween: 40,
    slidesPerView: 6,
    loop: true,
    speed: 4000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
    breakpoints: {
      320: { slidesPerView: 2 },
      640: { slidesPerView: 3 },
      1024: { slidesPerView: 5 },
      1280: { slidesPerView: 6 },
    },
  };

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

      {/* Slider baris pertama */}
      <div className="w-full mt-10">
        <Swiper {...sliderConfig}>
          {firstRow.map((item, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <Image
                alt={item?.partner_name}
                src={item?.partner_logo_url}
                height={56}
                className="object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Slider baris kedua (arah berlawanan optional) */}
      <div className="w-full mt-6">
        <Swiper
          {...sliderConfig}
          dir="rtl" // optional supaya arah berlawanan
        >
          {secondRow.map((item, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <Image
                alt={item?.partner_name}
                src={item?.partner_logo_url}
                height={56}
                className="object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
}
