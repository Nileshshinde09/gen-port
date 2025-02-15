import { Icons } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flower } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "../../hooks/use-toast";
import { Auth } from "../../services";
import { setAuthPage } from "../../store/slices/themeSlice";
import { logInSchema } from "@/schema";
import { login } from "@/store/slices/userSlice";

// Define the shape of your form data
interface LoginFormInputs {
  email: string;
  password: string;
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
const Login = ({ className, ...props }: UserAuthFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(setAuthPage("login"));
  }, []);
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      
      const response = await Auth.loginToAccount(data);
      if (response.status === 201) {
        toast({
          title: "Failed",
          description: response.data.message,
        });
      }

      if (response.status === 200) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        dispatch(login(response.data.data.user));
      }
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      const errorMessage =
        axiosError?.response?.data?.message || "An error occurred";
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mx-auto">
        <div className="w-[22rem] mx-auto sm:mt-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold text-black dark:text-white">
                  Sign In
                </h1>
                <p className="text-balance text-black dark:text-white">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="grid gap-4 dark:text-white text-muted">
                <div className="grid gap-2">
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
                          type="email"
                          placeholder="m@example.com"
                          className="text-black dark:text-white"
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label
                      htmlFor="password"
                      className="text-black dark:text-white"
                    >
                      Password
                    </Label>
                    <Link
                      to="/forgot-password"
                      className="text-black dark:text-white ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Input
                          id="password"
                          type="password"
                          placeholder="abc123"
                          className="text-black dark:text-white"
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-black dark:text-white">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </form>
            <div className="relative space-y-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              type="button"
              className="w-full mt-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Flower className=" h-6 w-6 text-rose-500" />
              )}{" "}
              Continue with Guest Account
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
