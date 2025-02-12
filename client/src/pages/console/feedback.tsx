import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../../components/ui/form";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { RiStarFill } from "@remixicon/react";
import { useId, useState } from "react";
const feedbackSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1." })
    .max(5, { message: "Rating cannot be more than 5." }),
  comment: z
    .string()
    .min(6, { message: "Comment must be at least 6 characters long." }),
});

const Feedback = () => {
  const form = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const onSubmit =async (data: z.infer<typeof feedbackSchema>) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
  };

  return (
    <>
      <div className="h-full w-full">
        <div className="max-w-3xl mx-auto p-4 mt-20">
          <h1 className="relative h-24 z-10 text-lg md:text-7xl text-white text-center font-sans font-bold">
            Share Your Thoughts!
          </h1>

          <p className="text-neutral-300/70 max-w-xl mx-auto my-2 text-sm text-center relative z-10">
            At{" "}
            <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              Prep Next
            </span>
            , your feedback helps us improve and serve you better. Whether you
            loved a recommendation, found a bug, or have a suggestion for a new
            feature, we want to hear from you! Your input directly shapes the
            future of our app, ensuring that we continue delivering the best
            food recommendations tailored to your taste.
          </p>

          <div className="max-w-xl mx-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 relative"
              >
                {/* Rating Field */}
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem className="h-10">
                      <FormControl>
                        <Ratings
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Comment Field */}
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem className="z-10">
                      <FormControl>
                        <Textarea
                          placeholder="Write your feedback..."
                          {...field}
                          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4 bg-neutral-950 placeholder:text-neutral-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full mt-4 absolute z-10">
                  Submit Feedback
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

const Ratings = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const id = useId();
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  return (
    <>
      <RadioGroup
        className="inline-flex gap-0 z-50 absolute left-1/2 -translate-x-1/2"
        onValueChange={(val) => onChange(Number(val))}
        value={String(value)}
      >
        {["1", "2", "3", "4", "5"].map((star) => (
          <label
            key={star}
            className="group relative cursor-pointer rounded-lg p-0.5"
            onMouseEnter={() => setHoverRating(Number(star))}
            onMouseLeave={() => setHoverRating(null)}
          >
            <RadioGroupItem
              id={`${id}-${star}`}
              value={star}
              className="sr-only"
            />
            <RiStarFill
              size={24}
              className={`transition-all ${
                (hoverRating ?? value) >= Number(star)
                  ? "text-amber-500"
                  : "text-input"
              } group-hover:scale-110`}
            />
            <span className="sr-only">
              {star} star{star === "1" ? "" : "s"}
            </span>
          </label>
        ))}
      </RadioGroup>
    </>
  );
};

export default Feedback;
