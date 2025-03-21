import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { HelpDesk } from "@/services"
import { SUPPORT_ESSUE_TYPE } from "@/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Loader2,
  MessageSquareText,
  TicketIcon,
  Calendar,
  RefreshCw,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

type Ticket = {
  _id: string
  issueType: string
  content: string
  status: "Open" | "In Progress" | "Resolved"
  createdAt: string
  updatedAt: string
}

const ITEMS_PER_PAGE = 5

// Define Zod schema for the support ticket form
const ticketSchema = z.object({
  type: z.string({ required_error: "Please select an issue type." }).min(1, "Issue type is required."),
  content: z.string({ required_error: "Please provide a description." }).min(1, "Description is required."),
})

type TicketFormValues = z.infer<typeof ticketSchema>

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Initialize React Hook Form with Zod resolver
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      type: "",
      content: "",
    },
  })

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true)
      try {
        const response = await HelpDesk.getMyAllTickets()
        setTickets(response.data.data.data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch tickets. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchTickets()
  }, [toast])

  const handleSubmit = async (data: TicketFormValues) => {
    setIsLoading(true)
    try {
      const response = await HelpDesk.raiseSupportTicket({
        issueType: data.type,
        content: data.content,
      })

      if (response.status === 200) {
        const newTicket: any = response.data.data.data
        setTickets(newTicket)
        toast({
          title: "Success!",
          description: "Your support ticket has been created.",
        })
        form.reset()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit ticket. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const totalPages = Math.ceil(tickets.length / ITEMS_PER_PAGE)
  const paginatedTickets = tickets.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="h-4 w-4 text-amber-500" />
      case "In Progress":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin-slow" />
      case "Resolved":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      default:
        return <HelpCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
      case "Resolved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col items-center mb-8 space-y-2">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
          <MessageSquareText className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Customer Support</h1>
        <p className="text-muted-foreground text-center max-w-xl">
          We're here to help you with any issues or questions you might have
        </p>
      </div>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="tickets">Your Tickets</TabsTrigger>
          <TabsTrigger value="new">Create New Ticket</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <TicketIcon className="h-5 w-5 text-primary" />
                    Support Tickets
                  </CardTitle>
                  <CardDescription>Track the status of your existing support requests</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Loading your tickets...</p>
                  </div>
                </div>
              ) : tickets.length > 0 ? (
                <>
                  <ScrollArea className="h-[450px] rounded-md">
                    <Table>
                      <TableHeader className="sticky top-0 bg-background">
                        <TableRow>
                          <TableHead className="w-[150px]">Type</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="w-[120px] text-center">Status</TableHead>
                          <TableHead className="w-[120px]">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              Created
                            </div>
                          </TableHead>
                          <TableHead className="w-[120px]">
                            <div className="flex items-center gap-1">
                              <RefreshCw className="h-3.5 w-3.5" />
                              Updated
                            </div>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedTickets.map((ticket) => (
                          <TableRow key={ticket._id} className="group">
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary/70"></span>
                                {ticket.issueType}
                              </div>
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="max-w-[300px] truncate group-hover:text-primary transition-colors">
                                      {ticket.content}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom" className="max-w-md">
                                    <p className="max-w-xs">{ticket.content}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                variant="outline"
                                className={`inline-flex items-center gap-1 px-2 py-0.5 transition-colors ${getStatusColor(ticket.status)}`}
                              >
                                {getStatusIcon(ticket.status)}
                                <span>{ticket.status}</span>
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(ticket.createdAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(ticket.updatedAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>

                  {totalPages > 1 && (
                    <div className="mt-4 flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                          {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                              <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <TicketIcon className="h-8 w-8 text-muted-foreground/70" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No tickets yet</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    You haven't submitted any support tickets yet. Create a new ticket when you need assistance.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => document.querySelector('[data-value="new"]')}
                  >
                    Create your first ticket
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card className="border shadow-sm max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <TicketIcon className="h-5 w-5 text-primary" />
                New Support Ticket
              </CardTitle>
              <CardDescription>Submit a new ticket and our team will respond shortly</CardDescription>
              <Separator className="mt-2" />
            </CardHeader>
            <CardContent className="pt-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Issue Type</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select issue type" />
                            </SelectTrigger>
                            <SelectContent>
                              {SUPPORT_ESSUE_TYPE.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your issue in detail..."
                            value={field.value}
                            onChange={field.onChange}
                            className="min-h-[180px] resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => form.reset()} type="button">
                      Cancel
                    </Button>
                    <Button type="submit" className="min-w-[120px]" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Ticket"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}

