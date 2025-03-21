import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Moon,
  Sun,
  Code,
  Folder,
  ChevronRight,
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
    setVisibleFields(portfolio.visibleFields)
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
      className={` min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-neutral-950 dark:to-neutral-950 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <motion.div className="flex justify-end mb-4" {...fadeInUp}>
          <Switch
            checked={darkMode}
            onCheckedChange={toggleDarkMode}
            className="mr-2"
          />
          {darkMode ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </motion.div>

        <motion.header className="text-center mb-12" {...fadeInUp}>
          {visibleFields.avatar!==0&&<Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary">
            <AvatarImage
              src={profileData.avatar || "/placeholder.svg"}
              alt={profileData.fullName}
            />
            <AvatarFallback>
              {profileData?.fullName
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>}
          {visibleFields.fullName!==0&&<h1 className="text-3xl font-medium mb-2">{profileData.fullName}</h1>}
         {visibleFields.designation!==0&& (<p className="text-lg text-muted-foreground mb-4">
            {profileData.designation}
          </p>)}
          <div className="flex justify-center space-x-4 text-muted-foreground">
            {visibleFields.location!==0&&<div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{profileData.location}</span>
            </div>}
            {visibleFields.email!==0&&<div className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <span>{profileData.email}</span>
            </div>}
            {/* {visibleFields.&&<div className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              <span>{profileData.phone}</span>
            </div>} */}
          </div>
        </motion.header>

        {visibleFields.skills!==0&&<motion.section className="mb-12" {...fadeInUp}>
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-xl font-medium flex items-center">
                <Code className="mr-2 h-6 w-6" /> Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {profileData?.skills?.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm py-1 px-3"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>}

        {visibleFields.experience!==0&&<motion.section className="mb-12" {...fadeInUp}>
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-xl font-medium flex items-center">
                <Briefcase className="mr-2 h-6 w-6" /> Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {profileData?.experience?.map((exp, index) => (
                  <div key={index} className="relative pl-8 pb-8">
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-primary"></div>
                    <div className="absolute left-0 -ml-[6.5px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                    <h3 className="text-lg font-serif">{exp.position}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exp.company} | {new Date(exp.startDate)?.getFullYear()} -{" "}
                      {exp.currentlyWorking
                        ? "Present"
                        : new Date(exp.endDate)?.getFullYear()}
                    </p>
                    <div className="mt-2">
                      <div className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>{exp.description}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>}

        {visibleFields.education!==0&&<motion.section className="mb-12" {...fadeInUp}>
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-xl font-medium flex items-center">
                <GraduationCap className="mr-2 h-6 w-6" /> Education
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {profileData?.education?.map((edu, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-4"></div>
                    <div>
                      <h3 className="font-serif text-lg">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution},{" "}
                        {new Date(edu.startDate)?.getFullYear()} -{" "}
                        {edu.currentlyStudying
                          ? "Present"
                          : new Date(edu.endDate)?.getFullYear()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>}

        {visibleFields.projects!==0&&<motion.section {...fadeInUp}>
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-xl font-medium flex items-center">
                <Folder className="mr-2 h-6 w-6" /> Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="project1" className="w-full">
                <TabsList
                  className="grid w-full"
                  style={{
                    gridTemplateColumns: `repeat(${profileData?.projects?.length}, 1fr)`,
                  }}
                >
                  {profileData?.projects?.map((project, index) => (
                    <TabsTrigger key={index} value={`project${index + 1}`}>
                      {project.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {profileData?.projects?.map((project, index) => (
                  <TabsContent key={index} value={`project${index + 1}`}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project?.technologies?.map((tech, i) => (
                            <Badge key={i} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <p className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary shrink-0 mr-2" />
                          <a
                            href={project.repositoryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Repository Link
                          </a>
                        </p>
                        {project.liveDemoLink && (
                          <p className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mr-2" />
                            <a
                              href={project.liveDemoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              Live Demo
                            </a>
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.section>}
      </div>
    </div>
  );
}
