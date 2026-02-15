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
import { useRouter } from "next/navigation";
import { I18nProvider } from "@react-aria/i18n";
import useDownloadCSV from "@/hooks/admin/useDownloadCSV";
import { useGetQustionnaireTemplate } from "@/hooks/admin/useGetQustionnaireTemplate";
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
  const [templateId, setTemplateId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportDateRange, setExportDateRange] = useState(null);
  const [isExportLoadingOpen, setIsExportLoadingOpen] = useState(false);
  const [isExportComplete, setIsExportComplete] = useState(false);
  const router = useRouter();

  const formatDateToTimestamp = (date, isEnd = false) => {
    if (!date) return null;

    const jsDate = new Date(
      date.year,
      date.month - 1,
      date.day,
      isEnd ? 23 : 0,
      isEnd ? 59 : 0,
      isEnd ? 59 : 0,
    );

    return Math.floor(jsDate.getTime() / 1000);
  };
  const [page, setPage] = useState(1);
  const params = {
    page,
  };

  if (debouncedSearch) {
    params.NameSearch = debouncedSearch;
  }

  if (templateId) {
    params.template_id = templateId;
  }

  if (startDate) {
    params.created_date_from = formatDateToTimestamp(startDate);
  }

  if (endDate) {
    params.created_date_to = formatDateToTimestamp(endDate, true);
  }
  const { data, isLoading } = useGetQustionnaireResult({
    params,
  });
  const { mutate: downloadCSV, isPending } = useDownloadCSV();
  const items = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.page_total || 1;
  const { data: questionnaireTemplates, isLoading: isLoadingTemplates } =
    useGetQustionnaireTemplate({
      params: {
        page: 1,
      },
    });
  const formatRange = (range) => {
    if (!range?.start || !range?.end) return "-";
    const f = (d) =>
      `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
    return `${f(range.start)} s/d ${f(range.end)}`;
  };
  const formatDateTable = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };
  const handleExport = () => {
    if (!exportDateRange) return;

    setIsExportOpen(false);
    setIsExportLoadingOpen(true);
    setIsExportComplete(false);

    const params = {
      page: 1,
      limit: 999,
    };

    if (exportDateRange?.start) {
      params.created_date_from = formatDateToTimestamp(exportDateRange.start);
    }

    if (exportDateRange?.end) {
      params.created_date_to = formatDateToTimestamp(exportDateRange.end, true);
    }

    downloadCSV(params, {
      onSuccess: (response) => {
        const blob = new Blob([response.data], {
          type: "text/csv;charset=utf-8;",
        });
        // const blob = new Blob(["\uFEFF", response.data], {
        //   type: "text/csv;charset=utf-8;",
        // });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `questionnaire-export-${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();

        setIsExportComplete(true);

        setTimeout(() => {
          setIsExportLoadingOpen(false);
        }, 1200);
      },
      onError: () => {
        setIsExportLoadingOpen(false);
        alert("Gagal download file");
      },
    });
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
    setTemplateId(null);
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
            <span className="font-normal text-gray-500">
              {item.trainee_data?.full_name?.String ?? "-"}
            </span>
          </div>
        );

      case "email":
        return (
          <span className="text-gray-500">
            {item.trainee_data?.email?.String ?? "-"}
          </span>
        );

      case "training":
        return (
          <span className="text-gray-500">
            {" "}
            {item.training_data?.title ?? "-"}{" "}
          </span>
        );

      case "template":
        return (
          <div>
            <p className="font-medium">{item.name}</p>
            <p className=" text-gray-500">
              {item.questionnaire_template_data?.name ?? "-"}
            </p>
          </div>
        );

      case "date":
        return (
          <p className=" text-gray-500">{formatDateTable(item.created_at)}</p>
        );

      case "actions":
        return (
          <Button
            size="md"
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
            <I18nProvider locale="id-ID">
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
            </I18nProvider>

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
            placeholder="Pilih Template"
            selectedKeys={templateId ? [templateId] : []}
            onSelectionChange={(keys) => setTemplateId(Array.from(keys)[0])}
            className="w-56"
          >
            {questionnaireTemplates?.data.map((item) => (
              <SelectItem key={item.id}>{item.name}</SelectItem>
            ))}
          </Select>
          <Popover
            placement="bottom-end"
            isOpen={isExportOpen}
            onOpenChange={setIsExportOpen}
            shouldCloseOnInteractOutside={() => false}
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
                <I18nProvider locale="id-ID">
                  {" "}
                  <DateRangePicker
                    value={exportDateRange}
                    onChange={setExportDateRange}
                  />
                </I18nProvider>

                <p className="text-sm text-[#232933] mr-8">
                  Hasil ekspor memerlukan waktu 1–3 menit untuk dihasilkan dan
                  akan diunduh secara otomatis sebagai file .csv.
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
                Processing Export
              </ModalHeader>

              {/* BODY */}
              <ModalBody>
                <div className="flex flex-col items-center justify-center py-6 gap-4">
                  {/* ICON */}
                  {isExportComplete ? (
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                      <FiCheck className="text-white" size={28} />
                    </div>
                  ) : (
                    <div className="w-14 h-14 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
                  )}

                  {/* TEXT */}
                  <div className="text-center">
                    <div className="font-medium text-base">
                      {isExportComplete
                        ? "File CSV siap diunduh"
                        : "Sedang menyiapkan file export..."}
                    </div>

                    <div className="text-sm text-gray-500 mt-1">
                      {formatRange(exportDateRange)}
                    </div>
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
