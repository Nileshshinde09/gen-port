import { Star, StarHalf, Star as StarFilled } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
interface ReviewStarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  rating: number;
}
const ReviewStar: React.FC<ReviewStarProps> = ({
  className,
  rating,
  ...props
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center space-x-1", className)} {...props}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <StarFilled key={`full-${index}`} className="text-yellow-500 hover:translate-x-2 transition-all cursor-pointer" />
      ))}
      {hasHalfStar && <StarHalf className="text-yellow-500 hover:-translate-x-2 transition-all cursor-pointer" />}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star key={`empty-${index}`} className="text-gray-300" />
      ))}
    </div>
  );
};

export default ReviewStar;
