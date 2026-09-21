// Single source of truth for contact data, socials, promo codes and merch models.
// Anything marked PENDIENTE is not confirmed yet: do not replace it with made-up values.

// PENDIENTE: real phone number in international format, e.g. "+34600111222".
// Until it is set, the tel: and wa.me links point nowhere useful.
const PHONE_PLACEHOLDER = "+34000000000";

export const site = {
  name: "CaliPro",
  url: "https://calipro.example", // PENDIENTE: real domain
  phone: PHONE_PLACEHOLDER as string,
  email: null as string | null, // PENDIENTE
  instagram: { handle: "pedrohr_2", url: "https://www.instagram.com/pedrohr_2/" },
  tiktok: { handle: "phr_02", url: "https://www.tiktok.com/@phr_02" },
};

export const phonePending = site.phone === PHONE_PLACEHOLDER;

export type PromoCode = {
  store: string;
  code: string;
  discount: number;
  url: string;
};

export const promoCodes: PromoCode[] = [
  { store: "Zumub", code: "PHRSW2", discount: 10, url: "https://zumu.be/vipphrsw2" },
  // VERIFICAR: the user was not 100% sure about this link.
  { store: "Tutempire", code: "PHRSW25", discount: 25, url: "https://tutempire.com/?ref=doglhdlw" },
];
