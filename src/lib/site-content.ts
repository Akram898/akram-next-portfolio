/* Every word on the split home (/ and /ar) and the services pages (/services, /ar/services).
   Both locales share one shape, so a missing translation is a type error.
   Kept short on purpose: one line per idea. */

export type Locale = "en" | "ar";

export type ServiceSlide = {
  id: string;
  /** Clip in public/media: service-<clip>.mp4 and .jpg */
  clip: "website" | "ads" | "ai-ads" | "assistant" | "automation" | "hosting";
  title: string;
  line: string;
  tags: [string, string, string];
};

export type Copy = {
  locale: Locale;
  dir: "ltr" | "rtl";
  home: { title: string; description: string };
  servicesMeta: { title: string; description: string };
  ui: {
    name: string;
    role: string;
    switchLabel: string;
    switchHref: string;
    switchServicesHref: string;
    switchLang: string;
    portfolio: string;
    services: string;
    home: string;
    whatsapp: string;
    themeToLight: string;
    themeToDark: string;
  };
  split: {
    portfolio: { word: string; line: string; cta: string; note?: string };
    services: { word: string; line: string; cta: string };
  };
  hero: { word: string; title: string; whatsappText: string; primary: string; secondary: string };
  slides: { label: string; prev: string; next: string; ask: string; /** "{title}" is replaced with the service name. */
    askText: string; list: ServiceSlide[] };
  steps: { title: string; list: { title: string; text: string }[] };
  contact: {
    title: string;
    lead: string;
    whatsapp: string;
    call: string;
    email: string;
    formToggle: string;
    form: {
      title: string;
      name: string;
      business: string;
      businessPlaceholder: string;
      needs: string;
      message: string;
      messagePlaceholder: string;
      reach: string;
      reachPlaceholder: string;
      sendWhatsapp: string;
      sendEmail: string;
      send: string;
      sending: string;
      sent: string;
      failed: string;
      missing: string;
      whatsappIntro: string;
      emailSubject: string;
    };
  };
  footer: { guides: string; privacy: string };
};

