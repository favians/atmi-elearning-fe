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

export const CardTraining = ({ data }) => {
  const router = useRouter();
  return (
    <Card className="py-0 h-fit">
      <CardHeader className="pb-2 flex-col relative items-start">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={data?.user_training?.photo_url}
          width={270}
        />
        <div className="absolute flex items-center rounded-md px-2 text-xs gap-1 py-1 top-6 text-grey-900 right-6 z-10 bg-white">
          <FiAlertCircle size={15} /> Lihat Info
        </div>
      </CardHeader>
      <CardBody className="overflow-visible pt-0 ">
        <h4 className={subtitle({ size: "xs" })}>
          {data?.user_training?.material_count} Materi Pembelajaran •{" "}
          {data?.user_training?.duration_fmt}
        </h4>
        <h3 className={subtitle({ class: "mt-2 font-semibold" })}>
          {data?.user_training?.title}
        </h3>
        <h4 className={subtitle({ size: "sm", class: "mt-2" })}>
          {data?.user_training?.small_description}
        </h4>

        <div className="mt-4 items-center gap-2 flex">
          <Avatar size="sm" src={data?.trainer_data?.photo_profile_url} />
          <div>
            <h4 className={subtitle({ size: "sm" })}>
              {data?.trainer_data?.full_name}
            </h4>
            <h4 className={subtitle({ size: "xs", color: "grey" })}>
              {data?.trainer_data?.job}
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
              {data?.training_progress?.percentage_fmt}{" "}
              <div className="font-semibold">of</div> 100%
            </h4>
          </div>
        </div>

        <div className="my-2">
          <Progress
            aria-label="Loading..."
            className="max-w-md h-2"
            size="md"
            value={data?.training_progress?.percentage}
            color="warning"
          />
        </div>

        <Button
          radius="sm"
          startContent={<FaPlay />}
          className="mt-2"
          color="primary"
          onPress={() =>
            router.push(`/dashboard/training/${data?.user_training?.id}`)
          }
        >
          Mulai Pelatihan
        </Button>
      </CardBody>
    </Card>
  );
};
