"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface ProfileImageHandlerProps {
  avatarFile: File | null
  user: any
  info: {
    fullName: string
  }
  onAvatarChange: (file: File) => void
  onAvatarRemove: () => void
}

export function ProfileImageHandler({
  avatarFile,
  user,
  info,
  onAvatarChange,
  onAvatarRemove,
}: ProfileImageHandlerProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onAvatarChange(file)
    }
  }

  return (
    <>
      <div className="relative w-32 h-32 group">
        <Avatar className="w-32 h-32 border-4 border-primary/10">
          <AvatarImage
            src={avatarFile ? URL.createObjectURL(avatarFile) : user?.avatar || "/placeholder.svg"}
            alt={info.fullName}
            className="object-cover"
          />
          <AvatarFallback className="text-3xl font-bold bg-primary/5">
            {info.fullName
              ? info.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "?"}
          </AvatarFallback>
        </Avatar>
        <label
          htmlFor="avatar-upload"
          className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <span className="text-white text-sm font-medium">Change Photo</span>
        </label>
        <input id="avatar-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
      <Button type="button" variant="outline" size="sm" onClick={onAvatarRemove} className="text-sm">
        Remove Photo
      </Button>
    </>
  )
}

