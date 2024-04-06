export function formatCurrency(price: number, option?: string) {
  return new Intl.NumberFormat(option, {
    style: "currency",
    currency: "USD",
  }).format(price);
}
