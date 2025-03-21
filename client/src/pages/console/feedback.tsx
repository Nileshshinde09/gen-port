import { useState } from "react"
import { Star, MessageSquareHeart, Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { HelpDesk } from "@/services"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Define the Zod schema
const feedbackSchema = z.object({
  rating: z
    .number({ required_error: "Please select a rating." })
    .min(1, "Rating must be between 1 and 5.")
    .max(5, "Rating must be between 1 and 5."),
  blogContent: z.string(),
})

type FeedbackFormValues = z.infer<typeof feedbackSchema>

export default function FeedbackPage() {
  const [rating, setRating] = useState<number | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoverRating, setHoverRating] = useState<number | undefined>(undefined)
  const { toast } = useToast()

  // Initialize React Hook Form with Zod resolver
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: undefined,
      blogContent: "",
    },
  })

  const handleSubmit = async (data: FeedbackFormValues) => {
    setIsSubmitting(true)
    try {
      const response = await HelpDesk.sendFeedback({
        comment: data.blogContent,
        rating: data.rating,
      })
      if (response.status === 200) {
        toast({
          title: "Thank you!",
          description: "Your feedback has been submitted successfully.",
        })
      }
      setRating(undefined)
      form.reset({ rating: undefined, blogContent: "" })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRatingLabel = (rating: number | undefined) => {
    if (!rating) return ""

    const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"]
    return labels[rating - 1]
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <div className="flex flex-col items-center mb-8 space-y-2">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
          <MessageSquareHeart className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Your Feedback Matters</h1>
        <p className="text-muted-foreground text-center max-w-xl">
          Help us improve your experience by sharing your thoughts and suggestions
        </p>
      </div>

      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">How was your experience?</CardTitle>
          <CardDescription>We value your opinion and use it to make our service better for you</CardDescription>
          <Separator className="mt-2" />
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormControl>
                      <div className="flex flex-col items-center space-y-4">
                        <div className="flex justify-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(undefined)}
                              onClick={() => {
                                setRating(star)
                                field.onChange(star) // Update form value
                              }}
                              className={`text-4xl focus:outline-none transition-all duration-200 hover:scale-110 ${
                                (hoverRating !== undefined ? star <= hoverRating : rating && star <= rating)
                                  ? "text-yellow-400"
                                  : "text-gray-200"
                              }`}
                            >
                              <Star
                                fill={
                                  (hoverRating !== undefined ? star <= hoverRating : rating && star <= rating)
                                    ? "currentColor"
                                    : "none"
                                }
                                strokeWidth={1.5}
                                className="h-10 w-10"
                              />
                            </button>
                          ))}
                        </div>
                        {(rating || hoverRating) && (
                          <div className="text-center animate-fade-in">
                            <span className="text-lg font-medium text-primary">
                              {getRatingLabel(hoverRating || rating)}
                            </span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="blogContent"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Additional comments</p>
                          <p className="text-xs text-muted-foreground">{field.value?.length || 0} characters</p>
                        </div>
                        <Textarea
                          placeholder="Tell us more about your experience..."
                          value={field.value || ""}
                          onChange={field.onChange}
                          className="min-h-[150px] resize-none"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" className="min-w-[140px]" disabled={!rating || isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t py-4">
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Your feedback helps us create a better experience for everyone. Thank you for taking the time to share your
            thoughts.
          </p>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}

