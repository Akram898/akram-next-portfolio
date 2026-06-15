export const site = {
  name: "Ahmed Akram",
  role: "AI Solutions Engineer & Architect",
  location: "Dubai, UAE",
  timezone: "GST · UTC+4",
  email: "akram78787@gmail.com",
  phone: "+971 56 179 8031",
  phoneHref: "tel:+971561798031",
  github: "https://github.com/Akram898",
  linkedin: "https://www.linkedin.com/in/ahmedakram/",
  url: "https://ahmedakram.com",
} as const;

export const sheets = [
  { id: "control-plane", num: 1, title: "Control Plane", nav: "Index" },
  { id: "case-files", num: 2, title: "Case Files", nav: "Case Files" },
  { id: "lab", num: 3, title: "The Lab", nav: "Lab" },
  { id: "capabilities", num: 4, title: "Capabilities", nav: "Capabilities" },
  { id: "revisions", num: 5, title: "Revision History", nav: "About" },
  { id: "contact", num: 6, title: "Issue for Construction", nav: "Contact" },
] as const;

export type SheetId = (typeof sheets)[number]["id"];
