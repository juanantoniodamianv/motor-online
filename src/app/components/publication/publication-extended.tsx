// This component should be used for authenticated users only (my publications list)
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Publication } from "@/src/app/types";
import { Button, buttonStyles } from "../button";
import { updatePublicationStatus } from "../../(private)/dashboard/my-publications/actions";
import { useStorage } from "./useStorage";

type PublicationExtendedProps = {
  publication: Publication;
};

export default function PublicationExtended({
  publication,
}: PublicationExtendedProps) {
  const [status, setStatus] = useState(publication.status);
  const { fileUrls } = useStorage({
    publicationId: publication.id,
    limit: 1,
  });

  const handleStatus = async (
    newStatus: "active" | "sold" | "draft" | "paused"
  ) => {
    await updatePublicationStatus(publication.id, newStatus);
    setStatus(newStatus);
  };

  return (
    <div
      key={publication.id}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row w-full dark:border-gray-700 dark:bg-gray-800"
    >
      {/* TODO: mover Image a un componente, usar suspense o una imagen por defecto */}
      {fileUrls[0] && (
        <Image
          src={fileUrls[0]}
          width={250}
          height={150}
          alt="Publication image"
          className="object-cover w-full h-auto md:w-[250px] md:h-[150px] p-2 md:rounded-none md:rounded-s-lg"
        />
      )}

      <div className="flex flex-col justify-between p-4 leading-normal w-full">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {publication.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {publication.vehicle_makes?.name} · {publication.vehicle_models?.name}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {publication.year}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          ${publication.price}
        </p>

        <div className="flex space-x-4">
          <input type="hidden" name="id" value={publication.id} />

          {status === "sold" && (
            <Button onClick={() => handleStatus("active")}>
              Volver a publicar
            </Button>
          )}

          {status === "draft" && (
            <Button onClick={() => handleStatus("active")}>
              Marcar como disponible
            </Button>
          )}

          {status === "active" && (
            <>
              <Button onClick={() => handleStatus("sold")} variant="success">
                Marcar como vendido
              </Button>
              <Button onClick={() => handleStatus("draft")} variant="secondary">
                Marcar como borrador
              </Button>
            </>
          )}

          <Link
            href={`/dashboard/edit-publication/${publication.id}`}
            prefetch={false}
            className={buttonStyles.link}
          >
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
}
