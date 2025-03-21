import  {  useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '../../hooks/use-toast';
import { z } from 'zod';
import { Auth } from '../../services/auth.service';
import { Form, FormField, FormItem,  FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '@/store/slices/userSlice';

const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, { message: "Old password is required" }),
    createPassword: z.string().min(1, { message: "New password is required" }),
    confirmPassword: z.string().min(1, { message: "Confirm password is required" })
});

const ChangePassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createpassword, setCreatepassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     dispatch(setAuthPage("change-password"));
    // }, []);
    
    const form = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: '',
            createPassword: '',
            confirmPassword: ''
        },
    });

    const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
        const { confirmPassword, oldPassword } = data;
        setIsSubmitting(true);
        try {
            if (!confirmPassword || !oldPassword) {
                return
            }
            const response = await Auth.changeCurrentPassword({ oldPassword, newPassword: confirmPassword });
            if (response.data.success) {
                toast({
                    title: 'Password Changed Successfully!',
                    description: response.data.message,

                });
                dispatch(logout())
            }

        } catch (error: any) {
            const axiosError = error
            let errorMessage = axiosError.response?.data.message;
            toast({
                title: 'Password Change Faild!',
                description: errorMessage,
                variant: 'destructive',
            });
        }
        finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className='flex flex-col items-center justify-center h-screen space-y-10'>
            <h1 className='text-2xl font-bold'>Change Password</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-[20rem]'>
                    <div className="grid gap-4 dark:text-white text-muted">
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="createPassword">Enter Old Password</Label>
                            </div>
                            <FormField
                                name="oldPassword"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <Input
                                            id="oldPassword"
                                            type="password"
                                            placeholder="password"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                            }}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
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
                                                setCreatepassword(e.target.value);
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
                                                setConfirmpassword(e.target.value);
                                            }}
                                        />
                                        <FormMessage />
                                        {confirmpassword != "" && createpassword != "" && confirmpassword != createpassword ? (
                                            <p
                                                className={'text-sm text-red-500'}
                                            >
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
                        <Link to="/send-forgot-password-mail" className="underline">
                            Forgot Password ?
                        </Link>
                    </div>
                </form>
            </Form> 
        </div>
        </div>
        </div>
    );
};

export default ChangePassword;