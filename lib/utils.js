const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(value) {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[d]);
}

// 1850 -> "১,৮৫০"
export function formatNumber(value) {
  return toBn(Number(value).toLocaleString("en-US"));
}

export function formatPrice(value) {
  return `${formatNumber(value)} টাকা`;
}

const UNITS = {
  kg: { long: "প্রতি কেজি", short: "কেজি" },
  litre: { long: "প্রতি লিটার", short: "লিটার" },
  liter: { long: "প্রতি লিটার", short: "লিটার" },
  dozen: { long: "প্রতি ডজন", short: "ডজন" },
  piece: { long: "প্রতি পিস", short: "পিস" },
};

export function unitLong(unit) {
  return UNITS[unit]?.long || `প্রতি ${unit}`;
}

export function unitShort(unit) {
  return UNITS[unit]?.short || unit;
}

// দাম বাড়া/কমা/অপরিবর্তিত -> badge-এর text ও color
export function getChange(change) {
  const pct = toBn(Number(change?.pct ?? 0).toFixed(1));
  if (change?.dir === "up") {
    return { text: `▲ ${pct}%`, className: "text-green-600" };
  }
  if (change?.dir === "down") {
    return { text: `▼ ${pct}%`, className: "text-red-600" };
  }
  return { text: `— ${pct}%`, className: "text-gray-500" };
}

export function banglaDate(date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}

// দাম অনুযায়ী sort (সংখ্যা দিয়ে, string দিয়ে নয়)
export function sortProducts(products, order) {
  const list = [...products];
  if (order === "asc") return list.sort((a, b) => a.today - b.today);
  if (order === "desc") return list.sort((a, b) => b.today - a.today);
  return list;
}