// import { useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Briefcase, CalendarIcon, Edit, Trash2, X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { motion } from "framer-motion";
// import { useAppSelector } from "@/store/hooks";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useToast } from "@/hooks/use-toast";
// import { Auth } from "@/services";


// const experienceSchema = z.object({
//   experiences: z.array(
//     z.object({
//       company: z.string().nonempty("Company name is required"),
//       position: z.string().nonempty("Position is required"),
//       startDate: z.string().nonempty("Start date is required"),
//       endDate: z.string().nullable(),
//       currentlyWorking: z.boolean().default(false),
//       description: z.string().nonempty("Description is required"),
//     })
//   ),
// });

// type ExperienceFormValues = z.infer<typeof experienceSchema>;


// const MotionCard = motion.create(Card);

// function DatePickerField({ date, onSelect, disabled }: {
//   date?: Date;
//   onSelect: (date: Date | undefined) => void;
//   disabled?: (date: Date) => boolean;
// }) {

//   const user = useAppSelector((state: any) => state.user.userData);
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-full justify-start text-left font-normal",
//             !date && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {date ? format(date, "PPP") : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={onSelect}
//           disabled={disabled}
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>
//   );
// }

// function formatDate(dateString: string | null): string {
//   if (!dateString) return '';
//   return format(new Date(dateString), 'MMM yyyy');
// }

// export function Experience() {
//   const [isEditPanelOpen, setIsEditPanelOpen] = useState<boolean>(false);
//   const user = useAppSelector((state: any) => state.user.userData);
//   const isLoading = useAppSelector((state: any) => state.user.isLoading);
//   const { toast } = useToast();

//   const form = useForm<ExperienceFormValues>({
//     resolver: zodResolver(experienceSchema),
//     defaultValues: {
//       experiences: user?.experience || [],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "experiences",
//   });

//   const handleClosePanel = () => {
//     form.reset();
//     setIsEditPanelOpen(false);
//   };

//   const handleSubmit = async (data: ExperienceFormValues) => {
//     try {
//       const formattedData = {
//         experiences: data.experiences.map((exp) => ({
//           ...exp,
//           startDate: new Date(exp.startDate).toISOString(),
//           endDate: exp.currentlyWorking
//             ? null
//             : exp.endDate
//             ? new Date(exp.endDate).toISOString()
//             : null,
//         })),
//       };

//       const response = await Auth.updateProfile({
//         experience: formattedData.experiences,
//       });

//       if (response?.status === 200) {
//         toast({
//           title: "Success",
//           description: "Experience updated successfully",
//         });
//         setIsEditPanelOpen(false);
//       } else {
//         throw new Error("Failed to update experience");
//       }
//     } catch (error) {
//       console.error('Error saving experience:', error);
//       toast({
//         title: "Error",
//         description: "Failed to update experience. Please try again.",
//         variant: "destructive",
//       });
//       // Keep the panel open if there's an error
//     }
//   };

//   const CurrentlyWorkingField = ({ index }: { index: number }) => (
//     <FormField
//       control={form.control}
//       name={`experiences.${index}.currentlyWorking`}
//       render={({ field }) => (
//         <FormItem className="flex flex-row items-center space-x-2">
//           <FormControl>
//             <input
//               type="checkbox"
//               checked={field.value}
//               onChange={(e) => {
//                 field.onChange(e.target.checked);
//                 if (e.target.checked) {
//                   form.setValue(`experiences.${index}.endDate`, null);
//                 }
//               }}
//             />
//           </FormControl>
//           <FormLabel className="!mt-0">Currently working here</FormLabel>
//         </FormItem>
//       )}
//     />
//   );

