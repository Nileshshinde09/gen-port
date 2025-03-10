// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Edit, GraduationCap, Plus, Trash2, X } from "lucide-react";
// import { motion } from "framer-motion";
// import { useForm, useFieldArray } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useAppSelector } from "@/store/hooks";
// import { Skeleton } from "@/components/ui/skeleton"
// import { Auth } from "@/services";
// import { toast } from "@/hooks/use-toast";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";

// const educationSchema = z.object({
//   education: z.array(
//     z.object({
//       institution: z.string().min(1, "Institution is required"),
//       degree: z.string().min(1, "Degree is required"),
//       fieldOfStudy: z.string().min(1, "Field of study is required"),
//       startDate: z.date({
//         required_error: "Start date is required",
//       }),
//       endDate: z.date().optional().nullable(),
//       currentlyStudying: z.boolean().default(false),
//     })
//   ),
// });

// type EducationFormValues = z.infer<typeof educationSchema>;

// const LoadingSkeleton = () => {
//   return (
//     <div className="space-y-4">
//       {/* User Profile Header Skeleton */}
//       <div className="flex items-center space-x-4">
//         <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar */}
//         <div className="space-y-2">
//           <Skeleton className="h-4 w-[200px]" /> {/* Name */}
//           <Skeleton className="h-4 w-[150px]" /> {/* Email/subtitle */}
//         </div>
//       </div>

//       {/* Content Skeleton */}
//       <div className="space-y-3">
//         <Skeleton className="h-4 w-full" />
//         <Skeleton className="h-4 w-full" />
//         <Skeleton className="h-4 w-3/4" />
//       </div>
//     </div>
//   )
// }

// export function Education() {
//   const [open, setOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const user = useAppSelector((state: any) => state.user.userData);
//   const form = useForm<EducationFormValues>({
//     resolver: zodResolver(educationSchema),
//     defaultValues: {
//       education: user?.education?.map((edu: any) => ({
//         ...edu,
//         startDate: edu.startDate ? new Date(edu.startDate) : new Date(),
//         endDate: edu.endDate ? new Date(edu.endDate) : null,
//         currentlyStudying: edu.currentlyStudying || false,
//       })) || [],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "education",
//   });

//   const MotionCard = motion(Card);

//   const handleSubmit = async (values: EducationFormValues) => {
//     try {
//       setIsLoading(true);
      
//       const formattedEducation = values.education.map(edu => ({
//         ...edu,
//         startDate: edu.startDate.toISOString(),
//         endDate: edu.currentlyStudying ? null : edu.endDate ? edu.endDate.toISOString() : null,
//       }));

//       const response = await Auth.updateProfile({
//         education: formattedEducation,
//       });

