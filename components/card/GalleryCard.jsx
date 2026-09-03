"use client";

import Image from "next/image";
import Modal from "../ui/Modal";
import { useState } from "react";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const GalleryCard = ({ gallery }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <li
        onClick={() => setIsOpen(true)}
        className="group overflow-hidden cursor-pointer border border-slate-300 bg-white transition hover:border-primary hover:bg-primary-50/30"
      >
        <div className="relative w-full overflow-hidden bg-slate-50">
          <Image
            src={gallery.image_url}
            alt={gallery.title}
            width={600}
            height={450}
            className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.02] md:h-48"
          />
        </div>
        <div className="p-3 md:p-4">
          <h3 className="line-clamp-2 text-sm md:text-base font-medium text-slate-800">
            {gallery.title}
          </h3>
          {gallery.createdAt && (
            <p className="mt-1 text-xs text-slate-400 line-clamp-2">
              Published: {formatDate(gallery.createdAt)}
            </p>
          )}
        </div>
      </li>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col items-center p-2 sm:p-6">
          <Image
            src={gallery.image_url}
            alt={gallery.title}
            width={700}
            height={500}
            className="rounded-lg mb-4 max-h-[60vh] object-contain"
          />
          <h2 className="text-lg font-bold text-slate-800 mb-2 text-center">
            {gallery.title}
          </h2>
          {gallery.description && (
            <p className="text-slate-600 mb-2 text-center">
              {gallery.description}
            </p>
          )}
          {gallery.createdAt && (
            <p className="text-xs text-slate-400 mb-1">
              Published: {formatDate(gallery.createdAt)}
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default GalleryCard;
