"use client";
import { StarIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import Section from "@/layouts/section";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export default function CustomerCounter({ data, isLoading }) {
  return (
    <Section
      className="bg-cyan-blue flex lg:h-[280px]"
      wrapperClass="flex items-center "
    >
      <div className="grid grid-cols-4 w-full gap-4">
        <Card radius="sm" shadow="none" className="py-4 col-span-1">
          <Skeleton className="mx-4 min-h-16 rounded-lg" isLoaded={!isLoading}>
            <CardHeader className="flex justify-center gap-2">
              <h3 className={title({ color: "blue", class: "font-semibold" })}>
                {data?.participant_rating}
              </h3>
              <StarIcon color="#F59E0B" />
            </CardHeader>
          </Skeleton>
          <CardBody className="py-1">
            <h4
              className={subtitle({
                class: "text-center whitespace-pre-wrap",
              })}
            >
              {"Rating \nkepuasan peserta"}
            </h4>
          </CardBody>
        </Card>

        <Card radius="sm" shadow="none" className="py-4 col-span-1">
          <Skeleton className="mx-4 min-h-16 rounded-lg" isLoaded={!isLoading}>
            <CardHeader className="flex justify-center gap-2">
              <h3 className={title({ color: "blue", class: "font-semibold" })}>
                {data?.participant_number}
              </h3>
            </CardHeader>
          </Skeleton>
          <CardBody className="py-1">
            <h4
              className={subtitle({
                class: "text-center whitespace-pre-wrap",
              })}
            >
              {"Peserta telah berkembang \nbersama kami"}
            </h4>
          </CardBody>
        </Card>

        <Card radius="sm" shadow="none" className="py-4 col-span-1">
          <Skeleton className="mx-4 min-h-16 rounded-lg" isLoaded={!isLoading}>
            <CardHeader className="flex justify-center gap-2">
              <h3 className={title({ color: "blue", class: "font-semibold" })}>
                {data?.instructor_number}
              </h3>
            </CardHeader>
          </Skeleton>
          <CardBody className="py-1">
            <h4
              className={subtitle({
                class: "text-center whitespace-pre-wrap",
              })}
            >
              {"Pengajar \nbersertifikat BNSP"}
            </h4>
          </CardBody>
        </Card>

        <Card radius="sm" shadow="none" className="py-4 col-span-1">
          <Skeleton className="mx-4 min-h-16 rounded-lg" isLoaded={!isLoading}>
            <CardHeader className="flex justify-center gap-2">
              <h3 className={title({ color: "blue", class: "font-semibold" })}>
                {data?.certificate_number}
              </h3>
            </CardHeader>
          </Skeleton>
          <CardBody className="py-1">
            <h4
              className={subtitle({
                class: "text-center whitespace-pre-wrap",
              })}
            >
              {"Kursus bersertifikat dengan \nberagam topik"}
            </h4>
          </CardBody>
        </Card>
      </div>
    </Section>
  );
}