//       if (response?.status === 200) {
//         toast({
//           title: "Success",
//           description: "Education details updated successfully",
//         });
//         setOpen(false);
//       } else {
//         throw new Error("Failed to update education details");
//       }
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to update education details. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <MotionCard
//       className="relative"
//     >
//       {!open ? (
//         <>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-2xl font-bold">Education</CardTitle>
//           </CardHeader>
//           <Button
//             className="absolute right-7 top-7"
//             variant={"ghost"}
//             onClick={() => setOpen(true)}
//           >
//             <Edit className="h-4 w-4 " />
//           </Button>
//           <CardContent>
//             {!user?.education || user.education.length === 0 ? (
//               <div className="flex items-center text-muted-foreground">
//                 <GraduationCap className="mr-2 h-5 w-5" />
//                 <p>Add educational details</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {form.getValues("education").map((edu, index) => (
//                   <div key={index}>
//                     <div className="flex items-center">
//                       <GraduationCap className="mr-2 h-5 w-5 text-primary" />
//                       <h3 className="font-semibold text-lg">{edu.degree}</h3>
//                     </div>
//                     <p className="text-sm text-muted-foreground ml-7">
//                       {edu.institution}, {edu.fieldOfStudy}
//                     </p>
//                     <p className="text-sm text-muted-foreground ml-7">
//                       {format(new Date(edu.startDate), "PPP")} -{" "}
//                       {edu.currentlyStudying
//                         ? "Present"
//                         : edu.endDate
//                         ? format(new Date(edu.endDate), "PPP")
//                         : ""}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </>
//       ) : (
//         <CardContent className="max-w-3xl">
//           <X
//             onClick={() => {
//               setOpen(false);
//             }}
//             className="absolute right-7 top-7 cursor-pointer"
//           />
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold">Education</CardTitle>
//             <CardDescription>
//               Update your educational background here.
//             </CardDescription>
//           </CardHeader>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(handleSubmit)}>
//               <div className="space-y-4 flex flex-col justify-center">
//                 {fields.map((field, index) => (
//                   <Card key={field.id} className="w-full">
//                     <CardHeader>
//                       <div className="flex justify-between">
//                         <CardTitle>
//                           {form.getValues(`education.${index}.degree`) ||
//                             "New Entry"}
//                         </CardTitle>
//                         <Button
//                           type="button"
//                           variant="destructive"
//                           size="sm"
//                           onClick={() => remove(index)}
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                       <CardDescription>
//                         {form.getValues(`education.${index}.institution`) ||
//                           "Institution"}{" "}
//                         |{" "}
//                         {form.getValues(`education.${index}.fieldOfStudy`) ||
//                           "Field of Study"}
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="grid grid-cols-2 gap-4">
//                         <FormField
//                           control={form.control}
//                           name={`education.${index}.degree`}
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Degree</FormLabel>
//                               <FormControl>
//                                 <Input {...field} placeholder="Degree" />
//                               </FormControl>
//                             </FormItem>
//                           )}
//                         />
//                         <FormField
//                           control={form.control}
//                           name={`education.${index}.institution`}
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Institution</FormLabel>
//                               <FormControl>
//                                 <Input {...field} placeholder="Institution" />
//                               </FormControl>
//                             </FormItem>
//                           )}
//                         />
//                         <FormField
//                           control={form.control}
//                           name={`education.${index}.fieldOfStudy`}
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Field of Study</FormLabel>
//                               <FormControl>
//                                 <Input
//                                   {...field}
//                                   placeholder="Field of Study"
//                                 />
//                               </FormControl>
//                             </FormItem>
//                           )}
//                         />
//                         <FormField
//                           control={form.control}
//                           name={`education.${index}.startDate`}
//                           render={({ field }) => (
//                             <FormItem className="flex flex-col">
//                               <FormLabel>Start Date</FormLabel>
//                               <Popover>
//                                 <PopoverTrigger asChild>
//                                   <FormControl>
//                                     <Button
//                                       variant={"outline"}
//                                       className={cn(
//                                         "w-full pl-3 text-left font-normal",
//                                         !field.value && "text-muted-foreground"
//                                       )}
//                                     >
//                                       {field.value ? (
//                                         format(field.value, "PPP")
//                                       ) : (
//                                         <span>Pick a date</span>
//                                       )}
//                                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                                     </Button>
//                                   </FormControl>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-auto p-0" align="start">
//                                   <Calendar
//                                     mode="single"
//                                     selected={field.value}
//                                     onSelect={(date) => {
//                                       field.onChange(date);
//                                       // Reset end date if start date is after it
//                                       const endDate = form.watch(`education.${index}.endDate`);
//                                       if (endDate && date && date > endDate) {
//                                         form.setValue(`education.${index}.endDate`, null);
//                                       }
//                                     }}
//                                     disabled={(date) =>
//                                       date > new Date() || date < new Date("1900-01-01")
//                                     }
//                                     initialFocus
//                                   />
//                                 </PopoverContent>
//                               </Popover>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         <FormField
//                           control={form.control}
//                           name={`education.${index}.endDate`}
//                           render={({ field }) => (
//                             <FormItem className="flex flex-col">
//                               <FormLabel>End Date</FormLabel>
//                               <Popover>
//                                 <PopoverTrigger asChild>
//                                   <FormControl>
//                                     <Button
//                                       variant={"outline"}
//                                       className={cn(
//                                         "w-full pl-3 text-left font-normal",
//                                         !field.value && "text-muted-foreground"
//                                       )}
//                                       disabled={form.watch(`education.${index}.currentlyStudying`)}
//                                     >
//                                       {field.value ? (
//                                         format(field.value, "PPP")
//                                       ) : (
//                                         <span>Pick a date</span>
//                                       )}
//                                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                                     </Button>
//                                   </FormControl>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-auto p-0" align="start">
//                                   <Calendar
//                                     mode="single"
//                                     selected={field.value || undefined}
//                                     onSelect={(date) => {
//                                       field.onChange(date);
//                                       if (date) {
//                                         // Uncheck currently studying when end date is selected
//                                         form.setValue(`education.${index}.currentlyStudying`, false);
//                                       }
//                                     }}
//                                     disabled={(date) => {
//                                       const startDate = form.watch(`education.${index}.startDate`);
//                                       return (
//                                         date > new Date() ||
//                                         (startDate && date < startDate) ||
//                                         date < new Date("1900-01-01")
//                                       );
//                                     }}
//                                     initialFocus
//                                   />
//                                 </PopoverContent>
//                               </Popover>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         <FormField
//                           control={form.control}
//                           name={`education.${index}.currentlyStudying`}
//                           render={({ field }) => (
//                             <FormItem className="flex flex-col">
//                               <FormLabel>Currently Studying</FormLabel>
//                               <FormControl>
//                                 <Checkbox
//                                   checked={field.value}
//                                   onCheckedChange={(checked) => {
//                                     field.onChange(checked);
//                                     if (checked) {
//                                       // Clear end date when currently studying is checked
//                                       form.setValue(`education.${index}.endDate`, null);
//                                     }
//                                   }}
//                                 />
//                               </FormControl>
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//                 <Button
//                   type="button"
//                   onClick={() =>
//                     append({
//                       institution: "",
//                       degree: "",
//                       fieldOfStudy: "",
//                       startDate: new Date(),
//                       endDate: null,
//                       currentlyStudying: false,
//                     })
//                   }
//                 >
//                   <Plus className="h-4 w-4 mr-2" /> Add Education
//                 </Button>
//               </div>
//               <div className="flex justify-end mt-4 gap-2">
//                 <Button 
//                   variant="outline" 
//                   onClick={() => setOpen(false)}
//                   type="button"
//                 >
//                   Cancel
//                 </Button>
//                 <Button type="submit" disabled={isLoading}>
//                   {isLoading ? "Saving..." : "Save changes"}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       )}
//     </MotionCard>
//   );
// }
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Edit, GraduationCap, Plus, Trash2, X } from "lucide-react"
import { motion } from "framer-motion"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppSelector } from "@/store/hooks"
import { Skeleton } from "@/components/ui/skeleton"
import { Auth } from "@/services"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"

