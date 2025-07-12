"use client";
import { headline, subtitle } from "@/components/primitives";
import Section from "@/layouts/section";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Spinner } from "@heroui/spinner";
import React from "react";
import { GoArrowRight } from "react-icons/go";

export default function RecomendedCourse({ data, isLoading }) {
  if (isLoading) {
    return (
      <Section wrapperClass={"p-16 flex flex-col items-center"}>
        <Spinner />
      </Section>
    );
  }
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
      </div>
      <div className="gap-4 grid grid-cols-4">
        {data?.map((item) => {
          return (
            <div key={item.title}>
              <Card className="p-2 cursor-pointer">
                <CardHeader className="px-1 py-0.5 flex-col items-start">
                  <div className="relative">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl mb-1"
                      src={item?.image_url}
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
                    {item?.material_count_fmt}
                  </h4>
                </CardHeader>
                <CardBody className="overflow-visible px-1">
                  <h3
                    className={subtitle({
                      class: "font-semibold my-2  line-clamp-1",
                    })}
                  >
                    {item.title}
                  </h3>
                  <h4
                    className={subtitle({
                      size: "sm",
                      color: "grey",
                      class: "mb-2 line-clamp-3 min-h-[66px]",
                    })}
                  >
                    {item.small_description}
                  </h4>
                  <div className="flex items-center ">
                    <h4
                      className={subtitle({
                        class: "font-semibold flex-none mb-2 mr-2",
                      })}
                    >
                      {item.price_fmt}
                    </h4>
                    {item?.discounted_price_fmt && (
                      <h4
                        className={subtitle({
                          class: "line-through mb-2",
                          size: "sm",
                          color: "red",
                        })}
                      >
                        {item.discounted_price_fmt}
                      </h4>
                    )}
                  </div>

                  <div className="flex gap-2 my-2 items-center">
                    <Avatar src={item?.trainer?.profile_url} />
                    <div>
                      <h4
                        className={subtitle({
                          size: "sm",
                          class: "font-semibold",
                        })}
                      >
                        {item?.trainer?.full_name}
                      </h4>
                      <h4
                        className={subtitle({
                          size: "sm",
                        })}
                      >
                        {item?.trainer?.job}
                      </h4>
                    </div>
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
