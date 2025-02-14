import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Briefcase, Mail, Code, GraduationCap, Rocket, Terminal, Phone } from "lucide-react"

export default function PortfolioPage() {
  const [darkMode, setDarkMode] = useState(false)
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, 1], [0, 100])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  // Add this mock data (you'll replace with real data from your schema)
  const profile = {
    email: "nilesh@gmail.com",
    phone: "+91 9876543210", // Added phone field
    avatar: null,
    designation: "Full Stack Developer",
    location: "India",
    fullName: "Nilesh Shinde",
    bio: "I'm Nick, a full stack web developer passionate about building modern web applications.",
    skills: ["JavaScript", "TypeScript", "Python", "React.js", "Node.js", "MongoDB"],
    education: [
      {
        institution: "DMS Mandals college of Computer Applications",
        degree: "BCA",
        fieldOfStudy: "Computer Applications",
        startDate: "2021",
        endDate: "2024",
        currentlyStudying: false,
      }
    ],
    experience: [
      {
        company: "Infosys",
        position: "Junior Backend Developer",
        startDate: "Aug 2024",
        endDate: "Feb 2025",
        currentlyWorking: false,
        description: "My work involved handling and building GraphQL APIs"
      }
    ],
    projects: [
      {
        name: "Gen-port",
        description: "A Modern Day portfolio maker with modern UI",
        technologies: ["React.js", "Express.js", "Node.js", "MongoDB"],
        socials: ["https://github.com/Nileshshinde09"],
        repositoryLink: "https://github.com/Nileshshinde09",
        liveDemoLink: "https://example.com"
      }
    ]
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      <motion.div 
        className="fixed top-0 left-0 w-full h-2 bg-slate-700 dark:bg-slate-600 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Header - Updated with dynamic name */}
        <motion.header 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Terminal className="h-6 w-6 text-slate-700 dark:text-slate-300" />
            <span className="text-lg font-medium text-slate-800 dark:text-slate-200">
              {profile.fullName}
            </span>
          </motion.div>
          <motion.div whileHover={{ rotate: 15 }}>
            <Switch 
              checked={darkMode} 
              onCheckedChange={toggleDarkMode} 
              className="data-[state=checked]:bg-white"
            />
          </motion.div>
        </motion.header>

        {/* Profile Section - Updated with dynamic data */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16 relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-slate-200 to-gray-200 dark:from-slate-800 dark:to-gray-800 blur-3xl opacity-10 -z-10"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div className="inline-block mb-6" whileHover={{ scale: 1.05 }}>
            <Avatar className="w-32 h-32 mx-auto border-4 border-slate-200 dark:border-slate-700 shadow-2xl">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-gradient-to-r from-slate-700 to-gray-800 text-white text-3xl">
                {profile.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            {profile.fullName}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-2">
            {profile.designation}
          </p>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            {profile.location} • {profile.bio}
          </p>
          
          {/* Contact buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-xl shadow-lg font-medium hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
              href={`mailto:${profile.email}`}
            >
              <Mail className="h-5 w-5" />
              Email Me
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl shadow-lg font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              href={`tel:${profile.phone}`}
            >
              <Phone className="h-5 w-5" />
              Call Me
            </motion.a>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mb-16"
        >
          <motion.h2 
            className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center"
            variants={fadeIn}
          >
            Technical Expertise
          </motion.h2>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            variants={staggerChildren}
          >
            {profile.skills.map((skill, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Code className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">{skill}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mb-16"
        >
          <motion.h2 
            className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center"
            variants={fadeIn}
          >
            Professional Journey
          </motion.h2>
          <div className="space-y-8 relative">
            <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-slate-400 to-slate-600 opacity-20 dark:opacity-30" />
            {profile.experience.map((exp, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="relative pl-12 group"
                whileHover={{ x: 10 }}
              >
                <div className="absolute left-6 top-4 w-3 h-3 rounded-full bg-slate-600" />
                <Card className="bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
                  <CardHeader className="flex flex-col md:flex-row md:items-center gap-4 pb-2">
                    <Briefcase className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                    <div>
                      <CardTitle className="text-lg">{exp.position}</CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {exp.company} • {exp.startDate} - {exp.endDate}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="text-slate-600 dark:text-slate-300">
                    <ul className="list-disc pl-6 space-y-2">
                      {exp.description.split('\n').map((detail, j) => (
                        <motion.li 
                          key={j}
                          className="flex items-center gap-2"
                          whileHover={{ x: 5 }}
                        >
                          <Rocket className="h-4 w-4 text-slate-500" />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mb-16"
        >
          <motion.h2 
            className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center"
            variants={fadeIn}
          >
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {profile.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">{project.name}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, j) => (
                    <span key={j} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.repositoryLink} className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100 transition-colors">GitHub</a>
                  <a href={project.liveDemoLink} className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100 transition-colors">Live Demo</a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mb-16"
        >
          <motion.h2 
            className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center"
            variants={fadeIn}
          >
            Education
          </motion.h2>
          <motion.div 
            className="bg-gradient-to-r from-slate-700 to-gray-800 p-1 rounded-2xl"
            variants={fadeIn}
          >
            <Card className="bg-white dark:bg-slate-800 rounded-xl">
              <CardHeader className="flex items-center gap-4 pb-2">
                <GraduationCap className="h-8 w-8 text-slate-500" />
                <div>
                  <CardTitle className="text-lg">Computer Science</CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Stanford University • 2016 - 2020
                  </p>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}
