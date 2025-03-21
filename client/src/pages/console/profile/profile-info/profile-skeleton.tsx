"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "framer-motion"

export function ProfileSkeleton() {
  const MotionCard = motion(Card)

  return (
    <MotionCard
      className="sticky top-8 shadow-lg max-w-md mx-auto overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <CardHeader className="text-center pb-2 pt-8">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="w-32 h-32 rounded-full bg-primary/5 animate-pulse" />
        </div>
        <div className="h-8 w-48 bg-primary/5 mx-auto mb-2 animate-pulse rounded" />
        <div className="h-6 w-32 bg-primary/5 mx-auto animate-pulse rounded" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4 py-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center p-3 rounded-lg">
              <div className="bg-primary/5 p-2 rounded-md animate-pulse w-9 h-9" />
              <div className="ml-3 flex flex-col gap-2 flex-1">
                <div className="h-4 w-20 bg-primary/5 animate-pulse rounded" />
                <div className="h-5 w-32 bg-primary/5 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </MotionCard>
  )
}

