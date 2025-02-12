"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Edit } from "lucide-react"
import { motion } from "framer-motion"

interface AboutMeProps {
  initialAboutMe: string
}

export function AboutMe({ initialAboutMe }: AboutMeProps) {
  const [aboutMe, setAboutMe] = useState(initialAboutMe)

  const MotionCard = motion(Card)

  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">About Me</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit About Me</DialogTitle>
              <DialogDescription>Update your personal statement here.</DialogDescription>
            </DialogHeader>
            <Textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} rows={5} />
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
  )
}

