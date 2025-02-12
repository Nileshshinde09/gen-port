import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

interface Education {
  degree: string
  school: string
  period: string
}

interface EducationSectionProps {
  education: Education[]
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-2xl font-bold flex items-center">
            <GraduationCap className="mr-2 h-6 w-6" /> Education
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary mr-4"></div>
                <div>
                  <h3 className="font-semibold text-lg">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.school}, {edu.period}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

