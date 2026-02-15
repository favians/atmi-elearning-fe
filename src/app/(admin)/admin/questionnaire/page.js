"use client";
import { Button } from "@heroui/button";
import { BookIcon } from "@/assets/icons/general/book";
import { SentIcon } from "@/assets/icons/general/sent";
import { useRouter } from "next/navigation";
import succesKuis from "@/assets/images/illustration/succesKuis.png";
import { Suspense } from "react";
import TabQuestionnaire from "@/components/pages/admin/questionnaire/tab-questionnaire";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { useState } from "react";
import { useGetQustionnaireTemplate } from "@/hooks/admin/useGetQustionnaireTemplate";
import Image from "next/image";
import { useGetTrainingList } from "@/hooks/admin/useGetTraining";
import useAssignQuestionnaireTraining from "@/hooks/admin/useAssignQuestionnaireTraining";

export default function QuestionnairePage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [templateId, setTemplateId] = useState(null);
  const [trainingId, setTrainingId] = useState(null);
  const { mutate, isPending } = useAssignQuestionnaireTraining();
  const { data: questionnaireTemplates, isLoading } =
    useGetQustionnaireTemplate({
      params: {
        page: 1,
      },
    });

  const { data: dataTraining, isLoading: isLoadingTraining } =
    useGetTrainingList();
  const handleSave = () => {
    const payload = {
      questionnaire_template_id: parseInt(templateId),
      training_id: parseInt(trainingId),
    };
    mutate(payload, {
      onSuccess: () => {
        setIsSuccessOpen(true);
      },
      onError: (error) => {
        toast.error(error?.message || "Terjadi kesalahan");
      },
    });
    setIsOpen(false);
  };
  return (
    <>
      <section className="flex flex-col justify-center gap-4 p-4">
        <div className="items-center justify-between flex">
          <h1 className="ml-4 text-2xl font-semibold text-[#232933]">
            Kuesioner
          </h1>

          <div className="flex gap-2">
            <Button
              radius="sm"
              startContent={<BookIcon />}
              color="primary"
              className="bg-white text-primary border-1 border-gray-300"
              onPress={() => router.push(`/admin/questionnaire/create`)}
            >
              Buat Template
            </Button>

            {/* 🔔 ASSIGN POPOVER */}
            <Button
              radius="sm"
              startContent={<SentIcon />}
              color="primary"
              onPress={() => setIsOpen(true)}
            >
              Assign Kuesioner
            </Button>

            <Modal
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              backdrop="blur"
              placement="center"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    {/* HEADER */}
                    <ModalHeader className="flex flex-col gap-1 text-xl">
                      Assign Kuesioner
                    </ModalHeader>

                    {/* BODY */}
                    <ModalBody>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <div className="text-[#232933] font-semibold mb-0">
                            Nama Template Kuesioner
                            <span className="text-red-600">*</span>
                          </div>
                          <Select
                            selectedKeys={templateId ? [templateId] : []}
                            onSelectionChange={(keys) =>
                              setTemplateId(Array.from(keys)[0])
                            }
                          >
                            {questionnaireTemplates?.data.map((item) => (
                              <SelectItem key={item.id}>{item.name}</SelectItem>
                            ))}
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-[#232933] font-semibold">
                            Pelatihan<span className="text-red-600">*</span>
                          </div>

                          <Select
                            selectedKeys={trainingId ? [trainingId] : []}
                            onSelectionChange={(keys) =>
                              setTrainingId(Array.from(keys)[0])
                            }
                          >
                            {dataTraining?.map((item) => (
                              <SelectItem key={item.key}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </ModalBody>

                    {/* FOOTER */}
                    <ModalFooter>
                      <Button variant="light" onPress={onClose}>
                        Batalkan
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => {
                          handleSave();
                          onClose();
                        }}
                        // isDisabled={!templateId || !trainingId}
                      >
                        Simpan
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <Modal
              isOpen={isSuccessOpen}
              onOpenChange={setIsSuccessOpen}
              backdrop="blur"
              placement="center"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    {/* HEADER */}
                    <ModalHeader className="text-xl font-semibold text-center"></ModalHeader>

                    {/* BODY */}
                    <ModalBody className="text-center">
                      <Image
                        src={succesKuis}
                        alt="Logo White"
                        height={160}
                        className="mx-auto object-cover"
                      />
                      <p className="text-xl font-semibold">
                        {" "}
                        Kuesioner Berhasil di Assign
                      </p>
                      <p className="text-gray-600 text-base">
                        Lihat di dalam detail template untuk memastikan
                        kuesioner berhasil ditambahkan
                      </p>
                    </ModalBody>

                    {/* FOOTER */}
                    <ModalFooter className="flex justify-center">
                      <Button
                        radius="sm"
                        color="primary"
                        className="bg-white text-primary border-1 border-gray-300"
                        onPress={() => {
                          router.push(`/admin/questionnaire/${templateId}`);
                          onClose();
                        }}
                      >
                        Lihat detail template
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </section>

      <div className="bg-white grow gap-4 flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
          <TabQuestionnaire />
        </Suspense>
      </div>
    </>
  );
}
