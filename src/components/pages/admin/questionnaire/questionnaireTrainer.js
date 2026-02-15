"use client";

import { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { FiSearch, FiDownload, FiRotateCcw } from "react-icons/fi";
import { DateRangePicker } from "@heroui/date-picker";
import { useGetQustionnaireTraining } from "@/hooks/admin/useGetQustionnaireTraining";
import { I18nProvider } from "@react-aria/i18n";

const trainings = [
  { key: "1", label: "Pelatihan Frontend" },
  { key: "2", label: "Pelatihan Backend" },
];

export default function QuestionnaireTrainer({ id }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [trainingId, setTrainingId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const formatDate = (date) => {
    if (!date) return null;
    return `${date.year}-${String(date.month).padStart(2, "0")}-${String(
      date.day,
    ).padStart(2, "0")}`;
  };

  const { data, isLoading } = useGetQustionnaireTraining({
    params: {
      page: 1,
      // q: debouncedSearch,
      questionnaire_template_id: id,
      // start_date: formatDate(startDate),
      // end_date: formatDate(endDate),
    },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
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
  };

  const dataResult = data?.data ?? [];

  return (
    <div className="space-y-4">
      <div className="flex  items-center justify-around">
        <div className="w-80">
          {" "}
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startContent={<FiSearch size={24} className="text-gray-600" />}
            isClearable
            onClear={() => setSearch("")}
            className="w-80"
          />
        </div>

        <div className="w-full flex justify-end items-center gap-4">
          <I18nProvider locale="id-ID">
            <DateRangePicker
              className="max-w-xs"
              placeholder="Tanggal"
              value={dateRange}
              onChange={(range) => {
                setDateRange(range);

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

          <Select
            placeholder="Pilih Pelatihan"
            selectedKeys={trainingId ? [trainingId] : []}
            onSelectionChange={(keys) => setTrainingId(Array.from(keys)[0])}
            className="w-48"
          >
            {trainings.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>

          <Button
            variant="light"
            startContent={<FiRotateCcw />}
            onPress={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* 📋 LIST ULASAN */}
      <div className="space-y-3">
        {isLoading && <p className="text-sm text-gray-500">Loading...</p>}

        {!isLoading && dataResult.length === 0 && (
          <p className="text-sm text-gray-500">Tidak ada ulasan</p>
        )}

        {dataResult.map((item, index) => (
          <div key={index} className="rounded-lg border p-4">
            <p className="text-sm text-gray-700">{item.comment ?? "-"}</p>
            <p className="mt-2 text-xs text-gray-500">
              — {item.user_name ?? "Anonim"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
