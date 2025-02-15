import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/store/hooks";
import { Auth } from "@/services";
import { toast } from "@/hooks/use-toast";
const bioSchema = z.object({
  bio: z
  .string()
  .min(1, "About/bio required")
  .max(400, "The length of About/bio must be under 400 characters."),
});

type BioFormValues = z.infer<typeof bioSchema>;

export function AboutMe() {
  const user = useAppSelector((state: any) => state.user.userData);
  
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio);
  const form = useForm<BioFormValues>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      bio: user?.bio,
    },
  });
  


  const onSubmit: SubmitHandler<BioFormValues> = async (data) => {
    try {
      const response = await Auth.updateProfile({
        bio: data.bio,
      });
      
      if (response?.status === 200) {
        setBio(response?.data?.data?.resUser?.bio);
        setIsEditing(false);
        toast({
          title: "Success",
          description: "Bio updated successfully",
        });
      } else {
        throw new Error("Failed to update bio");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bio. Please try again.",
        variant: "destructive",
      });
      // Keep the form open if there's an error
    }
  };

  const MotionCard = motion(Card);

  if (!user?.bio) {
    return (
      <MotionCard>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-8 w-[120px]" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[120px] w-full" />
        </CardContent>
      </MotionCard>
    );
  }

  if (isEditing) {
    return (
      <MotionCard>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Hi, I'm..."
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </MotionCard>
    );
  }

  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">About Me</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground whitespace-pre-wrap">
          {bio || "Bio not set"}
        </p>
      </CardContent>
    </MotionCard>
  );
}