export type Locale = "tr" | "en";

export const translations = {
  tr: {
    nav: {
      about: "//neler_yapıyorum",
      projects: "//projeler",
      github: "//github",
      contact: "//iletişim",
    },
    hero: {
      portfolio: "//portfolio",
      location: "Kuzey Kıbrıs",
      role: "// bilgisayar mühendisi",
      bio: "Doğu Akdeniz Üniversitesi Bilgisayar Mühendisliği bölümünden mezun oldum. Web teknolojileri, yapay zekâ ve yazılım geliştirme alanlarıyla ilgileniyorum. React ve Next.js başta olmak üzere farklı teknolojiler kullanarak projeler geliştiriyor, yeni araçlar ve yaklaşımlar öğrenerek kendimi geliştirmeye devam ediyorum.",
      btnProjects: "//projeler",
      btnCv: "//cv_indir",
    },
    about: {
      title: "//neler_yapıyorum",
      fullstack: "Fullstack Geliştirme",
      fullstackDesc:
        "React, Next.js, Node.js ve TypeScript ile baştan sona web uygulamaları geliştiriyorum. Veritabanı tasarımı, API geliştirme ve bulut altyapısı konularında deneyimim var.",
      gameDev: "Oyun Geliştirme",
      gameDevDesc:
        "Unity ve C# ile oyunlar yapıyorum. Birden fazla game jam'e katıldım, Google Play Store'da yayınlanmış oyunlarım var.",
      freelance: "Freelance & Tasarım",
      freelanceDesc:
        "Müşteriler için modern, duyarlı ve kullanıcı dostu web siteleri tasarlıyor ve geliştiriyorum. Temiz arayüz ve iyi UX benim önceliğim.",
      awardsTitle: "//ödüller",
    },
    projects: {
      title: "//projeler",
      web: "web",
      games: "oyunlar",
      moreOnGithub: "//githubda_daha_fazla",
    },
    footer: {
      contact: "//iletişim",
      copyright: "gorkem.dev",
    },
  },
  en: {
    nav: {
      about: "//what_i_do",
      projects: "//projects",
      github: "//github",
      contact: "//contact",
    },
    hero: {
      portfolio: "//portfolio",
      location: "based in North Cyprus",
      role: "// computer engineer",
      bio: "I graduated from Eastern Mediterranean University, Department of Computer Engineering. I'm interested in web technologies, artificial intelligence, and software development. I build projects using various technologies, primarily React and Next.js, and continue to grow by learning new tools and approaches.",
      btnProjects: "//projects",
      btnCv: "//download_cv",
    },
    about: {
      title: "//what_i_do",
      fullstack: "Fullstack Development",
      fullstackDesc:
        "I build web applications end-to-end with React, Next.js, Node.js, and TypeScript. Comfortable with databases, REST APIs, and cloud infrastructure.",
      gameDev: "Game Development",
      gameDevDesc:
        "Making games with Unity and C#. I've joined multiple game jams and have published titles on Google Play Store.",
      freelance: "Freelance & Design",
      freelanceDesc:
        "I design and develop modern, responsive websites for clients. Clean UI and solid UX are always my priority.",
      awardsTitle: "//awards",
    },
    projects: {
      title: "//projects",
      web: "web",
      games: "games",
      moreOnGithub: "//more_on_github",
    },
    footer: {
      contact: "//contact",
      copyright: "gorkem.dev",
    },
  },
} as const;
