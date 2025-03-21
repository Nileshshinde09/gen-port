import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Briefcase,
  Mail,
  Code,
  GraduationCap,
  Rocket,
  Terminal,
} from "lucide-react";

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
export default function PortfolioPage({ portfolio }: { portfolio?: any }) {
  const [darkMode, setDarkMode] = useState(false);
  const { scrollYProgress } = useScroll();
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
  });
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

  useEffect(() => {
    if (!portfolio) return;
    setProfileData(portfolio?.user);
    setVisibleFields(portfolio.visibleFields);
  }, [portfolio]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
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
          {visibleFields.fullName !== 0 && (
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Terminal className="h-6 w-6 text-slate-700 dark:text-slate-300" />
              <span className="text-lg font-medium text-slate-800 dark:text-slate-200">
                {profileData?.fullName}
              </span>
            </motion.div>
          )}
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
              ease: "linear",
            }}
          />
          {visibleFields.avatar !== 0 && (
            <motion.div
              className="inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Avatar className="w-32 h-32 mx-auto border-4 border-slate-200 dark:border-slate-700 shadow-2xl">
                <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-slate-700 to-gray-800 text-white text-3xl">
                  {profileData.fullName
                    ?.split(" ")
                    ?.map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          )}
          {visibleFields.fullName !== 0 && (
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              {profileData.fullName}
            </h1>
          )}
          {visibleFields.designation !== 0 && (
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-2">
              {profileData.designation}
            </p>
          )}
          {visibleFields.location !== 0 && (
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              {profileData.location} • {profileData.bio}
            </p>
          )}

          {/* Contact buttons */}
          {visibleFields.email !== 0 && (
            <div className="flex justify-center gap-4 mb-6">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-xl shadow-lg font-medium hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                href={`mailto:${profileData.email}`}
              >
                <Mail className="h-5 w-5" />
                Email Me
              </motion.a>
              {/* <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl shadow-lg font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              href={`tel:${profileData.phone}`}
            >
              <Phone className="h-5 w-5" />
              Call Me
            </motion.a> */}
            </div>
          )}
        </motion.section>

        {/* Skills Section */}
        {visibleFields.skills !== 0 && (
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
              {profileData?.skills?.map((skill, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                  className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {skill}
                    </span>
                  </div>
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
              {profileData?.experience?.map((exp, i) => (
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
                        <CardTitle className="text-lg">
                          {exp.position}
                        </CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {exp.company} • {exp.startDate?.split("T")[0]} -{" "}
                          {exp.endDate?.split("T")[0]}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="text-slate-600 dark:text-slate-300">
                      <ul className="list-disc pl-6 space-y-2">
                        {exp.description.split("\n").map((detail, j) => (
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
        )}

        {/* Projects Section */}
        {visibleFields.projects !== 0 && (
          <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mb-16"
        >
          <motion.h2
            className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-left"
            variants={fadeIn}
          >
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {profileData?.projects?.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-950 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                  {project.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.repositoryLink}
                    className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.liveDemoLink}
                    className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
                  >
                    Live Demo
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        )}

        {/* Education Section */}
        {visibleFields.education !== 0 && (
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
                <CardHeader className="flex items-start flex-wrap gap-4 pb-2">
                  {profileData?.education?.map((edu, index) => (
                    <div key={index} className="">
                      <GraduationCap className="h-8 w-8 text-slate-500" />
                      <div >
                        <CardTitle className="text-lg">{edu.degree}</CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {edu.institution},{" "}
                          {new Date(edu.startDate)?.getFullYear()} -{" "}
                          {edu.currentlyStudying
                            ? "Present"
                            : new Date(edu.endDate)?.getFullYear()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardHeader>
              </Card>
            </motion.div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
