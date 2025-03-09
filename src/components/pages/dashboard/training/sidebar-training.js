import { subtitle } from "@/components/primitives";
import { Sidebar } from "@/components/shared/sidebar/sidebar.styles";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Checkbox } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";
import { Progress } from "@heroui/progress";
import { useRouter } from "next/navigation";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { LuSquareCheckBig } from "react-icons/lu";

export const SidebarTraining = () => {
  const router = useRouter();
  return (
    <aside className=" w-80 fixed min-h-full border-r pt-5 left-0 top-0 bg-white">
      <div className={Sidebar()}>
        <div className="flex flex-1 mt-8 flex-col justify-between ">
          <div
            onClick={() => router.back()}
            className="text-primary cursor-pointer flex items-center text-sm gap-2"
          >
            <GoArrowLeft /> Kembali ke Pelatihan Saya
          </div>
          <h4 className={subtitle({ class: "font-semibold mt-2", size: "sm" })}>
            3D Printing Untuk Rekayasa Manufaktur dan Industri
          </h4>
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
          <Divider className="my-4 " />

          <Accordion
            defaultExpandedKeys={["2"]}
            className="px-0"
            itemClasses={{
              trigger: "items-start ",
              indicator: "mt-1 rotate-90   data-[open=true]:-rotate-90 ",
              content: "pt-0",
              title: "font-semibold text-sm",
            }}
          >
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              subtitle={
                <h4 className={subtitle({ size: "xs" })}>2 Topik • 12 Menit</h4>
              }
              title="Bagian 1: Introduction"
              startContent={<LuSquareCheckBig className="text-primary mt-1" />}
            >
              <Checkbox
                size="sm"
                classNames={{ label: "ml-1" }}
                className="flex mb-2"
                defaultSelected
              >
                <h4
                  className={subtitle({ class: "font-semibold", size: "xs" })}
                >
                  Persiapan Sketching
                </h4>
                <h4 className={subtitle({ size: "xs" })}>2 Topik • 12 Menit</h4>
              </Checkbox>
              <Checkbox
                classNames={{ label: "ml-1" }}
                size="sm"
                className="flex mb-2"
                defaultSelected
              >
                <h4
                  className={subtitle({ class: "font-semibold", size: "xs" })}
                >
                  Gunakan beberapa fitur Sketsa yang rumit
                </h4>
                <h4 className={subtitle({ size: "xs" })}>2 Topik • 12 Menit</h4>
              </Checkbox>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              subtitle={
                <h4 className={subtitle({ size: "xs" })}>2 Topik • 12 Menit</h4>
              }
              title="Bagian 2: Sketching"
              startContent={<LuSquareCheckBig className="text-primary mt-1" />}
            >
              <Checkbox
                size="sm"
                classNames={{ label: "ml-1" }}
                className="flex mb-2"
                defaultSelected
              >
                <h4
                  className={subtitle({ class: "font-semibold", size: "xs" })}
                >
                  Persiapan Sketching
                </h4>
                <h4 className={subtitle({ size: "xs" })}>2 Topik • 12 Menit</h4>
              </Checkbox>
              <Checkbox
                classNames={{ label: "ml-1" }}
                size="sm"
                className="flex mb-2"
                defaultSelected
              >
                <h4
                  className={subtitle({ class: "font-semibold", size: "xs" })}
                >
                  Gunakan beberapa fitur Sketsa yang rumit
                </h4>
                <h4 className={subtitle({ size: "xs" })}>2 Topik • 12 Menit</h4>
              </Checkbox>
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 3"
              subtitle={
                <h4 className={subtitle({ size: "xs" })}>2 Topik • 12 Menit</h4>
              }
              title="Bagian 3: Membuat 3D Model"
              startContent={<LuSquareCheckBig className="text-orange mt-1" />}
            >
              <Checkbox
                size="sm"
                classNames={{ label: "ml-1" }}
                className="flex mb-2"
                defaultSelected
              >
                <h4
                  className={subtitle({ class: "font-semibold", size: "xs" })}
                >
                  Persiapan Sketching
                </h4>
                <h4 className={subtitle({ size: "xs" })}>2 Topik • 12 Menit</h4>
              </Checkbox>
              <Checkbox
                classNames={{ label: "ml-1" }}
                size="sm"
                className="flex mb-2"
              >
                <h4
                  className={subtitle({ class: "font-semibold", size: "xs" })}
                >
                  Gunakan beberapa fitur Sketsa yang rumit
                </h4>
                <h4 className={subtitle({ size: "xs" })}>2 Topik • 12 Menit</h4>
              </Checkbox>
            </AccordionItem>
          </Accordion>
        </div>
        {/* <Image
              src={misc1}
              alt="Cristal Misc"
              width={120}
              className="absolute left-0 bottom-0"
            /> */}
      </div>
    </aside>
  );
};
