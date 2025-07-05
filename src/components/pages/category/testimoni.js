"use client";
import { subtitle } from "@/components/primitives";
import Section from "@/layouts/section";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";
import { StarIcon } from "@/components/icons";
import { useGetHome } from "@/hooks/home/useGetHome";
import { Spinner } from "@heroui/spinner";

export default function Testimoni() {
  const { data, isLoading } = useGetHome();
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + "</div>";
    },
  };

  return (
    <Section className="bg-grey-300" wrapperClass={"py-16"}>
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
        {isLoading ? (
          <Spinner />
        ) : (
          data?.home_review_list &&
          data?.home_review_list.map((item, index) => {
            const review_rating = item?.review_rating || 0;
            return (
              <SwiperSlide key={index} className="flex h-full">
                <div className="p-10 flex flex-col bg-white w-full rounded-lg h-full">
                  <h4
                    className={subtitle({
                      class: "font-semibold mb-4",
                      size: "lg",
                    })}
                  >
                    {item?.review_title}
                  </h4>
                  <p className={subtitle({ size: "sm", class: "min-h-16" })}>
                    {item?.review_content}
                  </p>

                  {/* Spacer to push bottom content to the bottom */}
                  <div className="flex-1" />

                  <div className="flex items-center gap-2 pt-4">
                    <h4 className={subtitle({ class: "font-semibold" })}>
                      {item?.trainee_name}
                    </h4>
                    <div className="flex-1 gap-0.5 justify-end flex">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon
                          key={index}
                          color={index < review_rating ? "#F59E0B" : "#F2F4F7"}
                          size={22}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </Section>
  );
}
