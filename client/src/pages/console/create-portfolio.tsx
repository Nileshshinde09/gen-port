"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { HomeIcon as House, PanelsTopLeft, ExternalLink, Search, Plus, Star, StarOff, Sparkles } from "lucide-react"
import { FiUpload } from "react-icons/fi"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Mock data for DefaultPortfolios
const DefaultPortfolios = {
  Portfolio01: { tags: ["Clean", "Professional"], popularity: 4.9 },
  Portfolio02: { tags: ["Artistic", "Bold"], popularity: 4.7 },
  Portfolio03: { tags: ["Technical", "Code"], popularity: 4.8 },
  Portfolio04: { tags: ["Visual", "Gallery"], popularity: 4.6 },
  Portfolio05: { tags: ["Elegant", "Minimal"], popularity: 4.5 },
  Portfolio06: { tags: ["Colorful", "Modern"], popularity: 4.8 },
  Portfolio07: { tags: ["Structured", "Clean"], popularity: 4.4 },
}

// Mock data for ModifiablePortfolios
const ModifiablePortfolios = {
  "My Portfolio": { lastEdited: "2 days ago", status: "Published" },
  "Client Project": { lastEdited: "1 week ago", status: "Draft" },
  "Personal Blog": { lastEdited: "3 days ago", status: "Published" },
  "Photography Showcase": { lastEdited: "Just now", status: "Draft" },
}

