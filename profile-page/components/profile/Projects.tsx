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
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Plus, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

interface Project {
  name: string
  description: string
  details: string[]
}

interface ProjectsProps {
  initialProjects: Project[]
}

export function Projects({ initialProjects }: ProjectsProps) {
  const [projects, setProjects] = useState(initialProjects)

  const MotionCard = motion(Card)

  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Projects</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Edit Projects</DialogTitle>
              <DialogDescription>Update your project information here.</DialogDescription>
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
                        onClick={() => setProjects(projects.filter((_, i) => i !== index))}
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
                          const newProjects = [...projects]
                          newProjects[index].name = e.target.value
                          setProjects(newProjects)
                        }}
                        placeholder="Project Name"
                      />
                      <Input
                        value={project.description}
                        onChange={(e) => {
                          const newProjects = [...projects]
                          newProjects[index].description = e.target.value
                          setProjects(newProjects)
                        }}
                        placeholder="Project Description"
                      />
                      <Textarea
                        value={project.details.join("\n")}
                        onChange={(e) => {
                          const newProjects = [...projects]
                          newProjects[index].details = e.target.value.split("\n")
                          setProjects(newProjects)
                        }}
                        placeholder="Project Details (one per line)"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button onClick={() => setProjects([...projects, { name: "", description: "", details: [] }])}>
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
                  <CardDescription>{project.description}</CardDescription>
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
  )
}

