import { parseDate } from "@/helpers/Date";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { ModalBody } from "@heroui/modal";
import { addToast } from "@heroui/toast";
import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";

export const PreviewCertificate = ({ item }) => {
  return (
    <ModalBody className="grid items-center gap-6 px-2 py-6 max-[667px]:px-0 md:grid-cols-5 md:gap-8">
      <div className="md:col-start-1 md:col-end-4">
        <Image
          alt="Card background"
          className="w-full rounded-xl object-cover"
          src={item?.image_url}
        />
      </div>
      <div className="flex flex-col gap-2 md:col-start-4 md:col-end-6">
        <div className="flex items-center gap-2 text-black font-semibold max-[667px]:items-start">
          <h4 className="min-w-28 max-[667px]:min-w-24">Lembaga</h4>
          <h4>:</h4>
          <h4 className="font-normal text-grey-900">ATMI</h4>
        </div>
        <div className="flex items-center gap-2 text-black font-semibold max-[667px]:items-start">
          <h4 className="min-w-28 max-[667px]:min-w-24">Pelatihan</h4>
          <h4>:</h4>
          <h4 className="font-normal text-grey-900">Rekayasa Manufaktur II</h4>
        </div>
        <div className="flex items-center gap-2 text-black font-semibold max-[667px]:items-start">
          <h4 className="min-w-28 max-[667px]:min-w-24">Nomor Sertifikat</h4>
          <h4>:</h4>
          <div
            className="flex cursor-pointer items-center gap-1"
            onClick={
              () => {}
              //   addToast({
              //     title: "Toast title",
              //     description: "Toast displayed successfully",
              //   })
            }
          >
            <h4 className="font-normal text-grey-900">
              {item?.certificate_number}
            </h4>
            <IoCopyOutline />
          </div>
        </div>
        <div className="flex items-center gap-2 text-black font-semibold max-[667px]:items-start">
          <h4 className="min-w-28 max-[667px]:min-w-24">Tanggal terbit</h4>
          <h4>:</h4>
          <h4 className="font-normal text-grey-900">{item?.assign_date}</h4>
        </div>

        <div className="mt-4 flex gap-2 md:mr-4">
          <Button
            radius="sm"
            fullWidth={true}
            startContent={<HiOutlineDownload color="secondary" size={22} />}
            color="secondary"
            variant="bordered"
            onPress={() => {
              window.open(item?.download_url, "_blank");
            }}
          >
            Unduh PDF
          </Button>
        </div>
      </div>
    </ModalBody>
  );
};
