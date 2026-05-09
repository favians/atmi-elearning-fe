"use client";
import { subtitle } from "@/components/primitives";
import { useGetCertificate } from "@/hooks/trainee/useGetCertificate";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import React, { useCallback, useState } from "react";
import FilterCertificate from "./filter-certificate";
import noTrain from "@/assets/images/illustration/no-train.png";

import { Spinner } from "@heroui/spinner";
import { Image } from "@heroui/image";

export const CertificateItems = ({ onOpen }) => {
  const [filter, setFilter] = useState({
    page: 1,
    name_search: "",
    order_rule: "DESC",
  });
  const { data, isLoading } = useGetCertificate({
    params: {
      limit: 10,
      page: filter?.page,
      is_active: true,
      // name_search: filter?.name_search,
      order_by: "id",
      order_rule: filter?.order_rule,
    },
  });

  const onValueChange = useCallback(
    (value) => {
      setFilter({ ...filter, ...value });
    },
    [filter],
  );

  const handleDownload = (url) => {
    const newTab = window.open(url, "_blank");
    if (newTab) {
      newTab.focus();
    }
  };

  return (
    <>
      <div className="mx-4 max-[667px]:mx-4">
        <FilterCertificate onValueChange={onValueChange} />
      </div>
      <div className="m-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center">
            <Spinner />
          </div>
        ) : data?.data?.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-4">
              <Image
                src={noTrain}
                alt="Logo White"
                height={160}
                className="mx-auto object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-default-700">
              Belum ada sertifikat
            </h3>
            <p className="text-sm text-default-500">
              Sertifikat yang tersedia akan muncul di sini
            </p>
          </div>
        ) : (
          data?.data?.map((item) => {
            return (
              <Card
                key={item?.id}
                shadow="none"
                className="border-1 max-[667px]:mx-auto max-[667px]:w-full max-[667px]:max-w-[360px]"
              >
                <CardHeader>
                  <Image
                    alt="Card background"
                    className="h-auto w-full rounded-xl object-cover"
                    src={item?.image_url}
                  />
                </CardHeader>

                <CardBody className="px-3 py-4 text-center">
                  <h4
                    className={subtitle({
                      class: "font-semibold mb-1",
                      size: "sm",
                    })}
                  >
                    ID: {item?.certificate_number}
                  </h4>

                  <h4 className={subtitle({ size: "sm", color: "grey" })}>
                    Tanggal Terbit:
                    <br />
                    {item?.assign_date}
                  </h4>
                </CardBody>

                <CardFooter className="flex-col gap-3">
                  <Divider />
                  <div className="flex gap-4 text-primary">
                    <Link
                      onPress={() => onOpen(item)}
                      size="sm"
                      className="cursor-pointer"
                    >
                      Preview
                    </Link>

                    <h4> • </h4>

                    <Link
                      as={"button"}
                      onPress={() => handleDownload(item?.download_url)}
                      size="sm"
                    >
                      Download
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>
    </>
  );
};
