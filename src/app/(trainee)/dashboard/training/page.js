"use client";
import { headline } from "@/components/primitives";
import { Alert } from "@heroui/alert";
import { Tab, Tabs } from "@heroui/tabs";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { CardTraining } from "@/components/pages/dashboard/training/card-training";
import { useGetTraining } from "@/hooks/trainee/useGetTraining";
import { Spinner } from "@heroui/spinner";
import { useState } from "react";
import noTrain from "@/assets/images/illustration/no-train.png";
import Image from "next/image";
export default function DashboardPage() {
  const tabs = ["Belum Selesai", "Sudah Selesai"];
  const [selectedTab, setSelectedTab] = useState(0);
  const status = selectedTab === 0 ? "IN_PROGRESS" : "DONE";
  const { data, isLoading } = useGetTraining({
    params: { page: 1, status: status },
  });

  const trainings = data?.data || [];
  const isEmpty = !isLoading && trainings.length === 0;

  return (
    <DashboardLayout>
      <div key={"primary"} className="w-full flex items-center">
        <Alert
          classNames={{ base: "rounded-none" }}
          color={"primary"}
          title={`Selesaikan pelatihan dengan tepat waktu untuk dapatkan sertifikat.`}
        />
      </div>
      <section className="flex flex-col justify-center gap-4 p-6">
        <div className="inline-block max-w-lg justify-center">
          <h1 className={headline({})}>Pelatihan Saya</h1>
        </div>
      </section>
      <div className="flex flex-wrap flex-grow flex-col">
        <Tabs
          aria-label="Options"
          selectedKey={tabs[selectedTab]}
          onSelectionChange={(key) => {
            const index = tabs.findIndex((tab) => tab === key);
            setSelectedTab(index);
          }}
          classNames={{
            tabList:
              "gap-8 w-full relative w-fit rounded-none p-0 border-divider mx-6",
            cursor: "w-full bg-blue",
            tab: "px-0 py-0 h-12 ",
            tabContent: "group-data-[selected=true]:text-blue",
            panel: "bg-white grow p-6 flex border-t flex-1",
          }}
          color="primary"
          variant="underlined"
        >
          {tabs.map((item) => (
            <Tab key={item} title={item}>
              {isLoading && (
                <div className="flex justify-center items-center py-20 w-full">
                  <Spinner />
                </div>
              )}

              {isEmpty && (
                <div className="flex flex-col items-center justify-center py-20 text-center w-full">
                  <div className="text-4xl mb-4">
                    {" "}
                    <Image
                      src={noTrain}
                      alt="Logo White"
                      height={160}
                      className="mx-auto object-cover"
                    />
                  </div>

                  <h3 className="text-lg font-semibold">
                    {selectedTab === 0
                      ? "Belum Ada Pelatihan"
                      : "Belum ada pelatihan yang selesai"}
                  </h3>

                  <p className="text-gray-500 mt-2 max-w-md">
                    {selectedTab === 0
                      ? "Anda belum memulai pelatihan apapun, segera mulai pelatihan untuk meningkatkan kompetensi dan dapatkan sertifikat."
                      : "Selesaikan pelatihan terlebih dahulu, agar pelatihan yang selesai masuk ke dalam menu ini."}
                  </p>
                </div>
              )}

              {!isLoading && !isEmpty && (
                <div className="grid grid-cols-4 gap-6">
                  {trainings.map((item) => (
                    <CardTraining key={item?.id} data={item} />
                  ))}
                </div>
              )}
            </Tab>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
