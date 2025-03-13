"use client";
import { StarIcon } from "@/components/icons";
import { headline, subtitle, title } from "@/components/primitives";
import Section from "@/layouts/section";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Tab, Tabs } from "@heroui/tabs";
import React from "react";
import { GoArrowRight } from "react-icons/go";

const tabs = [
  "Teknik Mesin",
  "3D Printing",
  "Manufaktur",
  "Bisnis & Wirausaha",
  "Mekatronik",
];

const data = [
  {
    image: "https://nextui.org/images/hero-card-complete.jpeg",
    title: "Talent management: the 9 Box matrix",
    description:
      "Kelola SDM di perusahaan lebih akurat dengan model 9 box matric dan HRIS Talenta",
    price: 100000,
    discountPrice: 90000,
    materi: 19,
    category: "Best Seller",
  },
  {
    image: "https://nextui.org/images/hero-card-complete.jpeg",
    title: "Online shop industry bookkeeping with Mekari Jurnal",
    description:
      "Kelola keuangan dan operasional bisnis online shop lebih mudah dan efektif dengan software Mekari Jurnal",
    price: 110000,
    discountPrice: 100000,
    materi: 25,
  },
  {
    image: "https://nextui.org/images/hero-card-complete.jpeg",
    title: "F&B industry bookkeeping with Jurnal software",
    description:
      "Kelola keuangan dan operasional bisnis F&B lebih efisien dengan software akuntansi Mekari Jurnal",
    price: 110000,
    discountPrice: 100000,
    materi: 25,
    category: "Most Popular",
  },
  {
    image: "https://nextui.org/images/hero-card-complete.jpeg",
    title: "Service industry bookeeping with Jurnal software",
    description:
      "Kelola keuangan dan operasional bisnis service/jasa mudah dan efektif dengan software Mekari Jurnal",
    price: 200000,
    discountPrice: 220000,
    materi: 25,
  },
];

export default function RecomendedCourse() {
  return (
    <Section wrapperClass={"p-16 flex flex-col items-center"}>
      <Divider className="my-2" />
      <div className="flex w-full items-center">
        <h3
          className={headline({
            class: "mt-4 mb-6 flex flex-1",
          })}
        >
          Rekomendasi kursus lainnya
        </h3>
        <div className="flex  gap-2 items-center text-primary">
          <h4 className={subtitle({ color: "primary" })}>
            Lihat kursus lainnya
          </h4>
          <GoArrowRight />
        </div>
      </div>
      <div className="gap-4 grid grid-cols-4">
        {data?.map((item) => {
          return (
            <div key={item.title}>
              <Card className="p-2 shadow-none border-1">
                <CardHeader className="p-0 flex-col items-start">
                  <div className="relative">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl mb-1"
                      src="https://nextui.org/images/hero-card-complete.jpeg"
                      width={356}
                      height={151}
                    />
                    {item.category && (
                      <Chip
                        color="primary"
                        size="sm"
                        radius="sm"
                        className="absolute left-2 top-2 z-10"
                      >
                        {item.category}
                      </Chip>
                    )}
                  </div>
                </CardHeader>
                <CardBody className="overflow-visible p-0">
                  <h3
                    className={subtitle({
                      class: "font-semibold my-2",
                    })}
                  >
                    {item.title}
                  </h3>
                  <h4
                    className={subtitle({
                      size: "sm",
                      color: "grey",
                      class: "mb-2",
                    })}
                  >
                    {item.description}
                  </h4>
                  <div className="flex items-center gap-2 mb-4">
                    <Chip
                      color="primary"
                      variant="bordered"
                      className="border-grey border-1 text-xs"
                    >
                      Bisnis & Wirausaha
                    </Chip>
                    <Chip
                      color="primary"
                      variant="bordered"
                      className="border-grey border-1 text-xs"
                    >
                      Basic
                    </Chip>
                  </div>

                  <div className="mb-4">
                    <Chip
                      color="primary"
                      variant="bordered"
                      className="border-1 text-xs"
                    >
                      Comprehensive
                    </Chip>
                    <div className="mt-2 flex items-center">
                      <h4 className={subtitle({ size: "xs" })}>
                        30 Materi Pembelajaran
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
                  <div className="flex items-center">
                    <h4
                      className={subtitle({
                        class: "font-semibold flex-none mb-2 mr-2",
                      })}
                    >
                      Rp{item.discountPrice}
                    </h4>
                    <h4
                      className={subtitle({
                        class: "line-through mb-2",
                        size: "sm",
                        color: "red",
                      })}
                    >
                      Rp{item.price}
                    </h4>
                  </div>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
