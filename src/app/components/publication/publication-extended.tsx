// This component should be used for authenticated users only (my publications list)
"use client";
import { useState } from "react";
import Image from "next/image";

import { Publication, Status } from "@/src/app/types";
import { updatePublicationStatus } from "../../(private)/dashboard/my-publications/actions";
import { useStorage } from "./useStorage";
import StatusBadge from "./status-badge";
import HandleStatusButtons from "./handle-status-buttons";

type PublicationExtendedProps = {
  publication: Publication;
};

export default function PublicationExtended({
  publication,
}: PublicationExtendedProps) {
  const [status, setStatus] = useState<Status | null>(
    publication.status as Status
  );
  const { fileUrls } = useStorage({
    publicationId: publication.id,
    limit: 1,
  });

  const handleStatus = async (newStatus: Status) => {
    await updatePublicationStatus(publication.id, newStatus);
    setStatus(newStatus);
  };

  return (
    <div
      key={publication.id}
      className="items-center bg-white border border-gray-200 rounded-lg shadow  w-full dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="flex flex-col items-center md:flex-row">
        {/* TODO: mover Image a un componente, usar suspense o una imagen por defecto */}
        {fileUrls[0] && (
          <div className="relative w-full h-48">
            <Image
              src={fileUrls[0]}
              alt={`${publication.year} ${publication.make} ${publication.model}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-col p-4 w-full">
          <div className="">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {publication.title}
            </h3>
            <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
              ${publication.price}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {publication.vehicle_makes?.name} ·{" "}
              {publication.vehicle_models?.name} · {publication.year}
            </p>
          </div>

          <div className="flex space-x-4 mt-3">
            {status && (
              <HandleStatusButtons
                status={status}
                handleStatus={handleStatus}
                publicationId={publication.id.toString()}
              />
            )}
          </div>
        </div>
      </div>

      <div className="w-full">
        <StatusBadge status={status} lastUpdate={publication.updated_at} />
      </div>
    </div>
  );
}
