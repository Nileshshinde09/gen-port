"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Edit, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Auth } from "@/services";
import { useAppSelector } from "@/store/hooks";



const skillsFormSchema = z.object({
  newSkill: z.string().optional(),
  skills: z.array(z.string()).nullable(),
});

type SkillsFormValues = z.infer<typeof skillsFormSchema>;

export function Skills() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state) => state.user.userData);
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const MotionCard = motion(Card);
  const { toast } = useToast();

  const form = useForm<SkillsFormValues>({
    resolver: zodResolver(skillsFormSchema),
    defaultValues: {
      newSkill: "",
      skills: skills,
    },
  });

  const onSubmit = async (data: SkillsFormValues) => {
    try {
      setIsLoading(true);
      
      const response = await Auth.updateProfile({
        skills: skills,
      });

      if (response?.status === 200) {
        toast({
          title: "Success",
          description: "Skills updated successfully",
        });
        setIsOpen(false);
      } else {
        throw new Error("Failed to update skills");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update skills. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MotionCard
      className="relative"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Skills</CardTitle>
      </CardHeader>
      {isOpen ? (
        <CardContent>
          <X
            onClick={() => setIsOpen(false)}
            className="absolute right-7 top-7 cursor-pointer"
          />
          <CardHeader>
            <CardDescription>
              Add or remove skills from your profile.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
              <div className="flex flex-wrap gap-2">
                {skills?.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-4 w-4 p-0"
                      type="button"
                      onClick={() => setSkills(skills?.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 mb-10">
                <FormField
                  control={form.control}
                  name="newSkill"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Add a new skill"
                          {...field}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (field.value) {
                                
                                setSkills([...skills, field.value]);
                                field.onChange("");
                              }
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  onClick={() => {
                    const newSkill = form.getValues("newSkill");
                    if (newSkill) {
                      setSkills([...skills, newSkill]);
                      form.setValue("newSkill", "");
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              <CardFooter className="px-0">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save changes"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      ) : (
        <CardContent>
          <Button
            className="absolute right-7 top-7"
            onClick={() => setIsOpen(true)}
            variant="ghost"
            size="sm"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <div className="flex flex-wrap gap-2 mx-auto max-w-2xl">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </MotionCard>
  );
}
