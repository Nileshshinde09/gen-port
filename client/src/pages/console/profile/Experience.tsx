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
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, Edit, Plus, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

interface Job {
  title: string
  company: string
  period: string
  responsibilities: string[]
}

interface ExperienceProps {
  initialExperience: Job[]
}

export function Experience({ initialExperience }: ExperienceProps) {
  const [experience, setExperience] = useState(initialExperience)

  const MotionCard = motion(Card)

  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Experience</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Experience</DialogTitle>
              <DialogDescription>Update your work experience here.</DialogDescription>
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
                        onClick={() => setExperience(experience.filter((_, i) => i !== index))}
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
                        const newExperience = [...experience]
                        newExperience[index].responsibilities = e.target.value.split("\n")
                        setExperience(newExperience)
                      }}
                      rows={3}
                    />
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={() =>
                  setExperience([...experience, { title: "", company: "", period: "", responsibilities: [] }])
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
                    index === 0 ? "border-primary" : "border-muted"
                  }`}
                >
                  <Briefcase className={`h-5 w-5 ${index === 0 ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                {index !== experience.length - 1 && <div className="w-px h-full bg-border"></div>}
              </div>
              <div className={index !== experience.length - 1 ? "pb-6" : ""}>
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
  )
}