const Portfolio = ({
  portfolio_type,
}: {
  portfolio_type: "default" | "modifiable"
}) => {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])

  const colorPalette = [
    "from-amber-300 to-orange-500",
    "from-emerald-300 to-green-500",
    "from-indigo-400 to-purple-600",
    "from-sky-300 to-blue-500",
    "from-rose-300 to-pink-600",
    "from-teal-300 to-cyan-600",
    "from-violet-300 to-purple-500",
    "from-yellow-300 to-amber-500",
    "from-red-300 to-rose-500",
  ]

  const getSequentialColor = (index: number): string => {
    return colorPalette[index % colorPalette.length]
  }

  const handleNavDefautlPort = (url: string) => {
    navigate(url)
  }

  const toggleFavorite = (name: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setFavorites((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  const filteredPortfolios =
    portfolio_type === "default"
      ? Object.keys(DefaultPortfolios).filter(
          (key) =>
            key.toLowerCase().includes(searchTerm.toLowerCase()) ||
            DefaultPortfolios[key as keyof typeof DefaultPortfolios].tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        )
      : Object.keys(ModifiablePortfolios).filter((key) => key.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Card className="border-none shadow-xl bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {portfolio_type === "default" ? "Default Templates" : "My Portfolios"}
            </CardTitle>
            <CardDescription className="text-base mt-1">
              {portfolio_type === "default"
                ? "Choose from our carefully crafted portfolio templates to get started quickly."
                : "Manage and edit your custom portfolio projects."}
            </CardDescription>
          </div>
          {portfolio_type === "modifiable" && (
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Create New
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder={`Search ${portfolio_type === "default" ? "templates" : "portfolios"}...`}
            className="pl-10 bg-background/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
            <AnimatePresence>
              {filteredPortfolios.map((key, index) => {
                const sequentialColor = getSequentialColor(index)
                const isFavorite = favorites.includes(key)

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className={`relative overflow-hidden rounded-2xl border border-border/40 shadow-lg`}
                    onClick={() => handleNavDefautlPort(`/striver/${key}?demo=true`)}
                  >
                    <div
                      className={`h-40 bg-gradient-to-br ${sequentialColor} flex items-center justify-center p-6 relative`}
                    >
                      <motion.div
                        className="absolute inset-0 opacity-20"
                        animate={{
                          backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                        style={{
                          backgroundImage: 'url("/placeholder.svg?height=200&width=200")',
                          backgroundSize: "30%",
                        }}
                      />

                      <motion.img
                        src="/31.png"
                        alt={`${key} template`}
                        className="h-24 w-24 rounded-full shadow-lg object-cover z-10"
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 20,
                          ease: "linear",
                        }}
                      />

                      <button
                        onClick={(e) => toggleFavorite(key, e)}
                        className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors z-20"
                      >
                        {isFavorite ? (
                          <Star size={18} className="text-yellow-300 fill-yellow-300" />
                        ) : (
                          <StarOff size={18} className="text-white" />
                        )}
                      </button>
                    </div>

                    <div className="p-4 bg-card">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{key}</h3>
                          {portfolio_type === "default" ? (
                            <div className="flex gap-1 mt-2 flex-wrap">
                              {DefaultPortfolios[key as keyof typeof DefaultPortfolios].tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground mt-1">
                              Last edited: {ModifiablePortfolios[key as keyof typeof ModifiablePortfolios].lastEdited}
                            </p>
                          )}
                        </div>

                        <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                          <ExternalLink size={16} />
                        </Button>
                      </div>

                      {portfolio_type === "default" && (
                        <div className="flex items-center mt-3 text-sm text-muted-foreground">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Sparkles
                                key={i}
                                size={14}
                                className={
                                  i < Math.floor(DefaultPortfolios[key as keyof typeof DefaultPortfolios].popularity)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                          <span className="ml-1">
                            {DefaultPortfolios[key as keyof typeof DefaultPortfolios].popularity}
                          </span>
                        </div>
                      )}

                      {portfolio_type === "modifiable" && (
                        <Badge
                          variant={
                            ModifiablePortfolios[key as keyof typeof ModifiablePortfolios].status === "Published"
                              ? "default"
                              : "outline"
                          }
                          className="mt-3"
                        >
                          {ModifiablePortfolios[key as keyof typeof ModifiablePortfolios].status}
                        </Badge>
                      )}
                    </div>

                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors z-20">
                      <FiUpload size={18} className="text-white" />
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {filteredPortfolios.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-16 text-center"
              >
                <Search size={48} className="text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any {portfolio_type === "default" ? "templates" : "portfolios"} matching your search.
                  Try using different keywords or browse all options.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              </motion.div>
            )}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4">
        <div>
          {filteredPortfolios.length} {portfolio_type === "default" ? "templates" : "portfolios"} available
        </div>
        {portfolio_type === "default" && (
          <a href="#" className="text-primary hover:underline flex items-center gap-1">
            <span>Request a template</span>
            <ExternalLink size={14} />
          </a>
        )}
      </CardFooter>
    </Card>
  )
}

const CreatePortfolio = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PortfolioTab>
        <TabsContent value="default" className="mt-4">
          <Portfolio portfolio_type="default" />
        </TabsContent>
        <TabsContent value="modifiable" className="mt-4">
          <Portfolio portfolio_type="modifiable" />
        </TabsContent>
      </PortfolioTab>
    </div>
  )
}

function PortfolioTab({ children }: { children: React.ReactNode }) {
  return (
    <Tabs defaultValue="default" className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Portfolio Creator</h1>
          <p className="text-muted-foreground">Create, manage, and customize your professional portfolios</p>
        </div>

        <TabsList className="p-1">
          <TabsTrigger value="default" className="relative px-4 py-2 data-[state=active]:bg-primary/10">
            <House className="mr-2 opacity-70" size={16} strokeWidth={2} aria-hidden="true" />
            <span>Default</span>
            <motion.div
              className="absolute inset-0 bg-primary/5 rounded-md -z-10"
              layoutId="tab-background"
              transition={{ type: "spring", duration: 0.5 }}
              style={{ display: "var(--display-active)" }}
            />
          </TabsTrigger>
          <TabsTrigger value="modifiable" className="relative px-4 py-2 data-[state=active]:bg-primary/10">
            <PanelsTopLeft className="mr-2 opacity-70" size={16} strokeWidth={2} aria-hidden="true" />
            <span>Modifiable</span>
            <motion.div
              className="absolute inset-0 bg-primary/5 rounded-md -z-10"
              layoutId="tab-background"
              transition={{ type: "spring", duration: 0.5 }}
              style={{ display: "var(--display-active)" }}
            />
          </TabsTrigger>
        </TabsList>
      </div>
      <ScrollArea className="w-full">
        <ScrollBar orientation="horizontal" />
        {children}
      </ScrollArea>
    </Tabs>
  )
}

export default CreatePortfolio

