import { CerFile } from "@/assets/icons/general/cer-file";
import { DocFile } from "@/assets/icons/general/doc-file";
import { VideoFile } from "@/assets/icons/general/video-file";
import { title, subtitle } from "@/components/primitives";
import Section from "@/layouts/section";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Spinner } from "@heroui/spinner";

export default function AboutCategory({ data, isLoading }) {
  return (
    <Section
      className="bg-grey-400 relative flex lg:h-[295px]"
      wrapperClass="flex items-center relative  gap-14"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="inline-block max-w-xl  justify-center">
          <h1 className={title({ class: "line-clamp-3 tracking-normal" })}>
            {data?.title}
          </h1>
          <h4 className={subtitle({ class: "mt-2 line-clamp-4" })}>
            {data?.small_description}
          </h4>
        </div>
      )}
      <Card radius="sm" className="py-2 absolute right-0 top-6">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <Image
            alt="Card background"
            className="object-cover"
            src={data?.image_url}
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
              {data?.discounted_price_fmt}
            </h4>
            <div className="flex items-center gap-1 ">
              <h4
                className={subtitle({
                  color: "red",
                  size: "sm",
                })}
              >
                {data?.discount_fmt}
              </h4>
              <h4
                className={subtitle({
                  class: "line-through",
                  color: "red",
                  size: "sm",
                })}
              >
                {data?.price_fmt}
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

            {data?.training_included_list?.map((item, index) => (
              <div key={index} className="flex items-center gap-2 my-1.5">
                <div className="text-primary">
                  {item?.icon.includes("video") ? (
                    <VideoFile />
                  ) : item?.icon.includes("document") ? (
                    <DocFile />
                  ) : (
                    <CerFile />
                  )}
                </div>

                <h5 className={subtitle({ size: "sm", color: "grey" })}>
                  {item?.content}
                </h5>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </Section>
  );
}
