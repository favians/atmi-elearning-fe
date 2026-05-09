"use client";

import { Suspense } from "react";
import Benefit from "@/components/pages/about/benefit";
import CTA from "@/components/pages/about/cta";
import { headline, subtitle } from "@/components/primitives";
import { useSearchTraining } from "@/hooks/home/useSearchTraining";
import { calculateDiscountPrice, formatRupiah } from "@/helpers/Number";
import DefaultLayout from "@/layouts/default";
import Section from "@/layouts/section";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import { Image } from "@heroui/image";
import { Spinner } from "@heroui/spinner";
import NextImage from "next/image";
import searchNotFound from "@/assets/images/illustration/searc_not_found.webp";

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q")?.trim() || "";
  const hasQuery = query.length > 0;

  const { data, isLoading } = useSearchTraining({
    params: {
      limit: 12,
      name_search: query,
    },
    enabled: hasQuery,
  });

  const results = data || [];

  return (
    <DefaultLayout>
      <Section
        className="bg-[#F6F1EC]"
        wrapperClass="py-12 max-[667px]:px-6 max-[667px]:py-10"
      >
        {results.length > 0 && (
          <>
            <h1
              className={headline({
                class:
                  "mb-2 text-[28px] font-bold leading-tight max-[667px]:text-[24px]",
                size: "md",
              })}
            >
              {`${results.length} hasil ditemukan untuk "${query}"`}
            </h1>
          </>
        )}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : !hasQuery || results.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-4 pb-12 text-center max-[667px]:pt-4 max-[667px]:pb-8">
            <NextImage
              src={searchNotFound}
              alt="Kursus tidak ditemukan"
              className="mb-6 h-auto w-[120px] max-[667px]:mb-5 max-[667px]:w-[96px]"
              priority
            />
            <h3
              className={headline({
                size: "sm",
                class: "mb-2 text-center text-[24px] font-semibold leading-tight max-[667px]:text-[20px]",
              })}
            >
              Kami tidak dapat menemukan apa yang Anda cari.
            </h3>
            <p className={subtitle({ color: "grey", class: "text-center" })}>
              Coba gunakan kata kunci lainnya
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {results.map((item) => (
              <div
                key={item.id}
                className="h-full"
                onClick={() => router.push(`/topic/${item?.id}`)}
              >
                <Card className="h-full cursor-pointer border border-[#E5E7EB] p-2 shadow-none">
                  <CardHeader className="px-1 py-0.5 flex-col items-start">
                    <div className="relative w-full overflow-hidden rounded-xl">
                      <Image
                        alt={item?.title}
                        className="mb-2 h-[151px] w-full rounded-xl object-cover"
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
                    <h4 className={subtitle({ size: "sm", color: "grey" })}>
                      {item?.material_count_fmt}
                    </h4>
                  </CardHeader>

                  <CardBody className="overflow-visible px-1">
                    <h3
                      className={subtitle({
                        class: "my-2 line-clamp-2 font-semibold",
                      })}
                    >
                      {item.title}
                    </h3>
                    <h4
                      className={subtitle({
                        size: "sm",
                        color: "grey",
                        class: "mb-2 line-clamp-4 min-h-[88px]",
                      })}
                    >
                      {item.small_description}
                    </h4>

                    <div className="mb-2 flex items-center gap-2">
                      <h4 className={subtitle({ class: "font-semibold" })}>
                        {formatRupiah(
                          calculateDiscountPrice(
                            item.price,
                            item?.discount_percentage,
                          ),
                        )}
                      </h4>
                      {item?.discount_percentage > 0 && (
                        <h4
                          className={subtitle({
                            class: "line-through",
                            size: "sm",
                            color: "red",
                          })}
                        >
                          {item?.price_fmt}
                        </h4>
                      )}
                    </div>

                    <div className="mt-auto flex items-center gap-2">
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
                        <h4 className={subtitle({ size: "sm", color: "grey" })}>
                          {item?.trainer?.job}
                        </h4>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Benefit />
      <CTA />
    </DefaultLayout>
  );
}
