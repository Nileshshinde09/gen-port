import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface DarkModeToggleProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export function DarkModeToggle({ darkMode, toggleDarkMode }: DarkModeToggleProps) {
  return (
    <div className="flex justify-end mb-4">
      <Switch checked={darkMode} onCheckedChange={toggleDarkMode} className="mr-2" />
      {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </div>
  )
}

