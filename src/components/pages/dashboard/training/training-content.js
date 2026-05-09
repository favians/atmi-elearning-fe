import { VideoRecorder } from "@/assets/icons/general/video-recorder";
import { subtitle } from "@/components/primitives";
import {
  BsArrowLeftCircle,
  BsArrowLeftCircleFill,
  BsArrowRightCircle,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import React from "react";
import { Divider } from "@heroui/divider";
import { PDFIcon } from "@/assets/icons/general/pdf";

import VideoViewer from "@/components/video-viewer";
import { useModule } from "@/context/module-context";
import useUpdateProgress from "@/hooks/trainee/useUpdateProgress";
import PDFViewer from "@/components/pages/pdf/pdf-viewer";
import { useQueryClient } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { useParams } from "next/navigation";
import { TrainingReview } from "./training-review";

export const TrainingContent = ({ data }) => {
  const { selectedModule, setSelectedModule, selectedView } = useModule();
  const allMaterials = React.useMemo(() => {
    if (!data?.module_user_training) return [];

    return data.module_user_training
      .sort((a, b) => a.order - b.order)
      .flatMap((module) =>
        module.training_materials.map((material) => ({
          ...material,
          module_order: module.order,
        })),
      );
  }, [data]);
  const currentIndex = allMaterials.findIndex(
    (m) => m.material_id === selectedModule?.material_id,
  );

  const previousMaterial =
    currentIndex > 0 ? allMaterials[currentIndex - 1] : null;

  const nextMaterial =
    currentIndex < allMaterials.length - 1
      ? allMaterials[currentIndex + 1]
      : null;
  const params = useParams();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useUpdateProgress();
  if (selectedView === "review") {
    return <TrainingReview data={data} />;
  }
  if (!selectedModule) {
    return (
      <div className="mt-16 flex flex-1 flex-col gap-6 py-6 max-[667px]:ml-0 md:ml-[320px]">
        <h4 className={subtitle({ class: "mx-4 md:mx-6" })}>
          Silakan pilih materi pada sidebar untuk melihat konten
        </h4>
      </div>
    );
  }
  const onFindMaterial = (materialId) => {
    const modules = data.module_user_training;

    // Loop through modules to find the material
    for (const module of modules) {
      const foundMaterial = module.training_materials.find(
        (material) => material.material_id === materialId,
      );

      if (foundMaterial) {
        // Example: set module and material when found
        setSelectedModule(foundMaterial);
        return;
      }
    }

    // If not found
    console.warn(`Material with id ${materialId} not found`);
  };

  const onUpdateProgress = () => {
    if (!selectedModule?.id || selectedModule?.is_done) return;

    mutate(
      { id: selectedModule.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            queryClientKeys.GET_TRAINEE_TRAINING_DETAIL,
            { training_id: params?.id },
          ]);

          if (nextMaterial) {
            setSelectedModule(nextMaterial);
          }
        },
      },
    );
  };
  if (!selectedModule) {
    return (
      <div className="mt-16 flex flex-1 flex-col gap-6 py-6 max-[667px]:ml-0 md:ml-[320px]">
        <h4 className={subtitle({ class: "mx-4 md:mx-6" })}>
          Silakan pilih materi pada sidebar untuk melihat konten
        </h4>
      </div>
    );
  }

  return (
    <div className="mt-0 flex flex-1 flex-col gap-4 py-4 max-[667px]:ml-0 md:ml-[320px] md:mt-16 md:gap-6 md:py-6">
      <div className="mx-4 flex flex-grow flex-wrap flex-col rounded-md bg-white md:mx-6">
        {/* <PDFViewer url="https://pslb3.menlhk.go.id/internal/uploads/pengumuman/1545111808_contoh-pdf.pdf" /> */}
        {selectedModule?.type == "VIDEO" ? (
          <VideoViewer
            url={selectedModule?.link_file_url}
            onFinishWatched={onUpdateProgress}
          />
        ) : (
          <PDFViewer
            key={selectedModule?.id}
            url={selectedModule?.link_file_url}
            onFinishRead={onUpdateProgress}
          />
        )}
      </div>
      <div className="mx-4 flex flex-grow flex-wrap flex-col rounded-md bg-white p-4 md:mx-6">
        <div>
          <div className="flex items-center gap-2">
            <h4 className={subtitle({ class: "font-semibold" })}>
              Sketsa pada foto{" "}
            </h4>

            <h4
              className={subtitle({
                class: "flex items-center gap-1",
                color: "grey",
              })}
            >
              •{" "}
              {selectedModule?.type == "VIDEO" ? (
                <>
                  <VideoRecorder /> {selectedModule?.duration_fmt}
                </>
              ) : (
                <PDFIcon />
              )}
            </h4>
          </div>

          <div className="mt-6 flex flex-col gap-4 max-[667px]:gap-5 md:flex-row">
            {previousMaterial && (
              <div
                onClick={() => setSelectedModule(previousMaterial)}
                className="group flex flex-1 cursor-pointer items-center gap-2"
              >
                {/* Icon swap */}
                <div className="relative w-[36px] h-[36px]">
                  <BsArrowLeftCircle
                    size={36}
                    className="absolute inset-0 text-[#8B95A5] transition-opacity duration-300 group-hover:opacity-0"
                  />

                  <BsArrowLeftCircleFill
                    size={36}
                    className="absolute inset-0 text-[#333333] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>

                <div>
                  <h4 className={subtitle({ color: "grey", size: "sm" })}>
                    Sebelumnya
                  </h4>
                  <h4 className={subtitle({ size: "sm" })}>
                    {previousMaterial.title}
                  </h4>
                </div>
              </div>
            )}

            {nextMaterial && (
              <div
                onClick={() => setSelectedModule(nextMaterial)}
                className="group flex flex-1 cursor-pointer items-center gap-2 text-left max-[667px]:justify-start md:justify-end md:text-right"
              >
                <div>
                  <h4 className={subtitle({ color: "grey", size: "sm" })}>
                    Selanjutnya
                  </h4>
                  <h4 className={subtitle({ size: "sm" })}>
                    {nextMaterial.title}
                  </h4>
                </div>

                {/* Icon container */}
                <div className="relative w-[36px] h-[36px]">
                  {/* outline (default) */}
                  <BsArrowRightCircle
                    size={36}
                    className="absolute inset-0 text-[#8B95A5] transition-opacity duration-300 group-hover:opacity-0"
                  />

                  {/* fill (hover) */}
                  <BsArrowRightCircleFill
                    size={36}
                    className="absolute inset-0 text-[#333333] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              </div>
            )}
          </div>

          <Divider className="my-6" />

          <div>
            <h4
              className={subtitle({ size: "sm", color: "grey", class: "mb-1" })}
            >
              Summary
            </h4>
            <h4 className={subtitle()}>{selectedModule?.summary}</h4>
          </div>

          <Divider className="my-6" />

          <div>
            <h4
              className={subtitle({ size: "sm", color: "grey", class: "mb-1" })}
            >
              Learning Material
            </h4>
            <div
              className={subtitle({
                class:
                  "border-1 flex w-full gap-3 rounded-lg px-4 py-3 text-sm md:w-fit",
              })}
            >
              <PDFIcon />
              <div className="min-w-0 items-center gap-2">
                {selectedModule?.learning_material_url.split("/").pop()}
                {/* <h4 className={subtitle({ size: "sm", color: "grey" })}>
                               120 KB
                             </h4> */}
                <h4
                  className={subtitle({
                    size: "sm",
                    class: "cursor-pointer",
                    color: "green",
                  })}
                  onClick={() =>
                    window.open(selectedModule?.learning_material_url, "_blank")
                  }
                >
                  Download
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
