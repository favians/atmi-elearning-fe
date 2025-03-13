import { PDFIcon } from "@/assets/icons/general/pdf";
import { VideoRecorder } from "@/assets/icons/general/video-recorder";
import { headline, subtitle, title } from "@/components/primitives";
import { trunc } from "@/helpers/Text";
import Section from "@/layouts/section";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Avatar } from "@heroui/avatar";
import { Tab, Tabs } from "@heroui/tabs";
import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export const DetailTraining = () => {
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
            <h4 className={subtitle({ class: "font-semibold" })}>
              IoT (3D Printing Industri)
            </h4>
            <h4 className={subtitle({ class: "mt-4" })}>
              Kelas Internet of Things Berbasis Proyek adalah kelas level lanjut
              di Indobot Academy. Sebelumnya peserta diharapkan sudah memahami
              fundamental elektronika dan sistem kendali. Jika saat ini kamu
              sedang bingung untuk fokus kepada karir apa maka kelas ini cocok
              sekali karena kamu yang akan mempelajari berbagai bidang. Setelah
              menyelesaikan kelas ini kamu dapat menjadi inovator, developer IoT
              di suatu startup dan bahkan tidak menutup kemungkinan kamu untuk
              membuat inovasi produkmu sendiri. Internet of Things adalah konsep
              teknologi yang memiliki kemampuan untuk mentransfer data lewat
              jaringan tanpa memerlukan adanya interaksi manusia ataupun dari
              manusia ke perangkat komputer. Macam-macam Bidang Penerapan IoT
              meliputi Pertanian, Energi, Lingkungan, Otomatisasi Rumah, Medik
              atau Kesehatan, dan Transportasi. Tapi bagaimana cara memulai
              belajar IoT? Tenang saja. Sekarang sudah ada Kursus Online
              Internet of Things (IoT). Pada kelas online ini kalian akan
              belajar tentang Internet of Things Berbasis Proyek yang dikemas
              dengan kurikulum 70% praktik dan 30% teori.
            </h4>
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
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title={
                <div className="flex items-center">
                  <h4
                    className={subtitle({
                      size: "sm",
                      class: "font-semibold flex flex-1",
                    })}
                  >
                    Bagian 1: Introduction
                  </h4>
                  <h4 className={subtitle({ size: "xs", color: "grey" })}>
                    2 Topik • 12 Menit
                  </h4>
                </div>
              }
              startContent={<div className="w-4" />}
            >
              <div className="flex items-center gap-2 mb-2">
                <VideoRecorder />
                <h4
                  className={subtitle({
                    size: "sm",
                    color: "grey",
                    class: "flex flex-1",
                  })}
                >
                  Perkenalan 3D Printing secara umum
                </h4>
                <h4 className={subtitle({ size: "xs", color: "grey" })}>
                  6 Menit
                </h4>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <VideoRecorder />
                <h4
                  className={subtitle({
                    size: "sm",
                    color: "grey",
                    class: "flex flex-1",
                  })}
                >
                  Apa itu Solidworks
                </h4>
                <h4 className={subtitle({ size: "xs", color: "grey" })}>
                  6 Menit
                </h4>
              </div>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 1"
              title={
                <div className="flex items-center">
                  <h4
                    className={subtitle({
                      size: "sm",
                      class: "font-semibold flex flex-1",
                    })}
                  >
                    Bagian 2: Pendahuluan
                  </h4>
                  <h4 className={subtitle({ size: "xs", color: "grey" })}>
                    2 Topik • 12 Menit
                  </h4>
                </div>
              }
              startContent={<div className="w-4" />}
            >
              <div className="flex items-center gap-2 mb-2">
                <VideoRecorder />
                <h4
                  className={subtitle({
                    size: "sm",
                    color: "grey",
                    class: "flex flex-1",
                  })}
                >
                  Perkenalan 3D Printing secara umum
                </h4>
                <h4 className={subtitle({ size: "xs", color: "grey" })}>
                  6 Menit
                </h4>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <VideoRecorder />
                <h4
                  className={subtitle({
                    size: "sm",
                    color: "grey",
                    class: "flex flex-1",
                  })}
                >
                  Apa itu Solidworks
                </h4>
                <h4 className={subtitle({ size: "xs", color: "grey" })}>
                  6 Menit
                </h4>
              </div>
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 1"
              title={
                <div className="flex items-center">
                  <h4
                    className={subtitle({
                      size: "sm",
                      class: "font-semibold flex flex-1",
                    })}
                  >
                    Bagian 3: Materi
                  </h4>
                  <h4 className={subtitle({ size: "xs", color: "grey" })}>
                    2 Topik • 12 Menit
                  </h4>
                </div>
              }
              startContent={<div className="w-4" />}
            >
              <div className="flex items-center gap-2 mb-2">
                <VideoRecorder />
                <h4
                  className={subtitle({
                    size: "sm",
                    color: "grey",
                    class: "flex flex-1",
                  })}
                >
                  Perkenalan 3D Printing secara umum
                </h4>
                <h4 className={subtitle({ size: "xs", color: "grey" })}>
                  6 Menit
                </h4>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <VideoRecorder />
                <h4
                  className={subtitle({
                    size: "sm",
                    color: "grey",
                    class: "flex flex-1",
                  })}
                >
                  Apa itu Solidworks
                </h4>
                <h4 className={subtitle({ size: "xs", color: "grey" })}>
                  6 Menit
                </h4>
              </div>
            </AccordionItem>
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
              <PDFIcon />
              <div className=" items-center gap-2">
                Type-of-document-research-1234.pdf
                <h4 className={subtitle({ size: "sm", color: "grey" })}>
                  120 KB
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
        </Tab>
      </Tabs>

      <div className="w-2/3 my-4 border-1 border-secondary p-4 rounded-lg bg-[#F1F5F9]">
        <h3 className={headline({ class: "mb-4", size: "sm" })}>Intruktur</h3>

        <div className="flex gap-4">
          <Avatar
            size="lg"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            className="min-w-fit"
          />
          <div className="flex flex-col gap-0.5">
            <h4 className={subtitle({ class: "font-semibold", size: "sm" })}>
              Vian Gaul
            </h4>
            <h4 className={subtitle({ size: "sm", color: "grey" })}>
              Practioner 3D Printing
            </h4>

            <h4 className={subtitle({ size: "sm", color: "primary" })}>
              viangaul@gmail.com
            </h4>
            <h4
              className={subtitle({ size: "sm", color: "grey", class: "mt-1" })}
            >
              {trunc(
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
                160,
                "",
                isReadMore,
              )}

              <span
                className="text-primary cursor-pointer ml-1"
                onClick={() => setIsReadMore(!isReadMore)}
              >
                {isReadMore ? "See more" : "See less"} «
              </span>
            </h4>
          </div>
        </div>
      </div>
    </Section>
  );
};
