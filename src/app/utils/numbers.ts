export const sanitizeValue = (value: string) => {
  return value.replace(/\D/g, ""); // Remove all non-numeric characters
};