//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <div className="flex items-center gap-2">
//             <Skeleton className="h-5 w-5" />
//             <Skeleton className="h-8 w-32" />
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-8">
//             {[1, 2].map((_, index) => (
//               <div key={index} className="flex">
//                 <div className="mr-6">
//                   <Skeleton className="h-12 w-12 rounded-full" />
//                 </div>
//                 <div className="flex-1 space-y-2">
//                   <Skeleton className="h-6 w-48" />
//                   <Skeleton className="h-4 w-32" />
//                   <Skeleton className="h-4 w-24" />
//                   <Skeleton className="h-20 w-full" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!user?.experience || user.experience.length === 0) {
//     return (
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <div className="flex items-center gap-2">
//             <Briefcase className="h-5 w-5 text-primary" />
//             <CardTitle className="text-2xl font-bold">Experience</CardTitle>
//           </div>
//         </CardHeader>
//         <CardContent className="flex flex-col items-center justify-center py-8">
//           <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
//           <p className="text-muted-foreground mb-4">No experience added yet</p>
//           <Button onClick={() => setIsEditPanelOpen(true)}>
//             <Edit className="h-4 w-4 mr-2" />
//             Add Experience
//           </Button>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card>
//       {isEditPanelOpen ? (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.2 }}
//         >
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(handleSubmit)}
//               className="space-y-6 p-5 relative"
//             >
//               <X 
//                 onClick={handleClosePanel}
//                 className="absolute right-5 cursor-pointer hover:text-destructive transition-colors"
//               />
//               {fields.map((field, index) => (
//                 <div key={field.id} className="space-y-6 p-4 border rounded-lg">
//                   <FormField
//                     control={form.control}
//                     name={`experiences.${index}.company`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Company</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Enter company name" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name={`experiences.${index}.position`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Position</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Enter position title" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <FormField
//                       control={form.control}
//                       name={`experiences.${index}.startDate`}
//                       render={({ field }) => (
//                         <FormItem className="flex flex-col">
//                           <FormLabel>Start Date</FormLabel>
//                           <FormControl>
//                             <DatePickerField
//                               date={field.value ? new Date(field.value) : undefined}
//                               onSelect={(date) => field.onChange(date?.toISOString() || "")}
//                               disabled={(date) =>
//                                 date > new Date() || date < new Date("1900-01-01")
//                               }
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     {!form.watch(`experiences.${index}.currentlyWorking`) && (
//                       <FormField
//                         control={form.control}
//                         name={`experiences.${index}.endDate`}
//                         render={({ field }) => (
//                           <FormItem className="flex flex-col">
//                             <FormLabel>End Date</FormLabel>
//                             <FormControl>
//                               <DatePickerField
//                                 date={field.value ? new Date(field.value) : undefined}
//                                 onSelect={(date) => field.onChange(date?.toISOString() || "")}
//                                 disabled={(date) =>
//                                   date < new Date(form.getValues(`experiences.${index}.startDate`)) ||
//                                   date > new Date()
//                                 }
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     )}
//                   </div>

//                   <CurrentlyWorkingField index={index} />

