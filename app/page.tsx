"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CustomCursor } from "@/components/custom-cursor";
import { useTheme } from "next-themes";
import SplitText from "@/components/SplitText";
import LetterGlitch from "@/components/LetterGlitch";
import LiquidChrome from "@/components/LiquidChrome";
import dynamic from "next/dynamic";
import {
  Github,
  Globe,
  Linkedin,
  Mail,
  Code,
  Gamepad2,
  ChevronRight,
  Download,
  ArrowDown,
} from "lucide-react";
import { ProjectSlider } from "@/components/project-slider"; // Import ProjectSlider component
import { Analytics } from "@vercel/analytics/react";


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
  };

  type ProjectCategory = "web" | "freelance" | "games";
  type SectionId = "hero" | "projects";

  type Project = {
    title: string;
    description: string;
    tags: string[];
    image: string;
    liveUrl?: string;
    repoUrl?: string;
    isActive?: boolean;
  };

  // Project data
  const projects: Record<ProjectCategory, Project[]> = {
    web: [
      {
        title: "Jobsyne - AI Powered Job Matching App",
        description:
          "A SaaS platform for job matching with AI-powered recommendations. Features include user authentication, real-time notifications, and a responsive UI. Built with Next.js, Supabase, and Stripe integration for payments.",
        tags: [
          "Next.js",
          "Stripe",
          "Tailwind",
          "React",
          "Typescript",
          "Supabase",
          "GeminiAPI",
        ],
        image:
          "https://github.com/Gorcc/cdn/blob/main/port-cdn/jobsyne.png?raw=true",
        liveUrl: "https://www.jobsyne.com/",
        repoUrl: "https://github.com/Gorcc/jobsyne",
        isActive: true,
      },
      {
        title: "Vyral - Video Sharing Platform",
        description:
          "A video sharing platform with user authentication, video upload, comments, and likes. Includes video player controls, user profiles, and a recommendation system. Built as a graduation project that won the best project award.",
        tags: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "React"],
        image:
          "https://github.com/Gorcc/cdn/blob/main/port-cdn/ScreenShot%20Tool%20-20250522142421.png?raw=true",
        liveUrl: "vyral-six.vercel.app",
        repoUrl: "https://github.com/Gorcc/vyral",
        isActive: true,
      },
      {
        title: "Social Media App",
        description:
          "A social media platform with real-time chat, image sharing, and post creation. Features include user authentication, direct messaging, and real-time updates. Built with Next.js and Supabase for real-time functionality.",
        tags: ["Next.js", "React", "Supabase", "Tailwind", "TypeScript"],
        image:
          "https://github.com/Gorcc/cdn/blob/main/port-cdn/ScreenShot%20Tool%20-20250522015936.png?raw=true",
        liveUrl: "https://social-app-xi-hazel.vercel.app",
        repoUrl: "https://github.com/Gorcc/socialmedia",
        isActive: true,
      },
      {
        title: "Almego Studio",
        description:
          "A creative agency website with smooth animations and responsive design. Features a portfolio showcase and service information. Built with React and Framer Motion for smooth transitions.",
        tags: ["React", "Framer Motion", "Tailwind"],
        image:
          "https://github.com/Gorcc/cdn/blob/main/port-cdn/ScreenShot%20Tool%20-20250522024034.png?raw=true",
        liveUrl: "https://www.almego.studio/",
        isActive: true,
      },
    ],
    freelance: [
      {
        title: "Hive Records",
        description: "Custom website development & design for a record label.",
        tags: ["React", "SASS", "JavaScript"],
        image:
          "https://github.com/Gorcc/cdn/blob/main/port-cdn/ScreenShot%20Tool%20-20250522025100.png?raw=true",
        liveUrl: "https://www.hiverecords24.com",
        repoUrl: "https://github.com/Gorcc/studio-website",
        isActive: true,
      },
      {
        title: "Team Sly",
        description: "Freelance work, for a GTA V racing team",
        tags: ["React"],
        image:
          "https://github.com/Gorcc/cdn/blob/main/port-site/sly.png?raw=true",
        repoUrl: "https://github.com/Gorcc/sly-team",
        isActive: true,
      },
      {
        title: "Avengers GYM",
        description: "Designed and developed a website for a local GYM",
        tags: ["React"],
        image:
          "https://github.com/Gorcc/cdn/blob/main/port-cdn/ScreenShot%20Tool%20-20250522032831.png?raw=true",
        isActive: true,
      },
    ],
    games: [
      {
        title: "Heat Keeper",
        description:
          "A 3D blacksmithing game with crafting mechanics and resource management. Built for Winter Jam 2025 EMU as part of a three-person team.",
        tags: ["Unity", "C#"],
        image:
          "https://github.com/Gorcc/cdn/blob/main/port-cdn/heatkeeper.png?raw=true",
        isActive: true,
      },
      {
        title: "Unnamed Fishing RPG - Ongoing",
        description:
          "A fishing RPG in development with fishing mechanics and character progression. Features an open world and dynamic weather systems. Currently being developed with a team of four.",
        tags: ["Unity", "C#"],
        image:
          "https://github.com/Gorcc/cdn/blob/main/port-cdn/fishgame.png?raw=true",
        isActive: true,
      },
      {
        title: "Crazy Highway!",
        description: "A 3D Mobile Taxi game, published on Google Play Store",
        tags: ["Unity", "C#"],
        image:
          "https://github.com/Gorcc/cdn/blob/main/port-site/crazyhighway.png?raw=true",
        liveUrl: "https://gorcc.itch.io/crazy-highway",
        isActive: true,
      },
    ],
  };

  // Skills data with proficiency levels
  const techStack = [
    { name: "React", icon: "/tech/react-svgrepo-com.svg" },
    { name: "Next.js", icon: "/tech/next-dot-js-svgrepo-com.svg" },
    { name: "TypeScript", icon: "/tech/typescript-icon-svgrepo-com.svg" },
    { name: "JavaScript", icon: "/tech/js-svgrepo-com.svg" },
    { name: "Node.js", icon: "/tech/node-js-svgrepo-com.svg" },
    { name: "HTML5", icon: "/tech/html-5-svgrepo-com.svg" },
    { name: "CSS3", icon: "/tech/css-3-svgrepo-com.svg" },
    { name: "Tailwind", icon: "/tech/tailwind-svgrepo-com.svg" },
    { name: "Unity", icon: "/tech/unity-svgrepo-com.svg" },
    { name: "C#", icon: "/tech/csharp-svgrepo-com.svg" },
    { name: "MongoDB", icon: "/tech/mongodb-svgrepo-com.svg" },
    { name: "SQL", icon: "/tech/sql-svgrepo-com.svg" },
    { name: "Git", icon: "/tech/git-svgrepo-com.svg" },
  ];

  // Intersection Observer to detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
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

  // Scroll to section
  const scrollToSection = (sectionId: SectionId) => {
    sectionRefs[sectionId].current?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper to get subtitle
  const getProjectSubtitle = (project: Project) => {
    if (project.isActive === false) return "Inactive";
    if (project.repoUrl && !project.liveUrl) return "Contributor";
    if (project.liveUrl && project.isActive) return "On Development";
    return "";
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-background/80 border border-border rounded-2xl shadow-lg p-0 flex flex-col overflow-hidden relative group hover:shadow-xl transition-shadow min-h-[340px]"
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        {!project.isActive && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-xs px-3 py-1">
              Currently Inactive
            </Badge>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between p-5">
        <div>
          <h3 className="font-semibold text-lg mb-1 text-white flex items-center gap-2">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {project.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <Badge key={tagIndex} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            {project.repoUrl && (
              <Button
                size="icon"
                variant="outline"
                asChild
                className="rounded-full"
              >
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Code className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button
                size="icon"
                variant="outline"
                asChild
                className="rounded-full"
              >
                <a
                  href={
                    project.liveUrl.startsWith("http")
                      ? project.liveUrl
                      : `https://${project.liveUrl}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ProjectGrid = ({ projects }: { projects: Project[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );

  // TechStackCarousel component
  function TechStackCarousel({
    techStack,
  }: {
    techStack: { name: string; icon: string }[];
  }) {
    const [x, setX] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const speed = 0.5; // px per frame
    const iconWidth = 120; // px (should match min-w/max-w)
    const totalIcons = techStack.length * 2; // doubled for seamless loop

    useEffect(() => {
      let animationId: number;
      const animate = () => {
        setX((prev) => {
          // Reset when scrolled past half (original list)
          if (Math.abs(prev) >= techStack.length * iconWidth) {
            return 0;
          }
          return prev - speed;
        });
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }, [techStack.length]);

    // Duplicate the array for seamless looping
    const displayStack = [...techStack, ...techStack];

    return (
      <div className="w-full overflow-hidden" ref={containerRef}>
        <motion.div className="flex gap-8" style={{ x }}>
          {displayStack.map((tech, i) => (
            <div
              key={i + tech.name}
              className="flex flex-col items-center min-w-[100px] max-w-[120px]"
            >
              <div className="bg-white/80 dark:bg-white/20 rounded-xl flex items-center justify-center w-14 h-14 mb-2 shadow-sm">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Analytics />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            gorkem.dev
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm font-medium ${
                  activeSection === "hero"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => scrollToSection("hero")}
              >
                About Me
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm font-medium ${
                  activeSection === "projects"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => scrollToSection("projects")}
              >
                Projects
              </motion.button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Combined Hero & About Section */}
      <section
        id="hero"
        ref={sectionRefs.hero}
        className="min-h-screen pt-20 flex flex-col justify-center relative overflow-hidden"
      >
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <div className="relative mx-auto max-w-md">
                {/* That's me arrow and text */}

                {/* LiquidChrome background */}
                <div
                  className="absolute inset-0 flex items-center justify-center z-0"
                  style={{ transform: "scale(1.15)" }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "600px",
                      position: "relative",
                    }}
                  >
                   
                  </div>
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden border-4 border-background shadow-xl relative z-10">
                  <img
                    src="profileimage.jpg"
                    alt="Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-3 scale-95 -z-10" />

                {/* Social links */}
                <div className="flex justify-center gap-4 mt-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full"
                      asChild
                    >
                      <a
                        href="https://github.com/Gorcc"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full"
                      asChild
                    >
                      <a
                        href="https://www.linkedin.com/in/gorkemater/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full"
                      asChild
                    >
                      <a href="mailto:gorkem.ater1@gmail.com">
                        <Mail className="h-5 w-5" />
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Text Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 md:order-2 text-center md:text-left"
            >
              <Badge variant="outline" className="mb-4 px-4 py-1 text-sm">
                Computer Engineer
              </Badge>
              <Badge variant="outline" className="mb-4 px-4 py-1 text-sm">
                Software Developer
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <SplitText
                  text="Hi, I'm Deniz Görkem!"
                  className="text-5xl font-semibold text-center"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                />
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                4th year Computer Engineering student studying in North Cyprus.
                I am passionate about Software Development and worked mostly on
                Front-end (React) and Game Development. I'm also familliar with
                backend technologies technologies like Node.js and C#.
              </p>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
                <TechStackCarousel techStack={techStack} />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" onClick={() => scrollToSection("projects")}>
                    View My Work <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href="https://github.com/Gorcc/cdn/blob/main/port-cdn/DenizG%C3%B6rkem-CV.pdf?raw=true"
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" /> Download Resume
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-4 md:bottom-8 -translate-x-1/2 hidden md:flex flex-col items-center w-full px-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <span className="text-xs md:text-sm text-muted-foreground mb-2 text-center w-full">
            Scroll to see my projects
          </span>
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={sectionRefs.projects}
        className="min-h-screen py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Here's some of my projects.
            </p>
          </motion.div>

          <Tabs defaultValue="web" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="web" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Web
                </TabsTrigger>
                <TabsTrigger
                  value="freelance"
                  className="flex items-center gap-2"
                >
                  <Code className="h-4 w-4" /> Freelance
                </TabsTrigger>
                <TabsTrigger value="games" className="flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4" /> Games
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Web Projects */}
            <TabsContent value="web">
              <ProjectGrid projects={projects.web} />
            </TabsContent>

            {/* Freelance Projects */}
            <TabsContent value="freelance">
              <ProjectGrid projects={projects.freelance} />
            </TabsContent>

            {/* Game Projects */}
            <TabsContent value="games">
              <ProjectGrid projects={projects.games} />
            </TabsContent>
          </Tabs>
          <div className="flex justify-center mt-10">
            <Button
              size="lg"
              asChild
              className="px-8 py-4 text-lg font-semibold"
            >
              <a
                href="https://github.com/Gorcc?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                More Projects on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Certificates & Awards Section */}

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Deniz Görkem. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button size="icon" variant="ghost" asChild>
              <a
                href="https://github.com/Gorcc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <a
                href="https://www.linkedin.com/in/gorkemater/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <a href="mailto:gorkem.ater1@gmail.com">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ThatsMeArrow() {
  const { theme, systemTheme } = useTheme();
  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const isDark = resolvedTheme === "dark";
  return (
    <div
      className="absolute -top-11 left-1/2 flex flex-col items-center select-none"
      style={{
        transform: "translateX(-40%)",
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      <img
        src={"/thatsme-black.png"}
        alt="That's me arrow"
        className="w-40 md:w-56 -rotate-12"
        style={{ transform: "rotate(-18deg)" }}
        draggable="false"
      />
    </div>
  );
}
