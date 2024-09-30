"use client";

import usePublications from "@/src/app/hooks/usePublications";
import PublicationList from "./publication-list";

export default function MyPublicationsList({ userId }: { userId: string }) {
  const { error, publications } = usePublications({ userId });

  if (error) {
    return <>Ha ocurrido un error al recuperar las publicaciones</>;
  }

  return (
    <>
      {publications && (
        <PublicationList publications={publications} extended={true} />
      )}
    </>
  );
}