//                   <FormField
//                     control={form.control}
//                     name={`experiences.${index}.description`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Description</FormLabel>
//                         <FormControl>
//                           <Textarea
//                             placeholder="Describe your role and responsibilities"
//                             className="resize-none"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <Button
//                     type="button"
//                     variant="ghost"
//                     onClick={() => remove(index)}
//                     className="mt-2 text-destructive hover:text-destructive/90"
//                   >
//                     <Trash2 className="h-5 w-5 mr-2" />
//                     Remove Experience
//                   </Button>
//                 </div>
//               ))}
//               <Button
//                 type="button"
//                 onClick={() =>
//                   append({
//                     company: "",
//                     position: "",
//                     startDate: "",
//                     endDate: null,
//                     currentlyWorking: false,
//                     description: "",
//                   })
//                 }
//               >
//                 Add Experience
//               </Button>
//               <Button type="submit" className="w-full">
//                 Save Experience
//               </Button>
//             </form>
//           </Form>
//         </motion.div>
//       ) : (
//         <MotionCard
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <div className="flex items-center gap-2">
//               <Briefcase className="h-5 w-5 text-primary" />
//               <CardTitle className="text-2xl font-bold">Experience</CardTitle>
//             </div>
//             <Button 
//               variant="outline" 
//               onClick={() => setIsEditPanelOpen(true)}
//               className="hover:bg-primary/10"
//             >
//               <Edit className="h-4 w-4 mr-2" />
//               Edit Experience
//             </Button>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-8">
//               {form.getValues("experiences").map((job, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="flex"
//                 >
//                   <div className="flex flex-col items-center mr-6">
//                     <div
//                       className={cn(
//                         "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors",
//                         index === 0 ? "border-primary bg-primary/10" : "border-muted bg-muted/50"
//                       )}
//                     >
//                       <Briefcase
//                         className={cn(
//                           "h-6 w-6",
//                           index === 0 ? "text-primary" : "text-muted-foreground"
//                         )}
//                       />
//                     </div>
//                     {index !== form.getValues("experiences").length - 1 && (
//                       <div className="w-px h-full bg-border"></div>
//                     )}
//                   </div>
//                   <div className={cn(
//                     "flex-1",
//                     index !== form.getValues("experiences").length - 1 ? "pb-8" : ""
//                   )}>
//                     <h3 className="text-xl font-semibold text-primary">{job.position}</h3>
//                     <p className="text-base font-medium">{job.company}</p>
//                     <p className="text-sm text-muted-foreground mt-1">
//                       {formatDate(job.startDate)} -{" "}
//                       {job.currentlyWorking ? "Present" : formatDate(job.endDate)}
//                     </p>
//                     <p className="mt-3 text-sm leading-relaxed">{job.description}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </CardContent>
//         </MotionCard>
//       )}
//     </Card>
//   );
// }
"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Briefcase, Edit, Trash2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useAppSelector } from "@/store/hooks"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { Auth } from "@/services"

const experienceSchema = z.object({
  experiences: z.array(
    z.object({
      company: z.string().nonempty("Company name is required"),
      position: z.string().nonempty("Position is required"),
      startDate: z.string().nonempty("Start date is required"),
      endDate: z.string().nullable(),
      currentlyWorking: z.boolean().default(false),
      description: z.string().nonempty("Description is required"),
    }),
  ),
})

type ExperienceFormValues = z.infer<typeof experienceSchema>

const MotionCard = motion.create(Card)

function DatePickerField({
  date,
  onSelect,
  disabled,
}: {
  date?: Date
  onSelect: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
}) {
  return (
    <Input
      type="date"
      value={date ? format(date, "yyyy-MM-dd") : ""}
      onChange={(e) => {
        const newDate = e.target.value ? new Date(e.target.value) : undefined
        onSelect(newDate)
      }}
      min="1900-01-01"
      max={new Date().toISOString().split("T")[0]}
    />
  )
}

function formatDate(dateString: string | null): string {
  if (!dateString) return ""
  return format(new Date(dateString), "MMM yyyy")
}

