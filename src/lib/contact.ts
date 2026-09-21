import { site } from "@/config/site";

const phoneDigits = site.phone.replace(/\D/g, "");

export const telHref = `tel:${site.phone}`;

export const waHref = (message: string) =>
  `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;

export const mailHref = site.email ? `mailto:${site.email}` : null;
