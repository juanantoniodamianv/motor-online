export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("es-ES", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return formattedDate;
}
