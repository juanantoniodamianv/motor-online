"use client";
import { useState, useCallback, ChangeEvent } from "react";
import { HiCloudUpload, HiX } from "react-icons/hi";
import Navigation from "./navigation";
import { type SectionProps } from "./types";

export default function ImageSection({ isActiveTab }: SectionProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              const file = e.target.result as string;
              setPreviewImages((prev) => [...prev, file]);
            }
          };
          reader.readAsDataURL(file);
        });
      }
    },
    []
  );

  const handleDeleteImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div id="media-section" className={isActiveTab ? "block" : "hidden"}>
      <div className="flex items-center justify-center w-full mb-6">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <HiCloudUpload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">
                Haz clic aquí para adjuntar imágenes
              </span>{" "}
              o arrastra las imágenes aquí.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            name="files"
            className="hidden"
            onChange={handleFileChange}
            multiple
          />
        </label>
      </div>

      {previewImages.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {previewImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg"
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                type="button"
              >
                <HiX className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Navigation
        hrefCancel="/dashboard"
        hrefBack="?tab=2-location"
        labelBack="Atrás"
        hrefForward="?tab=4-confirm"
        labelForward="Continuar"
      />
    </div>
  );
}
