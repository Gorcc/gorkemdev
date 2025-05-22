"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CustomCursor } from "@/components/custom-cursor";
import { useTheme } from "next-themes";
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

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
  };

  type ProjectCategory = "web" | "freelance" | "games";
  type SectionId = "hero" | "projects";

  // Project data
  const projects = {
    web: [
      {
        title: "Jobsyne - AI Powered Job Matching App",
        description:
          "Fullstack, SaaS app for job matching service.",
        tags: ["Next.js", "Stripe", "Tailwind","React","Typescript","Supabase","GeminiAPI"],
        image: "https://github.com/Gorcc/cdn/blob/main/port-cdn/jobsyne.png?raw=true",
        liveUrl: "https://www.jobsyne.com/",
        repoUrl: "https://github.com/Gorcc/jobsyne",
      },
      // {
      //   title: "Vyral - Video Sharing Platform",
      //   description:
      //     "A YouTube-like video uploading platform built as a graduation project. Won the best graduation project award. Features include video upload, user authentication, comments, and likes.",
      //   tags: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "React"],
      //   image: "/placeholder.svg?height=300&width=500",
      //   liveUrl: "vyral-six.vercel.app",
      //   repoUrl: "https://github.com/Gorcc/vyral",
      // },
      {
        title: "Social Media App",
        description:
          "Analytics dashboard for social media management with real-time data visualization.",
        tags: ["Next.js", "React", "Supabase","Tailwind","TypeScript"],
        image: "https://github.com/Gorcc/cdn/blob/main/port-cdn/ScreenShot%20Tool%20-20250522015936.png?raw=true",
        liveUrl: "https://social-app-xi-hazel.vercel.app",
        repoUrl: "https://github.com/Gorcc/socialmedia",
      },
      {
        title: "Almego Studio",
        description:
          "A creative agency website built to showcase the work of the agency and freelance projects.",
        tags: ["React","Framer Motion","Tailwind"],
        image: "https://github.com/Gorcc/cdn/blob/main/port-cdn/ScreenShot%20Tool%20-20250522024034.png?raw=true",
        liveUrl: "https://www.almego.studio/",
        
      },
    ],
    freelance: [
      {
        title: "Hive Records",
        description:
          "Custom website development  & design for a record label.",
        tags: ["React", "SASS", "JavaScript"],
        image: "https://github.com/Gorcc/cdn/blob/main/port-cdn/ScreenShot%20Tool%20-20250522025100.png?raw=true",
        liveUrl: "https://www.hiverecords24.com",
        repoUrl: "https://github.com/Gorcc/studio-website",
      },
      {
        title: "Team Sly",
        description:
          "Freelance work, for a GTA V racing team",
        tags: ["React"],
        image: "https://github.com/Gorcc/cdn/blob/main/port-site/sly.png?raw=true",
    
        repoUrl: "https://github.com/Gorcc/sly-team",
      },
      {
        title: "Avengers GYM",
        description:
          "Designed and developed a website for a local GYM",
        tags: ["React"],
        image: "https://github.com/Gorcc/cdn/blob/main/port-cdn/ScreenShot%20Tool%20-20250522032831.png?raw=true",
        
      },
     
    ],
    games: [
      {
        title: "Heat Keeper",
        description:
          "3D blacksmithing game, built for Winter Jam 2025 EMU as a part of 3 person team",
        tags: ["Unity", "C#", "Blender"],
        image: "https://github.com/Gorcc/cdn/blob/main/port-cdn/heatkeeper.png?raw=true",
      
      },
      {
        title: "Unnamed Fishing RPG - Ongoing",
        description:
          "Developing a fishing RPG in Unity, as a part of 3 person team",
        tags: ["Unity", "C#"],
        image: "https://github.com/Gorcc/cdn/blob/main/port-cdn/fishgame.png?raw=true",
      },
      {
        title: "Crazy Highway!",
        description:
          "A 3D Mobile Taxi game, published on Google Play Store",
        tags: ["Unity", "C#"],
        image: "https://github.com/Gorcc/cdn/blob/main/port-site/crazyhighway.png?raw=true",
        liveUrl: "https://gorcc.itch.io/crazy-highway",
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

  // Slider controls
  const nextSlide = (category: ProjectCategory) => {
    setCurrentSlide((prev) =>
      prev === projects[category].length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = (category: ProjectCategory) => {
    setCurrentSlide((prev) =>
      prev === 0 ? projects[category].length - 1 : prev - 1
    );
  };

  // Scroll to section
  const scrollToSection = (sectionId: SectionId) => {
    sectionRefs[sectionId].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
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
                <ThatsMeArrow />
                <div className="aspect-square rounded-2xl overflow-hidden border-4 border-background shadow-xl relative z-10">
                  <img
                    src="profile.png"
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
                      <a href="https://github.com/Gorcc" target="_blank" rel="noopener noreferrer">
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
                      <a href="https://www.linkedin.com/in/gorkemater/" target="_blank" rel="noopener noreferrer">
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
                Hi, I'm{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Deniz Görkem
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
             4th year Computer Engineering student
                studying in North Cyprus. I am passionate about Software
                Development and worked mostly on Front-end (React) and Game Development. I'm
                also familliar with backend technologies
                technologies like Node.js and C#.
              </p>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {techStack.map((tech) => (
                    <Badge
                      key={tech.name}
                      variant="secondary"
                      className="px-3 py-1 text-sm flex items-center gap-2"
                    >
                      <img
                        src={tech.icon}
                        alt={`${tech.name} logo`}
                        className="w-4 h-4 object-contain"
                      />
                      {tech.name}
                    </Badge>
                  ))}
                </div>
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
                    <a href="https://github.com/Gorcc/cdn/blob/main/port-cdn/DenizG%C3%B6rkem-CV.pdf?raw=true" download target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" /> Download Resume
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/5"
              initial={{
                x: Math.random() * 100 - 50 + "%",
                y: Math.random() * 100 - 50 + "%",
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                x: [
                  Math.random() * 100 - 50 + "%",
                  Math.random() * 100 - 50 + "%",
                  Math.random() * 100 - 50 + "%",
                ],
                y: [
                  Math.random() * 100 - 50 + "%",
                  Math.random() * 100 - 50 + "%",
                  Math.random() * 100 - 50 + "%",
                ],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{
                width: (i + 1) * 100 + "px",
                height: (i + 1) * 100 + "px",
              }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center w-full px-2"
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
            <Badge variant="outline" className="mb-4 px-4 py-1 text-sm">
              My Work
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured Projects
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              A showcase of my work across web development, freelance projects,
              and game development.
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
              <ProjectSlider
                projects={projects.web}
                currentSlide={currentSlide}
                nextSlide={() => nextSlide("web")}
                prevSlide={() => prevSlide("web")}
              />
            </TabsContent>

            {/* Freelance Projects */}
            <TabsContent value="freelance">
              <ProjectSlider
                projects={projects.freelance}
                currentSlide={currentSlide}
                nextSlide={() => nextSlide("freelance")}
                prevSlide={() => prevSlide("freelance")}
              />
            </TabsContent>

            {/* Game Projects */}
            <TabsContent value="games">
              <ProjectSlider
                projects={projects.games}
                currentSlide={currentSlide}
                nextSlide={() => nextSlide("games")}
                prevSlide={() => prevSlide("games")}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Deniz Görkem. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button size="icon" variant="ghost" asChild>
              <a href="https://github.com/Gorcc" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <a href="https://www.linkedin.com/in/gorkemater/" target="_blank" rel="noopener noreferrer">
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
    <div className="absolute -top-11 left-1/2 flex flex-col items-center select-none" style={{ transform: 'translateX(-40%)', pointerEvents: 'none', zIndex: 20 }}>
      <img
        src={ "/thatsme-black.png"}
        alt="That's me arrow"
        className="w-40 md:w-56 -rotate-12"
        style={{ transform: 'rotate(-18deg)' }}
        draggable="false"
      />
    </div>
  );
}
