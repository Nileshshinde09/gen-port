import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Folder, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface Project {
  name: string
  description: string
  details: string[]
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Folder className="mr-2 h-6 w-6" /> Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="project1" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {projects.map((project, index) => (
                <TabsTrigger key={index} value={`project${index + 1}`}>
                  {project.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {projects.map((project, index) => (
              <TabsContent key={index} value={`project${index + 1}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {project.details.map((detail, i) => (
                      <p key={i} className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>{detail}</span>
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </motion.section>
  )
}

