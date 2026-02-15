import { subtitle } from "@/components/primitives";
import { Sidebar } from "@/components/shared/sidebar/sidebar.styles";
import { useModule } from "@/context/module-context";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Checkbox } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";
import { Progress } from "@heroui/progress";
import { Spinner } from "@heroui/spinner";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { LuSquareCheckBig } from "react-icons/lu";

export const SidebarTraining = ({ data, isLoading }) => {
  const router = useRouter();
  const { selectedModule, setSelectedModule, setSelectedView } = useModule();
  useEffect(() => {
    if (!isLoading && data && data.module_user_training && !selectedModule) {
      for (const module of data.module_user_training) {
        const firstUnfinished = module.training_materials.find(
          (m) => !m.is_done,
        );
        if (firstUnfinished) {
          setSelectedModule(firstUnfinished);
          break;
        }
      }
    }
  }, [isLoading, data, selectedModule, setSelectedModule]);

  return (
    <aside className=" w-80 fixed min-h-full border-r pt-5  left-0 top-0 bg-white">
      <div className={Sidebar()}>
        {isLoading ? (
          <Spinner className="mt-12" />
        ) : (
          <div className="flex-1 py-8 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh)] scrollbar-hidden">
            <div
              onClick={() => router.back()}
              className="text-primary cursor-pointer flex items-center text-sm gap-2"
            >
              <GoArrowLeft /> Kembali ke Pelatihan Saya
            </div>
            <h4
              className={subtitle({ class: "font-semibold mt-2", size: "sm" })}
            >
              {data?.training_title}
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
                  {data?.progress_percentage}%{" "}
                  <div className="font-semibold">of</div> 100%
                </h4>
              </div>
            </div>

            <div className="my-2">
              <Progress
                aria-label="Loading..."
                className="max-w-md h-2"
                size="md"
                value={data?.progress_percentage}
                color="warning"
              />
            </div>
            <Divider className="my-4 " />

            <Accordion
              defaultExpandedKeys={
                data?.module_user_training
                  ? [
                      String(
                        data.module_user_training.find((m) => !m.is_complete)
                          ?.module_id ??
                          data.module_user_training[0]?.module_id,
                      ),
                    ]
                  : []
              }
              className="px-0 pb-8"
              itemClasses={{
                trigger: "items-start ",
                indicator: "mt-1 rotate-90   data-[open=true]:-rotate-90 ",
                content: "pt-0",
                title: "font-semibold text-sm",
              }}
            >
              {data?.module_user_training.map((module, index) => (
                <AccordionItem
                  key={String(module?.module_id)}
                  aria-label={`Accordion ${index + 1}`}
                  subtitle={
                    <h4 className={subtitle({ size: "xs" })}>
                      {module?.material_count} Topik •{" "}
                      {module?.duration_total_fmt}
                    </h4>
                  }
                  title={module?.title}
                  startContent={
                    <LuSquareCheckBig
                      className={`${
                        module?.is_complete ? "text-primary" : "text-orange"
                      } mt-1`}
                    />
                  }
                >
                  {module?.training_materials.map((material) => {
                    const isSelected =
                      selectedModule?.material_id === material?.material_id;
                    return (
                      <Checkbox
                        key={material?.material_id}
                        size="sm"
                        classNames={{
                          label: "ml-1",
                          base: `min-w-full max-w-full m-0 -my-1 ${
                            isSelected ? "bg-primary/10" : ""
                          }  hover:bg-primary/10`,
                        }}
                        onChange={() => {
                          setSelectedView("module");
                          setSelectedModule(material);
                        }}
                        className="flex mb-2"
                        defaultSelected={material?.is_done}
                        isSelected={material?.is_done}
                      >
                        <h4
                          className={subtitle({
                            class: "font-semibold",
                            size: "xs",
                          })}
                        >
                          {material?.title}
                        </h4>
                        <h4 className={subtitle({ size: "xs" })}>
                          {material?.duration_in_second_fmt}
                        </h4>
                      </Checkbox>
                    );
                  })}
                </AccordionItem>
              ))}
              <AccordionItem
                title="Ulasan Untuk Kami"
                startContent={
                  <LuSquareCheckBig
                    className={`${
                      data?.is_already_submit_questionnaire
                        ? "text-primary"
                        : "text-orange"
                    } mt-1`}
                  />
                }
              >
                <Checkbox
                  size="sm"
                  classNames={{
                    label: "ml-1",
                    base: "min-w-full max-w-full m-0 -my-1 hover:bg-primary/10",
                  }}
                  onChange={() => {
                    setSelectedView("review");
                  }}
                  isDisabled={data?.progress_percentage < 95}
                  isSelected={data?.is_already_submit_questionnaire}
                  className="flex mb-2"
                >
                  <h4
                    className={subtitle({
                      class: "font-semibold",
                      size: "xs",
                    })}
                  >
                    Kuisinoner Ulasan
                  </h4>
                </Checkbox>
              </AccordionItem>
            </Accordion>
          </div>
        )}
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
