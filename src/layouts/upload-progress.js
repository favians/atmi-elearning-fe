"use client";
import React from "react";
import { useUploadProgress } from "@/context/upload-context";

const UploadProgressBox = () => {
  const { progress } = useUploadProgress();

  if (!progress || progress === 0) return null; // ⬅️ Kondisi agar tidak ditampilkan saat 0/null

  return (
    <div className="fixed bottom-4 right-[30%] w-96 rounded-lg shadow-lg bg-white border border-gray-200 z-50">
      <div className="px-4 py-3">
        <h4 className="text-sm font-semibold mb-2 text-gray-800">
          Mengunggah Berkas...
        </h4>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default UploadProgressBox;
