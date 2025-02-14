import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Briefcase,
  Mail,
  MapPin,
  Moon,
  Sun,
  Code,
  Folder,
  ChevronRight,
  Phone,
} from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  // Add dummy data based on the schema
  const profileData = {
    email: "nilesh@gmail.com",
    avatar: null,
    designation: "Full Stack Developer",
    location: "India",
    fullName: "Nilesh Shinde",
    bio: "Im nick a full stack web dev.",
    phone: "+91 1234567890", // Added phone number
    skills: ["js", "ts", "python"],
    education: [
      {
        institution: "DMS Mandals college of Computer Applications",
        degree: "BCA",
        fieldOfStudy: "Computer Applications",
        startDate: "2021-08-12T18:30:00.000Z",
        endDate: "2024-07-12T18:30:00.000Z",
        currentlyStudying: false,
      },
    ],
    experience: [
      {
        company: "infosys",
        position: "junior backend dev",
        startDate: "2024-08-13T09:47:44.565Z",
        endDate: "2025-02-10T09:47:44.565Z",
        currentlyWorking: false,
        description: "my work involed handling and building graphql api's",
      },
    ],
    projects: [
      {
        name: "Gen-port ( A Modern Day portfolio maker )",
        description: "A Modern Day portfolio maker with modern UI",
        technologies: ["React.js", "Express.js", "Node.js", "Mongodb"],
        socials: ["https://github.com/Nileshshinde09"],
        repositoryLink: "https://github.com/Nileshshinde09",
        liveDemoLink: "https:",
      },
    ],
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Dark Mode Toggle */}
        <motion.div className="flex justify-end mb-8" {...fadeInUp}>
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
            <Sun className="h-5 w-5 text-yellow-500" />
            <Switch
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
              className="data-[state=checked]:bg-blue-500"
            />
            <Moon className="h-5 w-5 text-blue-400" />
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.header className="text-center mb-16" {...fadeInUp}>
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-30 dark:opacity-50" />
            <Avatar className="w-40 h-40 mx-auto border-4 border-white dark:border-gray-800 shadow-2xl relative">
              <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.fullName} />
              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-3xl font-medium">
                {profileData.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-5xl font-medium mb-4 mt-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            {profileData.fullName}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 font-medium">
            {profileData.designation}
          </p>
          <div className="flex justify-center space-x-6 flex-wrap gap-4">
            <motion.a
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <MapPin className="mr-2 h-5 w-5 text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">{profileData.location}</span>
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <Mail className="mr-2 h-5 w-5 text-purple-500" />
              <span className="text-gray-700 dark:text-gray-300">{profileData.email}</span>
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <Phone className="mr-2 h-5 w-5 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">{profileData.phone}</span>
            </motion.a>
          </div>
        </motion.header>

        {/* Skills Grid */}
        <motion.section className="mb-16" {...fadeInUp}>
          <Card className="border-0 shadow-xl dark:bg-gray-800">
            <CardHeader className="pb-0">
              <CardTitle className="text-3xl font-medium flex items-center space-x-3">
                <Code className="h-8 w-8 text-blue-500" />
                <span>Technical Expertise</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6">
              {profileData.skills.map((skill, index) => (
                <motion.div whileHover={{ scale: 1.05 }} key={index}>
                  <Badge className="w-full h-24 flex flex-col items-center justify-center space-y-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-md rounded-xl border-0">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Code className="h-5 w-5 text-blue-500" />
                    </div>
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      {skill}
                    </span>
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section className="mb-16" {...fadeInUp}>
          <Card className="border-0 shadow-xl dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-3xl font-medium flex items-center space-x-3">
                <Briefcase className="h-8 w-8 text-purple-500" />
                <span>Professional Journey</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative pt-8">
              <div className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-500 opacity-20 dark:opacity-30" />
              {profileData.experience.map((job, index) => (
                <motion.div
                  key={index}
                  className="relative pl-16 pb-8 group"
                  whileHover={{ x: 10 }}
                >
                  <div className="absolute left-8 top-2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-md" />
                  <div className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-medium mb-2">{job.position}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {job.company} • {new Date(job.startDate).getFullYear()} - {new Date(job.endDate).getFullYear()}
                    </p>
                    <div className="text-gray-600 dark:text-gray-300">
                      {job.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.section>

        {/* Projects Showcase */}
        <motion.section {...fadeInUp}>
          <Card className="border-0 shadow-xl dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-3xl font-medium flex items-center space-x-3">
                <Folder className="h-8 w-8 text-blue-500" />
                <span>Featured Projects</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
              {profileData.projects.map((project, index) => (
                <motion.div
                  whileHover={{ y: -5 }}
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{project.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-blue-500 dark:text-blue-400 border-blue-200 dark:border-blue-900"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 w-full" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
