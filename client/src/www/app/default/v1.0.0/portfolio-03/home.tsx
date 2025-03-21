import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Github, ExternalLink, Briefcase, Mail, Code, GraduationCap } from 'lucide-react'

// Define interfaces for type safety
interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  _id: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  _id: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  socials: string[];
  repositoryLink: string;
  liveDemoLink: string;
  _id: string;
}

interface profileData {
  email: string;
  avatar: string | null;
  designation: string;
  location: string;
  fullName: string;
  bio: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
}
export default function Home({ portfolio }: { portfolio?: any }) {
  const [darkMode, setDarkMode] = useState(true)

    const [profileData, setProfileData] = useState<profileData>({
      email: "john.developer@gmail.com",
      avatar: "https://avatars.githubusercontent.com/u/1234567",
      designation: "Senior Full Stack Developer",
      location: "San Francisco, CA",
      fullName: "John Developer",
      bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture. Currently focused on creating innovative solutions that make a difference in people's lives.",
      skills: [
        "JavaScript",
        "TypeScript",
        "React.js",
        "Node.js",
        "Python",
        "AWS",
        "Docker",
        "MongoDB",
        "GraphQL",
        "Next.js",
        "TailwindCSS",
        "PostgreSQL",
      ],
      education: [
        {
          institution: "University of California, Berkeley",
          degree: "Master of Science",
          fieldOfStudy: "Computer Science",
          startDate: "2018-09-01T00:00:00.000Z",
          endDate: "2020-05-30T00:00:00.000Z",
          currentlyStudying: false,
          _id: "1",
        },
        {
          institution: "Stanford University",
          degree: "Bachelor of Science",
          fieldOfStudy: "Software Engineering",
          startDate: "2014-09-01T00:00:00.000Z",
          endDate: "2018-05-30T00:00:00.000Z",
          currentlyStudying: false,
          _id: "2",
        },
      ],
      experience: [
        {
          company: "Google",
          position: "Senior Software Engineer",
          startDate: "2020-06-01T00:00:00.000Z",
          endDate: "2024-03-15T00:00:00.000Z",
          currentlyWorking: true,
          description:
            "Leading a team of 5 engineers in developing and maintaining cloud-based solutions. Implemented microservices architecture that reduced system latency by 40%. Mentored junior developers and conducted technical interviews.",
          _id: "3",
        },
        {
          company: "Microsoft",
          position: "Software Engineer",
          startDate: "2018-07-01T00:00:00.000Z",
          endDate: "2020-05-30T00:00:00.000Z",
          currentlyWorking: false,
          description:
            "Developed and maintained core components of Azure cloud services. Collaborated with cross-functional teams to implement new features and improve existing functionality.",
          _id: "4",
        },
        {
          company: "Amazon",
          position: "Software Development Engineer",
          startDate: "2016-06-01T00:00:00.000Z",
          endDate: "2018-06-30T00:00:00.000Z",
          currentlyWorking: false,
          description:
            "Worked on AWS Lambda service improvements. Implemented automated testing procedures that reduced bug reports by 30%.",
          _id: "5",
        },
      ],
      projects: [
        {
          name: "CloudScale - Cloud Resource Manager",
          description:
            "An enterprise-level cloud resource management platform that helps organizations optimize their cloud spending and resource allocation. Features include real-time monitoring, cost analysis, and automated scaling.",
          technologies: [
            "React",
            "Node.js",
            "AWS",
            "Terraform",
            "GraphQL",
            "MongoDB",
          ],
          socials: ["https://github.com/johndoe/cloudscale"],
          repositoryLink: "https://github.com/johndoe/cloudscale",
          liveDemoLink: "https://cloudscale.demo.com",
          _id: "6",
        },
        {
          name: "DevConnect - Developer Social Platform",
          description:
            "A social networking platform specifically designed for developers to share code, collaborate on projects, and find mentorship opportunities. Includes features like code sharing, real-time chat, and project matching.",
          technologies: [
            "Next.js",
            "TypeScript",
            "PostgreSQL",
            "Redis",
            "Socket.io",
            "Docker",
          ],
          socials: ["https://github.com/johndoe/devconnect"],
          repositoryLink: "https://github.com/johndoe/devconnect",
          liveDemoLink: "https://devconnect.demo.com",
          _id: "7",
        },
        {
          name: "AI Code Review Assistant",
          description:
            "An AI-powered code review tool that automatically analyzes pull requests, suggests improvements, and helps maintain code quality. Integrates with GitHub and GitLab.",
          technologies: [
            "Python",
            "TensorFlow",
            "FastAPI",
            "React",
            "GitHub API",
            "Docker",
          ],
          socials: ["https://github.com/johndoe/ai-code-review"],
          repositoryLink: "https://github.com/johndoe/ai-code-review",
          liveDemoLink: "https://ai-code-review.demo.com",
          _id: "8",
        },
      ],
    });
  const [visibleFields, setVisibleFields] = useState({
    avatar: -1,
    bio: -1,
    designation: -1,
    education: -1,
    email: -1,
    experience: -1,
    fullName: -1,
    location: -1,
    projects: -1,
    skills: -1,
    username: -1,
  })

    useEffect(() => {
    if (!portfolio) return;
    setProfileData(portfolio?.user);
    setVisibleFields(portfolio.visibleFields)
  }, [portfolio]);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
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
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
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
            <span className="text-xl font-medium text-gray-900 dark:text-white">{profileData.fullName}</span>
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
          {visibleFields.avatar !== 0 && (
            <motion.div variants={itemVariants}>
              <Avatar className="w-40 h-40 mx-auto mb-8 border-4 border-white dark:border-gray-800 shadow-2xl">
                <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-4xl">
                  {profileData.fullName?.split(' ').map((n:any) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {visibleFields.fullName !== 0 && <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">{profileData.fullName}</h1>}
              {visibleFields.designation !== 0 && <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">{profileData.designation}</p>}
              {visibleFields.bio !== 0 && <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">{profileData.bio}</p>}
            </motion.div>
          )}

          <motion.div 
            variants={itemVariants}
            className="flex justify-center gap-4 flex-wrap"
          >
            {visibleFields.email !== 0 && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all"
                href={`mailto:${profileData.email}`}
              >
                <Mail className="h-5 w-5" />
                Email Me
              </motion.a>
            )}
            
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        {visibleFields.skills !== 0 && (
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
              {profileData.skills?.map((skill:any, i:number) => (
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
        )}

        {/* Experience Section */}
        {visibleFields.experience !== 0 && (
          <motion.section
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Experience</h2>
            <div className="space-y-8">
              {profileData.experience?.map((exp:any, index:number) => (
                <Card key={index} className="border border-gray-200 dark:border-gray-700">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Briefcase className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <CardTitle className="text-lg">{exp.position}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company} • {new Date(exp.startDate).getFullYear()} - {exp.currentlyWorking ? 'Present' : new Date(exp.endDate).getFullYear()}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="text-gray-600 dark:text-gray-300">
                    <ul className="list-disc pl-6 space-y-2">
                      {exp.description.split('\n').map((item:any, i:number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education Section */}
        {visibleFields.education !== 0 && (
          <motion.section
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Education</h2>
            {profileData.education?.map((edu:any, index:number) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <CardTitle className="text-lg">{edu.degree} in {edu.fieldOfStudy}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{edu.institution} • {new Date(edu.startDate).getFullYear()} - {edu.currentlyStudying ? 'Present' : new Date(edu.endDate).getFullYear()}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </motion.section>
        )}

        {/* Projects Section */}
        {visibleFields.projects !== 0 && (
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
              {profileData.projects?.map((project:any, index:number) => (
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
                      {project.technologies.map((tech:any, i:number) => (
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
        )}
      </div>
    </div>
  )
}
