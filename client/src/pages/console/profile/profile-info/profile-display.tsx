"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Edit, Mail, MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"

interface ProfileDisplayProps {
  info: {
    fullName: string
    designation: string
    location: string
    email: string
    phone: string
    avatar?: string
  }
  avatarFile: File | null
  user: any
  setIsEditing: (value: boolean) => void
}

export function ProfileDisplay({ info, avatarFile, user, setIsEditing }: ProfileDisplayProps) {
  const MotionCard = motion(Card)

  return (
    <MotionCard
      className="sticky top-8 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-md mx-auto overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute right-4 top-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-secondary/80 transition-colors"
          onClick={() => setIsEditing(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
      <CardHeader className="text-center pb-2 pt-8">
        <div className="relative w-32 h-32 mx-auto mb-6 group">
          <Avatar className="w-32 h-32 border-4 border-primary/10 ring-2 ring-background group-hover:ring-primary/30 transition-all duration-300">
            <AvatarImage
              src={avatarFile ? URL.createObjectURL(avatarFile) : user?.avatar || "/placeholder.svg"}
              alt={info.fullName}
              className="object-cover"
            />
            <AvatarFallback className="text-3xl font-bold bg-primary/5">
              {info.fullName
                ? info.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "?"}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>
        <CardTitle className="text-2xl font-bold mb-1">
          {info.fullName || (
            <Button variant="ghost" className="text-primary hover:text-primary/80" onClick={() => setIsEditing(true)}>
              + Add Full Name
            </Button>
          )}
        </CardTitle>
        <CardDescription className="text-base font-medium text-primary/80">
          {info.designation || (
            <Button
              variant="ghost"
              className="text-primary/60 hover:text-primary/80"
              onClick={() => setIsEditing(true)}
            >
              + Add Designation
            </Button>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 py-4">
          {[
            { icon: MapPin, value: info.location, label: "Location" },
            { icon: Mail, value: info.email, label: "Email" },
            { icon: Phone, value: info.phone, label: "Phone" },
          ].map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center p-3 rounded-lg hover:bg-secondary/40 transition-colors group"
            >
              <div className="bg-primary/5 p-2 rounded-md group-hover:bg-primary/10 transition-colors">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3 flex flex-col">
                <span className="text-xs text-muted-foreground">{label}</span>
                {value ? (
                  <span className="text-sm font-medium">{value}</span>
                ) : (
                  <Button
                    variant="ghost"
                    className="text-primary/60 hover:text-primary/80 h-6 p-0 justify-start"
                    onClick={() => setIsEditing(true)}
                  >
                    + Add {label}
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <Separator className="my-6" />
        <Button
          variant="outline"
          className="w-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300 font-medium"
        >
          Download DCV
        </Button>
      </CardContent>
    </MotionCard>
  )
}

