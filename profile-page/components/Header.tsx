import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"

interface HeaderProps {
  name: string
  title: string
  location: string
  email: string
  phone: string
}

export function Header({ name, title, location, email, phone }: HeaderProps) {
  return (
    <motion.header
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary">
        <AvatarImage src="/placeholder.svg" alt={name} />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-4xl font-bold mb-2">{name}</h1>
      <p className="text-xl text-muted-foreground mb-4">{title}</p>
      <div className="flex justify-center space-x-4 text-muted-foreground">
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center">
          <Mail className="mr-2 h-4 w-4" />
          <span>{email}</span>
        </div>
        <div className="flex items-center">
          <Phone className="mr-2 h-4 w-4" />
          <span>{phone}</span>
        </div>
      </div>
    </motion.header>
  )
}

