"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Github,
  Globe,
  Linkedin,
  Mail,
  Phone,
  Gamepad2,
  Download,
  ArrowRight,
  Trophy,
} from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import { translations, type Locale } from "@/lib/translations";

type ProjectCategory = "web" | "games";
type SectionId = "hero" | "about" | "projects";

type Project = {
  title: string;
  description: Record<Locale, string>;
  tags: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  isActive?: boolean;
  customContent?: React.ReactNode;
};

const projects: Record<ProjectCategory, Project[]> = {
  web: [
    {
      title: "Soliv",
      description: {
        tr: "Tam donanımlı admin paneli, kick API entegrasyonu ve Discord botu içeren oyun sunucusu platformu. İlk haftasında 1.000+ ziyaret ve 150+ kayıtlı üyeye ulaştı.",
        en: "Game server platform with a full-featured admin panel, kick API integration, and Discord bot. Reached 1,000+ visits in its first week with 150+ registered members.",
      },
      tags: ["Next.js", "React", "Tailwind", "Node.js", "Discord.js"],
      image:
        "https://github.com/Gorcc/cdn/blob/main/port-cdn/soliv.png?raw=true",
      liveUrl: "https://soliv.tr",
      isActive: true,
    },
    {
      title: "Pundex",
      description: {
        tr: "Kıbrıs merkezli bir kripto para alım-satım mağazası için frontend geliştirme. Modern ve responsive arayüzüyle aylık 100+ tıklama alıyor.",
        en: "Frontend development for a Cyprus-based cryptocurrency exchange store. Modern, responsive interface with 100+ monthly visits.",
      },
      tags: ["Next.js", "React", "Tailwind", "TypeScript"],
      image:
        "https://github.com/Gorcc/cdn/blob/main/port-cdn/pundex-img.png?raw=true",
      liveUrl: "https://www.pundexcy.com",
      isActive: true,
    },
    {
      title: "Pexah.io",
      description: {
        tr: "Dubai merkezli bir kripto para alım-satım şirketi için frontend geliştirme. Temiz UX odaklı, modern ve responsive arayüz.",
        en: "Frontend development for a Dubai-based cryptocurrency trading company. Clean, modern interface with a focus on user experience.",
      },
      tags: ["Next.js", "React", "Tailwind", "TypeScript"],
      image: "/pexah.png",
      liveUrl: "https://pexah.io",
      isActive: true,
    },
    {
      title: "Hive Records",
      description: {
        tr: "Kıbrıs merkezli bir plak şirketi için özel web sitesi tasarımı ve geliştirmesi. Dinamik içerik yönetimi ve responsive tasarım.",
        en: "Custom website design and development for a Cyprus-based record label with dynamic content and responsive layout.",
      },
      tags: ["React", "SCSS", "JavaScript"],
      image:
        "https://github.com/Gorcc/cdn/blob/main/port-cdn/ScreenShot%20Tool%20-20250522025100.png?raw=true",
      liveUrl: "https://www.hiverecords24.com",
      repoUrl: "https://github.com/Gorcc/studio-website",
      isActive: true,
    },
    {
      title: "Jobsyne",
      description: {
        tr: "Yapay zeka destekli iş eşleştirme SaaS platformu. Kimlik doğrulama, gerçek zamanlı bildirimler ve Stripe ödeme entegrasyonu içerir.",
        en: "AI-powered job matching SaaS platform with authentication, real-time notifications, and Stripe payment integration.",
      },
      tags: ["Next.js", "Supabase", "Stripe", "TypeScript", "GeminiAPI"],
      image:
        "https://github.com/Gorcc/cdn/blob/main/port-cdn/jobsyne.png?raw=true",
      liveUrl: "https://www.jobsyne.com/",
      repoUrl: "https://github.com/Gorcc/jobsyne",
      isActive: true,
    },
    {
      title: "Almego Studio",
      description: {
        tr: "Akıcı animasyonlar ve responsive tasarıma sahip kreatif ajans web sitesi.",
        en: "Creative agency website with smooth animations and responsive design.",
      },
      tags: ["React", "Framer Motion", "Tailwind"],
      image:
        "https://github.com/Gorcc/cdn/blob/main/port-cdn/ScreenShot%20Tool%20-20250522024034.png?raw=true",
      liveUrl: "https://www.almego.studio/",
      isActive: true,
    },
    {
      title: "Social Media App",
      description: {
        tr: "Sohbet, görsel paylaşım ve direkt mesajlaşma özellikli gerçek zamanlı sosyal platform.",
        en: "Real-time social platform with chat, image sharing, and direct messaging.",
      },
      tags: ["Next.js", "Supabase", "TypeScript"],
      image:
        "https://github.com/Gorcc/cdn/blob/main/port-cdn/ScreenShot%20Tool%20-20250522015936.png?raw=true",
      liveUrl: "https://social-app-xi-hazel.vercel.app",
      repoUrl: "https://github.com/Gorcc/socialmedia",
      isActive: true,
    },
    {
      title: "KOROEN Enerji Dergisi",
      description: {
        tr: "Enerji teknolojileri ve sürdürülebilirlik odağındaki akademik çalışmaları; teknik analiz, özet ve uzman değerlendirmeleriyle derleyip Türkçe olarak erişilebilir ve bağımsız bir şekilde sunan dergi / yayın koleksiyonu.",
        en: "An independent Turkish publication that curates academic work on energy technologies and sustainability with technical analyses, summaries, and expert commentary.",
      },
      tags: ["Next.js", "React", "Tailwind"],
      image:
        "https://github.com/Gorcc/cdn/blob/main/port-cdn/koroen.png?raw=true",
      liveUrl: "https://www.koroenenerji.com",
      isActive: true,
    },
    {
      title: "MillerSan",
      description: {
        tr: "Bionluk üzerinden alınan freelance web projesi. GSAP animasyonlarıyla zenginleştirilmiş modern tasarım.",
        en: "Freelance web project via Bionluk with GSAP-powered animations and modern design.",
      },
      tags: ["React", "JavaScript", "GSAP"],
      image: "/millersan.png",
      liveUrl: "https://millersan-test.vercel.app",
      isActive: true,
    },
  ],
  games: [
    {
      title: "Heat Keeper",
      description: {
        tr: "Zanaat mekaniğine sahip 3D demircilik oyunu. EMU Winter Jam 2025 için geliştirildi.",
        en: "3D blacksmithing game with crafting mechanics. Built for EMU Winter Jam 2025.",
      },
      tags: ["Unity", "C#", "Game Jam"],
      image:
        "https://github.com/Gorcc/cdn/blob/main/port-cdn/heatkeeper.png?raw=true",
      isActive: true,
    },
    {
      title: "Delicate Cargo",
      description: {
        tr: "3D aksiyon oyunu — EMU Summer Game Jam birincilik ödülü.",
        en: "3D action game — EMU Summer Game Jam first place winner.",
      },
      tags: ["Unity", "C#", "Game Jam Winner"],
      image: "/cargo.png",
      liveUrl: "https://gorcc.itch.io/delicate-cargo",
      isActive: true,
    },
    {
      title: "Game Dev Certificate Projects",
      description: {
        tr: "Oyun geliştirme tekniklerini öğrenmek için çeşitli popüler oyunların klonlanması.",
        en: "Cloned several high-grossing games to master game development techniques.",
      },
      tags: ["Unity", "C#", "Game Development"],
      image: undefined,
      isActive: true,
      customContent: (
        <iframe
          src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:6981244864432599040?compact=1"
          height="284"
          width="100%"
          frameBorder="0"
          allowFullScreen
          title="LinkedIn Post"
          className="w-full"
        />
      ),
    },
    {
      title: "Unnamed Fishing RPG",
      description: {
        tr: "Açık dünya ve dinamik hava sistemiyle geliştirme aşamasındaki balıkçılık RPG'si.",
        en: "Fishing RPG in development with open world and dynamic weather.",
      },
      tags: ["Unity", "C#", "In Development"],
      image:
        "https://github.com/Gorcc/cdn/blob/main/port-cdn/fishgame.png?raw=true",
      isActive: true,
    },
    {
      title: "Crazy Highway!",
      description: {
        tr: "Google Play Store'da yayınlanan 3D mobil taksi oyunu.",
        en: "3D mobile taxi game, published on Google Play Store.",
      },
      tags: ["Unity", "C#", "Mobile"],
      image:
        "https://github.com/Gorcc/cdn/blob/main/port-site/crazyhighway.png?raw=true",
      liveUrl: "https://gorcc.itch.io/crazy-highway",
      isActive: true,
    },
  ],
};

