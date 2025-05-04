"use client";
import { CertificateItems } from "@/components/pages/dashboard/certificate/certificate-items";
import FilterCertificate from "@/components/pages/dashboard/certificate/filter-certificate";
import { PreviewCertificate } from "@/components/pages/dashboard/certificate/preview-certificate";
import { headline } from "@/components/primitives";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { Modal, ModalContent, useDisclosure } from "@heroui/modal";
import { useState } from "react";

export default function SertifikatPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [item, setItem] = useState();
  const onOpenItem = (item) => {
    setItem(item);
    onOpen();
  };
  return (
    <DashboardLayout>
      <section className="flex flex-col justify-center gap-4 p-6">
        <div className="inline-block max-w-lg justify-center">
          <h1 className={headline({})}>Sertifikat Saya</h1>
        </div>
      </section>
      <div className="flex bg-white flex-wrap flex-grow flex-col">
        <CertificateItems onOpen={onOpenItem} />
        <Modal
          backdrop="opaque"
          classNames={{
            backdrop: "bg-black/90 backdrop-opacity-10",
            body: "bg-white",
            closeButton: "text-2xl",
          }}
          isOpen={isOpen}
          size="5xl"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => <PreviewCertificate item={item} />}
          </ModalContent>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
