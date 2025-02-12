import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Project {
  name: string;
  description: string;
  details: string[];
}

interface ProjectsProps {
  initialProjects: Project[];
}

// Define schema using Zod
const projectSchema = z.object({
  projects: z
    .array(
      z.object({
        name: z.string().min(1, "Project name is required"),
        description: z.string().min(1, "Description is required"),
        details: z.array(z.string().min(1, "Details cannot be empty")),
      })
    )
    .nonempty("You must have at least one project"),
});

export function Projects({ initialProjects }: ProjectsProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: { projects: initialProjects },
    mode: "onChange",
  });

  // Use `useFieldArray` to manage the projects array
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const MotionCard = motion(Card);

  const saveChanges = () => {
    if (form.formState.isValid) {
      setDialogOpen(false);
      console.log("Projects saved:", form.getValues().projects);
    }
  };

  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Projects</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-[80%] overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>Edit Projects</DialogTitle>
              <DialogDescription>
                Update your project information here.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(saveChanges)}>
                <div className="space-y-4">
                  {fields.map((project, index) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <div className="flex justify-between">
                          <CardTitle>{project.name || `Project ${index + 1}`}</CardTitle>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <FormField
                            name={`projects.${index}.name`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Project Name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name={`projects.${index}.description`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Description</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Project Description" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name={`projects.${index}.details`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Details</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    value={field.value.join("\n")}
                                    onChange={(e) => field.onChange(e.target.value.split("\n"))}
                                    placeholder="Project Details (one per line)"
                                    rows={3}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button onClick={() => append({ name: "", description: "", details: [] })}>
                    <Plus className="h-4 w-4 mr-2" /> Add Project
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
        <Tabs defaultValue={fields[0]?.name || ""} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {fields.map((project, index) => (
              <TabsTrigger key={project.id} value={project.name}>
                {project.name || `Project ${index + 1}`}
              </TabsTrigger>
            ))}
          </TabsList>
          {fields.map((project, index) => (
            <TabsContent key={project.id} value={project.name}>
              <Card>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {project.details.map((detail, i) => (
                    <p key={i}>{detail}</p>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </MotionCard>
  );
}
