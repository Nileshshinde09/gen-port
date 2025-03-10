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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Badge } from "../../../components/ui/badge"
import { ScrollArea } from "../../../components/ui/scroll-area"
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  HelpCircle,
  Loader2,
  MoreHorizontal,
  Search,
  TicketIcon,
  XCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { useToast } from "../../../hooks/use-toast"
import { HelpDesk } from "../../../services"

// Constants from the provided code
const SUPPORT_ESSUE_TYPE_ENUM = Object.freeze({
  TECHNICAL: "Technical",
  ACCOUNT: "Account",
  OTHER: "Other",
})

const SUPPORT_TICKET_STATUS_ENUM = Object.freeze({
  OPEN: "Open",
  INPROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
})

// Types
interface User {
  _id: string
  fullName: string
  email: string
  avatarUrl?: string

}

interface Ticket {
  _id: string
  issueType: string
  content: string
  status: keyof typeof SUPPORT_TICKET_STATUS_ENUM
  createdAt: string
  updatedAt: string
  user: User
}

const ITEMS_PER_PAGE = 10

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Mock data for demonstration
  useEffect(() => {
    ;(async()=>{
          const response = await HelpDesk.getMyAllTickets()
          console.log(response)
          if(response.status === 200){
            setTickets(response.data.data)
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
    let result = [...tickets]

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((ticket) => ticket.status === statusFilter)
    }

    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((ticket) => ticket.issueType === typeFilter)
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (ticket) =>
          ticket.content.toLowerCase().includes(query) ||
          ticket.user.fullName.toLowerCase().includes(query) ||
          ticket.user.email.toLowerCase().includes(query),
      )
    }

    setFilteredTickets(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [statusFilter, typeFilter, searchQuery, tickets])

  const handleChangeStatus = async (ticketId: string, newStatus: string) => {
    setIsLoading(true)

    try {
      const response = await HelpDesk.changeTicketState({ticketId, status:newStatus} )
      if(response.status === 200){
        const updatedTickets = tickets.map((ticket) =>
          ticket._id === ticketId
            ? {
                ...ticket,
                status: newStatus as keyof typeof SUPPORT_TICKET_STATUS_ENUM,
                updatedAt: new Date().toISOString(),
              }
            : ticket,
        )
  
        setTickets(updatedTickets)
        toast({
        title: "Status updated",
        description: `Ticket status changed to ${newStatus}`,
        variant: "success",
      })

      }else{
        toast({
          title: "Error",
          description: response?.data?.message,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update ticket status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE)
  const paginatedTickets = filteredTickets.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Closed":
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return <HelpCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200"
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getIssueTypeColor = (type: string) => {
    switch (type) {
      case "Technical":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Account":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "Other":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <ScrollArea className="flex-1 overflow-y-auto ">

    <div className="container mx-auto py-8 px-4 max-w-7xl h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Support Ticket Management
        </h1>
        <p className="text-muted-foreground mt-2">Manage and respond to customer support tickets</p>
      </div>

      <Card className="border-none shadow-lg mb-8">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
              <CardDescription>Filter tickets by status, type, or search for specific content</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets or users..."
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.values(SUPPORT_TICKET_STATUS_ENUM).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-auto">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {Object.values(SUPPORT_ESSUE_TYPE_ENUM).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
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
                    setStatusFilter("all")
                    setTypeFilter("all")
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
                <TicketIcon className="h-5 w-5" />
                Support Tickets
              </CardTitle>
              <CardDescription>
                {filteredTickets.length} {filteredTickets.length === 1 ? "ticket" : "tickets"} found
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredTickets.length > 0 ? (
              <>
              <ScrollArea className="h-[600px] rounded-md">
                <Table>
                  <TableHeader className="sticky top-0 bg-background">
                    <TableRow>
                      <TableHead className="w-[180px]">User</TableHead>
                      <TableHead className="w-[120px]">Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="w-[120px]">Created</TableHead>
                      <TableHead className="w-[120px]">Updated</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTickets.map((ticket) => (
                      <TableRow key={ticket._id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={ticket.user.avatarUrl} alt={ticket.user.fullName} />
                              <AvatarFallback>
                                {ticket.user.fullName.charAt(0)}
                                {ticket.user.fullName.split(" ")[1]?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{ticket.user.fullName}</p>
                              <p className="text-xs text-muted-foreground">{ticket.user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getIssueTypeColor(ticket.issueType)}>
                            {ticket.issueType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[300px] truncate" title={ticket.content}>
                            {ticket.content}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`flex items-center gap-1 ${getStatusColor(ticket.status)}`}
                            >
                            {getStatusIcon(ticket.status)}
                            {ticket.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(ticket.updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {Object.values(SUPPORT_TICKET_STATUS_ENUM).map((status) => (
                                  <DropdownMenuItem
                                  key={status}
                                  onClick={() => handleChangeStatus(ticket._id, status)}
                                  disabled={ticket.status === status}
                                  className={ticket.status === status ? "bg-muted" : ""}
                                  >
                                  {getStatusIcon(status)}
                                  <span className="ml-2">Mark as {status}</span>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>

              {totalPages > 1 && (
                  <Pagination className="mt-4 mb-28">
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
              <TicketIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No support tickets found.</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your filters</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Toaster />
    </div>
          </ScrollArea>
  )
}

