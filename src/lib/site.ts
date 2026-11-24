export const site = {
  name: "Ahmed Akram",
  role: "AI for small businesses",
  location: "Dubai, UAE",
  timezone: "GST · UTC+4",
  email: "akram78787@gmail.com",
  phone: "+971 56 179 8031",
  phoneHref: "tel:+971561798031",
  /* WhatsApp number in international format, digits only (used for wa.me links). */
  whatsapp: "971561798031",
  github: "https://github.com/Akram898",
  linkedin: "https://www.linkedin.com/in/ahmedakram/",
  instagram: "https://www.instagram.com/theakram.ai/",
  instagramAr: "https://www.instagram.com/thearabicakram.ai/",
  /* TODO(Akram): paste the real Facebook page and YouTube channel links.
     Empty strings are hidden on the site, so nothing broken goes live. */
  facebook: "",
  youtube: "",
  /* TODO(Akram): the hosting partner's exact name and link. When set, the hosting
     slide on /services shows it as a link; empty = the slide says "partner prices". */
  hostingPartner: { name: "", url: "" },
  url: "https://ahmedakram.com",
} as const;

export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const sheets = [
  { id: "control-plane", num: 1, title: "Control Plane", nav: "Index" },
  { id: "case-files", num: 2, title: "Case Files", nav: "Case Files" },
  { id: "lab", num: 3, title: "The Lab", nav: "Lab" },
  { id: "capabilities", num: 4, title: "Capabilities", nav: "Capabilities" },
  { id: "revisions", num: 5, title: "Revision History", nav: "About" },
  { id: "contact", num: 6, title: "Issue for Construction", nav: "Contact" },
] as const;

export type SheetId = (typeof sheets)[number]["id"];
