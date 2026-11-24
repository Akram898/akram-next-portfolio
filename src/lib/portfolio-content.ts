/* Words on the portfolio page (/portfolio and /ar/portfolio). The English is the
   original portfolio copy; the Arabic is Egyptian Arabic, same meaning. */

import type { Locale } from "./site-content";

export type PortfolioCopy = {
  locale: Locale;
  dir: "ltr" | "rtl";
  meta: { title: string; description: string };
  nav: {
    links: { href: string; label: string }[];
    talk: string;
    talkHref: string;
    home: string;
    switchLabel: string;
    switchHref: string;
    switchLang: Locale;
    menu: string;
    close: string;
  };
  hero: {
    label: string;
    name: string;
    role: [string, string, string];
    lead: string;
    words: string[];
    srWords: string;
    summary: string;
    primary: string;
    secondary: string;
    status: string;
    scroll: string;
    socialsLabel: string;
  };
  proof: { value: string; label: [string, string] }[];
  portal: {
    eyebrow: string;
    cards: { href: string; code: string; title: string; subtitle?: string; text: string; cta: string; kind: "architecture" | "lab" | "guides" }[];
  };
  statement: { eyebrow: string; quote: string; quoteEnd: string; note: string };
  about: {
    caption: string;
    eyebrow: string;
    title: string;
    lead: string;
    text: string;
    facts: string[];
    npm: string;
    portraitAlt: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    start: string;
    emailLabel: string;
    emailSubject: string;
    mobile: string;
    whatsapp: string;
    whatsappText: string;
    socialsTitle: string;
    location: string;
    tagline: [string, string];
    form: {
      title: string;
      note: string;
      noteLink: string;
      noscript: string;
      unavailable: string;
      unavailableLink: string;
      name: string;
      email: string;
      project: string;
      placeholder: string;
      send: string;
      sending: string;
      sent: string;
      failed: string;
      offline: string;
      aria: string;
    };
  };
  footer: { made: string; top: string };
};

const en: PortfolioCopy = {
  locale: "en",
  dir: "ltr",
  meta: {
    title: "Portfolio | Ahmed Akram",
    description: "Technical portfolio: AI architecture, agent systems, MLOps and shipped projects by Ahmed Akram.",
  },
  nav: {
    links: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/lab", label: "Lab" },
      { href: "/guides", label: "Guides" },
      { href: "/portfolio#contact", label: "Contact" },
    ],
    talk: "Let's talk",
    talkHref: "/portfolio#contact",
    home: "/",
    switchLabel: "عربي",
    switchHref: "/ar/portfolio",
    switchLang: "ar",
    menu: "Open menu",
    close: "Close",
  },
  hero: {
    label: "Selected work / systems portfolio",
    name: "Ahmed Akram",
    role: ["AI Solutions Engineer", "Architect", "Dubai, UAE"],
    lead: "I design and ship",
    words: ["Software", "AI agents", "LLM pipelines", "Architecture", "cloud runtimes"],
    srWords: "software, AI agents, LLM pipelines, architecture, and cloud runtimes.",
    summary: "From AI workflows to production platforms, I help teams design, build, and operate software they can rely on.",
    primary: "Discuss your project",
    secondary: "See the work",
    status: "Available for selected systems",
    scroll: "Scroll to enter orbit ↓",
    socialsLabel: "Find me online",
  },
  proof: [
    { value: "14+", label: ["Years building", "software systems"] },
    { value: "Millions", label: ["Users served by", "enterprise platforms"] },
    { value: "4", label: ["LLM providers", "orchestrated"] },
    { value: "DXB", label: ["Based in Dubai.", "Working globally."] },
  ],
  portal: {
    eyebrow: "Choose a system",
    cards: [
      { kind: "architecture", href: "/architecture", code: "SYSTEM / 01", title: "Architecture", text: "Agent runtimes, model lifecycles, identity, APIs, and the decisions beneath them.", cta: "Enter system ↗" },
      { kind: "lab", href: "/lab", code: "SYSTEM / 02", title: "AI Lab", subtitle: "& Shipped Work", text: "Open proof, experiments, agent systems, MLOps tools, and an archive of shipped work.", cta: "Enter lab ↗" },
      { kind: "guides", href: "/guides", code: "SYSTEM / 03", title: "Guides", subtitle: "& Working Notes", text: "Model cost, agents, MLOps and AI security — written up with the numbers, the commands, and the sources.", cta: "Read guides ↗" },
    ],
  },
  statement: {
    eyebrow: "Working principle",
    quote: "AI is not the feature.",
    quoteEnd: "The operating system around it is.",
    note: "Models change. Providers change. Production expectations do not. I design the orchestration, evaluation, security, observability, and enterprise foundations that let AI survive contact with reality.",
  },
  about: {
    caption: "Ahmed Akram / Dubai, UAE",
    eyebrow: "Engineer / Architect / Mentor",
    title: "I learned systems before I learned software.",
    lead: "Civil engineering and military service came first. Then a self-made transition into software, senior engineering on large-scale enterprise platforms, and now applied AI systems.",
    text: "That path shaped how I work: understand the load, make trade-offs explicit, and design for operation rather than demonstration. I mentor junior engineers and translate comfortably between deep technical teams and business stakeholders.",
    facts: ["AWS Solutions Architect Associate", "B.Sc. Computer Science, in progress"],
    npm: "Published npm package ↗",
    portraitAlt: "Portrait of Ahmed Akram",
  },
  contact: {
    eyebrow: "Available for ambitious systems",
    title: "Bring the hard problem.",
    intro: "Tell me what you're building, what's getting in the way, and your timeline. We can start with an AI architecture review, an automation workflow, or a production system.",
    start: "Start a conversation",
    emailLabel: "Email about your project ↗",
    emailSubject: "Project inquiry",
    mobile: "Mobile",
    whatsapp: "WhatsApp",
    whatsappText: "Hi Akram, I saw your portfolio and I'd like to talk about a project.",
    socialsTitle: "Find me online",
    location: "Dubai, UAE",
    tagline: ["AI systems.", "Enterprise discipline."],
    form: {
      title: "Tell me about your project",
      note: "Share a little context and I'll reply by email. Prefer to write directly?",
      noteLink: "Email me",
      noscript: "Please email me directly to discuss your project.",
      unavailable: "The form is unavailable at the moment. Please",
      unavailableLink: "email me directly",
      name: "Your name",
      email: "Email address",
      project: "Your project",
      placeholder: "What are you building, and where do you need help?",
      send: "Send message",
      sending: "Sending…",
      sent: "Your message has been sent. Thank you for getting in touch.",
      failed: "Unable to send your message. Please try again or email me directly.",
      offline: "Unable to send your message right now. Please try again or email me directly.",
      aria: "Project inquiry",
    },
  },
  footer: { made: "Designed and engineered in Dubai", top: "Back to top ↑" },
};

