import React, { useState } from "react";
import { cn } from "../lib/utils";
import ReviewStar from "./reviewStart";
import { Badge } from "./ui/badge";
import { Dot, Feather, Tags } from "lucide-react";
import { truncateString } from "../lib/stringTruncate";

interface BookCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  img_src?: string;
  genre?: string;
  rating?: number;
}

const BookCard: React.FC<BookCardProps> = ({
  className,
  img_src,
  genre,
  rating,
  ...props
}) => {
  return (
    <div
      className={cn(
        " flex md:max-w-[40rem] my-2 w-[95%] sm:w-[90%] border-yellow-500 sm:border-[20px] rounded-3xl mx-auto sm:mx-16 lg:mx-auto p-2 shadow-sm shadow-black dark:shadow-white/40 bg-white/10",
        className,
        genre,
        rating
      )}
      {...props}
    >
      <img
        src={img_src}
        className="self-center h-[15rem] w-auto drop-shadow-2xl rounded-lg"
      />
      <div className="flex flex-col mx-2">
        <Badge className="w-full self-end flex justify-center">
          <Dot />
          {genre}
          <Dot />
        </Badge>
        <h1 className="md:text-3xl ls:text-xl  font-[anzo8] mt-1">
          {truncateString("Strategy Design Engineering Strategy Design Engineering",50)}
        </h1>
        <div className="flex items-center space-x-2 mt-2">
          <text className="font-[anzo7]">Nilesh Shinde</text>
          <Badge
            className={cn(
              "w-fit shadow-sm shadow-slate-700 text-sm dark:text-black bg-yellow-400",
              ``
            )}
            variant={"outline"}
          >
            <Feather className="h-4 text-blue-500 dark:text-black" />
            Auther
          </Badge>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <text className="font-[anzo7]">12 Nov 2003</text>
          <Badge
            className={cn(
              "w-fit shadow-sm shadow-slate-700 text-sm bg-yellow-400 dark:text-black",
              ``
            )}
            variant={"outline"}
          >
            <Tags className="h-6 mx-1 text-blue-500 dark:text-black" />
            Published
          </Badge>
        </div>
        <div className="mt-3 mb-2 flex">
          {rating ? <ReviewStar rating={rating} /> : "Not Available"}
          <text className="font-[anzo7] px-1 bg-yellow-400 dark:text-black rounded-sm">
            {rating}
          </text>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
