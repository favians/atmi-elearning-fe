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
    <Section wrapperClass={"py-16 max-[667px]:py-12"}>
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
              <div className="p-10 flex bg-primary w-full h-[448px] rounded-lg max-[667px]:p-6 max-[667px]:h-auto max-[667px]:min-h-[420px] max-[667px]:flex-col-reverse max-[667px]:gap-8">
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
                        class:
                          "font-semibold max-[667px]:text-3xl max-[667px]:leading-tight",
                        color: "white",
                        size: "md",
                      })}
                    >
                      Ambil kelas pilihan untuk dapatkan <br />
                      harga bundle
                    </h1>
                    <Button className="bg-white mt-4 text-primary max-[667px]:w-full">
                      Daftar Sekarang
                    </Button>
                  </div>
                </div>
                <div className="flex items-center max-[667px]:justify-center">
                  <Image
                    src={courseBundleImg}
                    alt="Course Bundle Image"
                    width={550}
                    className="mx-auto max-[667px]:w-full max-[667px]:max-w-[280px] max-[667px]:h-auto"
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
