import { Dropdown } from "flowbite-react";
import { HiCheckCircle, HiPause, HiPlay, HiRefresh } from "react-icons/hi";

import { Status } from "../../types";
import { Button } from "../button";

interface HandleStatusButtonsProps {
  status: Status;
  handleStatus: (status: Status) => void;
  publicationId: string;
}

export default function handleStatusButtons({
  status,
  handleStatus,
  publicationId,
}: HandleStatusButtonsProps) {
  const EditLink = () => (
    <Dropdown.Item as="a" href={`/dashboard/edit-publication/${publicationId}`}>
      Modificar publicación
    </Dropdown.Item>
  );

  const StatusPaused = () => (
    <>
      <Button variant="success" onClick={() => handleStatus("sold")}>
        <HiCheckCircle className="inline align-middle" /> Marcar como vendido
      </Button>

      <Dropdown
        color="light"
        label="..."
        dismissOnClick={false}
        arrowIcon={false}
      >
        <Dropdown.Item onClick={() => handleStatus("active")}>
          Marcar como disponible
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatus("draft")}>
          Marcar como borrador
        </Dropdown.Item>

        <EditLink />
      </Dropdown>
    </>
  );

  const StatusActive = () => (
    <>
      <Button variant="success" onClick={() => handleStatus("paused")}>
        <HiPause className="inline align-middle" /> Pausar publicación
      </Button>

      <Dropdown
        color="light"
        label="..."
        dismissOnClick={false}
        arrowIcon={false}
      >
        <Dropdown.Item onClick={() => handleStatus("sold")}>
          Marcar como vendido
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatus("draft")}>
          Marcar como borrador
        </Dropdown.Item>

        <EditLink />
      </Dropdown>
    </>
  );

  const StatusSold = () => (
    <>
      <Button variant="success" onClick={() => handleStatus("active")}>
        <HiRefresh className="inline align-middle" /> Volver a publicar
      </Button>

      <Dropdown
        color="light"
        label="..."
        dismissOnClick={false}
        arrowIcon={false}
      >
        <EditLink />
      </Dropdown>
    </>
  );

  const StatusDraft = () => (
    <>
      <Button variant="success" onClick={() => handleStatus("active")}>
        <HiPlay className="inline align-middle" /> Marcar como disponible
      </Button>

      <Dropdown
        color="light"
        label="..."
        dismissOnClick={false}
        arrowIcon={false}
      >
        <Dropdown.Item onClick={() => handleStatus("sold")}>
          Marcar como vendido
        </Dropdown.Item>
        <EditLink />
      </Dropdown>
    </>
  );

  return (
    <>
      {status === "sold" && <StatusSold />}

      {status === "draft" && <StatusDraft />}

      {status === "active" && <StatusActive />}

      {status === "paused" && <StatusPaused />}
    </>
  );
}
