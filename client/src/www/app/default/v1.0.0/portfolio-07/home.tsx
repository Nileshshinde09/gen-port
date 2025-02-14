import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, GraduationCap, Mail, MapPin, Moon, Phone, Sun, Code, Folder, ChevronRight } from "lucide-react"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  // Add dummy data based on schema
  const profileData = {
    email: "nilesh@gmail.com",
    avatar: null,
    designation: "Full Stack Developer",
    location: "India",
    fullName: "Nilesh Shinde",
    bio: "Im nick a full stack web dev.",
    phone: "+91 9876543210", // Added dummy phone number
    skills: ["js", "ts", "python"],
    education: [
      {
        institution: "DMS Mandals college of Computer Applications",
        degree: "BCA",
        fieldOfStudy: "Computer Applications",
        startDate: "2021-08-12T18:30:00.000Z",
        endDate: "2024-07-12T18:30:00.000Z",
        currentlyStudying: false,
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
      }
    ]
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <div
      className={` min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-neutral-950 dark:to-neutral-950 transition-colors duration-300 ${darkMode ? "dark" : ""}`}
    >
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <motion.div className="flex justify-end mb-4" {...fadeInUp}>
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} className="mr-2" />
          {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.div>

        <motion.header className="text-center mb-12" {...fadeInUp}>
          <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary">
            <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.fullName} />
            <AvatarFallback>{profileData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-medium mb-2">{profileData.fullName}</h1>
          <p className="text-lg text-muted-foreground mb-4">{profileData.designation}</p>
          <div className="flex justify-center space-x-4 text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{profileData.location}</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <span>{profileData.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              <span>{profileData.phone}</span>
            </div>
          </div>
        </motion.header>

        <motion.section className="mb-12" {...fadeInUp}>
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-xl font-medium flex items-center">
                <Code className="mr-2 h-6 w-6" /> Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section className="mb-12" {...fadeInUp}>
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-xl font-medium flex items-center">
                <Briefcase className="mr-2 h-6 w-6" /> Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="relative pl-8 pb-8">
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-primary"></div>
                    <div className="absolute left-0 -ml-[6.5px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                    <h3 className="text-lg font-serif">{exp.position}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exp.company} | {new Date(exp.startDate).getFullYear()} - {exp.currentlyWorking ? 'Present' : new Date(exp.endDate).getFullYear()}
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
        </motion.section>

        <motion.section className="mb-12" {...fadeInUp}>
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-xl font-medium flex items-center">
                <GraduationCap className="mr-2 h-6 w-6" /> Education
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-4"></div>
                    <div>
                      <h3 className="font-serif text-lg">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution}, {new Date(edu.startDate).getFullYear()} - {edu.currentlyStudying ? 'Present' : new Date(edu.endDate).getFullYear()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section {...fadeInUp}>
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-xl font-medium flex items-center">
                <Folder className="mr-2 h-6 w-6" /> Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="project1" className="w-full">
                <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${profileData.projects.length}, 1fr)` }}>
                  {profileData.projects.map((project, index) => (
                    <TabsTrigger key={index} value={`project${index + 1}`}>{project.name}</TabsTrigger>
                  ))}
                </TabsList>
                {profileData.projects.map((project, index) => (
                  <TabsContent key={index} value={`project${index + 1}`}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, i) => (
                            <Badge key={i} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                        <p className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary shrink-0 mr-2" />
                          <a href={project.repositoryLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Repository Link
                          </a>
                        </p>
                        {project.liveDemoLink && (
                          <p className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mr-2" />
                            <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
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
        </motion.section>
      </div>
    </div>
  )
}
