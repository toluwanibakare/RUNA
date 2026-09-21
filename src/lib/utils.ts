export function cn(...classes: (string | boolean | undefined | null | Record<string, boolean>)[]): string {
  return classes
    .flatMap((c) => {
      if (!c) return [];
      if (typeof c === "string") return [c];
      if (typeof c === "object") return Object.entries(c).filter(([, v]) => v).map(([k]) => k);
      return [];
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceCompact(amount: number): string {
  if (amount >= 1000) return `₦${(amount / 1000).toFixed(amount >= 10000 ? 0 : 1)}k`;
  return `₦${amount.toLocaleString()}`;
}
