"use client";

import { FaDownload, FaEye } from "react-icons/fa";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Table from "@/components/ui/Table";

const StudentListTable = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const columns = [
    { key: "SL", title: "ক্রমিক", render: (row, index) => index + 1 },
    {
      key: "class",
      title: "শ্রেণী",
      render: (row) => row.class?.name || "-",
    },
    {
      key: "session_year",
      title: "শিক্ষাবর্ষ",
      render: (row) => row.session_year || "-",
    },
    {
      key: "createdAt",
      title: "প্রকাশের তারিখ",
      render: (row) =>
        new Date(row.createdAt).toLocaleDateString("bn-BD", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    {
      key: "actions",
      title: "অ্যাকশন",
      render: (row) => {
        const isPdf = row.file_url?.toLowerCase().endsWith(".pdf");

        return (
          <div className="flex items-center gap-3">
            {/* View Button */}
            {isPdf && (
              <button
                className="inline-flex items-center justify-center size-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                title="দেখুন"
                onClick={() => {
                  setSelectedFile(row.file_url);
                  setOpen(true);
                }}
              >
                <FaEye size={16} />
              </button>
            )}

            {/* Download Button */}
            <a
              key={row.id}
              href={row.file_url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center size-8 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              title="ডাউনলোড"
            >
              <FaDownload size={16} />
            </a>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <div className="h-[75vh] mt-6 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-white shadow-2xl border border-gray-200">
                <div className="h-full p-4">
                  <iframe
                    src={selectedFile}
                    title="Notice PDF"
                    className="w-full h-full rounded-xl border-0 shadow-inner"
                    frameBorder="0"
                  />
                </div>
              </div>
            </Modal>
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} data={data} />;
};

export default StudentListTable;
