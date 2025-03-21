import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Auth } from "../../services";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { useToast } from "../../hooks/use-toast";
import { VITE_HOST_URL } from "../../constants";

// Define the form schema type based on the zod schema
interface EmailFormTypes {
  email: string;
}
const sendForgotPasswordMail: React.FC = () => {

    const { toast } = useToast();
    const emailSchema = z.object({email: z.string().email({ message: 'Invalid email address' })})
      
    const form = useForm<EmailFormTypes>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
    });
    
    type EmailForm = z.infer<typeof emailSchema>;

  const onSubmit: SubmitHandler<EmailForm> = async (data) => {
    try {
      const email = data.email;
      const passwordResetUrl = `${VITE_HOST_URL}/verify-forgot-password/verify/`;
      const sendEmailResponse = await Auth.sendResetForgotPasswordEmail({ email, passwordResetUrl })

      if (sendEmailResponse.data.statusCode === 404) {
        toast({
          title: sendEmailResponse.data.message,
          variant: "destructive",
        });
      } else if (sendEmailResponse.data.statusCode === 200) {
        toast({
          title: sendEmailResponse.data.message,
        });
      } 
    } catch (error: unknown) {
      console.error((error as Error).message || "Something went wrong while sending email.");
    }
  };

  return (
    <>
     <div className="lg:p-8">
     <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
    <div className="w-[20rem] mx-auto">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-white">Send Reset Password Email</h1>
            <p className="text-balance text-muted dark:text-muted-foreground">
              Submit email to reset forgotten password
            </p>
          </div>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="nilesh@example.com"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 text-center text-md text-white">
            Re-send Email?{" "}
            <Button type="submit" variant="outline" className="mx-4 bg-black">
              Submit
            </Button>
          </div>
        </form>
      </Form>
                </div>
                </div>
                </div>
              
    </>
  );
};

export default sendForgotPasswordMail;
