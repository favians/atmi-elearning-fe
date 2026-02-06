"use client";

import { useGetQustionnaireResult } from "@/hooks/admin/useGetQustionnaireResult";
import { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { FiSearch, FiDownload, FiRotateCcw } from "react-icons/fi";
import { DateRangePicker } from "@heroui/date-picker";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { FiCheck, FiXCircle } from "react-icons/fi";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import Image from "next/image";
import { useRouter } from "next/navigation";
const trainings = [
  { key: "1", label: "Pelatihan Frontend" },
  { key: "2", label: "Pelatihan Backend" },
];
export const columns = [
  { name: "Nama Trainee", uid: "trainee" },
  { name: "Email", uid: "email" },
  { name: "Pelatihan", uid: "training" },
  { name: "Template Form", uid: "template" },
  { name: "Tanggal", uid: "date" },
  { name: "Action", uid: "actions" },
];
export default function UlasanTemplate() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [trainingId, setTrainingId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportDateRange, setExportDateRange] = useState(null);
  const [isExportLoadingOpen, setIsExportLoadingOpen] = useState(false);
  const [exportProgress, setExportProgress] = useState(50); // dummy persen
  const [isExportComplete, setIsExportComplete] = useState(false);
  const router = useRouter();

  const formatDate = (date) => {
    if (!date) return null;
    return `${date.year}-${String(date.month).padStart(2, "0")}-${String(
      date.day,
    ).padStart(2, "0")}`;
  };
  const [page, setPage] = useState(1);
  const params = {
    page,
  };

  if (debouncedSearch) {
    params.NameSearch = debouncedSearch;
  }

  if (trainingId) {
    params.training_id = trainingId;
  }

  if (startDate) {
    params.start_date = formatDate(startDate);
  }

  if (endDate) {
    params.end_date = formatDate(endDate);
  }
  const { data, isLoading } = useGetQustionnaireResult({
    params,
  });
  const items = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.page_total || 1;

  const formatRange = (range) => {
    if (!range?.start || !range?.end) return "-";
    const f = (d) =>
      `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
    return `${f(range.start)} s/d ${f(range.end)}`;
  };
  const formatDateTable = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const handleExport = () => {
    setIsExportOpen(false);
    setIsExportLoadingOpen(true);
    setIsExportComplete(false);
    setExportProgress(0);

    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setIsExportComplete(true);

          // tunggu 1 detik sebelum close
          setTimeout(() => {
            setIsExportLoadingOpen(false);
            console.log("Download XLS otomatis");

            // TODO: trigger real download XLS
          }, 1500);

          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset ke halaman 1 saat search berubah
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const handleReset = () => {
    setSearch("");
    setDebouncedSearch("");
    setTrainingId(null);
    setStartDate(null);
    setEndDate(null);
    setDateRange(null);
    setPage(1);
  };

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "trainee":
        return (
          <div className="flex items-center gap-2">
            <Image
              src={item.admin_data?.profile_url}
              alt="avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-medium">{item.admin_data?.name ?? "-"}</span>
          </div>
        );

      case "email":
        return <span className="text-gray-500">-</span>;

      case "training":
        return <span>{trainingId ? `Pelatihan ${trainingId}` : "-"}</span>;

      case "template":
        return (
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-gray-500">
              {item.form_data?.length ?? 0} Pertanyaan
            </p>
          </div>
        );

      case "date":
        return formatDateTable(item.created_at);

      case "actions":
        return (
          <Button
            size="sm"
            variant="light"
            color="primary"
            onPress={() => {
              router.push(`/admin/questionnaire/detail-answer/` + item.id);
            }}
          >
            Detail
          </Button>
        );

      default:
        return "-";
    }
  };
  console.log(items);
  return (
    <div className="space-y-4">
      <div className="flex  items-center justify-around">
        <div className="w-80">
          {" "}
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startContent={<FiSearch size={20} />}
            isClearable
            onClear={() => setSearch("")}
          />
        </div>

        <div className="w-full flex justify-end items-center gap-4">
          <div className="relative inline-block">
            <DateRangePicker
              className="max-w-xs pr-10" // kasih space buat icon
              placeholder="Tanggal"
              selectorButtonPlacement="start"
              value={dateRange}
              onChange={(range) => {
                setDateRange(range);
                setPage(1);

                if (!range) {
                  setStartDate(null);
                  setEndDate(null);
                  return;
                }

                setStartDate(range.start);
                setEndDate(range.end);
              }}
            />

            {dateRange && (
              <button
                type="button"
                onClick={() => {
                  setDateRange(null);
                  setStartDate(null);
                  setEndDate(null);
                  setPage(1);
                }}
                className="
        absolute right-2 top-1/2 -translate-y-1/2
        rounded-full p-1
        text-gray-400 hover:text-gray-600
        hover:bg-gray-100
      "
              >
                <FiXCircle size={16} />
              </button>
            )}
          </div>
          <Select
            placeholder="Pilih Pelatihan"
            selectedKeys={trainingId ? [trainingId] : []}
            onSelectionChange={(keys) => {
              setTrainingId(Array.from(keys)[0]);
              setPage(1);
            }}
            className="w-48"
          >
            {trainings.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
          <Popover
            placement="bottom-end"
            isOpen={isExportOpen}
            onOpenChange={setIsExportOpen}
          >
            <PopoverTrigger>
              <Button
                color="primary"
                variant="bordered"
                startContent={<FiDownload />}
              >
                Export
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-96 p-0 m-0">
              {/* HEADER */}
              <div className="text-lg font-semibold flex justify-start items-center mb-4 p-4 w-full bg-gray-100 rounded-t-2xl border-b border-b-gray-200">
                Export Submissions
              </div>

              {/* BODY */}
              <div className="flex flex-col gap-3 px-4">
                <p className="text-sm font-semibold">Ekspor dari tanggal ke</p>
                <DateRangePicker
                  value={exportDateRange}
                  onChange={setExportDateRange}
                />

                <p className="text-sm text-[#232933] mr-8">
                  Hasil ekspor memerlukan waktu 1–3 menit untuk dihasilkan dan
                  akan diunduh secara otomatis sebagai file .xls.
                </p>
              </div>

              {/* FOOTER */}
              <div className="flex justify-end gap-2 mt-4 w-full mb-4 mr-6">
                <Button variant="light" onPress={() => setIsExportOpen(false)}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleExport}
                  isDisabled={!exportDateRange}
                >
                  Export
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            variant="light"
            startContent={<FiRotateCcw />}
            onPress={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isExportLoadingOpen}
        backdrop="blur"
        placement="center"
        hideCloseButton
      >
        <ModalContent>
          {() => (
            <>
              {/* HEADER */}
              <ModalHeader className="text-lg font-semibold">
                Processing
              </ModalHeader>

              {/* BODY */}
              <ModalBody>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* ICON */}
                    {isExportComplete ? (
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <FiCheck className="text-white" size={20} />
                      </div>
                    ) : (
                      <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
                    )}

                    {/* TEXT */}
                    <div>
                      <div className="font-medium">
                        {isExportComplete
                          ? "File XLS siap diunduh"
                          : "Creating file XLS"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatRange(exportDateRange)}
                      </div>
                    </div>
                  </div>

                  {/* PROGRESS */}
                  <div className="font-semibold text-lg text-primary">
                    {isExportComplete ? "Complete" : `${exportProgress}%`}
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Table
        aria-label="Daftar hasil kuesioner"
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
          wrapper: "shadow-none  ",
          td: "py-4",
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
          items={items}
          isLoading={isLoading}
          emptyContent="Tidak ada data"
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
    </div>
  );
}
