import { useState } from "react";
import { PersonalInfo } from "./PersonalInfo";
import { AboutMe } from "./AboutMe";
import { Experience } from "./Experience";
import { Skills } from "./Skills";
import { Education } from "./Education";
import { Projects } from "./Projects";

export default function ProfilePage() {

  return (
    <div
      className={`min-h-screen  transition-colors py-8 duration-300`}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <aside className="md:col-span-1">
            <PersonalInfo/>
          </aside>
          <main className="md:col-span-2 space-y-6">
            <AboutMe />
            <Experience />
            <Skills  />
            <Education />
            <Projects />
          </main>
        </div>
      </div>
    </div>
  );
}
