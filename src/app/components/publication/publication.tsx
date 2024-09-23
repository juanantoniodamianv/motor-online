"use client";

import Image from "next/image";

import type { Publication } from "../../types";
import { useStorage } from "./useStorage";

type PublicationProps = {
  publication: Publication;
};

export default function Publication({ publication }: PublicationProps) {
  const { fileUrls } = useStorage({
    publicationId: publication.id,
    limit: 1,
  });

  return (
    <div className="group relative w-64" key={publication.id}>
      <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
        {/* TODO: mover Image a un componente, usar suspense o una imagen por defecto */}
        {fileUrls[0] && (
          <Image
            src={fileUrls[0]}
            width={415}
            height={224}
            alt="Publication image"
            className="object-cover object-center w-full h-full"
          />
        )}
      </div>
      <div className="mt-4 flex justify-between gap-4">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={`/publication/${publication.slug_url}`}>
              <span aria-hidden="true" className="absolute inset-0"></span>
              {publication.title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {publication.vehicle_makes?.name} ·{" "}
            {publication.vehicle_models?.name}
          </p>
          <p className="mt-1 text-sm text-gray-500">{publication.year}</p>
        </div>
        <p className="text-sm font-medium dark:text-white text-black">
          ${publication.price}
        </p>
      </div>
    </div>
  );
}
