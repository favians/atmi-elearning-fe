import { subtitle } from "@/components/primitives";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Progress } from "@heroui/progress";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";

export const CardTraining = () => {
  const router = useRouter();
  return (
    <Card className="py-0 h-fit">
      <CardHeader className="pb-2 flex-col relative items-start">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          width={270}
        />
        <div className="absolute flex items-center rounded-md px-2 text-xs gap-1 py-1 top-6 text-grey-900 right-6 z-10 bg-white">
          <FiAlertCircle size={15} /> Lihat Info
        </div>
      </CardHeader>
      <CardBody className="overflow-visible pt-0 ">
        <h4 className={subtitle({ size: "xs" })}>
          30 Materi Pembelajaran • 1Jam 40Menit
        </h4>
        <h3 className={subtitle({ class: "mt-2 font-semibold" })}>
          Teknik Desain Manufaktur berbasis pengembangan teknologi polimer
        </h3>
        <h4 className={subtitle({ size: "sm", class: "mt-2" })}>
          Merancang dan merencanakan mesin, komponen mekanis dan otomasi.
        </h4>

        <div className="mt-4 items-center gap-2 flex">
          <Avatar
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
          <div>
            <h4 className={subtitle({ size: "sm" })}>Jessie Stan</h4>
            <h4 className={subtitle({ size: "xs", color: "grey" })}>
              Trainer Rekayasa Manufaktur
            </h4>
          </div>
        </div>

        <div className="flex mt-4 items-center">
          <h4
            className={subtitle({
              size: "sm",
              color: "grey",
              className: "flex flex-1",
            })}
          >
            Progress
          </h4>
          <div>
            <h4
              className={subtitle({
                size: "xs",
                color: "grey",
                class: "flex gap-1",
              })}
            >
              0% <div className="font-semibold">of</div> 100%
            </h4>
          </div>
        </div>

        <div className="my-2">
          <Progress
            aria-label="Loading..."
            className="max-w-md h-2"
            size="md"
            value={60}
            color="warning"
          />
        </div>

        <Button
          radius="sm"
          startContent={<FaPlay />}
          className="mt-2"
          color="primary"
          onPress={() => router.push(`/dashboard/training/1`)}
        >
          Mulai Pelatihan
        </Button>
      </CardBody>
    </Card>
  );
};
