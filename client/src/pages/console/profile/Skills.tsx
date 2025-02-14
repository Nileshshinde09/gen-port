"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Edit, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";

interface SkillsProps {
  initialSkills: string[];
}

export function Skills({ initialSkills }: SkillsProps) {
  const [skills, setSkills] = useState(initialSkills);
  const [isOpen, setIsOpen] = useState(false);
  const MotionCard = motion(Card);

  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Skills</CardTitle>
      </CardHeader>
      {isOpen ? (
        <CardContent >
          <X
            onClick={() => {
              setIsOpen(false);
            }}
            className="absolute right-7 top-7 cursor-pointer"
          />
          <CardHeader>
            <CardDescription>
              Add or remove skills from your profile.
            </CardDescription>
          </CardHeader>
          <div className="space-y-4 max-w-xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {skill}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-4 w-4 p-0"
                    type="button"
                    onClick={() =>
                      setSkills(skills.filter((_, i) => i !== index))
                    }
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 mb-10">
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
                type="button"
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
          <CardFooter>
            <Button type="submit" className="mt-10 w-full max-w-2xl mx-auto">Save changes</Button>
          </CardFooter>
        </CardContent>
      ) : (
        <CardContent>
          <Button
            className="absolute right-7 top-7"
            onClick={() => setIsOpen(true)}
            variant="ghost"
            size="sm"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <div className="flex flex-wrap gap-2 mx-auto max-w-2xl">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </MotionCard>
  );
}
