import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from '@radix-ui/react-label';
import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2 } from 'lucide-react';
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
} from "../../components/ui/form";
import { Button } from '../../components/ui/button';
import { useToast } from '../../hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { useCookies } from 'react-cookie';
import { Auth } from '../../services';
import z from "zod"
// Define component props (if any, none in this case)
interface VerifyForgotPasswordProps {}

const VerifyForgotPassword: React.FC<VerifyForgotPasswordProps> = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createPassword, setCreatePassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [pageVerification, setPageVerification] = useState<boolean>(false);

    const [cookies, setCookie] = useCookies(['resetforgotpasswordToken']);
    const { token } = useParams<{ token: string }>();
    const { toast } = useToast();
    const navigate = useNavigate();
    interface ResetPasswordSchemaType{
        createPassword:string;
        confirmPassword:string;
    }
    const resetPasswordSchema = z.object({
        createPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
      }).superRefine(({ confirmPassword, createPassword }, ctx) => {
        if (confirmPassword !== createPassword) {
          ctx.addIssue({
            code: "custom",
            message: "The passwords did not match"
          });
        }
      });
      
      
    // React Hook Form setup with Zod schema validation
    const form = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            createPassword: '',
            confirmPassword: ''
        },
    });

    // Page verification effect
    useEffect(() => {
        if (token) {
            const cookieOptions = {
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict' as const,
                expires: new Date(Date.now() + 7200 * 1000),
                httpOnly: false
            };

            // Set the cookie
            setCookie('resetforgotpasswordToken', token, cookieOptions);

            // Verify token and set page verification
            (async () => {
                try {
                    const response = await Auth.resetForgotPasswordVerification({token})
                    
                    if (response.data.statusCode === 200) {
                        setPageVerification(true);
                    }
                } catch (error) {
                    console.error("Verification failed:", error);
                    toast({
                        title: 'Verification Failed',
                        description: 'Invalid or expired reset token',
                        variant: 'destructive',
                    });
                    navigate('/send-forgot-password-mail');
                }
            })();
        }
    }, [token, setCookie, toast, navigate]);

    // Submit handler
    const onSubmit: SubmitHandler<ResetPasswordSchemaType> = async (data) => {
        const { confirmPassword } = data;
        setIsSubmitting(true);

        try {
            if (!confirmPassword) {
                return;
            }

            const response = await Auth.resetForgotPassword({newPassword:confirmPassword,token:cookies.resetforgotpasswordToken});
            if (response.data.success) {
                toast({
                    title: 'Success',
                    description: response.data.message,
                });
                navigate("/login");
            }

        } catch (error: any) {
            console.error('Error during resetting password:', error);

            const errorMessage = error.response?.data.message || 'Failed to reset password';
            toast({
                title: 'Reset Password Failed!',
                description: errorMessage,
                variant: 'destructive',
            });

        } finally {
            setIsSubmitting(false);
        }
    };

    if (!pageVerification) {
        return <h1>Page Not Verified</h1>;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Reset Password</h1>
                    <p className="text-muted dark:text-muted-foreground">
                        Create New Password
                    </p>
                </div>
                <div className="grid gap-4 dark:text-white text-muted">
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="createPassword">Create Password</Label>
                        </div>
                        <FormField
                            name="createPassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <Input
                                        id="createPassword"
                                        type="password"
                                        placeholder="password"
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
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                        </div>
                        <FormField
                            name="confirmPassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="password"
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setConfirmPassword(e.target.value);
                                        }}
                                    />
                                    <FormMessage />
                                    {confirmPassword && createPassword && confirmPassword !== createPassword ? (
                                        <p className="text-sm text-red-500">
                                            The passwords did not match
                                        </p>
                                    ) : null}
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className='w-full' disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default VerifyForgotPassword;
