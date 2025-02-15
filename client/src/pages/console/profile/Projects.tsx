import { useState, useEffect } from "react";
import { useForm, useFieldArray} from "react-hook-form";
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

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {  Plus, Trash2, Pencil, Github, Globe } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/store/hooks";
import { Auth } from "@/services";
import { useToast } from "@/hooks/use-toast";


interface Project {
  name: string;
  description: string;
  technologies: string[];
  socials: string[];
  repositoryLink: string;
  liveDemoLink: string;
}

type ProjectsProps = Project[];

// Define schema using Zod
const projectSchema = z.object({
  projects: z
    .array(
      z.object({
        name: z.string().min(1, "Project name is required"),
        description: z.string().min(1, "Description is required"),
        technologies: z.array(z.string().min(1, "Technology cannot be empty")),
        socials: z.array(z.string().url("Must be a valid URL")),
        repositoryLink: z.string().url("Must be a valid URL"),
        liveDemoLink: z.string().url("Must be a valid URL")
      })
    )
    .nonempty("You must have at least one project"),
});

// Add type for form values
type ProjectFormValues = z.infer<typeof projectSchema>;

export function Projects() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectsProps | null>(null);
  const user = useAppSelector((state: any) => state.user.userData);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projects: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  // Initialize form with user's projects when component mounts
  useEffect(() => {
    if (user?.projects) {
      setProjects(user.projects);
      if (!isEditing) {
        form.reset({ projects: user.projects });
      }
    } else {
      setProjects(null);
      form.reset({ projects: [] });
    }
    setIsLoading(false);
  }, [user, form]);

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      console.log(data);
      const response = await Auth.updateProfile({
        projects: data.projects,
      });
      console.log(response);
      
      if (response?.status === 200) {
        const updatedProjects = response.data.data.resUser.projects;
        setProjects(updatedProjects);
        form.reset({ projects: updatedProjects }); // Reset form with new data
        setIsEditing(false);
        toast({
          title: "Success",
          description: "Projects updated successfully",
        });
      } else {
        throw new Error("Failed to update projects");
      }
    } catch (error) {
      console.error('Error saving projects:', error);
      toast({
        title: "Error",
        description: "Failed to update projects. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddProject = () => {
    append({
      name: "",
      description: "",
      technologies: [],
      socials: [],
      repositoryLink: "",
      liveDemoLink: ""
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Showcase your best work</CardDescription>
        </div>
        {!isLoading && projects && !isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4 mr-2" /> Edit
          </Button>
        ) : isEditing && (
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
        {isLoading ? (
          // Loading State
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 w-1/3 bg-gray-200 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-6 w-20 bg-gray-200 rounded" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                    <div className="flex gap-4">
                      <div className="h-6 w-24 bg-gray-200 rounded" />
                      <div className="h-6 w-24 bg-gray-200 rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !projects ? (
          // Empty State
          <div className="text-center py-10">
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-4">Add your first project to showcase your work</p>
            <Button
              onClick={() => {
                setProjects([]);
                setIsEditing(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Project
            </Button>
          </div>
        ) : !isEditing ? (
          // View Mode
          <div className="space-y-6">
            {projects.map((project, index) => (
              <Card key={index}>
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
                    <h4 className="font-semibold mb-2">Links</h4>
                    <div className="flex gap-4">
                      <a href={project.repositoryLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Github className="h-4 w-4 mr-2" /> Repository
                      </a>
                      <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" /> Live Demo
                      </a>
                      {project.socials?.map((social, i) => (
                        <a key={i} href={social} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <Globe className="h-4 w-4 mr-2" /> Social {i + 1}
                        </a>
                      ))}
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
                        name={`projects.${index}.repositoryLink`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Repository Link</FormLabel>
                            <FormControl>
                              <Input {...field} type="url" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name={`projects.${index}.socials`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Social Links</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                value={field.value?.join("\n")}
                                onChange={(e) => field.onChange(e.target.value.split("\n"))}
                                placeholder="One social link per line"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name={`projects.${index}.liveDemoLink`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Live Demo Link</FormLabel>
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
                onClick={handleAddProject}
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
