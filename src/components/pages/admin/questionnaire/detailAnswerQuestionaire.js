"use client";

import Image from "next/image";

import { useGetQustionnaireResult } from "@/hooks/admin/useGetQustionnaireResult";
import { useEffect } from "react";

export default function DetailAnswerQuestionaire({ id, onLoaded }) {
  const { data, isLoading } = useGetQustionnaireResult({
    params: {
      page: 1,
      id,
    },
  });

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const result = data?.data?.[0];
  const formResult = result?.form_result ?? [];
  useEffect(() => {
    if (onLoaded && result) {
      onLoaded({
        createdBy: result.trainee_data?.full_name?.String || "Anonymous",
        createdAt: result.created_at,
      });
    }
  }, [result, onLoaded]);
  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }

  if (!result) {
    return <p className="text-sm text-gray-500">Data tidak ditemukan</p>;
  }
  const profileUrl = result?.trainee_data?.profile_url;

  const imageSrc =
    profileUrl?.Valid && profileUrl?.String
      ? `/${profileUrl.String}`
      : "/avatar-default.png";
  return (
    <div className="space-y-6 mb-10">
      {/* ================= HEADER PROFILE ================= */}
      <div className="flex gap-4 items-center border-b pb-8">
        <Image
          src={imageSrc}
          alt="profile"
          width={64}
          height={64}
          className="rounded-full border"
        />

        <div className="flex flex-col">
          <span className="font-semibold text-lg">
            {result.trainee_data?.full_name?.String || "Anonymous"}
          </span>
          <span className="text-sm text-gray-600">
            {result.training_data?.title || "Anonymous"}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(result.created_at)}
          </span>
        </div>
      </div>

      {/* ================= LIST SOAL & JAWABAN ================= */}
      <div className="space-y-2">
        {formResult.map((item, index) => {
          // TITLE → heading saja

          return (
            <div key={index} className="flex gap-4 p-4">
              {/* ===== NOMOR ===== */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* ===== KONTEN ===== */}
              <div className="space-y-2">
                {/* Question */}
                <p className="font-medium">
                  {getAnswerValue(item.type)} : {item.question}
                </p>

                {/* Description */}
                {item.description && (
                  <p className="text-sm text-gray-500">{item.description}</p>
                )}

                {/* Answer */}
                <div className="text-sm">
                  {item.type === "LINEAR_SCALE" && (
                    <span className="font-normal text-black">
                      {item.answer} / {item.max_range_scale}
                    </span>
                  )}

                  {item.type === "OPTION" && (
                    <span className="font-normal">{item.answer}</span>
                  )}

                  {item.type === "TEXT" && (
                    <span className="font-normal">{item.answer || "-"}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export const getAnswerValue = (text) => {
  switch (text) {
    case "LINEAR_SCALE":
      return `Linier Scale`;

    case "OPTION":
      return "Option";

    case "TEXT":
      return "Text";

    case "TITLE":
      return "Title";

    default:
      return "-";
  }
};
