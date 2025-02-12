import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Edit, GraduationCap, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const educationSchema = z.object({
  education: z.array(
    z.object({
      degree: z.string().min(1, "Degree is required"),
      school: z.string().min(1, "School is required"),
      period: z.string().min(1, "Period is required"),
    })
  ),
});

type EducationFormValues = z.infer<typeof educationSchema>;

interface EducationProps {
  initialEducation: {
    degree: string;
    school: string;
    period: string;
  }[];
}

export function Education({ initialEducation }: EducationProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: initialEducation,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const MotionCard = motion(Card);

  const handleSubmit = (values: EducationFormValues) => {
    console.log("Updated Education Data:", values);
    setOpen(false);
  };

  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Education</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Education</DialogTitle>
              <DialogDescription>
                Update your educational background here.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <Card key={field.id}>
                      <CardHeader>
                        <div className="flex justify-between">
                          <CardTitle>
                            {form.getValues(`education.${index}.degree`) || "New Entry"}
                          </CardTitle>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardDescription>
                          {form.getValues(`education.${index}.school`) || "School"} |{" "}
                          {form.getValues(`education.${index}.period`) || "Period"}
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
                            name={`education.${index}.school`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>School</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="School" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`education.${index}.period`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Period</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Period" />
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
                      append({ degree: "", school: "", period: "" })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Education
                  </Button>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {form.getValues("education").map((edu, index) => (
            <div key={index}>
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">{edu.degree}</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-7">
                {edu.school}, {edu.period}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </MotionCard>
  );
}