const en: Copy = {
  locale: "en",
  dir: "ltr",
  home: {
    title: "Ahmed Akram | AI engineer, services for business",
    description: "Ahmed Akram: AI engineer in Dubai. See the portfolio, or the services: websites, Facebook and Instagram ads, AI ads, AI assistants, automation and hosting.",
  },
  servicesMeta: {
    title: "Services | Ahmed Akram",
    description: "Websites, Facebook and Instagram ads, AI-made ads, AI customer assistants, automation, and hosting for small businesses. In English and Arabic.",
  },
  ui: {
    name: "Ahmed Akram",
    role: "AI engineer, Dubai",
    switchLabel: "عربي",
    switchHref: "/ar",
    switchServicesHref: "/ar/services",
    switchLang: "ar",
    portfolio: "Portfolio",
    services: "Services",
    home: "Home",
    whatsapp: "WhatsApp",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
  },
  split: {
    portfolio: { word: "Portfolio", line: "14 years of software. AI systems, architecture and shipped work.", cta: "Open portfolio" },
    services: { word: "Services", line: "Websites, ads and AI that bring your business customers.", cta: "Open services" },
  },
  hero: {
    word: "Services",
    title: "More customers. Less busywork.",
    whatsappText: "Hi Akram, I saw your website and I'd like to talk about my business.",
    primary: "Talk on WhatsApp",
    secondary: "See the services",
  },
  slides: {
    label: "Services",
    prev: "Previous service",
    next: "Next service",
    ask: "Ask about this",
    askText: "Hi Akram, I'm interested in: {title}.",
    list: [
      { id: "website", clip: "website", title: "Websites & online stores", line: "Fast, good-looking sites that turn visitors into orders.", tags: ["Landing pages", "Online stores", "WhatsApp & booking"] },
      { id: "ads", clip: "ads", title: "Facebook & Instagram ads", line: "Campaigns that reach buyers, with tracking that shows what each customer costs.", tags: ["Campaign setup", "Pixel & tracking", "Monthly report"] },
      { id: "ai-ads", clip: "ai-ads", title: "AI-made ads & content", line: "Ad videos, product shots and reels made with AI, in days, not weeks.", tags: ["Video ads", "Product photos", "Reels"] },
      { id: "assistant", clip: "assistant", title: "AI customer assistant", line: "Answers customers on WhatsApp, Instagram and your site, day and night.", tags: ["Arabic & English", "Orders & bookings", "Hands off to you"] },
      { id: "automation", clip: "automation", title: "Automation", line: "Orders, invoices and follow-ups move between your tools on their own.", tags: ["WhatsApp & email", "Sheets & CRM", "Auto reports"] },
      { id: "hosting", clip: "hosting", title: "Hosting & domains", line: "Hosting, domains and business email at partner prices.", tags: ["Hosting", "Domains", "Business email"] },
    ],
  },
  steps: {
    title: "How it works",
    list: [
      { title: "Free call", text: "20 minutes. You tell me what you need." },
      { title: "Fixed price", text: "A clear plan and price, in writing." },
      { title: "Live in days", text: "You test it, then your customers see it." },
    ],
  },
  contact: {
    title: "Let's talk.",
    lead: "Pick whatever is easiest. I usually reply the same day.",
    whatsapp: "WhatsApp",
    call: "Call",
    email: "Email",
    formToggle: "Or write a short message",
    form: {
      title: "Send a short message",
      name: "Your name",
      business: "Your business",
      businessPlaceholder: "e.g. a café, an online store",
      needs: "What do you need?",
      message: "Anything else?",
      messagePlaceholder: "Optional",
      reach: "WhatsApp number or email",
      reachPlaceholder: "So I can reply",
      sendWhatsapp: "Send on WhatsApp",
      sendEmail: "Send by email",
      send: "Send message",
      sending: "Sending…",
      sent: "Message sent. I'll get back to you soon.",
      failed: "The message didn't send. Please use WhatsApp or email instead.",
      missing: "Please add your name and how I can reach you.",
      whatsappIntro: "Hi Akram, I found you through your website.",
      emailSubject: "My business",
    },
  },
  footer: { guides: "Guides", privacy: "Privacy" },
};

