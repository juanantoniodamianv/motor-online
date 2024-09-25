import { Badge } from "flowbite-react";
import {
  HiClock,
  HiOutlineCheckCircle,
  HiOutlinePause,
  HiOutlineFire,
  HiOutlinePencil,
} from "react-icons/hi";

import { Status } from "../../types";
import { formatDate } from "../../utils/dates";

export default function statusBadge({
  status,
  lastUpdate,
}: {
  status: Status | null;
  lastUpdate: string | null;
}) {
  if (status === null) return;

  const colors = {
    sold: "red",
    draft: "gray",
    active: "green",
    paused: "yellow",
  };

  return (
    <Badge
      color={colors[status]}
      size="sm"
      className="flex justify-between items-center w-full"
    >
      <span className="ml-auto flex items-center">
        {status === "sold" && (
          <>
            <HiOutlineFire className="inline mr-2 align-middle" />
            Vendido
          </>
        )}
        {status === "draft" && (
          <>
            <HiOutlinePencil className="inline mr-2 align-middle" />
            Borrador
          </>
        )}
        {status === "paused" && (
          <>
            <HiOutlinePause className="inline mr-2 align-middle" />
            Pausado
          </>
        )}
        {status === "active" && (
          <>
            <HiOutlineCheckCircle className="inline mr-2 align-middle" />
            Activo
          </>
        )}
      </span>
      {lastUpdate && (
        <span className="ml-auto flex items-center">
          <HiClock className="inline mr-2 align-middle" />
          Última modificación {formatDate(lastUpdate)}
        </span>
      )}
    </Badge>
  );
}
