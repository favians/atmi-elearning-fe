"use client";

import { useEffect, useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

export default function TemplateCard({
  icon,
  title,
  assessmentCount,
  description,
  authorName,
  authorAvatar,
  onDetail,
  // onDelete,
  onEdit,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // 🔒 close popup saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 flex flex-col justify-between">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex justify-start items-center gap-4">
          <div className="text-blue-600 p-2 bg-slate-100 rounded-lg">
            {icon}
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">{title}</h3>
            <span className="text-xs text-gray-500">
              {assessmentCount} Assessment
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 relative" ref={menuRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <FiMoreVertical size={18} />
          </button>

          {/* POPUP */}
          {open && (
            <div className="absolute right-0 top-6 w-40 bg-white border rounded-lg shadow-md z-10">
              <button
                onClick={() => {
                  setOpen(false);
                  onDetail();
                }}
                className="w-full px-4 pt-4 pb-2 text-sm text-left hover:bg-gray-100 text-[#272B32]"
              >
                Detail Template
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  onEdit();
                }}
                className="w-full px-4 pt-4 pb-4 text-sm text-left text-[#272B32] hover:bg-gray-100"
              >
                Edit Template
              </button>
              {/* <button
                onClick={() => {
                  setOpen(false);
                  onDelete();
                }}
                className="w-full px-4 pt-2 pb-4 text-sm text-left text-[#272B32] hover:bg-gray-100"
              >
                Hapus Template
              </button> */}
            </div>
          )}
        </div>
      </div>

      {/* BODY */}
      <p className="text-sm text-[#212121] mt-4 line-clamp-3">{description}</p>

      {/* FOOTER */}
      <div className="mt-6">
        <p className="text-xs text-gray-400 mb-2">Dibuat oleh</p>
        <div className="flex items-center gap-2">
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{authorName}</span>
        </div>
      </div>
    </div>
  );
}
