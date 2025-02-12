"use client"

import { useState } from "react"
import { DarkModeToggle } from "@/components/profile/DarkModeToggle"
import { PersonalInfo } from "@/components/profile/PersonalInfo"
import { AboutMe } from "@/components/profile/AboutMe"
import { Experience } from "@/components/profile/Experience"
import { Skills } from "@/components/profile/Skills"
import { Education } from "@/components/profile/Education"
import { Projects } from "@/components/profile/Projects"

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const initialPersonalInfo = {
    name: "John Doe",
    title: "Full Stack Developer",
    location: "New York, NY",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  }

  const initialAboutMe =
    "Passionate full-stack developer with 5+ years of experience in building scalable web applications. Proficient in JavaScript, React, Node.js, and cloud technologies. Always eager to learn and apply new technologies to solve complex problems."

  const initialExperience = [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      period: "2020 - Present",
      responsibilities: [
        "Led the development of a high-traffic e-commerce platform",
        "Implemented microservices architecture to improve scalability",
        "Mentored junior developers and conducted code reviews",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "WebSolutions Co.",
      period: "2018 - 2020",
      responsibilities: [
        "Developed and maintained multiple client websites",
        "Implemented responsive designs and improved site performance",
        "Collaborated with design team to create intuitive user interfaces",
      ],
    },
  ]

  const initialSkills = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "Git", "AWS", "Docker"]

  const initialEducation = [
    {
      degree: "Master of Computer Science",
      school: "Stanford University",
      period: "2018-2020",
    },
    {
      degree: "Bachelor of Science in Computer Engineering",
      school: "MIT",
      period: "2014-2018",
    },
  ]

  const initialProjects = [
    {
      name: "E-commerce Platform",
      description: "Full-stack online shopping solution",
      details: [
        "Developed a scalable e-commerce platform using React, Node.js, and MongoDB.",
        "Key features: user authentication, product catalog, shopping cart, and payment integration.",
      ],
    },
    {
      name: "AI-powered Chatbot",
      description: "Intelligent conversational agent",
      details: [
        "Created a chatbot using natural language processing techniques and machine learning algorithms.",
        "Implemented intent recognition, entity extraction, and context management for human-like interactions.",
      ],
    },
    {
      name: "Mobile Fitness App",
      description: "Cross-platform health tracking solution",
      details: [
        "Built a cross-platform mobile app for fitness tracking using React Native and Firebase.",
        "Features include workout planning, progress tracking, and social sharing capabilities.",
      ],
    },
  ]

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="grid gap-8 md:grid-cols-3">
          <aside className="md:col-span-1">
            <PersonalInfo initialInfo={initialPersonalInfo} />
          </aside>
          <main className="md:col-span-2 space-y-6">
            <AboutMe initialAboutMe={initialAboutMe} />
            <Experience initialExperience={initialExperience} />
            <Skills initialSkills={initialSkills} />
            <Education initialEducation={initialEducation} />
            <Projects initialProjects={initialProjects} />
          </main>
        </div>
      </div>
    </div>
  )
}

