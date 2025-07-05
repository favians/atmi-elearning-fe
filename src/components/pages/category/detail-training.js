import { PDFIcon } from "@/assets/icons/general/pdf";
import { VideoRecorder } from "@/assets/icons/general/video-recorder";
import { headline, subtitle } from "@/components/primitives";
import { trunc } from "@/helpers/Text";
import Section from "@/layouts/section";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Avatar } from "@heroui/avatar";
import { Tab, Tabs } from "@heroui/tabs";
import React, { useState } from "react";

export const DetailTraining = ({ data, isLoading }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  return (
    <Section className="my-16">
      <Tabs
        key={"secondary"}
        aria-label="Tabs colors"
        color={"secondary"}
        radius="full"
        size="lg"
        classNames={{ tab: "m-1", panel: "w-2/3 mt-2" }}
      >
        <Tab key="photos" title="Deskripsi">
          <div className="border-1 rounded-lg p-4">
            <h4>{data?.long_description}</h4>
          </div>
        </Tab>
        <Tab key="music" title="Konten Materi">
          <Accordion
            defaultExpandedKeys={["2"]}
            className="px-0"
            variant="splitted"
            itemClasses={{
              trigger: "items-start relative",
              indicator:
                "mt-1 rotate-90 data-[open=true]:-rotate-90 absolute left-0 top-3.5 text-black",
              content: "pt-0",
              title: "font-semibold text-sm",
              base: "shadow-none border-1",
            }}
          >
            {data?.modules.map((item) => {
              return (
                <AccordionItem
                  key={item?.id}
                  aria-label="Accordion 1"
                  title={
                    <div className="flex items-center">
                      <h4
                        className={subtitle({
                          size: "sm",
                          class: "font-semibold flex flex-1",
                        })}
                      >
                        {item?.title}
                      </h4>
                      <h4 className={subtitle({ size: "xs", color: "grey" })}>
                        2 Topik • 12 Menit
                      </h4>
                    </div>
                  }
                  startContent={<div className="w-4" />}
                >
                  {item?.material_content?.map((material) => (
                    <div className="flex items-center gap-2 mb-2">
                      <VideoRecorder />
                      <h4
                        className={subtitle({
                          size: "sm",
                          color: "grey",
                          class: "flex flex-1",
                        })}
                      >
                        {material?.topic_title}
                      </h4>
                      <h4 className={subtitle({ size: "xs", color: "grey" })}>
                        6 Menit
                      </h4>
                    </div>
                  ))}
                </AccordionItem>
              );
            })}
          </Accordion>
        </Tab>
        <Tab key="videos" title="Rundown">
          <div className="border-1 rounded-lg px-4 py-2  ">
            <h4 className={subtitle({ class: "font-semibold mb-2" })}>
              Download rundown dibawah ini
            </h4>
            <div
              className={subtitle({
                class:
                  "border-1 w-fit px-4 py-3 rounded-lg flex gap-3  text-sm my-2",
              })}
            >
              {/* <PDFIcon /> */}
              <div className=" items-center gap-2">
                {data?.rundown_file.split("/").pop()}
                {/* <h4 className={subtitle({ size: "sm", color: "grey" })}>
                  120 KB
                </h4> */}
                <h4
                  className={subtitle({
                    size: "sm",
                    class: "cursor-pointer",
                    color: "green",
                  })}
                  onClick={() => window.open(data?.rundown_file, "_blank")}
                >
                  Download
                </h4>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>

      <div className="w-2/3 my-4 border-1 border-secondary p-4 rounded-lg bg-[#F1F5F9]">
        <h3 className={headline({ class: "mb-4", size: "sm" })}>Intruktur</h3>

        <div className="flex gap-4">
          <Avatar
            size="lg"
            src={data?.trainer?.photo_profile_url}
            className="min-w-fit"
          />
          <div className="flex flex-col gap-0.5">
            <h4 className={subtitle({ class: "font-semibold", size: "sm" })}>
              {data?.trainer?.full_name}
            </h4>
            <h4 className={subtitle({ size: "sm", color: "grey" })}>
              {data?.trainer?.job}
            </h4>

            <h4 className={subtitle({ size: "sm", color: "primary" })}>
              {data?.trainer?.email}
            </h4>
            <h4
              className={subtitle({ size: "sm", color: "grey", class: "mt-1" })}
            >
              {trunc(data?.trainer?.about_trainer, 160, "", isReadMore)}

              {data?.trainer?.about_trainer.length > 160 && (
                <span
                  className="text-primary cursor-pointer ml-1"
                  onClick={() => setIsReadMore(!isReadMore)}
                >
                  {isReadMore ? "See more" : "See less"} «
                </span>
              )}
            </h4>
          </div>
        </div>
      </div>
    </Section>
  );
};