const ar: Copy = {
  locale: "ar",
  dir: "rtl",
  home: {
    title: "أحمد أكرم | مهندس AI، وخدمات للبيزنس",
    description: "أحمد أكرم، مهندس ذكاء اصطناعي في دبي. شوف أعمالي، أو الخدمات: مواقع، إعلانات فيسبوك وإنستجرام، إعلانات بالـ AI، مساعد ذكي، أتمتة، واستضافة.",
  },
  servicesMeta: {
    title: "الخدمات | أحمد أكرم",
    description: "مواقع، إعلانات فيسبوك وإنستجرام، إعلانات معمولة بالـ AI، مساعد ذكي للعملاء، أتمتة، واستضافة ودومينات للمشروعات الصغيرة.",
  },
  ui: {
    name: "أحمد أكرم",
    role: "مهندس AI، دبي",
    switchLabel: "English",
    switchHref: "/",
    switchServicesHref: "/services",
    switchLang: "en",
    portfolio: "أعمالي",
    services: "خدماتي",
    home: "الرئيسية",
    whatsapp: "واتساب",
    themeToLight: "الوضع الفاتح",
    themeToDark: "الوضع الغامق",
  },
  split: {
    portfolio: { word: "أعمالي", line: "١٤ سنة برمجيات. أنظمة AI ومعمارية ومشاريع اتسلّمت.", cta: "افتح أعمالي" },
    services: { word: "خدماتي", line: "مواقع وإعلانات وذكاء اصطناعي يجيبوا لشغلك عملاء.", cta: "افتح الخدمات" },
  },
  hero: {
    word: "خدماتي",
    title: "عملاء أكتر. وجع دماغ أقل.",
    whatsappText: "أهلاً يا أكرم، شفت موقعك وحابب أتكلم معاك عن شغلي.",
    primary: "كلمني واتساب",
    secondary: "شوف الخدمات",
  },
  slides: {
    label: "الخدمات",
    prev: "الخدمة اللي قبل",
    next: "الخدمة اللي بعد",
    ask: "اسأل عن دي",
    askText: "أهلاً يا أكرم، مهتم بـ: {title}.",
    list: [
      { id: "website", clip: "website", title: "مواقع ومتاجر أونلاين", line: "مواقع سريعة وشيك بتحوّل الزوار لطلبات.", tags: ["صفحات هبوط", "متاجر أونلاين", "واتساب وحجز"] },
      { id: "ads", clip: "ads", title: "إعلانات فيسبوك وإنستجرام", line: "حملات بتوصل للي هيشتري، وتتبع يوريك العميل كلفك كام.", tags: ["تجهيز الحملات", "Pixel وتتبع", "تقرير شهري"] },
      { id: "ai-ads", clip: "ai-ads", title: "إعلانات ومحتوى بالـ AI", line: "فيديوهات إعلانية وصور منتجات وريلز بالـ AI، في أيام مش أسابيع.", tags: ["فيديوهات إعلانية", "صور منتجات", "ريلز"] },
      { id: "assistant", clip: "assistant", title: "مساعد ذكي للعملاء", line: "بيرد على عملاءك على واتساب وإنستجرام وموقعك، ليل ونهار.", tags: ["عربي وإنجليزي", "طلبات وحجوزات", "بيحوّلك لما يحتاج"] },
      { id: "automation", clip: "automation", title: "أتمتة الشغل", line: "الطلبات والفواتير والمتابعات بتمشي بين أدواتك لوحدها.", tags: ["واتساب وإيميل", "شيتات وCRM", "تقارير أوتوماتيك"] },
      { id: "hosting", clip: "hosting", title: "استضافة ودومينات", line: "استضافة ودومين وإيميل شركة بأسعار شركائنا.", tags: ["استضافة", "دومينات", "إيميل شركة"] },
    ],
  },
  steps: {
    title: "إزاي بنشتغل",
    list: [
      { title: "مكالمة مجانية", text: "٢٠ دقيقة. تقولي محتاج إيه." },
      { title: "سعر ثابت", text: "خطة وسعر واضحين ومكتوبين." },
      { title: "شغّال في أيام", text: "بتجرّبه الأول، وبعدين عملاءك يشوفوه." },
    ],
  },
  contact: {
    title: "يلا نتكلم.",
    lead: "اختار الأسهل ليك. غالباً برد في نفس اليوم.",
    whatsapp: "واتساب",
    call: "اتصال",
    email: "إيميل",
    formToggle: "أو اكتب رسالة قصيرة",
    form: {
      title: "ابعت رسالة قصيرة",
      name: "اسمك",
      business: "شغلك إيه",
      businessPlaceholder: "مثلاً: كافيه، متجر أونلاين",
      needs: "محتاج إيه؟",
      message: "حاجة تانية؟",
      messagePlaceholder: "اختياري",
      reach: "رقم الواتساب أو الإيميل",
      reachPlaceholder: "عشان أرد عليك",
      sendWhatsapp: "ابعت على واتساب",
      sendEmail: "ابعت بالإيميل",
      send: "ابعت الرسالة",
      sending: "بيتبعت…",
      sent: "الرسالة وصلت. هرد عليك قريب.",
      failed: "الرسالة موصلتش. ابعت على واتساب أو بالإيميل بدالها.",
      missing: "اكتب اسمك وإزاي أوصلك.",
      whatsappIntro: "أهلاً يا أكرم، لقيتك من موقعك.",
      emailSubject: "شغلي",
    },
  },
  footer: { guides: "الأدلة", privacy: "الخصوصية" },
};

export const copy: Record<Locale, Copy> = { en, ar };
