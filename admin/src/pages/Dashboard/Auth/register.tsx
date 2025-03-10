import { Label } from "@radix-ui/react-label";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Flower, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../../../hooks/use-toast";
import { signUpSchema } from "../../../schema";
import { Auth } from "../../../services";

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [usernameMessage, setUsernameMessage] = useState<string>("");
  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createPassword, setCreatePassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [debouncedUsername] = useDebounce(username, 300);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      gender: "",
      createPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get<{ message: string }>(
            `/api/v1/user/check-unique-username/?username=${debouncedUsername}`
          );
          setUsernameMessage(response.data.message);
        } catch (error: any) {
          const axiosError = error;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await Auth.signup(data);
      if(response.status===201){
        toast({
          title: "Success",
          description: response.data.message,
        }); 
        form.reset(); 
      }

    } catch (error: any) {
      const axiosError = error;
      toast({
        title: "Error",
        description: axiosError.response?.data.message ?? "An error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full  mx-auto max-w-3xl top-1/2 translate-y-1/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Create User Account</h1>
              <p className="text-balance text-black dark:text-white">
                Enter user details below to Sign up
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4  text-black dark:text-white">
              {/* Full Name */}
              <FormField
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black dark:text-white">
                      Full Name
                    </FormLabel>
                    <Input
                      id="fullName"
                      placeholder="John D'souza"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black dark:text-white">
                      Email
                    </FormLabel>
                    <Input
                      id="email"
                      placeholder="m@example.com"
                      type="email"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Username */}
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black dark:text-white">
                      Username
                    </FormLabel>
                    <Input
                      id="username"
                      placeholder="Striver"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setUsername(e.target.value);
                      }}
                    />
                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                    {!isCheckingUsername && usernameMessage && (
                      <p
                        className={`text-sm ${
                          usernameMessage === "user name is unique"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {usernameMessage}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Gender */}
              <FormField
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black dark:text-white">
                      Gender
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Create Password */}
              <FormField
                name="createPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label
                      htmlFor="createPassword"
                      className="text-black dark:text-white"
                    >
                      Create Password
                    </Label>
                    <Input
                      id="createPassword"
                      type="password"
                      placeholder="abc123"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setCreatePassword(e.target.value);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Confirm Password */}
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label
                      htmlFor="confirmPassword"
                      className="text-black dark:text-white"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="abc123"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setConfirmPassword(e.target.value);
                      }}
                    />
                    {confirmPassword &&
                      createPassword &&
                      confirmPassword !== createPassword && (
                        <p className="text-sm text-red-500">
                          The passwords did not match
                        </p>
                      )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full max-w-sm mt-3 left-1/2 translate-x-1/2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SignUp;
