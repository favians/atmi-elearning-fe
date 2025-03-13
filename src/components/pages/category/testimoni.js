"use client";
import { headline, subtitle, title } from "@/components/primitives";
import Section from "@/layouts/section";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";
import { Image } from "@heroui/image";
import { StarIcon } from "@/components/icons";

export default function TestimoniCategory() {
  const SLIDES = Array.from(Array(4).keys());
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + "</div>";
    },
  };

  return (
    <Section className="bg-grey-300" wrapperClass={"py-16"}>
      <div className="text-center justify-center mb-8">
        <h3 className={headline({ class: "mb-2 w-2/4 mx-auto text-center" })}>
          Bersama ATMI E-learning, kami berkembang sesuai kebutuhan industri di
          Indonesia
        </h3>
        <h4 className={subtitle({ class: "mt-2", color: "grey" })}>
          ATMI E-learning memberikan inovasi dalam memenuhi kebutuhan bisnis
          dengan berbagai use case di berbagai industri
        </h4>
      </div>
      <Swiper
        slidesPerView={2}
        pagination={pagination}
        spaceBetween={16}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
      >
        {SLIDES.map((item) => {
          return (
            <SwiperSlide key={item}>
              <div className="p-10 flex flex-col bg-white w-full rounded-lg">
                <h4
                  className={subtitle({
                    class: "font-semibold mb-4",
                    size: "lg",
                  })}
                >
                  Sangat bagus, menarik, dan mudah dipahami
                </h4>
                <h4 className={subtitle({ size: "sm" })}>
                  “Sangat bermanfaat. Materi yang disampaikan sangat jelas,
                  komunikatif dan mudah dipahami, juga ada ilustrasi/animasi
                  dari materi yang sangat interaktif. Materinya lengkap, mulai
                  dari dasar-dasar akuntansi, konsep dan persamaan akuntansi,
                  serta siklus akuntansi. Selain itu, terdapat modul, kuis, dan
                  latihan kasus sehingga akan semakin menambah pemahaman akan
                  materi yang disampaikan.”
                </h4>
                <div className="flex mt-4 items-center gap-2">
                  <Image
                    src={
                      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
                    }
                    alt="Course Bundle Image"
                    width={48}
                    radius="full"
                  />
                  <h4 className={subtitle({ class: "font-semibold" })}>
                    Faviansyah Bambangos
                  </h4>
                  <div className="flex-1 gap-0.5 justify-end flex">
                    <StarIcon color="#F59E0B" size={22} />
                    <StarIcon color="#F59E0B" size={22} />
                    <StarIcon color="#F59E0B" size={22} />
                    <StarIcon color="#F59E0B" size={22} />
                    <StarIcon color="#F2F4F7" size={22} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Section>
  );
}