export function Experience() {
  const [isEditPanelOpen, setIsEditPanelOpen] = useState<boolean>(false)
  const user = useAppSelector((state: any) => state.user.userData)
  const isLoading = useAppSelector((state: any) => state.user.isLoading)
  const { toast } = useToast()

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experiences: user?.experience || [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experiences",
  })

  const handleClosePanel = () => {
    form.reset()
    setIsEditPanelOpen(false)
  }

  const handleSubmit = async (data: ExperienceFormValues) => {
    try {
      const formattedData = {
        experiences: data.experiences.map((exp) => ({
          ...exp,
          startDate: new Date(exp.startDate).toISOString(),
          endDate: exp.currentlyWorking ? null : exp.endDate ? new Date(exp.endDate).toISOString() : null,
        })),
      }

      const response = await Auth.updateProfile({
        experience: formattedData.experiences,
      })

      if (response?.status === 200) {
        toast({
          title: "Success",
          description: "Experience updated successfully",
        })
        setIsEditPanelOpen(false)
      } else {
        throw new Error("Failed to update experience")
      }
    } catch (error) {
      console.error("Error saving experience:", error)
      toast({
        title: "Error",
        description: "Failed to update experience. Please try again.",
        variant: "destructive",
      })
      // Keep the panel open if there's an error
    }
  }

  const CurrentlyWorkingField = ({ index }: { index: number }) => (
    <FormField
      control={form.control}
      name={`experiences.${index}.currentlyWorking`}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-2">
          <FormControl>
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => {
                field.onChange(e.target.checked)
                if (e.target.checked) {
                  form.setValue(`experiences.${index}.endDate`, null)
                }
              }}
            />
          </FormControl>
          <FormLabel className="!mt-0">Currently working here</FormLabel>
        </FormItem>
      )}
    />
  )

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-8 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {[1, 2].map((_, index) => (
              <div key={index} className="flex">
                <div className="mr-6">
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!user?.experience || user.experience.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl font-bold">Experience</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No experience added yet</p>
          <Button onClick={() => setIsEditPanelOpen(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      {isEditPanelOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-5 relative">
              <X
                onClick={handleClosePanel}
                className="absolute right-5 cursor-pointer hover:text-destructive transition-colors"
              />
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-6 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`experiences.${index}.position`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter position title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name={`experiences.${index}.startDate`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              value={field.value ? format(new Date(field.value), "yyyy-MM-dd") : ""}
                              onChange={(e) => {
                                const date = e.target.value ? new Date(e.target.value) : undefined
                                field.onChange(date?.toISOString() || "")
                              }}
                              min="1900-01-01"
                              max={new Date().toISOString().split("T")[0]}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {!form.watch(`experiences.${index}.currentlyWorking`) && (
                      <FormField
                        control={form.control}
                        name={`experiences.${index}.endDate`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                value={field.value ? format(new Date(field.value), "yyyy-MM-dd") : ""}
                                onChange={(e) => {
                                  const date = e.target.value ? new Date(e.target.value) : undefined
                                  field.onChange(date?.toISOString() || "")
                                }}
                                min={
                                  form.getValues(`experiences.${index}.startDate`)
                                    ? format(new Date(form.getValues(`experiences.${index}.startDate`)), "yyyy-MM-dd")
                                    : "1900-01-01"
                                }
                                max={new Date().toISOString().split("T")[0]}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <CurrentlyWorkingField index={index} />

                  <FormField
                    control={form.control}
                    name={`experiences.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your role and responsibilities"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => remove(index)}
                    className="mt-2 text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="h-5 w-5 mr-2" />
                    Remove Experience
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  append({
                    company: "",
                    position: "",
                    startDate: "",
                    endDate: null,
                    currentlyWorking: false,
                    description: "",
                  })
                }
              >
                Add Experience
              </Button>
              <Button type="submit" className="w-full">
                Save Experience
              </Button>
            </form>
          </Form>
        </motion.div>
      ) : (
        <MotionCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl font-bold">Experience</CardTitle>
            </div>
            <Button variant="outline" onClick={() => setIsEditPanelOpen(true)} className="hover:bg-primary/10">
              <Edit className="h-4 w-4 mr-2" />
              Edit Experience
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {form.getValues("experiences").map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex"
                >
                  <div className="flex flex-col items-center mr-6">
                    <div
                      className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors",
                        index === 0 ? "border-primary bg-primary/10" : "border-muted bg-muted/50",
                      )}
                    >
                      <Briefcase className={cn("h-6 w-6", index === 0 ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    {index !== form.getValues("experiences").length - 1 && (
                      <div className="w-px h-full bg-border"></div>
                    )}
                  </div>
                  <div className={cn("flex-1", index !== form.getValues("experiences").length - 1 ? "pb-8" : "")}>
                    <h3 className="text-xl font-semibold text-primary">{job.position}</h3>
                    <p className="text-base font-medium">{job.company}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDate(job.startDate)} - {job.currentlyWorking ? "Present" : formatDate(job.endDate)}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed">{job.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </MotionCard>
      )}
    </Card>
  )
}

