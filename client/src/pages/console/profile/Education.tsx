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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Edit, GraduationCap, Plus, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";

const educationSchema = z.object({
  education: z.array(
    z.object({
      institution: z.string().min(1, "Institution is required"),
      degree: z.string().min(1, "Degree is required"),
      fieldOfStudy: z.string().min(1, "Field of study is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().optional(),
      currentlyStudying: z.boolean(),
    })
  ),
});

type EducationFormValues = z.infer<typeof educationSchema>;

interface EducationProps {
  initialEducation: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
    currentlyStudying: boolean;
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
      className="relative"
    >
      {!open ? (
        <>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Education</CardTitle>
          </CardHeader>
          <Button
            className="absolute right-7 top-7"
            variant={"ghost"}
            onClick={() => setOpen(true)}
          >
            <Edit className="h-4 w-4 " />
          </Button>
          <CardContent>
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
                    {edu.startDate?.split("T")[0]} -{" "}
                    {edu.currentlyStudying ? "Present" : edu.endDate?.split("T")[0]}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </>
      ) : (
        <CardContent className="max-w-3xl">
          <X
            onClick={() => {
              setOpen(false);
            }}
            className="absolute right-7 top-7 cursor-pointer"
          />
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Education</CardTitle>
            <CardDescription>
              Update your educational background here.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="space-y-4 flex flex-col justify-center">
                {fields.map((field, index) => (
                  <Card key={field.id} className="w-full">
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>
                          {form.getValues(`education.${index}.degree`) ||
                            "New Entry"}
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
                        {form.getValues(`education.${index}.institution`) ||
                          "Institution"}{" "}
                        |{" "}
                        {form.getValues(`education.${index}.fieldOfStudy`) ||
                          "Field of Study"}
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
                                <Input
                                  {...field}
                                  placeholder="Field of Study"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Start Date" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="End Date" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.currentlyStudying`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Currently Studying</FormLabel>
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checkedState) =>
                                    field.onChange(checkedState)
                                  }
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
                      startDate: "",
                      endDate: "",
                      currentlyStudying: false,
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Education
                </Button>
              </div>
              <div className="flex justify-end mt-4">
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      )}
    </MotionCard>
  );
}
