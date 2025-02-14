import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Mail,
  Moon,
  Sun,
  Code,
  Terminal,
  Linkedin,
  Github,
  ExternalLink,
} from "lucide-react";

interface PortfolioData {
  email: string;
  avatar: string | null;
  designation: string;
  location: string;
  fullName: string;
  bio: string;
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
  const [darkMode, setDarkMode] = useState(false);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 100]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "backOut" },
    },
  };

  const data: PortfolioData = {
    email: "nilesh@gmail.com",
    avatar: null,
    designation: "Full Stack Developer",
    location: "India",
    fullName: "Nilesh Shinde",
    bio: "I'm nick a full stack web dev.",
    skills: ["js", "ts", "python"],
    education: [
      {
        institution: "DMS Mandals college of Computer Applications",
        degree: "BCA",
        fieldOfStudy: "Computer Applications",
        startDate: "2021-08-12T18:30:00.000Z",
        endDate: "2024-07-12T18:30:00.000Z",
        currentlyStudying: false,
        _id: "67add9ccc57c56f148191cf5"
      }
    ],
    experience: [
      {
        company: "infosys",
        position: "junior backend dev",
        startDate: "2024-08-13T09:47:44.565Z",
        endDate: "2025-02-10T09:47:44.565Z",
        currentlyWorking: false,
        description: "my work involed handling and building graphql api's",
        _id: "67add9ccc57c56f148191cf6"
      }
    ],
    projects: [
      {
        name: "Gen-port ( A Modern Day portfolio maker )",
        description: "A Modern Day portfolio maker with modern UI",
        technologies: ["React.js", "Express.js", "Node.js", "Mongodb"],
        socials: ["https://github.com/Nileshshinde09"],
        repositoryLink: "https://github.com/Nileshshinde09",
        liveDemoLink: "https:",
        _id: "67add9ccc57c56f148191cf7"
      }
    ]
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 ${
        darkMode ? "dark" : ""
      }`}
    >
      <motion.div
        className="fixed inset-0 bg-gradient-to-b from-blue-100/50 to-gray-50/50 dark:from-gray-900/50 dark:to-blue-900/10"
        style={{ y }}
      />

      <div className="container mx-auto max-w-6xl px-4 py-8 relative">
        {/* Header */}
        <motion.header
          className="flex justify-between items-center mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <Terminal className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {data.fullName.toLowerCase().replace(' ', '')}.dev
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
              <Sun className="h-5 w-5 text-amber-500" />
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              <Moon className="h-5 w-5 text-slate-400" />
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          className="flex flex-col lg:flex-row items-center gap-12 mb-28"
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
        >
          <motion.div className="lg:order-2" variants={itemVariants}>
            <Avatar className="w-64 h-64 border-4 border-white dark:border-gray-800 shadow-xl">
              <AvatarImage src={data.avatar || "/placeholder.svg"} alt={data.fullName} />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-slate-600 text-white text-4xl font-bold">
                {data.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.div className="lg:order-1 space-y-6" variants={itemVariants}>
            <motion.h1
              className="text-5xl md:text-6xl font-bold leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {data.fullName}
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-slate-300">
                {data.designation}
              </span>
            </motion.h1>

            <motion.p className="text-gray-600 dark:text-gray-400 text-lg">
              {data.bio}
            </motion.p>

            <motion.div className="flex space-x-6">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md"
              >
                <Mail className="h-5 w-5" />
                <span>Contact Me</span>
              </motion.a>

              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ y: -2 }}
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                >
                  <Linkedin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                >
                  <Github className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="mb-28"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.h2
            className="text-4xl font-bold mb-12 text-gray-800 dark:text-gray-200"
            variants={itemVariants}
          >
            Technical Expertise
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={staggerVariants}
          >
            {data.skills.map((skill, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              >
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {skill}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          className="mb-28"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.h2
            className="text-4xl font-bold mb-12 text-gray-800 dark:text-gray-200"
            variants={itemVariants}
          >
            Education
          </motion.h2>

          <motion.div className="space-y-8" variants={staggerVariants}>
            {data.education.map((edu, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative pl-8"
              >
                <div className="absolute left-0 top-6 h-3 w-3 bg-blue-600 rounded-full" />
                <Card className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                  <CardContent className="p-6">
                    <CardTitle className="text-2xl mb-2">
                      {edu.degree} in {edu.fieldOfStudy}
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {edu.institution}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {new Date(edu.startDate).getFullYear()} - {edu.currentlyStudying ? 'Present' : new Date(edu.endDate).getFullYear()}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          className="mb-28"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.h2
            className="text-4xl font-bold mb-12 text-gray-800 dark:text-gray-200"
            variants={itemVariants}
          >
            Professional Experience
          </motion.h2>

          <motion.div className="space-y-8" variants={staggerVariants}>
            {data.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative pl-8"
              >
                <div className="absolute left-0 top-6 h-3 w-3 bg-blue-600 rounded-full" />
                <Card className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                  <CardContent className="p-6">
                    <CardTitle className="text-2xl mb-2">
                      {exp.position}
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {exp.company}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {new Date(exp.startDate).toLocaleDateString()} - {exp.currentlyWorking ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                    </p>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                      {exp.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          className="mb-28"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.h2
            className="text-4xl font-bold mb-12 text-gray-800 dark:text-gray-200"
            variants={itemVariants}
          >
            Key Projects
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerVariants}
          >
            {data.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, j) => (
                      <Badge
                        key={j}
                        variant="outline"
                        className="border-blue-200 dark:border-blue-900/30 text-blue-600 dark:text-blue-400"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-4">
                    <motion.a
                      href={project.repositoryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                    {project.liveDemoLink && (
                      <motion.a
                        href={project.liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
