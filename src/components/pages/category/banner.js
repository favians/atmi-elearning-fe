import { CerFile } from "@/assets/icons/general/cer-file";
import { DocFile } from "@/assets/icons/general/doc-file";
import { VideoFile } from "@/assets/icons/general/video-file";
import { VideoRecorder } from "@/assets/icons/general/video-recorder";
import { title, subtitle } from "@/components/primitives";
import Section from "@/layouts/section";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";

export default function AboutCategory() {
  return (
    <Section
      className="bg-grey-400 relative flex lg:h-[295px]"
      wrapperClass="flex items-center relative  gap-14"
    >
      <div className="inline-block max-w-xl  justify-center">
        <h1 className={title()}>
          3D Printing Untuk Rekayasa Manufaktur dan Industri
        </h1>
        <h4 className={subtitle({ class: "mt-2" })}>
          Kelola kemampuan dan tingkatkan skill dalam membuat model CAD dan
          implementasinya di industri manufaktur.
        </h4>
      </div>
      <Card radius="sm" className="py-2 absolute right-0 top-6">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <Image
            alt="Card background"
            className="object-cover"
            src="https://heroui.com/images/hero-card-complete.jpeg"
            width={270}
            radius="sm"
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2 ">
          <div className="flex-row items-center my-2 flex">
            <h4
              className={subtitle({
                class: "font-semibold flex flex-1",
                size: "sm",
              })}
            >
              Rp70.000
            </h4>
            <div className="flex items-center gap-1 ">
              <h4
                className={subtitle({
                  color: "red",
                  size: "sm",
                })}
              >
                Diskon 50%
              </h4>
              <h4
                className={subtitle({
                  class: "line-through",
                  color: "red",
                  size: "sm",
                })}
              >
                Rp140.000
              </h4>
            </div>
          </div>

          <Button color="primary" className="w-fit my-2">
            Daftar Kelas
          </Button>

          <div>
            <h4
              className={subtitle({
                class: "font-semibold my-2",
                size: "sm",
              })}
            >
              Kursus ini meliputi:
            </h4>
            <div className="flex items-center gap-2 my-1.5">
              <div className="text-primary">
                <VideoFile />
              </div>

              <h5 className={subtitle({ size: "sm", color: "grey" })}>
                Video dengan durasi 2,5 jam
              </h5>
            </div>

            <div className="flex items-center gap-2 my-1.5">
              <div className="text-primary">
                <DocFile />
              </div>

              <h5 className={subtitle({ size: "sm", color: "grey" })}>
                5 dokumen yang dapat diunduh
              </h5>
            </div>

            <div className="flex items-center gap-2 my-1.5">
              <div className="text-primary">
                <CerFile />
              </div>
              <h5 className={subtitle({ size: "sm", color: "grey" })}>
                Sertifikat
              </h5>
            </div>
          </div>
        </CardBody>
      </Card>
    </Section>
  );
}
