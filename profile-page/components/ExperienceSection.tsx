import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface Job {
  title: string
  company: string
  period: string
  responsibilities: string[]
}

interface ExperienceSectionProps {
  jobs: Job[]
}

export function ExperienceSection({ jobs }: ExperienceSectionProps) {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Briefcase className="mr-2 h-6 w-6" /> Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div key={index} className="relative pl-8 pb-8">
                <div className="absolute left-0 top-0 h-full w-0.5 bg-primary"></div>
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary"></div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {job.company} | {job.period}
                </p>
                <ul className="mt-2 space-y-1">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

