import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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

interface AboutMeProps {
  initialAboutMe: string;
}

const bioSchema = z.object({
  bio: z
    .string()
    .min(1, "About/bio required")
    .max(400, "The length of About/bio must be under 400 characters."),
});

type BioFormValues = z.infer<typeof bioSchema>;

export function AboutMe({ initialAboutMe }: AboutMeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(initialAboutMe);

  const form = useForm<BioFormValues>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      bio: initialAboutMe,
    },
  });

  const onSubmit: SubmitHandler<BioFormValues> = (data) => {
    setBio(data.bio);
    setIsEditing(false);
  };

  const MotionCard = motion(Card);

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
        <p className="text-muted-foreground whitespace-pre-wrap">{bio}</p>
      </CardContent>
    </MotionCard>
  );
}