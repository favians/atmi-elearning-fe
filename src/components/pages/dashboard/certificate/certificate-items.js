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
      <div className="mx-4">
        <FilterCertificate onValueChange={onValueChange} />
      </div>
      <div className="m-4 grid grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 flex justify-center">
            <Spinner />
          </div>
        ) : data?.data?.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center py-16 text-center">
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
              <Card key={item?.id} shadow="none" className="border-1">
                <CardHeader>
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
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

                <CardFooter className="gap-3 flex-col">
                  <Divider />
                  <div className="flex text-primary gap-4">
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
