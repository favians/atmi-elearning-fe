"use client";
import { headline, subtitle, title } from "@/components/primitives";
import Section from "@/layouts/section";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Tab, Tabs } from "@heroui/tabs";
import React from "react";

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

  {
    image: "https://nextui.org/images/hero-card-complete.jpeg",
    title: "Manufacturing industry bookkeeping with Jurnal",
    description:
      "Kelola keuangan dan operasional bisnis manufaktur lebih efisien dan efektif dengan software Mekari Jurnal",
    price: 180000,
    discountPrice: 220000,
    materi: 10,
  },
];

export default function Topics() {
  return (
    <Section
      className="bg-dark-blue "
      wrapperClass={"p-16 flex flex-col items-center"}
    >
      <h1 className={headline({ color: "white", class: "mb-2", size: "lg" })}>
        Topik
      </h1>
      <h4 className={subtitle({ color: "white", class: "text-center" })}>
        Pilih kursus yang Anda inginkan
      </h4>
      <Tabs
        radius="full"
        variant={"light"}
        aria-label="Tabs variants"
        color={"primary"}
        className="mt-8 tab-topics"
        classNames={{
          tab: "border-1 border-white",
          tabContent:
            "text-white group-data-[selected=true]:text-[#000] group-data-[selected=true]:font-semibold",
        }}
      >
        {tabs.map((item) => {
          return (
            <Tab key={item} title={item}>
              <div className="flex flex-wrap justify-center items-center w-full  mt-8">
                {data?.map((item) => {
                  return (
                    <div key={item.title} className="w-1/4 p-3">
                      <Card className="p-2">
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
                          <h4 className={subtitle({ size: "sm" })}>
                            {item?.materi} Materi Pembelajaran
                          </h4>
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
            </Tab>
          );
        })}
      </Tabs>
      <Button radius="sm" className="bg-white font-semibold text-blue">
        Lihat Kursus Lainnya
      </Button>
    </Section>
  );
}
