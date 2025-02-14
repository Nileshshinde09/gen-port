import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Github, ExternalLink, Briefcase, Mail, Code, GraduationCap, Phone } from "lucide-react"

export default function Home() {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const profile = {
    email: "nilesh@gmail.com",
    phone: "+91 9876543210",
    avatar: null,
    designation: "Full Stack Developer",
    location: "India",
    fullName: "Nilesh Shinde",
    bio: "I'm Nick, a full stack web developer passionate about creating modern web applications.",
    skills: ["JavaScript", "TypeScript", "Python", "React.js", "Node.js", "MongoDB", "GraphQL"],
    socials: {
      github: "https://github.com/Nileshshinde09",
      linkedin: "#",
    },
    projects: [
      {
        name: "Gen-port ( A Modern Day portfolio maker )",
        description: "A Modern Day portfolio maker with modern UI",
        technologies: ["React.js", "Express.js", "Node.js", "Mongodb"],
        socials: ["https://github.com/Nileshshinde09"],
        repositoryLink: "https://github.com/Nileshshinde09",
        liveDemoLink: "https:",
      }
    ]
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 transition-colors duration-500 ${darkMode ? "dark" : ""}`}>
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-3">
            <Code className="h-7 w-7 text-gray-900 dark:text-white" />
            <span className="text-xl font-medium text-gray-900 dark:text-white">{profile.fullName}</span>
          </div>
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
        </motion.div>

        {/* Profile Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants}>
            <Avatar className="w-40 h-40 mx-auto mb-8 border-4 border-white dark:border-gray-800 shadow-2xl">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-4xl">
                {profile.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">{profile.fullName}</h1>
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">{profile.designation}</p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">{profile.bio}</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex justify-center gap-4 flex-wrap"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all"
              href={`mailto:${profile.email}`}
            >
              <Mail className="h-5 w-5" />
              Email Me
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              href={`tel:${profile.phone}`}
            >
              <Phone className="h-5 w-5" />
              Call Me
            </motion.a>
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Skills
          </motion.h2>
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profile.skills.map((skill, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center"
              >
                <span className="text-gray-900 dark:text-white">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Experience</h2>
          <div className="space-y-8">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Briefcase className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <CardTitle className="text-lg">Senior Developer</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tech Corp • 2020 - Present</p>
                </div>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Led team in developing enterprise applications</li>
                  <li>Implemented modern web architecture</li>
                  <li>Mentored junior developers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Briefcase className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <CardTitle className="text-lg">Web Developer</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Digital Solutions • 2018 - 2020</p>
                </div>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Developed client-facing web applications</li>
                  <li>Optimized application performance</li>
                  <li>Collaborated with design teams</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Education</h2>
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <div>
                <CardTitle className="text-lg">Computer Science</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">Stanford University • 2016 - 2020</p>
              </div>
            </CardHeader>
          </Card>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-8 flex items-center gap-3"
          >
            <Code className="h-7 w-7" />
            Projects
          </motion.h2>
          <motion.div 
            variants={itemVariants} 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {profile.projects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-indigo-900/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-200 mb-3">
                    {project.name}
                  </h3>
                  <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <Badge 
                        key={i}
                        className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-700"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.repositoryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-100"
                    >
                      <Github className="h-5 w-5" />
                      Repository
                    </motion.a>
                    {project.liveDemoLink && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-100"
                      >
                        <ExternalLink className="h-5 w-5" />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}