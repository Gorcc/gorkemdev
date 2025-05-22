"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

interface Project {
  title: string
  description: string
  tags: string[]
  image: string
  liveUrl?: string
  repoUrl?: string
}

interface ProjectSliderProps {
  projects: Project[]
  currentSlide: number
  nextSlide: () => void
  prevSlide: () => void
}

export const ProjectSlider = ({ projects, currentSlide, nextSlide, prevSlide }: ProjectSliderProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying && !isHovered) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isAutoPlaying, isHovered, nextSlide])

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {projects.map((project: Project, index: number) => (
            <div key={index} className="w-full flex-shrink-0">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="relative">
                  <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-block bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button asChild variant="default">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Version
                        </a>
                      </Button>
                    )}
                    {project.repoUrl && (
                      <Button asChild variant="outline">
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Project
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4">
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={prevSlide}
          className="bg-background/80 border border-primary shadow-lg hover:bg-primary/20 transition-colors"
        >
          <ChevronLeft className="h-8 w-8 text-primary" />
        </Button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4">
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={nextSlide}
          className="bg-background/80 border border-primary shadow-lg hover:bg-primary/20 transition-colors"
        >
          <ChevronRight className="h-8 w-8 text-primary" />
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        {projects.map((_, index: number) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-primary w-4" : "bg-primary/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
