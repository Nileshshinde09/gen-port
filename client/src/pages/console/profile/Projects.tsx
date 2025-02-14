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
import { Edit, Plus, Trash2, Pencil, Github, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

interface Project {
  name: string;
  description: string;
  technologies: string[];
  socials: string[];
  repositorya: string;
  liveDemoa: string;
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
        technologies: z.array(z.string().min(1, "Technology cannot be empty")),
        socials: z.array(z.string().url("Must be a valid URL")),
        repositorya: z.string().url("Must be a valid URL"),
        liveDemoa: z.string().url("Must be a valid URL"),
      })
    )
    .nonempty("You must have at least one project"),
});

export function Projects({ initialProjects }: ProjectsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projects: initialProjects || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const onSubmit = (data: ProjectFormValues) => {
    console.log(data);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Showcase your best work</CardDescription>
        </div>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4 mr-2" /> Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)}>
              Save
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {!isEditing ? (
          // View Mode
          <div className="space-y-6">
            {fields.map((project, index) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech, i) => (
                        <Badge key={i} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">as</h4>
                    <div className="flex gap-4">
                      <a href={project.repositorya} target="_blank" className="flex items-center">
                        <Github className="h-4 w-4 mr-2" /> Repository
                      </a>
                      <a href={project.liveDemoa} target="_blank" className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" /> Live Demo
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Edit Mode
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {fields.map((project, index) => (
                <Card key={project.id}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Project {index + 1}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
                              <Input {...field} />
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
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name={`projects.${index}.technologies`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Technologies</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                value={field.value?.join("\n")}
                                onChange={(e) => field.onChange(e.target.value.split("\n"))}
                                placeholder="One technology per line"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name={`projects.${index}.repositorya`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Repository a</FormLabel>
                            <FormControl>
                              <Input {...field} type="url" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name={`projects.${index}.liveDemoa`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Live Demo a</FormLabel>
                            <FormControl>
                              <Input {...field} type="url" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => append({
                  name: "",
                  description: "",
                  technologies: [],
                  socials: [],
                  repositorya: "",
                  liveDemoa: "",
                })}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Project
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
