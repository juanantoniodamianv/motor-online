"use client";

import usePublications from "@/src/app/hooks/usePublications";
import PublicationList from "./publication-list";
import { useAuthContext } from "@/src/context/auth-context";

export default function MyPublicationsList() {
  const { isLoading, error: userError, user } = useAuthContext();

  if (isLoading) {
    return <>Cargando publicaciones</>;
  }

  if (userError || !user?.id) {
    return null;
  }

  const { error, publications } = usePublications({ userId: user.id });

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
