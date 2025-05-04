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
    <ModalBody className="grid grid-cols-5 items-center gap-8 px-2">
      <div className="col-start-1 col-end-4">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={item?.image_url}
        />
      </div>
      <div className="col-start-4 col-end-6 gap-2 flex flex-col">
        <div className="flex items-center text-black  font-semibold gap-2">
          <h4 className="min-w-32">Lembaga</h4>
          <h4>:</h4>
          <h4 className="font-normal text-grey-900">ATMI</h4>
        </div>
        <div className="flex items-center text-black font-semibold gap-2">
          <h4 className="min-w-32">Pelatihan</h4>
          <h4>:</h4>
          <h4 className="font-normal text-grey-900">Rekayasa Manufaktur II</h4>
        </div>
        <div className="flex items-center text-black font-semibold gap-2">
          <h4 className="min-w-32">Nomor Sertifikat</h4>
          <h4>:</h4>
          <div
            className="flex cursor-pointer gap-1 items-center"
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
        <div className="flex items-center text-black font-semibold gap-2">
          <h4 className="min-w-32">Tanggal terbit</h4>
          <h4>:</h4>
          <h4 className="font-normal text-grey-900">
            {parseDate(item?.assign_date, "DD MMMM yyyy", "dd/mm/yyyy")}
          </h4>
        </div>
        <div className="flex items-center text-black font-semibold gap-2">
          <h4 className="min-w-32">Kadaluwarsa</h4>
          <h4>:</h4>
          <h4 className="font-normal text-grey-900">
            Tidak ada tanggal kadaluwarsa
          </h4>
        </div>

        <div className="flex gap-2 mt-4 mr-4">
          <Button
            radius="sm"
            fullWidth={true}
            startContent={<FaLinkedin color="white" size={22} />}
            color="secondary"
          >
            Share di LinkedIn
          </Button>

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
