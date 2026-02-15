import Image from "next/image";
import TemplateCard from "./templateCard";
import { NoteIcon } from "@/assets/icons/general/note";
import { useGetQustionnaireTemplate } from "@/hooks/admin/useGetQustionnaireTemplate";
import emptyImage from "@/assets/images/illustration/kuis_document.png";
import { subtitle } from "@/components/primitives";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Button } from "@heroui/button";
import deleteTemplateQuestionnaire from "@/hooks/admin/deleteTemplateQuestionnaire";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";

export default function KuisionerTemplate() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { mutate: deleteTemplate, isPending } = deleteTemplateQuestionnaire();
  const [selectedId, setSelectedId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteTemplate(selectedId, {
      onSuccess: () => {
        setIsConfirmOpen(false);
        setSelectedId(null);
      },
    });
  };
  // debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading } = useGetQustionnaireTemplate({
    params: {
      name_search: debouncedSearch,
      page: 1,
    },
  });

  const templates = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Modal isOpen={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <ModalContent>
          <ModalHeader>Hapus Template</ModalHeader>
          <ModalBody>
            <p>
              Template kuesioner yang dihapus <b>tidak dapat dikembalikan</b>.
              Apakah kamu yakin ingin melanjutkan?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setIsConfirmOpen(false)}>
              Batal
            </Button>
            <Button
              color="danger"
              isLoading={isPending}
              onPress={handleConfirmDelete}
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* 🔍 SEARCH */}
      <div className="max-w-sm">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          isClearable
          onClear={() => setSearch("")}
          startContent={
            <FiSearch
              className="text-default-600 pointer-events-none"
              size={24}
            />
          }
        />
      </div>

      {/* 📦 CONTENT */}
      {templates.length === 0 ? (
        <div className="text-center mt-32">
          <Image
            src={emptyImage}
            alt="Course Bundle Image"
            width={250}
            className="mx-auto"
          />
          <h3 className={subtitle({ size: "sm", class: "font-semibold" })}>
            Daftar kuesioner akan muncul di sini
          </h3>
          <h4 className={subtitle({ color: "grey", size: "sm" })}>
            Buat template kuesioner untuk mulai assign kuesioner ke dalam
            pelatihan.
          </h4>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((item) => (
            <TemplateCard
              key={item.id}
              icon={<NoteIcon size={22} />}
              title={item.name}
              assessmentCount={item.form_data?.length || 0}
              description={item.description}
              authorName={item?.admin_data?.name || "Admin"}
              authorAvatar={
                item?.admin_data?.profile_url ||
                "https://i.pravatar.cc/100?u=admin"
              }
              onDetail={() => {
                router.push(`/admin/questionnaire/${item.id}`);
              }}
              onEdit={() => {
                router.push(`/admin/questionnaire/detail-template/${item.id}`);
              }}
              onDelete={() => handleDeleteClick(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
