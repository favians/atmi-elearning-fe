"use client";
import { headline } from "@/components/primitives";
import { Alert } from "@heroui/alert";
import { Tab, Tabs } from "@heroui/tabs";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { CardTraining } from "@/components/pages/dashboard/training/card-training";

export default function DashboardPage() {
  const tabs = ["Belum Selesai", "Sudah Selesai"];
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
              <div className="grid grid-cols-4">
                <CardTraining />
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
