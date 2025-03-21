import { useEffect, useState } from "react";
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
  GraduationCap,
} from "lucide-react";
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
  const [darkMode, setDarkMode] = useState(false);
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
    phone: -1,
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

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
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
          {visibleFields.avatar !== 0 && (
            <div className="relative inline-block">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-30 dark:opacity-50" />
              <Avatar className="w-40 h-40 mx-auto border-4 border-white dark:border-gray-800 shadow-2xl relative">
                <AvatarImage
                  src={profileData?.avatar || "/placeholder.svg"}
                  alt={profileData?.fullName}
                />
                <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-3xl font-medium">
                  {profileData?.fullName
                    ?.split(" ")
                    .map((n: any) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
          {visibleFields.fullName !== 0 && (
            <h1 className="text-5xl font-medium mb-4 mt-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              {profileData?.fullName}
            </h1>
          )}
          {visibleFields.designation !== 0 && (
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 font-medium">
              {profileData?.designation}
            </p>
          )}
          <div className="flex justify-center space-x-6 flex-wrap gap-4">
            {visibleFields.location !== 0 && (
              <motion.a
                whileHover={{ y: -2 }}
                className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <MapPin className="mr-2 h-5 w-5 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {profileData?.location}
                </span>
              </motion.a>
            )}
            {visibleFields.email !== 0 && (
              <motion.a
                whileHover={{ y: -2 }}
                className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Mail className="mr-2 h-5 w-5 text-purple-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {profileData?.email}
                </span>
              </motion.a>
            )}
          </div>
        </motion.header>

        {/* Skills Grid */}
        {visibleFields.skills !== 0 && (
          <motion.section className="mb-16" {...fadeInUp}>
            <Card className="border-0 shadow-xl dark:bg-gray-800">
              <CardHeader className="pb-0">
                <CardTitle className="text-3xl font-medium flex items-center space-x-3">
                  <Code className="h-8 w-8 text-blue-500" />
                  <span>Technical Expertise</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6">
                {profileData?.skills?.map((skill: any, index: number) => (
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
        )}

        {/* Experience Timeline */}
        {visibleFields.experience !== 0 && (
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
                {profileData?.experience?.map((job: any, index: number) => (
                  <motion.div
                    key={index}
                    className="relative pl-16 pb-8 group"
                    whileHover={{ x: 10 }}
                  >
                    <div className="absolute left-8 top-2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-md" />
                    <div className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-medium mb-2">
                        {job.position}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {job.company} • {new Date(job.startDate).getFullYear()}{" "}
                        -{" "}
                        {job.currentlyWorking
                          ? "Present"
                          : new Date(job.endDate).getFullYear()}
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
        )}

        {/* Education Section */}
        {visibleFields.education !== 0 && (
          <motion.section className="mb-16" {...fadeInUp}>
            <Card className="border-0 shadow-xl dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-3xl font-medium flex items-center space-x-3">
                  <GraduationCap className="h-8 w-8 text-blue-500" />
                  <span>Educational Background</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative pt-8">
                <div className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-purple-400 to-blue-500 opacity-20 dark:opacity-30" />
                {profileData?.education?.map((edu: any, index: number) => (
                  <motion.div
                    key={index}
                    className="relative pl-16 pb-8 group"
                    whileHover={{ x: 10 }}
                  >
                    <div className="absolute left-8 top-2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 shadow-md" />
                    <div className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-medium mb-2">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {edu.institution} •{" "}
                        {new Date(edu.startDate).getFullYear()} -{" "}
                        {edu.currentlyStudying
                          ? "Present"
                          : new Date(edu.endDate).getFullYear()}
                      </p>
                      {edu.currentlyStudying && (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Currently Studying
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.section>
        )}

        {/* Projects Showcase */}
        {visibleFields.projects !== 0 && (
          <motion.section {...fadeInUp}>
            <Card className="border-0 shadow-xl dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-3xl font-medium flex items-center space-x-3">
                  <Folder className="h-8 w-8 text-blue-500" />
                  <span>Featured Projects</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
                {profileData?.projects?.map((project: any, index: number) => (
                  <motion.div
                    whileHover={{ y: -5 }}
                    key={index}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-medium mb-2">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: any, i: number) => (
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
        )}
      </div>
    </div>
  );
}