const educationSchema = z.object({
  education: z.array(
    z.object({
      institution: z.string().min(1, "Institution is required"),
      degree: z.string().min(1, "Degree is required"),
      fieldOfStudy: z.string().min(1, "Field of study is required"),
      startDate: z.date({
        required_error: "Start date is required",
      }),
      endDate: z.date().optional().nullable(),
      currentlyStudying: z.boolean().default(false),
    }),
  ),
})

type EducationFormValues = z.infer<typeof educationSchema>

const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* User Profile Header Skeleton */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" /> {/* Name */}
          <Skeleton className="h-4 w-[150px]" /> {/* Email/subtitle */}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

export function Education() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const user = useAppSelector((state: any) => state.user.userData)
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education:
        user?.education?.map((edu: any) => ({
          ...edu,
          startDate: edu.startDate ? new Date(edu.startDate) : new Date(),
          endDate: edu.endDate ? new Date(edu.endDate) : null,
          currentlyStudying: edu.currentlyStudying || false,
        })) || [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  })

  const MotionCard = motion(Card)

  const handleSubmit = async (values: EducationFormValues) => {
    try {
      setIsLoading(true)

      const formattedEducation = values.education.map((edu) => ({
        ...edu,
        startDate: edu.startDate.toISOString(),
        endDate: edu.currentlyStudying ? null : edu.endDate ? edu.endDate.toISOString() : null,
      }))

      const response = await Auth.updateProfile({
        education: formattedEducation,
      })

      if (response?.status === 200) {
        toast({
          title: "Success",
          description: "Education details updated successfully",
        })
        setOpen(false)
      } else {
        throw new Error("Failed to update education details")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update education details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MotionCard className="relative">
      {!open ? (
        <>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Education</CardTitle>
          </CardHeader>
          <Button className="absolute right-7 top-7" variant={"ghost"} onClick={() => setOpen(true)}>
            <Edit className="h-4 w-4 " />
          </Button>
          <CardContent>
            {!user?.education || user.education.length === 0 ? (
              <div className="flex items-center text-muted-foreground">
                <GraduationCap className="mr-2 h-5 w-5" />
                <p>Add educational details</p>
              </div>
            ) : (
              <div className="space-y-4">
                {form.getValues("education").map((edu, index) => (
                  <div key={index}>
                    <div className="flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">{edu.degree}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground ml-7">
                      {edu.institution}, {edu.fieldOfStudy}
                    </p>
                    <p className="text-sm text-muted-foreground ml-7">
                      {format(new Date(edu.startDate), "PPP")} -{" "}
                      {edu.currentlyStudying ? "Present" : edu.endDate ? format(new Date(edu.endDate), "PPP") : ""}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </>
      ) : (
        <CardContent className="max-w-3xl">
          <X
            onClick={() => {
              setOpen(false)
            }}
            className="absolute right-7 top-7 cursor-pointer"
          />
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Education</CardTitle>
            <CardDescription>Update your educational background here.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="space-y-4 flex flex-col justify-center">
                {fields.map((field, index) => (
                  <Card key={field.id} className="w-full">
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>{form.getValues(`education.${index}.degree`) || "New Entry"}</CardTitle>
                        <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription>
                        {form.getValues(`education.${index}.institution`) || "Institution"} |{" "}
                        {form.getValues(`education.${index}.fieldOfStudy`) || "Field of Study"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`education.${index}.degree`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Degree</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Degree" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.institution`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institution</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Institution" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.fieldOfStudy`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Field of Study</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Field of Study" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                                  onChange={(e) => {
                                    const date = e.target.value ? new Date(e.target.value) : null
                                    field.onChange(date)
                                    // Reset end date if start date is after it
                                    const endDate = form.watch(`education.${index}.endDate`)
                                    if (endDate && date && date > endDate) {
                                      form.setValue(`education.${index}.endDate`, null)
                                    }
                                  }}
                                  min="1900-01-01"
                                  max={new Date().toISOString().split("T")[0]}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                                  onChange={(e) => {
                                    const date = e.target.value ? new Date(e.target.value) : null
                                    field.onChange(date)
                                    if (date) {
                                      // Uncheck currently studying when end date is selected
                                      form.setValue(`education.${index}.currentlyStudying`, false)
                                    }
                                  }}
                                  min={
                                    form.watch(`education.${index}.startDate`)
                                      ? format(form.watch(`education.${index}.startDate`), "yyyy-MM-dd")
                                      : "1900-01-01"
                                  }
                                  max={new Date().toISOString().split("T")[0]}
                                  disabled={form.watch(`education.${index}.currentlyStudying`)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.currentlyStudying`}
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Currently Studying</FormLabel>
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked)
                                    if (checked) {
                                      // Clear end date when currently studying is checked
                                      form.setValue(`education.${index}.endDate`, null)
                                    }
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      institution: "",
                      degree: "",
                      fieldOfStudy: "",
                      startDate: new Date(),
                      endDate: null,
                      currentlyStudying: false,
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Education
                </Button>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline" onClick={() => setOpen(false)} type="button">
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      )}
    </MotionCard>
  )
}

