"use client";

import { BsDownload, BsFillEyeFill } from "react-icons/bs";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Link from "next/link";
import { dateFormat } from "@/utils/date-format.util";

const NoticeBoard = ({ notices }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const openModal = (url) => {
    setPdfUrl(url);
    setModalOpen(true);
  };

  return (
    <>
      <div className="gov-panel w-full h-full flex flex-col">
        <h2 className="gov-panel-header">Notice</h2>
        <div className="p-2 md:max-h-[380px] overflow-y-auto flex-1">
          {notices?.length > 0 ? (
            <ul className="divide-y divide-slate-200">
              {notices.map((notice) => (
                <NoticeBoardCard
                  key={notice?.id}
                  notice={notice}
                  openModal={openModal}
                />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 text-center py-6">
              No notices available.
            </p>
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="h-[70vh] mt-6">
          <iframe
            src={pdfUrl}
            title="Notice PDF"
            className="w-full h-full border border-slate-300"
            frameBorder="0"
          />
        </div>
      </Modal>
    </>
  );
};

const NoticeBoardCard = ({ notice, openModal }) => {
  return (
    <li className="flex items-start justify-between gap-2 px-2 py-2.5 hover:bg-slate-50">
      <div className="flex items-start gap-2 min-w-0">
        <span className="mt-1.5 size-2.5 shrink-0 bg-accent" aria-hidden />
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-slate-800 leading-snug">
            {notice?.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {dateFormat(notice?.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 gap-0.5">
        <button
          className="bg-primary px-2.5 py-1.5 btn hover:bg-primary-700"
          onClick={() => openModal(notice?.pdf_url)}
          title="View"
        >
          <BsFillEyeFill className="text-white text-sm" />
        </button>
        <Link
          href={notice?.pdf_url}
          download={`${notice?.title}.pdf`}
          target="_blank"
          className="bg-secondary px-2.5 py-1.5 btn hover:bg-secondary-dark"
          title="Download"
        >
          <BsDownload className="text-slate-900 text-sm" />
        </Link>
      </div>
    </li>
  );
};

export default NoticeBoard;
