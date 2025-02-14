import {  useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Briefcase, GraduationCap, Mail, MapPin, Moon, Sun, Code, Terminal, Linkedin, Github, Phone } from "lucide-react"

// Add this interface near the top of the file
interface PortfolioData {
  email: string;
  avatar: string | null;
  designation: string;
  location: string;
  fullName: string;
  bio: string;
  mobile: string; // Added mobile field
  skills: string[];
  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    currentlyStudying: boolean;
    _id: string;
  }[];
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    description: string;
    _id: string;
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
    socials: string[];
    repositoryLink: string;
    liveDemoLink: string;
    _id: string;
  }[];
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  // Add dummy data
  const portfolioData: PortfolioData = {
    email: "nilesh@gmail.com",
    avatar: null,
    designation: "Full Stack Developer",
    location: "India",
    fullName: "Nilesh Shinde",
    bio: "I'm nick a full stack web dev.",
    mobile: "+91 1234567890", // Added dummy mobile
    skills: ["js", "ts", "python"],
    education: [{
      institution: "DMS Mandals college of Computer Applications",
      degree: "BCA",
      fieldOfStudy: "Computer Applications",
      startDate: "2021-08-12T18:30:00.000Z",
      endDate: "2024-07-12T18:30:00.000Z",
      currentlyStudying: false,
      _id: "67add9ccc57c56f148191cf5"
    }],
    experience: [{
      company: "infosys",
      position: "junior backend dev",
      startDate: "2024-08-13T09:47:44.565Z",
      endDate: "2025-02-10T09:47:44.565Z",
      currentlyWorking: false,
      description: "my work involved handling and building graphql api's",
      _id: "67add9ccc57c56f148191cf6"
    }],
    projects: [{
      name: "Gen-port ( A Modern Day portfolio maker )",
      description: "A Modern Day portfolio maker with modern UI",
      technologies: ["React.js", "Express.js", "Node.js", "Mongodb"],
      socials: ["https://github.com/Nileshshinde09"],
      repositoryLink: "https://github.com/Nileshshinde09",
      liveDemoLink: "https:",
      _id: "67add9ccc57c56f148191cf7"
    }]
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 },
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-rose-50 to-cyan-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 ${darkMode ? "dark" : ""}`}>
      {/* Floating Background Shapes */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-rose-200/30 dark:bg-rose-900/20 rounded-full blur-3xl -top-48 -left-48" />
        <div className="absolute w-96 h-96 bg-cyan-200/30 dark:bg-cyan-900/20 rounded-full blur-3xl -bottom-48 -right-48" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8 relative">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Terminal className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xl font-medium bg-gradient-to-r from-cyan-600 to-rose-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-rose-400">
              {portfolioData.fullName.toLowerCase().replace(' ', '') + '.dev'}
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-6"
          >
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Sun className="h-5 w-5 text-amber-500" />
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              <Moon className="h-5 w-5 text-slate-500" />
            </div>
          </motion.div>
        </header>

        {/* Hero Section */}
        <motion.section 
          className="flex flex-col lg:flex-row items-center gap-12 mb-28"
          {...fadeIn}
        >
          <div className="relative lg:order-2">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-rose-400 rounded-3xl blur-xl opacity-30" />
            <Avatar className="w-64 h-64 border-4 border-white/50 dark:border-gray-900/50 backdrop-blur-sm shadow-2xl">
              <AvatarImage src={portfolioData.avatar || "/placeholder.svg"} alt={portfolioData.fullName} />
              <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-rose-400 text-white text-4xl font-medium">
                {portfolioData.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="lg:order-1 space-y-6">
            <motion.h1 
              className="text-5xl md:text-6xl font-medium leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {portfolioData.bio}<br/>
              <span className="bg-gradient-to-r from-cyan-600 to-rose-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-rose-400">
                {portfolioData.designation}
              </span>
            </motion.h1>
            
            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ y: -2 }}
                className="flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm"
                href={`mailto:${portfolioData.email}`}
              >
                <Mail className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                <span>{portfolioData.email}</span>
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                className="flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm"
                href={`tel:${portfolioData.mobile}`}
              >
                <Phone className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                <span>{portfolioData.mobile}</span>
              </motion.a>
              
              <div className="flex space-x-4">
                <motion.a whileHover={{ y: -2 }} className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full shadow-sm">
                  <Linkedin className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                </motion.a>
                <motion.a whileHover={{ y: -2 }} className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full shadow-sm">
                  <Github className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Grid */}
        <motion.section 
          className="mb-28"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-medium mb-12">Technical Skills</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {portfolioData.skills.map((skill, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px -15px rgba(0,0,0,0.1)"
                }}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-rose-400/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-800/30 relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-cyan-100 to-rose-100 dark:from-cyan-900/30 dark:to-rose-900/30 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                      <Code className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium capitalize">{skill}</h3>
                      <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-rose-400 rounded-full mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section className="mb-28" {...fadeIn}>
          <div className="space-y-12">
            <h2 className="text-4xl font-medium mb-12">Professional Journey</h2>
            
            {portfolioData.experience.map((exp, i) => (
              <motion.div 
                key={exp._id}
                className="group relative pl-8"
                whileHover={{ x: 10 }}
              >
                <div className="absolute left-0 top-4 h-4 w-4 bg-cyan-400 rounded-full" />
                <div className="absolute left-2 top-4 h-full w-1 bg-gradient-to-b from-cyan-400/30 to-rose-400/30" />
                
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-white/30 dark:border-gray-900/30 rounded-2xl shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <CardTitle className="text-xl mb-2">{exp.position} @ {exp.company}</CardTitle>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {new Date(exp.startDate).getFullYear()} - {exp.currentlyWorking ? 'Present' : new Date(exp.endDate).getFullYear()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Timeline - Add this section before or after Experience section */}
        <motion.section className="mb-28" {...fadeIn}>
          <div className="space-y-12">
            <h2 className="text-4xl font-medium mb-12">Education</h2>
            
            {portfolioData.education.map((edu, i) => (
              <motion.div 
                key={edu._id}
                className="group relative pl-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ x: 10 }}
              >
                <div className="absolute left-0 top-4 h-4 w-4 bg-rose-400 rounded-full" />
                <div className="absolute left-2 top-4 h-full w-1 bg-gradient-to-b from-rose-400/30 to-cyan-400/30" />
                
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-white/30 dark:border-gray-900/30 rounded-2xl shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <GraduationCap className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                          <CardTitle className="text-xl">{edu.degree} in {edu.fieldOfStudy}</CardTitle>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{edu.institution}</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {new Date(edu.startDate).getFullYear()} - {edu.currentlyStudying ? 'Present' : new Date(edu.endDate).getFullYear()}
                        </p>
                      </div>
                      {edu.currentlyStudying && (
                        <Badge 
                          variant="outline" 
                          className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800"
                        >
                          Currently Studying
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Showcase */}
        <motion.section className="mb-28" {...fadeIn}>
          <h2 className="text-4xl font-medium mb-12">Featured Work</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, i) => (
              <motion.div 
                key={project._id}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-rose-400/20" />
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-8 border border-white/30 dark:border-gray-900/30">
                  <h3 className="text-xl font-medium mb-4">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, j) => (
                      <Badge 
                        key={j}
                        variant="outline"
                        className="border-cyan-200 dark:border-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}