const awards = [
  { title: "Jotform Best Product Project", icon: "🏆" },
  { title: "EMU Best Graduation Project", icon: "🎓" },
  { title: "EMU Summer Game Jam 1st", icon: "🥇" },
  { title: "EMU Vault Game Jam 2nd", icon: "🥈" },
];

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind",
  "Unity",
  "C#",
  "MongoDB",
  "SQL",
  "Git",
];

const LOCALE_KEY = "gorkem-dev-locale";

export default function Portfolio() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [activeSection, setActiveSection] = useState("hero");
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (stored === "tr" || stored === "en") setLocale(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
    document.documentElement.lang = locale === "tr" ? "tr" : "en";
  }, [locale]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs).forEach(
      (ref) => ref.current && observer.observe(ref.current)
    );

    return () => {
      Object.values(sectionRefs).forEach(
        (ref) => ref.current && observer.unobserve(ref.current)
      );
    };
  }, []);

  const t = translations[locale];

  const scrollToSection = (sectionId: SectionId) => {
    sectionRefs[sectionId].current?.scrollIntoView({ behavior: "smooth" });
  };

  const ProjectShowcase = ({
    project,
    index,
    isEven,
  }: {
    project: Project;
    index: number;
    isEven: boolean;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="group py-12 first:pt-0 last:pb-0"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
          isEven ? "" : "lg:direction-rtl"
        }`}
      >
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={isEven ? "lg:order-1" : "lg:order-2"}
        >
          {project.customContent ? (
            <div className="w-full rounded-lg overflow-hidden border border-border bg-card p-4">
              {project.customContent}
            </div>
          ) : project.image ? (
            <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-border bg-muted">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  if (target.parentElement) {
                    target.parentElement.classList.add(
                      "flex",
                      "items-center",
                      "justify-center"
                    );
                    const placeholder = document.createElement("span");
                    placeholder.className =
                      "font-mono text-sm text-muted-foreground";
                    placeholder.textContent = `// ${project.title.toLowerCase()}`;
                    target.parentElement.appendChild(placeholder);
                  }
                }}
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-muted rounded-lg border border-border flex items-center justify-center">
              <span className="font-mono text-sm text-muted-foreground">
                {"// " + project.title.toLowerCase()}
              </span>
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={isEven ? "lg:order-2" : "lg:order-1"}
        >
          <span className="font-mono text-xs text-muted-foreground block mb-3">
            // {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {project.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-5">
            {project.description[locale]}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="font-mono text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={
                  project.liveUrl.startsWith("http")
                    ? project.liveUrl
                    : `https://${project.liveUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs bg-foreground text-background px-4 py-2 rounded hover:opacity-90 transition-opacity"
              >
                <Globe className="h-3.5 w-3.5" /> Live
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs border border-border px-4 py-2 rounded hover:border-foreground/30 transition-colors"
              >
                <Github className="h-3.5 w-3.5" /> Code
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Analytics />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => scrollToSection("hero")}
            className="font-mono text-sm tracking-tight hover:text-foreground transition-colors"
          >
            {"<gorkem.dev>"}
          </button>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-5">
              <button
                onClick={() => scrollToSection("about")}
                className={`font-mono text-xs transition-colors ${
                  activeSection === "about"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className={`font-mono text-xs transition-colors ${
                  activeSection === "projects"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.nav.projects}
              </button>
              <a
                href="https://github.com/Gorcc"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.github}
              </a>
              <a
                href="mailto:gorkem.ater1@gmail.com"
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.contact}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="font-mono text-xs flex gap-1">
                <button
                  onClick={() => setLocale("tr")}
                  className={`px-2 py-1 rounded transition-colors ${
                    locale === "tr"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  TR
                </button>
                <button
                  onClick={() => setLocale("en")}
                  className={`px-2 py-1 rounded transition-colors ${
                    locale === "en"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  EN
                </button>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="hero"
        ref={sectionRefs.hero}
        className="min-h-screen flex items-center relative"
      >
        <div className="max-w-5xl mx-auto px-6 py-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border shrink-0">
                <img
                  src="/profileimage.jpg"
                  alt="Deniz Görkem"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-mono text-xs text-muted-foreground block mb-1">
                  {t.hero.portfolio}
                </span>
                <span className="font-mono text-sm text-muted-foreground">
                  {t.hero.location}
                </span>
              </div>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
              {"<Deniz Görkem>"}
            </h1>

            <p className="font-mono text-base sm:text-lg text-muted-foreground mb-4">
              {t.hero.role}
            </p>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-6 leading-relaxed">
              {t.hero.bio}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
              <a
                href="tel:+905338763495"
                className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                0533 876 34 95
              </a>
              <a
                href="mailto:gorkem.ater1@gmail.com"
                className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                gorkem.ater1@gmail.com
              </a>
            </div>

            <div className="font-mono text-xs text-muted-foreground mb-6">
              <span className="text-foreground/40">{"// "}</span>
              {techStack.join(" · ")}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-10">
              {awards.map((award, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground"
                >
                  <Trophy className="h-3 w-3 shrink-0" />
                  {award.title}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="font-mono text-sm"
              >
                {t.hero.btnProjects} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="font-mono text-sm">
                <a
                  href="https://github.com/Gorcc/cdn/blob/main/port-cdn/DenizG%C3%B6rkemAter%20-%20CV.pdf?raw=true"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" /> {t.hero.btnCv}
                </a>
              </Button>
            </div>
          </motion.div>

          <div className="flex gap-4 mt-16">
            <a
              href="https://github.com/Gorcc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/gorkemater/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:gorkem.ater1@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        ref={sectionRefs.about}
        className="py-24 border-t border-border"
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-mono text-sm text-muted-foreground mb-10">
              {t.about.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h3 className="font-display text-lg font-semibold">
                  {t.about.fullstack}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.about.fullstackDesc}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-lg font-semibold">
                  {t.about.gameDev}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.about.gameDevDesc}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-lg font-semibold">
                  {t.about.freelance}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.about.freelanceDesc}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        ref={sectionRefs.projects}
        className="py-24 border-t border-border"
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-mono text-sm text-muted-foreground mb-10">
              {t.projects.title}
            </h2>
          </motion.div>

          <Tabs defaultValue="web" className="w-full">
            <TabsList className="bg-transparent border border-border p-1 mb-14 w-fit">
              <TabsTrigger
                value="web"
                className="font-mono text-xs data-[state=active]:bg-foreground data-[state=active]:text-background rounded-sm px-4"
              >
                <Globe className="h-3.5 w-3.5 mr-1.5" /> {t.projects.web}
              </TabsTrigger>
              <TabsTrigger
                value="games"
                className="font-mono text-xs data-[state=active]:bg-foreground data-[state=active]:text-background rounded-sm px-4"
              >
                <Gamepad2 className="h-3.5 w-3.5 mr-1.5" /> {t.projects.games}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="web">
              <div className="divide-y divide-border">
                {projects.web.map((project, i) => (
                  <ProjectShowcase
                    key={i}
                    project={project}
                    index={i}
                    isEven={i % 2 === 0}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="games">
              <div className="divide-y divide-border">
                {projects.games.map((project, i) => (
                  <ProjectShowcase
                    key={i}
                    project={project}
                    index={i}
                    isEven={i % 2 === 0}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-10">
            <a
              href="https://github.com/Gorcc?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              {t.projects.moreOnGithub} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <span className="font-mono text-sm text-muted-foreground block mb-3">
                {t.footer.contact}
              </span>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href="mailto:gorkem.ater1@gmail.com"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  gorkem.ater1@gmail.com
                </a>
                <a
                  href="tel:+905338763495"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  0533 876 34 95
                </a>
              </div>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://github.com/Gorcc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/gorkemater/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="mailto:gorkem.ater1@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            <p className="font-mono text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
