"use client";
import { headline, subtitle } from "@/components/primitives";
import { useTopic } from "@/context/topic-context";
import { useGetTopic } from "@/hooks/home/useGetTopic";
import { useGetTraining } from "@/hooks/home/useGetTraining";
import Section from "@/layouts/section";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Spinner } from "@heroui/spinner";
import { Tab, Tabs } from "@heroui/tabs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Topics() {
  const router = useRouter();
  const { selectedTopicId, setSelectedTopicId } = useTopic();
  const { data: dataTopic, isLoading: isLoadingTopic } = useGetTopic();
  const limit = 8;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,

    isFetching: isLoadingTraining,
  } = useGetTraining({
    params: { topic_id: selectedTopicId, limit },
  });

  const allTrainings = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    if (dataTopic?.length > 0 && selectedTopicId === null) {
      setSelectedTopicId(dataTopic[0].id); // default to first tab
    }
  }, [dataTopic]);

  return (
    <Section
      className="bg-dark-blue"
      id="topics"
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
        isDisabled={isLoadingTopic}
        selectedKey={selectedTopicId?.toString()}
        onSelectionChange={(key) => setSelectedTopicId(Number(key))}
        classNames={{
          tab: "border-1 border-white",
          tabContent:
            "text-white group-data-[selected=true]:text-[#000] group-data-[selected=true]:font-semibold",
        }}
      >
        {dataTopic?.map((item) => {
          return (
            <Tab key={item?.id} title={item?.title}>
              <div className="flex flex-wrap justify-center items-stretch w-full mt-8">
                {isLoadingTraining && !data?.pages.length ? (
                  <Spinner />
                ) : (
                  allTrainings.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="w-1/4 p-3 h-full"
                        onClick={() => router.push(`/topic/${item?.id}`)}
                      >
                        <Card className="p-2 h-full flex flex-col justify-between cursor-pointer">
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

                          <CardBody className="py-1 overflow-visible px-1 flex flex-col justify-between flex-1">
                            <div>
                              <h3
                                className={subtitle({
                                  class: "font-semibold my-2 line-clamp-1",
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

                              <div className="flex items-center">
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
                            </div>

                            <div className="flex-grow" />

                            <div className="flex gap-2 mt-4 items-center">
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
                                <h4 className={subtitle({ size: "sm" })}>
                                  {item?.trainer?.job}
                                </h4>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    );
                  })
                )}
              </div>
              {hasNextPage && (
                <Button
                  radius="sm"
                  isLoading={isFetchingNextPage}
                  onPress={() => fetchNextPage()}
                  className="bg-white flex mx-auto font-semibold text-blue mt-6"
                >
                  Lihat Kursus Lainnya
                </Button>
              )}
            </Tab>
          );
        })}
      </Tabs>
    </Section>
  );
}
