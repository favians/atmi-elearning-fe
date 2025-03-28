import { subtitle } from "@/components/primitives";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import React from "react";

export const CertificateItems = ({ onOpen }) => {
  return (
    <div className="m-4 grid grid-cols-3 gap-6">
      {["", "", "", ""].map((item) => {
        return (
          <Card shadow="none" className="border-1">
            <CardHeader>
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
              />
            </CardHeader>
            <CardBody className="px-3 py-4 text-center">
              <h4
                className={subtitle({
                  class: "font-semibold mb-1",
                  size: "sm",
                })}
              >
                ID: MAJU/CA/2017/0004
              </h4>
              <h4 className={subtitle({ size: "sm", color: "grey" })}>
                Tanggal Terbit:
                <br />
                20 Juni 2024
              </h4>
            </CardBody>
            <CardFooter className="gap-3 flex-col">
              <Divider className="" />
              <div className="flex text-primary gap-4">
                <Link onPress={onOpen} size="sm" className="cursor-pointer">
                  Preview
                </Link>
                <h4> • </h4>
                <Link href="#" size="sm">
                  Share
                </Link>
                <h4> • </h4>
                <Link href="#" size="sm">
                  Download
                </Link>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
