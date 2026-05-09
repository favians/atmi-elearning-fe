"use client";
import { headline, subtitle } from "@/components/primitives";
import { useTopic } from "@/context/topic-context";
import { calculateDiscountPrice, formatRupiah } from "@/helpers/Number";
import { useGetTopic } from "@/hooks/home/useGetTopic";
import { useGetTraining } from "@/hooks/home/useGetTraining";
import Section from "@/layouts/section";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Select, SelectItem } from "@heroui/select";
import { Spinner } from "@heroui/spinner";
import { Tab, Tabs } from "@heroui/tabs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Topics() {
  const router = useRouter();
  const { selectedTopicId, setSelectedTopicId } = useTopic();
  const { data: dataTopic, isLoading: isLoadingTopic } = useGetTopic();
  const [isPhone, setIsPhone] = useState(false);
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 667px)");
    const updateIsPhone = (event) => {
      setIsPhone(event.matches);
    };

    setIsPhone(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateIsPhone);

    return () => mediaQuery.removeEventListener("change", updateIsPhone);
  }, []);

  return (
    <Section
      className="bg-dark-blue"
      id="topics"
      wrapperClass={
        "p-16 flex flex-col items-center max-[667px]:px-6 max-[667px]:py-12"
      }
    >
      <h1 className={headline({ color: "white", class: "mb-2", size: "lg" })}>
        Topik
      </h1>
      <h4 className={subtitle({ color: "white", class: "text-center" })}>
        Pilih kursus yang Anda inginkan
      </h4>

      {isPhone && (
        <div className="mt-8 w-full">
          <Select
            aria-label="Pilih topik"
            selectedKeys={
              selectedTopicId !== null ? [selectedTopicId.toString()] : []
            }
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0];
              if (selectedKey) {
                setSelectedTopicId(Number(selectedKey));
              }
            }}
            placeholder="Pilih topik"
            radius="lg"
            classNames={{
              trigger:
                "min-h-14 rounded-2xl border border-[#14AE5C] bg-[#AFF4C6] px-4",
              value: "text-[#003452] font-semibold",
              popoverContent: "rounded-2xl",
              listboxWrapper: "max-h-80",
            }}
          >
            {(dataTopic || []).map((topic) => (
              <SelectItem key={topic.id}>{topic.title}</SelectItem>
            ))}
          </Select>
        </div>
      )}

      {isPhone ? (
        <TopicCards
          allTrainings={allTrainings}
          isLoadingTraining={isLoadingTraining}
          data={data}
          router={router}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      ) : (
        <Tabs
          radius="full"
          variant="light"
          aria-label="Tabs variants"
          isDisabled={isLoadingTopic}
          selectedKey={selectedTopicId?.toString()}
          onSelectionChange={(key) => setSelectedTopicId(Number(key))}
          className="mt-8 tab-topics w-full"
          classNames={{
            base: "w-full",
            panel: "w-full px-0",
            tabList: "mx-auto",
            tab: `
      border border-white
      data-[selected=true]:bg-[#AFF4C6]
      data-[selected=true]:border-[#14AE5C]
    `,
            tabContent: `
      text-white
      group-data-[selected=true]:text-[#003452]
      group-data-[selected=true]:font-semibold
    `,
          }}
        >
          {dataTopic?.map((item) => {
            return (
              <Tab key={item?.id} title={item?.title}>
                <TopicCards
                  allTrainings={allTrainings}
                  isLoadingTraining={isLoadingTraining}
                  data={data}
                  router={router}
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                  fetchNextPage={fetchNextPage}
                />
              </Tab>
            );
          })}
        </Tabs>
      )}
    </Section>
  );
}

function TopicCards({
  allTrainings,
  isLoadingTraining,
  data,
  router,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) {
  return (
    <>
      <div className="flex flex-wrap justify-center items-stretch w-full mt-8">
        {isLoadingTraining && !data?.pages.length ? (
          <Spinner />
        ) : (
          allTrainings.map((item) => {
            return (
              <div
                key={item.id}
                className="w-1/4 p-3 h-full max-[667px]:w-full max-[667px]:mb-4 max-[667px]:p-0"
                onClick={() => router.push(`/topic/${item?.id}`)}
              >
                <Card className="p-2 h-full flex flex-col justify-between cursor-pointer">
                  <CardHeader className="px-1 py-0.5 flex-col items-start">
                    <div className="relative w-full overflow-hidden rounded-xl">
                      <Image
                        alt="Card background"
                        className="mb-2 h-[151px] w-full object-cover"
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

                      <div className="flex items-center justify-start mb-2">
                        <h4
                          className={subtitle({
                            class: "font-semibold flex-none mr-2",
                          })}
                        >
                          {formatRupiah(
                            calculateDiscountPrice(
                              item.price,
                              item?.discount_percentage,
                            ),
                          )}
                        </h4>
                        {item?.discount_percentage > 0 && (
                          <div className="flex items-center gap-1 ">
                            <h4
                              className={subtitle({
                                color: "red",
                                size: "sm",
                              })}
                            >
                              {item?.discounted_price_fmt}
                            </h4>
                            <h4
                              className={subtitle({
                                class: "line-through",
                                color: "red",
                                size: "sm",
                              })}
                            >
                              {item?.price_fmt}
                            </h4>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-grow" />

                    <div className="flex items-center gap-3 min-h-[64px]">
                      <div className="w-12 h-12 flex-shrink-0">
                        <Avatar
                          src={item?.trainer?.profile_url}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      </div>

                      <div className="flex flex-col justify-center overflow-hidden">
                        <h4
                          className={subtitle({
                            size: "sm",
                            class: "font-semibold truncate",
                          })}
                        >
                          {item?.trainer?.full_name}
                        </h4>

                        <h4
                          className={subtitle({
                            size: "sm",
                            class: "text-gray-500 ",
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
          })
        )}
      </div>
      {hasNextPage && (
        <Button
          radius="sm"
          isLoading={isFetchingNextPage}
          onPress={() => fetchNextPage()}
          className="bg-white flex mx-auto font-semibold text-blue mt-6 max-[667px]:w-full"
        >
          Lihat Kursus Lainnya
        </Button>
      )}
    </>
  );
}
