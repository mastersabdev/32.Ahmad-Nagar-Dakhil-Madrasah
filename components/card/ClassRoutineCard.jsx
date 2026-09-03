"use client";

import { FaDownload, FaEye } from "react-icons/fa";
import Table from "../ui/Table";
import { useState } from "react";
import Modal from "../ui/Modal";

const ClassRoutineCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const columns = [
    { key: "name", title: "রুটিনের নাম", dataIndex: "name" },
    {
      key: "class",
      title: "শ্রেণী",
      render: (row) => row.class?.name || "-",
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
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center justify-center w-8 h-8 bg-primary text-white hover:bg-primary-700 transition-colors"
            title="দেখুন"
            onClick={() => setOpen(true)}
          >
            <FaEye size={16} />
          </button>

          <a
            href={row.pdf_url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-8 h-8 bg-secondary text-slate-900 hover:bg-secondary-dark transition-colors"
            title="ডাউনলোড"
          >
            <FaDownload size={16} />
          </a>

          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <div className="h-[75vh] mt-6 rounded-2xl overflow-hidden bg-primary-50 ring-1 ring-primary-100">
              <div className="h-full p-4">
                <iframe
                  src={row?.pdf_url}
                  title="Notice PDF"
                  className="w-full h-full rounded-xl border-0"
                  frameBorder="0"
                />
              </div>
            </div>
          </Modal>
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={data} />;
};

export default ClassRoutineCard;
