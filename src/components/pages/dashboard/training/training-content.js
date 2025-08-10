import { VideoRecorder } from "@/assets/icons/general/video-recorder";
import { subtitle } from "@/components/primitives";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
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

export const TrainingContent = ({ data }) => {
  const { selectedModule, setSelectedModule } = useModule();

  const params = useParams();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useUpdateProgress();
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
          // ✅ Update the cached detail directly
          queryClient.refetchQueries([
            queryClientKeys.GET_TRAINEE_TRAINING_DETAIL,
            { training_id: params?.id },
          ]);
          onFindMaterial(selectedModule.learning_material_after?.material_id);
        },
      },
    );
  };
  if (!selectedModule) {
    return (
      <div className="flex ml-[320px] mt-16 flex-col flex-1 gap-6 py-6">
        <h4 className={subtitle({ class: "mx-6" })}>
          Silakan pilih materi pada sidebar untuk melihat konten
        </h4>
      </div>
    );
  }
  return (
    <div className="flex ml-[320px] mt-16 flex-col flex-1 gap-6 py-6">
      <div className="flex flex-wrap flex-grow flex-col rounded-md bg-white mx-6">
        {/* <PDFViewer url="https://pslb3.menlhk.go.id/internal/uploads/pengumuman/1545111808_contoh-pdf.pdf" /> */}
        {selectedModule?.type == "VIDEO" ? (
          <VideoViewer
            url={selectedModule?.link_file_url}
            onFinishWatched={onUpdateProgress}
          />
        ) : (
          <PDFViewer
            url={selectedModule?.link_file_url}
            onFinishRead={onUpdateProgress}
          />
        )}
      </div>
      <div className="flex flex-wrap flex-grow flex-col rounded-md bg-white mx-6 p-4">
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
                <VideoRecorder />
              ) : (
                <PDFIcon />
              )}{" "}
              {selectedModule?.duration_in_second} Menit
            </h4>
          </div>

          <div className="mt-6 flex">
            {selectedModule?.learning_material_before?.material_title && (
              <div
                onClick={() =>
                  onFindMaterial(
                    selectedModule.learning_material_before?.material_id,
                  )
                }
                className="flex cursor-pointer flex-1 gap-2 items-center"
              >
                <BsArrowLeftCircle size={36} color="#8B95A5" />
                <div>
                  <h4 className={subtitle({ color: "grey", size: "sm" })}>
                    Sebelumnya
                  </h4>
                  <h4 className={subtitle({ size: "sm" })}>
                    {selectedModule?.learning_material_before?.material_title}
                  </h4>
                </div>
              </div>
            )}
            {selectedModule?.learning_material_after?.material_title && (
              <div
                onClick={() =>
                  onFindMaterial(
                    selectedModule.learning_material_after?.material_id,
                  )
                }
                className="flex cursor-pointer flex-1 justify-end text-right gap-2 items-center"
              >
                <div>
                  <h4 className={subtitle({ color: "grey", size: "sm" })}>
                    Selanjutnya
                  </h4>
                  <h4 className={subtitle({ size: "sm" })}>
                    {selectedModule?.learning_material_after?.material_title}
                  </h4>
                </div>

                <BsArrowRightCircle size={36} color="#8B95A5" />
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
                  "border-1 w-fit px-4 py-3 rounded-lg flex gap-3  text-sm ",
              })}
            >
              <PDFIcon />
              <div className=" items-center gap-2">
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
