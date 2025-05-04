import { subtitle } from "@/components/primitives";
import { dateFormat, parseDate } from "@/helpers/Date";
import { useGetCertificate } from "@/hooks/trainee/useGetCertificate";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import React from "react";
import FilterCertificate from "./filter-certificate";
import { Spinner } from "@heroui/spinner";

export const CertificateItems = ({ onOpen }) => {
  const [filter, setFilter] = React.useState({
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

  const onValueChange = React.useCallback(
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
          <Spinner />
        ) : (
          data?.data?.map((item) => {
            return (
              <Card shadow="none" className="border-1">
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
                    {parseDate(item?.assign_date, "DD MMMM yyyy", "dd/mm/yyyy")}
                  </h4>
                </CardBody>
                <CardFooter className="gap-3 flex-col">
                  <Divider className="" />
                  <div className="flex text-primary gap-4">
                    <Link
                      onPress={() => onOpen(item)}
                      size="sm"
                      className="cursor-pointer"
                    >
                      Preview
                    </Link>
                    <h4> • </h4>
                    <Link href="#" size="sm">
                      Share
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
