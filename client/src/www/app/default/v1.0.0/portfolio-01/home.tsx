import { useState, useEffect } from "react";
import { motion} from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Briefcase, Mail, MapPin, Moon, Sun } from "lucide-react";

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



// Helper function to format dates
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

export default function Home({ portfolio }: { portfolio?: any }) {
  const [darkMode, setDarkMode] = useState(false);
  // Default data for development/testing
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
  });
  useEffect(() => {
    if (!portfolio) return;
    console.log("portfolio ::",portfolio)
    setProfileData(portfolio?.user);
    setVisibleFields(portfolio.visibleFields);
  }, [portfolio]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const hoverEffect = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };


  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <motion.div
        className="container mx-auto max-w-5xl px-4"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        {/* Dark Mode Toggle */}
        <motion.div className="flex justify-end mb-4" variants={fadeInUp}>
          <Switch
            checked={darkMode}
            onCheckedChange={() => {
              setDarkMode(!darkMode);
              document.documentElement.classList.toggle("dark");
            }}
            className="mr-2"
          />
          {darkMode ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </motion.div>

        {/* Header Section */}
        <motion.header className="text-center mb-12" variants={fadeInUp}>
          {visibleFields.avatar !== 0 && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring" }}
            >
              <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-gray-900 dark:border-gray-100">
                <AvatarImage
                  src={profileData.avatar || "/placeholder.svg"}
                  alt={profileData.fullName}
                />
                <AvatarFallback className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900">
                  {profileData?.fullName
                    ?.split(" ")
                    ?.map((n) => n[0])
                    ?.join("")}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          )}
          {visibleFields.fullName !== 0 && (
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {profileData?.fullName}
            </h1>
          )}
          {visibleFields.designation !== 0 && (
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              {profileData?.designation}
            </p>
          )}
          <div className="flex justify-center space-x-4 text-gray-600 dark:text-gray-300">
            {visibleFields.location !== 0 &&<motion.div className="flex items-center" whileHover={{ y: -2 }}>
              <MapPin className="mr-2 h-4 w-4" />
              <span>{profileData.location}</span>
            </motion.div>}
            {visibleFields.email !== 0 &&<motion.div className="flex items-center" whileHover={{ y: -2 }}>
              <Mail className="mr-2 h-4 w-4" />
              <span>{profileData.email}</span>
            </motion.div>}
          </div>
        </motion.header>

        {/* About Section */}
        {visibleFields.bio !== 0 &&<motion.section className="mb-12" variants={fadeInUp}>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            About Me
          </h2>
          <motion.div whileHover={hoverEffect}>
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="pt-6">
                <p className="text-gray-600 dark:text-gray-300">
                  {profileData.bio}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>}

        {/* Experience Section */}
       
        {visibleFields.experience !== 0 && profileData.experience.length > 0 && (
          <motion.section className="mb-12" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Experience
            </h2>
            <motion.div whileHover={hoverEffect}>
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {profileData?.experience?.map((exp) => (
                      <motion.div
                      key={exp._id}
                      className="flex"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      >
                        <div className="flex flex-col items-center mr-4">
                          <motion.div
                            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-900 dark:border-gray-100"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Briefcase className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                          </motion.div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {exp.position}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {exp.company} | {formatDate(exp.startDate)} -{" "}
                            {exp.currentlyWorking
                              ? "Present"
                              : formatDate(exp.endDate)}
                          </p>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            {exp.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>
        )}

        {/* Education Section */}
        {visibleFields.education !== 0 && profileData.education.length > 0 && (
          <motion.section className="mb-12" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Education
            </h2>
            <motion.div whileHover={hoverEffect}>
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {profileData?.education?.map((edu) => (
                      <motion.div
                        key={edu._id}
                        className="flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="flex flex-col items-center mr-4">
                          <motion.div
                            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-900 dark:border-gray-100"
                            whileHover={{ scale: 1.1 }}
                          >
                            <svg
                              className="h-5 w-5 text-gray-900 dark:text-gray-100"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 14l9-5-9-5-9 5 9 5z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 14l9-5-9-5-9 5 9 5z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 14v7"
                              />
                            </svg>
                          </motion.div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {edu.degree} in {edu.fieldOfStudy}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {formatDate(edu.startDate)} -{" "}
                            {edu.currentlyStudying
                              ? "Present"
                              : formatDate(edu.endDate)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>
        )}

        {/* Skills Section */}
        {visibleFields.skills !== 0 &&profileData.skills.length > 0 && (
          <motion.section className="mb-12" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Skills
            </h2>
            <motion.div whileHover={hoverEffect}>
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2">
                    {profileData?.skills?.map((skill, index) => (
                      <motion.div
                        key={index}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge
                          variant="outline"
                          className="bg-white dark:bg-gray-700"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>
        )}

        {/* Projects Section */}
        {visibleFields.projects !== 0 &&profileData.projects.length > 0 && (
          <motion.section variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Projects
            </h2>
            <div className="space-y-6">
              {profileData?.projects?.map((project) => (
                <motion.div key={project._id} whileHover={hoverEffect}>
                  <Card className="bg-gray-50 dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-gray-100">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project?.technologies?.map((tech, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-white dark:bg-gray-700"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-4">
                          <a
                            href={project.repositoryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            GitHub Repository
                          </a>
                          <a
                            href={project.liveDemoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Live Demo
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </motion.div>
    </div>
  );
}

// const [profileData, profileData] = useState<profileData>(defaultData);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function profileData() {
//       try {
//         const response = await fetch('/api/portfolio'); // Replace with your API endpoint
//         if (!response.ok) {
//           throw new Error('Failed to fetch portfolio data');
//         }
//         const data = await response.json();
//         profileData(data);
//       } catch (err) {
//         console.error('Error fetching portfolio data:', err);
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     }

//     profileData();
//   }, []);

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 dark:text-gray-300">Loading portfolio...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
//         <div className="text-center p-8 bg-red-50 dark:bg-red-900 rounded-lg">
//           <h2 className="text-2xl font-bold text-red-600 dark:text-red-300 mb-4">Error Loading Portfolio</h2>
//           <p className="text-red-500 dark:text-red-400">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }
