// Transform a number into a currency string
export function formatCurrency(
  amount: number,
  currencyType: "ars" | "usd"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyType,
  }).format(amount);
}
