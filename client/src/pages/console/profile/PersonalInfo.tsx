import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";

interface PersonalInfoProps {
  initialInfo: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
  };
}

const phoneRegex = /^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/;

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(
      phoneRegex,
      "Please enter a valid phone number. Example formats: +1 (555) 555-5555, 555-555-5555, 5555555555"
    )
    .transform((val) => val.replace(/[^\d+]/g, '')),
});

export function PersonalInfo({ initialInfo }: PersonalInfoProps) {
  const [info, setInfo] = useState(initialInfo);
  const [isEditing, setIsEditing] = useState(false);
  
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialInfo,
    mode: "onChange",
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Saved data", data);
    setInfo(data);
    setIsEditing(false);
  };

  const MotionCard = motion(Card);

  if (isEditing) {
    return (
      <MotionCard 
        className="sticky top-8 shadow-lg max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                form.reset();
                setIsEditing(false);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </Button>
          </div>
          <CardDescription className="text-base">
            Update your personal information below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-10" placeholder="Enter your name" />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-10" placeholder="Enter your title" />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Location</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-10" placeholder="Enter your location" />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Email</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-10" placeholder="Enter your email" />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Phone</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-10" placeholder="Enter your phone number" />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-3 justify-end pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setIsEditing(false);
                  }}
                  className="hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 transition-colors"
                >
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </MotionCard>
    );
  }

  return (
    <MotionCard
      className="sticky top-8 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-md mx-auto overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute right-4 top-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-secondary/80 transition-colors"
          onClick={() => setIsEditing(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
      <CardHeader className="text-center pb-2 pt-8">
        <div className="relative w-32 h-32 mx-auto mb-6 group">
          <Avatar className="w-32 h-32 border-4 border-primary/10 ring-2 ring-background group-hover:ring-primary/30 transition-all duration-300">
            <AvatarImage 
              src="/placeholder.svg" 
              alt={info.name}
              className="object-cover"
            />
            <AvatarFallback className="text-3xl font-bold bg-primary/5">
              {info.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>
        <CardTitle className="text-2xl font-bold mb-1">{info.name}</CardTitle>
        <CardDescription className="text-base font-medium text-primary/80">
          {info.title}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 py-4">
          {[
            { icon: MapPin, value: info.location, label: "Location" },
            { icon: Mail, value: info.email, label: "Email" },
            { icon: Phone, value: info.phone, label: "Phone" },
          ].map(({ icon: Icon, value, label }) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center p-3 rounded-lg hover:bg-secondary/40 transition-colors group"
            >
              <div className="bg-primary/5 p-2 rounded-md group-hover:bg-primary/10 transition-colors">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3 flex flex-col">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-sm font-medium">{value}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <Separator className="my-6" />
        <Button 
          variant="outline" 
          className="w-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300 font-medium"
        >
          Download DCV
        </Button>
      </CardContent>
    </MotionCard>
  );
}
