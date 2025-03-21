import { Icons } from "@/components";
import { Button } from "@/components/ui/button";
import { Flower } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "../../hooks/use-toast";
import { Auth } from "../../services";
import { setAuthPage } from "../../store/slices/themeSlice";
import { login } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
const Guest = ({ className, ...props }: UserAuthFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(setAuthPage("guest"));
  }, []);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await Auth.createGuestUser();
      // if (response.status === 201) {
      //   toast({
      //     title: "Failed",
      //     description: response?.data?.message,
      //   });
      // }

      if (response?.data?.success) {
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
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={cn("mx-auto",className)} {...props}>
        <div className="w-[22rem] mx-auto sm:mt-1 flex flex-col space-y-8">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-black dark:text-white">
            Create an account
            </h1>
          </div>
          <Button
            onClick={() => onSubmit()}
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
          <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                LogIn
              </Link>
            </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
        </div>
      </div>
    </>
  );
};

export default Guest;