const ar: PortfolioCopy = {
  locale: "ar",
  dir: "rtl",
  meta: {
    title: "أعمالي | أحمد أكرم",
    description: "بورتفوليو أحمد أكرم: معمارية الذكاء الاصطناعي، أنظمة الوكلاء، MLOps، ومشاريع اتسلّمت.",
  },
  nav: {
    links: [
      { href: "/ar", label: "الرئيسية" },
      { href: "/ar/services", label: "الخدمات" },
      { href: "/ar/portfolio", label: "أعمالي" },
      { href: "/lab", label: "المعمل" },
      { href: "/guides", label: "الأدلة" },
      { href: "/ar/portfolio#contact", label: "تواصل" },
    ],
    talk: "يلا نتكلم",
    talkHref: "/ar/portfolio#contact",
    home: "/ar",
    switchLabel: "English",
    switchHref: "/portfolio",
    switchLang: "en",
    menu: "افتح القائمة",
    close: "إغلاق",
  },
  hero: {
    label: "أعمال مختارة / بورتفوليو الأنظمة",
    name: "أحمد أكرم",
    role: ["مهندس حلول ذكاء اصطناعي", "معماري أنظمة", "دبي، الإمارات"],
    lead: "بصمم وبسلّم",
    words: ["برمجيات", "وكلاء AI", "أنظمة LLM", "معمارية", "بنية سحابية"],
    srWords: "برمجيات، وكلاء ذكاء اصطناعي، أنظمة LLM، معمارية أنظمة، وبنية سحابية.",
    summary: "من أتمتة الـ AI لحد منصات الإنتاج، بساعد الفرق تصمم وتبني وتشغّل برمجيات يقدروا يعتمدوا عليها.",
    primary: "كلمني عن مشروعك",
    secondary: "شوف الشغل",
    status: "متاح لمشاريع مختارة",
    scroll: "انزل لتحت ↓",
    socialsLabel: "تابعني",
  },
  proof: [
    { value: "+١٤", label: ["سنة في بناء", "أنظمة برمجية"] },
    { value: "ملايين", label: ["مستخدمين على", "منصات شركات كبيرة"] },
    { value: "٤", label: ["مزودي LLM", "شغالين مع بعض"] },
    { value: "دبي", label: ["مقيم في دبي.", "وبشتغل مع العالم."] },
  ],
  portal: {
    eyebrow: "اختار نظام",
    cards: [
      { kind: "architecture", href: "/architecture", code: "SYSTEM / 01", title: "المعمارية", text: "تشغيل الوكلاء، دورة حياة الموديلات، الهوية، الـ APIs، والقرارات اللي وراهم.", cta: "ادخل ↗" },
      { kind: "lab", href: "/lab", code: "SYSTEM / 02", title: "معمل الـ AI", subtitle: "ومشاريع اتسلّمت", text: "تجارب مفتوحة، أنظمة وكلاء، أدوات MLOps، وأرشيف لشغل اتسلّم.", cta: "ادخل المعمل ↗" },
      { kind: "guides", href: "/guides", code: "SYSTEM / 03", title: "الأدلة", subtitle: "وملاحظات الشغل", text: "تكلفة الموديلات، الوكلاء، MLOps وأمان الـ AI، مكتوبة بالأرقام والأوامر والمصادر.", cta: "اقرا الأدلة ↗" },
    ],
  },
  statement: {
    eyebrow: "مبدأ الشغل",
    quote: "الـ AI مش هو الميزة.",
    quoteEnd: "الميزة هي النظام اللي حواليه.",
    note: "الموديلات بتتغير، والمزودين بيتغيروا، لكن متطلبات الإنتاج مبتتغيرش. أنا بصمم التنسيق والتقييم والأمان والمراقبة والأساسات اللي تخلّي الـ AI يصمد في الواقع.",
  },
  about: {
    caption: "أحمد أكرم / دبي، الإمارات",
    eyebrow: "مهندس / معماري / مدرّب",
    title: "اتعلمت الأنظمة قبل ما أتعلم البرمجة.",
    lead: "الهندسة المدنية والخدمة العسكرية جم الأول. بعدها اتنقلت للبرمجة بمجهودي، واشتغلت senior engineer على منصات شركات كبيرة، والنهارده بشتغل على أنظمة AI عملية.",
    text: "الطريق ده شكّل طريقة شغلي: افهم الحمل، خلّي التنازلات واضحة، وصمم عشان التشغيل مش عشان العرض. بدرّب مهندسين جداد، وبعرف أتكلم بسهولة مع الفرق التقنية وأصحاب البيزنس.",
    facts: ["AWS Solutions Architect Associate", "بكالوريوس علوم حاسب، جاري"],
    npm: "باكدج منشورة على npm ↗",
    portraitAlt: "صورة أحمد أكرم",
  },
  contact: {
    eyebrow: "متاح للمشاريع الطموحة",
    title: "هات المشكلة الصعبة.",
    intro: "احكيلي بتبني إيه، وإيه اللي واقف قدامك، ومحتاجه إمتى. نقدر نبدأ بمراجعة معمارية AI، أو أتمتة، أو نظام إنتاج كامل.",
    start: "ابدأ الكلام",
    emailLabel: "ابعتلي إيميل عن مشروعك ↗",
    emailSubject: "استفسار عن مشروع",
    mobile: "موبايل",
    whatsapp: "واتساب",
    whatsappText: "أهلاً يا أكرم، شفت البورتفوليو بتاعك وحابب أتكلم معاك عن مشروع.",
    socialsTitle: "تابعني",
    location: "دبي، الإمارات",
    tagline: ["أنظمة AI.", "بانضباط الشركات الكبيرة."],
    form: {
      title: "احكيلي عن مشروعك",
      note: "اكتب شوية تفاصيل وهرد عليك بالإيميل. تحب تكتبلي على طول؟",
      noteLink: "ابعتلي إيميل",
      noscript: "ابعتلي إيميل على طول عشان نتكلم عن مشروعك.",
      unavailable: "الفورم مش شغال دلوقتي.",
      unavailableLink: "ابعتلي إيميل على طول",
      name: "اسمك",
      email: "الإيميل",
      project: "مشروعك",
      placeholder: "بتبني إيه، ومحتاج مساعدة في إيه؟",
      send: "ابعت الرسالة",
      sending: "بيتبعت…",
      sent: "رسالتك وصلت. شكراً إنك كلمتني.",
      failed: "الرسالة متبعتتش. جرّب تاني أو ابعتلي إيميل على طول.",
      offline: "مش قادر أبعت الرسالة دلوقتي. جرّب تاني أو ابعتلي إيميل على طول.",
      aria: "استفسار عن مشروع",
    },
  },
  footer: { made: "اتصمم واتبنى في دبي", top: "لفوق ↑" },
};

export const portfolioCopy: Record<Locale, PortfolioCopy> = { en, ar };
