import { useState, useEffect } from "react"
import { Toaster } from "../../../components/ui/toaster"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Badge } from "../../../components/ui/badge"
import { ScrollArea } from "../../../components/ui/scroll-area"
import { Filter, Loader2, MessageSquare, Search, Star, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { useToast } from "../../../hooks/use-toast"
import { HelpDesk } from "../../../services"

interface User {
  _id: string
  fullName: string
  email: string
  avatar?: string
}

interface Feedback {
  _id: string
  rating: number
  description?: string
  createdAt: string
  user: User
}

const ITEMS_PER_PAGE = 10

export default function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [ratingFilter, setRatingFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {toast}=useToast()
  // Mock data for demonstration
  useEffect(() => {
    ;(async()=>{
      const response = await HelpDesk.getFeedbackAllFeedbacks()
      console.log(response)
      if(response.status === 200){
        setFeedback(response.data.data.feedbacks)
        setIsLoading(false)
      }else{
        setIsLoading(false)
        toast({
          title: "Error",
          description: response?.data?.message,
        })
      }

    })()
  }, [])

  // Apply filters
  useEffect(() => {
    let result = [...feedback]

    // Apply rating filter
    if (ratingFilter !== "all") {
      result = result.filter((item) => item.rating === Number.parseInt(ratingFilter))
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (item) =>
          item.description?.toLowerCase().includes(query) ||
          false ||
          item.user.fullName.toLowerCase().includes(query) ||
          item.user.email.toLowerCase().includes(query),
      )
    }

    setFilteredFeedback(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [ratingFilter, searchQuery, feedback])

  const totalPages = Math.ceil(filteredFeedback.length / ITEMS_PER_PAGE)
  const paginatedFeedback = filteredFeedback.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleViewDetails = (item: Feedback) => {
    setSelectedFeedback(item)
    setIsDialogOpen(true)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-100 text-green-800 border-green-200"
    if (rating >= 3) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  return (
    <ScrollArea className="overflow-y-auto">

    <div className="container mx-auto py-8 px-4 max-w-7xl h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          User Feedback Management
        </h1>
        <p className="text-muted-foreground mt-2">View and analyze user feedback and ratings</p>
      </div>

      <Card className="border-none shadow-lg mb-8">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
              <CardDescription>Filter feedback by rating or search for specific content</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search feedback or users..."
                  className="pl-9 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="w-full sm:w-auto">
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} {rating === 1 ? "Star" : "Stars"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-grow"></div>
            <div className="w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => {
                  setRatingFilter("all")
                  setSearchQuery("")
                }}
                >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5" />
                User Feedback
              </CardTitle>
              <CardDescription>
                {filteredFeedback.length} {filteredFeedback.length === 1 ? "feedback" : "feedbacks"} found
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredFeedback.length > 0 ? (
            <>
              <ScrollArea className="h-[600px] rounded-md">
                <Table>
                  <TableHeader className="sticky top-0 bg-background">
                    <TableRow>
                      <TableHead className="w-[180px]">User</TableHead>
                      <TableHead className="w-[120px]">Rating</TableHead>
                      <TableHead>Feedback</TableHead>
                      <TableHead className="w-[120px]">Date</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedFeedback.map((item) => (
                      <TableRow key={item._id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={item.user.avatarUrl} alt={item.user.fullName} />
                              <AvatarFallback>
                                {item.user.fullName.charAt(0)}
                                {item.user.fullName.split(" ")[1]?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{item.user.fullName}</p>
                              <p className="text-xs text-muted-foreground">{item.user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getRatingColor(item.rating)}>
                            <div className="flex items-center gap-1">{renderStars(item.rating)}</div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {item.comment ? (
                            <div className="max-w-[300px] truncate">
                              {item.comment
                              }
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm italic">No description provided</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetails(item)}
                            disabled={!item.description}
                            >
                            <MessageSquare className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>

              {totalPages > 1 && (
                <Pagination className="mt-4 mb-24">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Show 5 pages max with current page in the middle when possible
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }
                      
                      return (
                        <PaginationItem key={i}>
                          <PaginationLink onClick={() => setCurrentPage(pageNum)} isActive={currentPage === pageNum}>
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ThumbsUp className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No feedback found.</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feedback Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedFeedback && new Date(selectedFeedback.createdAt).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedFeedback.user.avatar} alt={selectedFeedback.user.name} />
                  <AvatarFallback>
                    {selectedFeedback.user.fullName.charAt(0)}
                    {selectedFeedback.user.fullName.split(" ")[1]?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedFeedback.user.fullName}</p>
                  <p className="text-sm text-muted-foreground">{selectedFeedback.user.email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Rating</p>
                <div className="flex gap-1">{renderStars(selectedFeedback.rating)}</div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Feedback</p>
                <p className="text-sm">{selectedFeedback.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
          </ScrollArea>
  )
}

