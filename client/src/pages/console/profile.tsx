import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Briefcase,
  Plus,
  Trash2,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
const ProfilePage = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    title: "Full Stack Developer",
    location: "New York, NY",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://via.placeholder.com/150",
  });
  const [aboutMe, setAboutMe] = useState(
    "Passionate full-stack developer with 5+ years of experience in building scalable web applications. Proficient in JavaScript, React, Node.js, and cloud technologies. Always eager to learn and apply new technologies to solve complex problems."
  );
  const [experience, setExperience] = useState([
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      period: "2020 - Present",
      responsibilities: [
        "Led the development of a high-traffic e-commerce platform",
        "Implemented microservices architecture to improve scalability",
        "Mentored junior developers and conducted code reviews",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "WebSolutions Co.",
      period: "2018 - 2020",
      responsibilities: [
        "Developed and maintained multiple client websites",
        "Implemented responsive designs and improved site performance",
        "Collaborated with design team to create intuitive user interfaces",
      ],
    },
  ]);
  const [skills, setSkills] = useState([
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "Git",
    "AWS",
    "Docker",
  ]);
  const [education, setEducation] = useState([
    {
      degree: "Master of Computer Science",
      school: "Stanford University",
      period: "2018-2020",
    },
    {
      degree: "Bachelor of Science in Computer Engineering",
      school: "MIT",
      period: "2014-2018",
    },
  ]);
  const [projects, setProjects] = useState([
    {
      name: "E-commerce Platform",
      description: "Full-stack online shopping solution",
      details: [
        "Developed a scalable e-commerce platform using React, Node.js, and MongoDB.",
        "Key features: user authentication, product catalog, shopping cart, and payment integration.",
      ],
    },
    {
      name: "AI-powered Chatbot",
      description: "Intelligent conversational agent",
      details: [
        "Created a chatbot using natural language processing techniques and machine learning algorithms.",
        "Implemented intent recognition, entity extraction, and context management for human-like interactions.",
      ],
    },
    {
      name: "Mobile Fitness App",
      description: "Cross-platform health tracking solution",
      details: [
        "Built a cross-platform mobile app for fitness tracking using React Native and Firebase.",
        "Features include workout planning, progress tracking, and social sharing capabilities.",
      ],
    },
  ]);

  const MotionCard = motion(Card);

  return (
    <div
      className={`min-h-screen py-8 transition-colors duration-300`}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <aside className="md:col-span-1">
            <MotionCard
              className="sticky top-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardHeader className="text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary">
                  <AvatarImage src={personalInfo.avatar||"/placeholder.svg"}  alt={personalInfo.name} />
                  <AvatarFallback>
                    {personalInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl font-normal">
                  {personalInfo.name}
                </CardTitle>
                <CardDescription className="text-lg">
                  {personalInfo.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{personalInfo.phone}</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center">
                  <Button variant="outline" className="w-full">
                    Download CV
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="ml-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Personal Information</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={personalInfo.name}
                            onChange={(e) =>
                              setPersonalInfo({
                                ...personalInfo,
                                name: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input
                            id="title"
                            value={personalInfo.title}
                            onChange={(e) =>
                              setPersonalInfo({
                                ...personalInfo,
                                title: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="location" className="text-right">
                            Location
                          </Label>
                          <Input
                            id="location"
                            value={personalInfo.location}
                            onChange={(e) =>
                              setPersonalInfo({
                                ...personalInfo,
                                location: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="email"
                            value={personalInfo.email}
                            onChange={(e) =>
                              setPersonalInfo({
                                ...personalInfo,
                                email: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            value={personalInfo.phone}
                            onChange={(e) =>
                              setPersonalInfo({
                                ...personalInfo,
                                phone: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </MotionCard>
          </aside>
          <main className="md:col-span-2 space-y-6">
            <MotionCard
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-normal">About Me</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit About Me</DialogTitle>
                      <DialogDescription>
                        Update your personal statement here.
                      </DialogDescription>
                    </DialogHeader>
                    <Textarea
                      value={aboutMe}
                      onChange={(e: any) => setAboutMe(e.target.value)}
                      rows={5}
                    />
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{aboutMe}</p>
              </CardContent>
            </MotionCard>

            <MotionCard
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-normal">
                  Experience
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Edit Experience</DialogTitle>
                      <DialogDescription>
                        Update your work experience here.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {experience.map((job, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <div className="flex justify-between">
                              <CardTitle>{job.title}</CardTitle>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  setExperience(
                                    experience.filter((_, i) => i !== index)
                                  )
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <CardDescription>
                              {job.company} | {job.period}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Textarea
                              value={job.responsibilities.join("\n")}
                              onChange={(e) => {
                                const newExperience = [...experience];
                                newExperience[index].responsibilities =
                                  e.target.value.split("\n");
                                setExperience(newExperience);
                              }}
                              rows={3}
                            />
                          </CardContent>
                        </Card>
                      ))}
                      <Button
                        onClick={() =>
                          setExperience([
                            ...experience,
                            {
                              title: "",
                              company: "",
                              period: "",
                              responsibilities: [],
                            },
                          ])
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Experience
                      </Button>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {experience.map((job, index) => (
                    <div key={index} className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                            index === 0
                              ? "border-muted h-[52px]"
                              : "border-muted"
                          }`}
                        >
                          <Briefcase
                            className={`h-5 w-5 ${
                              index === 0
                                ? "text-muted-foreground"
                                : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        {index !== experience.length - 1 && (
                          <div className="w-px h-full bg-border"></div>
                        )}
                      </div>
                      <div
                        className={
                          index !== experience.length - 1 ? "pb-6" : ""
                        }
                      >
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {job.company} | {job.period}
                        </p>
                        <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
                          {job.responsibilities.map((resp, i) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </MotionCard>

            <MotionCard
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-normal">Skills</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Skills</DialogTitle>
                      <DialogDescription>
                        Add or remove skills from your profile.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-sm"
                          >
                            <Check
                              className="text-emerald-500"
                              size={12}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                            {skill}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-2 h-4 w-4 p-0"
                              onClick={() =>
                                setSkills(skills.filter((_, i) => i !== index))
                              }
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a new skill"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              setSkills([...skills, e.currentTarget.value]);
                              e.currentTarget.value = "";
                            }
                          }}
                        />
                        <Button
                          onClick={() => {
                            const input = document.querySelector(
                              'input[placeholder="Add a new skill"]'
                            ) as HTMLInputElement;
                            if (input.value) {
                              setSkills([...skills, input.value]);
                              input.value = "";
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </MotionCard>

            <MotionCard
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-normal">Education</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Edit Education</DialogTitle>
                      <DialogDescription>
                        Update your educational background here.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {education.map((edu, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <div className="flex justify-between">
                              <CardTitle>{edu.degree}</CardTitle>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  setEducation(
                                    education.filter((_, i) => i !== index)
                                  )
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <CardDescription>
                              {edu.school} | {edu.period}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                              <Input
                                value={edu.degree}
                                onChange={(e) => {
                                  const newEducation = [...education];
                                  newEducation[index].degree = e.target.value;
                                  setEducation(newEducation);
                                }}
                                placeholder="Degree"
                              />
                              <Input
                                value={edu.school}
                                onChange={(e) => {
                                  const newEducation = [...education];
                                  newEducation[index].school = e.target.value;
                                  setEducation(newEducation);
                                }}
                                placeholder="School"
                              />
                              <Input
                                value={edu.period}
                                onChange={(e) => {
                                  const newEducation = [...education];
                                  newEducation[index].period = e.target.value;
                                  setEducation(newEducation);
                                }}
                                placeholder="Period"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button
                        onClick={() =>
                          setEducation([
                            ...education,
                            { degree: "", school: "", period: "" },
                          ])
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Education
                      </Button>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <div className="flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">{edu.degree}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground ml-7">
                        {edu.school}, {edu.period}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </MotionCard>

            <MotionCard
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-normal">Projects</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Edit Projects</DialogTitle>
                      <DialogDescription>
                        Update your project information here.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {projects.map((project, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <div className="flex justify-between">
                              <CardTitle>{project.name}</CardTitle>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  setProjects(
                                    projects.filter((_, i) => i !== index)
                                  )
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <Input
                                value={project.name}
                                onChange={(e) => {
                                  const newProjects = [...projects];
                                  newProjects[index].name = e.target.value;
                                  setProjects(newProjects);
                                }}
                                placeholder="Project Name"
                              />
                              <Input
                                value={project.description}
                                onChange={(e) => {
                                  const newProjects = [...projects];
                                  newProjects[index].description =
                                    e.target.value;
                                  setProjects(newProjects);
                                }}
                                placeholder="Project Description"
                              />
                              <Textarea
                                value={project.details.join("\n")}
                                onChange={(e) => {
                                  const newProjects = [...projects];
                                  newProjects[index].details =
                                    e.target.value.split("\n");
                                  setProjects(newProjects);
                                }}
                                placeholder="Project Details (one per line)"
                                rows={3}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button
                        onClick={() =>
                          setProjects([
                            ...projects,
                            { name: "", description: "", details: [] },
                          ])
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Project
                      </Button>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={projects[0]?.name} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    {projects.map((project, index) => (
                      <TabsTrigger key={index} value={project.name}>
                        {project.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {projects.map((project, index) => (
                    <TabsContent key={index} value={project.name}>
                      <Card>
                        <CardHeader>
                          <CardTitle>{project.name}</CardTitle>
                          <CardDescription>
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {project.details.map((detail, i) => (
                            <p key={i}>{detail}</p>
                          ))}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </MotionCard>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
