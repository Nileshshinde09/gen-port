import { useState } from "react";
import { PersonalInfo } from "./PersonalInfo";
import { AboutMe } from "./AboutMe";
import { Experience } from "./Experience";
import { Skills } from "./Skills";
import { Education } from "./Education";
import { Projects } from "./Projects";

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const initialPersonalInfo = {
    name: "John Doe",
    title: "Full Stack Developer",
    location: "New York, NY",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  };

  const initialAboutMe =
    "Passionate full-stack developer with 5+ years of experience in building scalable web applications. Proficient in JavaScript, React, Node.js, and cloud technologies. Always eager to learn and apply new technologies to solve complex problems.";


  const initialSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "Git",
    "AWS",
    "Docker",
  ];

  const initialEducation = [
    {
      institution: "TechNova Institute of Information Technology",
      degree: "Bachelor of Computer Science",
      fieldOfStudy: "Software Engineering",
      startDate: "2020-06-15T18:30:00.000Z",
      endDate: "2023-06-15T18:30:00.000Z",
      currentlyStudying: false,
      _id: "97bcd8abc67e12f243890dea",
    },
  ];

  const initialProjects = [
    {
      "name": "CodeSphere",
      "description": "A collaborative real-time coding platform with chat functionality.",
      "technologies": [
        "React.js",
        "Node.js",
        "Socket.io",
        "MongoDB"
      ],
      "socials": [
        "https://github.com/username"
      ],
      "repositoryLink": "https://github.com/username/codesphere",
      "liveDemoLink": "https://codesphere.live",
      "_id": "67add9ccc57c56f148191cf1"
    },
    {
      "name": "ShopWave",
      "description": "An e-commerce website offering a seamless shopping experience.",
      "technologies": [
        "Next.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS"
      ],
      "socials": [
        "https://github.com/username"
      ],
      "repositoryLink": "https://github.com/username/shopwave",
      "liveDemoLink": "https://shopwave.live",
      "_id": "67add9ccc57c56f148191cf2"
    },
    {
      "name": "EduLearn",
      "description": "An online learning platform with video tutorials and quizzes.",
      "technologies": [
        "React.js",
        "Firebase",
        "Node.js",
        "Material UI"
      ],
      "socials": [
        "https://github.com/username"
      ],
      "repositoryLink": "https://github.com/username/edulearn",
      "liveDemoLink": "https://edulearn.live",
      "_id": "67add9ccc57c56f148191cf3"
    },
    // {
    //   "name": "Taskly",
    //   "description": "A task management app for teams to collaborate efficiently.",
    //   "technologies": [
    //     "Vue.js",
    //     "Django",
    //     "PostgreSQL",
    //     "Bootstrap"
    //   ],
    //   "socials": [
    //     "https://github.com/username"
    //   ],
    //   "repositoryLink": "https://github.com/username/taskly",
    //   "liveDemoLink": "https://taskly.live",
    //   "_id": "67add9ccc57c56f148191cf4"
    // },
    // {
    //   "name": "FitTrack",
    //   "description": "A fitness tracking app with personalized workout plans and analytics.",
    //   "technologies": [
    //     "React Native",
    //     "Node.js",
    //     "MongoDB",
    //     "GraphQL"
    //   ],
    //   "socials": [
    //     "https://github.com/username"
    //   ],
    //   "repositoryLink": "https://github.com/username/fittrack",
    //   "liveDemoLink": "https://fittrack.live",
    //   "_id": "67add9ccc57c56f148191cf5"
    // }
  ]

  return (
    <div
      className={`min-h-screen  transition-colors py-8 duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <aside className="md:col-span-1">
            <PersonalInfo initialInfo={initialPersonalInfo} />
          </aside>
          <main className="md:col-span-2 space-y-6">
            <AboutMe initialAboutMe={initialAboutMe} />
            <Experience />
            <Skills initialSkills={initialSkills} />
            <Education initialEducation={initialEducation} />
            <Projects initialProjects={initialProjects} />
          </main>
        </div>
      </div>
    </div>
  );
}
