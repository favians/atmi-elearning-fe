import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { IoMdArrowDropdown } from "react-icons/io";
import emptyImage from "@/assets/images/illustration/documents.png";
import Image from "next/image";
import { subtitle } from "@/components/primitives";
import { useGetQustionnaireTraining } from "@/hooks/admin/useGetQustionnaireTraining";
import deleteQustionnaireTemplateAssign from "@/hooks/admin/deleteQustionnaireTemplateAssign";

export const columns = [
  { name: "Dipasang oleh", uid: "created_by" },
  { name: "Pelatihan", uid: "training_data" },
  { name: "Tanggal", uid: "created_at" },
  { name: "", uid: "actions" },
];

export default function TableQuestionnaire({ id }) {
  const [page, setPage] = React.useState(1);
  const { mutate: deleteAssign, isPending } =
    deleteQustionnaireTemplateAssign();
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const { data, isLoading } = useGetQustionnaireTraining({
    params: {
      page,
      questionnaire_template_id: id,
    },
  });
  const list = data?.data ?? [];
  const pagination = data?.pagination;
  const limit = pagination?.limit || 10;
  const totalData = pagination?.data_total || list.length;

  const totalPages = Math.max(
    pagination?.page_total || Math.ceil(totalData / limit),
    1,
  );
  const items = React.useMemo(() => {
    return list;
  }, [list]);
  useEffect(() => {
    setPage(1);
  }, [id]);
  const openDeleteConfirm = (item) => {
    setSelectedItem(item);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedItem) return;

    deleteAssign(
      { id: selectedItem.id },
      {
        onSuccess: () => {
          toast.success("Kuesioner berhasil dihapus dari pelatihan");
          setIsConfirmOpen(false);
          setSelectedItem(null);
        },
        onError: () => {
          toast.error("Gagal menghapus kuesioner");
        },
      },
    );
  };
  const renderCell = React.useCallback((item, columnKey) => {
    switch (columnKey) {
      case "training_data":
        return item.training_data?.title || "-";

      case "created_at":
        const date = new Date(item.created_at);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;

      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button
              size="sm"
              variant="bordered"
              color="danger"
              className="border-1 border-slate-300"
              endContent={<IoMdArrowDropdown size={16} />}
              onClick={() => openDeleteConfirm(item)}
            >
              Hapus dari Pelatihan
            </Button>
          </div>
        );
      default:
        return item[columnKey] || "-";
    }
  }, []);

  return (
    <>
      <Modal isOpen={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <ModalContent>
          <ModalHeader>Hapus dari Pelatihan</ModalHeader>
          <ModalBody>
            <p className="text-sm">
              Kuesioner akan <b>dihapus dari pelatihan</b> ini.
              <br />
              Data hasil pengisian tidak akan bisa diakses lagi.
              <br />
              <br />
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
              Ya, hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>{" "}
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full mb-4 justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={totalPages}
              onChange={setPage}
            />
          </div>
        }
        classNames={{
          wrapper: "gap-8 overflow-hidden shadow-none p-0",
          td: "py-4 border-b-1",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={
            <div className="py-10 text-center">
              <span className="loading loading-spinner loading-lg text-secondary" />
              <p className="mt-3 text-sm text-gray-500">
                Memuat data kuesioner...
              </p>
            </div>
          }
          emptyContent={
            <div>
              <Image
                src={emptyImage}
                alt="Course Bundle Image"
                width={250}
                className="mx-auto"
              />
              <h3 className={subtitle({ size: "sm", class: "font-semibold" })}>
                Daftar kuesioner akan muncul disini
              </h3>
              <h4 className={subtitle({ color: "grey", size: "sm" })}>
                Add sources to your AI learning from the{" "}
                <strong className="font-semibold">Add learning</strong> button
              </h4>
            </div>
          }
          items={items}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
