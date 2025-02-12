"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Edit, GraduationCap, Plus, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

interface Education {
  degree: string
  school: string
  period: string
}

interface EducationProps {
  initialEducation: Education[]
}

export function Education({ initialEducation }: EducationProps) {
  const [education, setEducation] = useState(initialEducation)

  const MotionCard = motion(Card)

  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Education</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Education</DialogTitle>
              <DialogDescription>Update your educational background here.</DialogDescription>
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
                        onClick={() => setEducation(education.filter((_, i) => i !== index))}
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
                          const newEducation = [...education]
                          newEducation[index].degree = e.target.value
                          setEducation(newEducation)
                        }}
                        placeholder="Degree"
                      />
                      <Input
                        value={edu.school}
                        onChange={(e) => {
                          const newEducation = [...education]
                          newEducation[index].school = e.target.value
                          setEducation(newEducation)
                        }}
                        placeholder="School"
                      />
                      <Input
                        value={edu.period}
                        onChange={(e) => {
                          const newEducation = [...education]
                          newEducation[index].period = e.target.value
                          setEducation(newEducation)
                        }}
                        placeholder="Period"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button onClick={() => setEducation([...education, { degree: "", school: "", period: "" }])}>
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
  )
}

