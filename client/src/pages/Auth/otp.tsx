import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Auth } from '../../services';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { ChevronRight } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { verifyEmail } from '@/store/slices/userSlice';
import { z } from "zod"
import { useToast } from '../../hooks/use-toast';
import { useAppDispatch } from '../../store/hooks';
import { login } from '@/store/slices/userSlice';
const otpSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  })

// Define the type for the form inputs
type OTPFormValues = z.infer<typeof otpSchema>;

const OTP: React.FC = () => {
  const [isOTPSubmitted, setIsOTPSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: '',
    },
  });

  const onSubmit: SubmitHandler<OTPFormValues> = async (data) => {
    try {
      if (data.pin) {
        setIsLoading(true);
        const validationResponse = await Auth.validateOTP({otp:data.pin});
        const { emailVerified, isInvalid, isExpired } = validationResponse.data.data;
        if (emailVerified) {
          toast({
            title: 'Your email verified successfully!',
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-zinc-950 p-4">
                <h1 className="text-white text-2xl text-center">Success</h1>
              </pre>
            ),
          });
          const user: any = await Auth.getUser();
          if (user?.data?.success) dispatch(login(user?.data?.data));
          dispatch(verifyEmail(true));
        } else if (isInvalid) {
          toast({
            title: 'Invalid OTP',
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-zinc-950 p-4">
                <h1 className="text-white text-2xl text-center">Failed!</h1>
              </pre>
            ),
          });
        } else if (isExpired) {
          toast({
            title: 'OTP Expired',
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <h1 className="text-white text-2xl text-center">Failed!</h1>
              </pre>
            ),
          });
          setIsOTPSubmitted(false);
        }
        setIsLoading(false);
    }
    } catch (error) {
      console.error('Error during OTP validation:', error);
      toast({
        title: 'Error',
        description: 'An error occurred during OTP validation.',
      });
      setIsLoading(false);
    }
  };

  const sendOTPHandler = async () => {
    try {
      const generateOTPResponse = await Auth.generateOTP();
        if(generateOTPResponse.status===200){
          setIsOTPSubmitted(true);
          
        }else{
            return;
        }
      const { emailVerified } = generateOTPResponse.data.data;

      if (emailVerified) {
        toast({
          title: 'Your email has already been verified!',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <h1 className="text-white text-2xl text-center">Success</h1>
            </pre>
          ),
        });
        // dispatch(verifyEmail(true));
        navigate('/');
        const user: any = await Auth.getUser();
        if (user?.data?.success) dispatch(login(user?.data?.data));
      } 
      if (generateOTPResponse) {
        toast({
          description: generateOTPResponse?.data?.message,
        });
      }
    } catch (error) {
      console.error('Error during OTP generation:', error); 
      toast({
        title: 'Error',
        description: 'An error occurred while sending the OTP.',
      });
    }
  };

  return (
    <>
     <div className="lg:p-8">
     <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
      <div className='flex flex-col items-center justify-center h-full w-full'> 
        {!isOTPSubmitted ? (
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-white">OTP Verification</h1>
            <video src={"/otp-w-bg.mp4"} autoPlay loop muted className='w-[14rem] mx-auto h-[20rem] rounded-md object-cover ' />
            <Button className="w-[7rem] mx-auto border border-border" onClick={sendOTPHandler} disabled={isLoading}>
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center justify-center'>
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold text-white">Enter OTP</h1>
              </div>
              <div className="grid gap-4 text-white border-white">
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black dark:text-white">One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-[7rem] mx-auto">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        )}
        {isOTPSubmitted && (
          <div onClick={sendOTPHandler} className="mt-4 text-center text-md text-white">
            Re-send OTP?{' '}
            <Button variant="outline" className="mx-4 bg-black" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      </div>
      </div>
    </>
  );
};

export default OTP;
