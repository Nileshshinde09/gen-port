"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"

const phoneRegex = /^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/

const schema = z.object({
  fullName: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(
      phoneRegex,
      "Please enter a valid phone number. Example formats: +1 (555) 555-5555, 555-555-5555, 5555555555",
    )
    .transform((val) => val.replace(/[^\d+]/g, "")),
})

interface ProfileFormProps {
  info: {
    fullName: string
    designation: string
    location: string
    phone: string
  }
  onSubmit: (data: any) => void
  onCancel: () => void
  children: ReactNode
  avatarFile: File | null
  user: any
}

export function ProfileForm({ info, onSubmit, onCancel, children }: ProfileFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: info,
    mode: "onChange",
  })

  return (
    <>
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              form.reset()
              onCancel()
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4">{children}</div>
        <CardDescription className="text-base">Update your personal information below</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-10" placeholder="Enter your full name" />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Designation</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-10" placeholder="Enter your designation" />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Location</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-10" placeholder="Enter your location" />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Phone</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-10" placeholder="Enter your phone number" />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3 justify-end pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  onCancel()
                }}
                className="hover:bg-secondary/80 transition-colors"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 transition-colors">
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  )
}

