import { VideoRecorder } from "@/assets/icons/general/video-recorder";
import { subtitle } from "@/components/primitives";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import React from "react";
import { Divider } from "@heroui/divider";
import { PDFIcon } from "@/assets/icons/general/pdf";

export const TrainingContent = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h4 className={subtitle({ class: "font-semibold" })}>
          Sketsa pada foto{" "}
        </h4>

        <h4
          className={subtitle({
            class: "flex items-center gap-1",
            color: "grey",
          })}
        >
          • <VideoRecorder /> 12 Menit
        </h4>
      </div>

      <div className="mt-6 flex">
        <div className="flex flex-1 gap-2 items-center">
          <BsArrowLeftCircle size={36} color="#8B95A5" />
          <div>
            <h4 className={subtitle({ color: "grey", size: "sm" })}>
              Sebelumnya
            </h4>
            <h4 className={subtitle({ size: "sm" })}>
              Gunakan beberapa fitur Sketsa yang rumit
            </h4>
          </div>
        </div>
        <div className="flex flex-1 justify-end text-right gap-2 items-center">
          <div>
            <h4 className={subtitle({ color: "grey", size: "sm" })}>
              Selanjutnya
            </h4>
            <h4 className={subtitle({ size: "sm" })}>Mulai 3d Model</h4>
          </div>

          <BsArrowRightCircle size={36} color="#8B95A5" />
        </div>
      </div>

      <Divider className="my-6" />

      <div>
        <h4 className={subtitle({ size: "sm", color: "grey", class: "mb-1" })}>
          Summary
        </h4>
        <h4 className={subtitle()}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </h4>
      </div>

      <Divider className="my-6" />

      <div>
        <h4 className={subtitle({ size: "sm", color: "grey", class: "mb-1" })}>
          Learning Material
        </h4>
        <div
          className={subtitle({
            class: "border-1 w-fit px-4 py-3 rounded-lg flex gap-3  text-sm ",
          })}
        >
          <PDFIcon />
          <div className=" items-center gap-2">
            Type-of-document-research-1234.pdf
            <h4 className={subtitle({ size: "sm", color: "grey" })}>
              Size of file
            </h4>
            <h4
              className={subtitle({
                size: "sm",
                color: "green",
              })}
            >
              Download
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
