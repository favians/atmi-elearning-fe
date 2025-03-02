"use client";
import { subtitle, title } from "@/components/primitives";
import Section from "@/layouts/section";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import courseBundleImg from "@/assets/images/illustration/course_bundle.png";
import Image from "next/image";

import { Pagination } from "swiper/modules";

export default function HomeCarousel() {
  const SLIDES = Array.from(Array(5).keys());
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + "</div>";
    },
  };

  return (
    <Section wrapperClass={"py-16"}>
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={pagination}
        spaceBetween={1}
        modules={[Pagination]}
      >
        {SLIDES.map((item) => {
          return (
            <SwiperSlide key={item}>
              <div className="p-10 flex bg-primary w-full h-[448px] rounded-lg">
                <div className="flex-grow flex items-center">
                  <div className="flex-col">
                    <h4
                      className={subtitle({
                        color: "white",
                        class: "font-semibold mb-2 flex",
                      })}
                    >
                      Course bundle
                      <Chip size="sm" className="ml-2 bg-blue text-white">
                        NEW
                      </Chip>
                    </h4>
                    <h1
                      className={title({
                        class: "font-semibold",
                        color: "white",
                        size: "md",
                      })}
                    >
                      Ambil kelas pilihan untuk dapatkan <br />
                      harga bundle
                    </h1>
                    <Button className="bg-white mt-4 text-primary">
                      Daftar Sekarang
                    </Button>
                  </div>
                </div>
                <div className="flex items-center">
                  <Image
                    src={courseBundleImg}
                    alt="Course Bundle Image"
                    width={550}
                    className="mx-auto"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Section>
  );
}
