import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useAppSelector } from "@/store/hooks"
import { Auth } from "@/services"
import { useToast } from "@/hooks/use-toast"
import { ProfileDisplay } from "./profile-info/profile-display"
import { ProfileForm } from "./profile-info/profile-form"
import { ProfileImageHandler } from "./profile-info/profile-image-handler"
import { ProfileSkeleton } from "./profile-info/profile-skeleton"

export function PersonalInfo() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const user = useAppSelector((state) => state.user.userData)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const fetchUser = async () => {
    try {
      const response = await Auth.getUser()
      console.log(response)
      return response
    } catch (error) {
      console.error("Error fetching user data:", error)
      return null
    }
  }

  fetchUser()

  const [info, setInfo] = useState({
    fullName: user?.fullName || "",
    designation: user?.designation || "",
    location: user?.location || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
    avatarURL: user?.avatar || "",
  })

  useEffect(() => {
    if (user) {
      setInfo({
        fullName: user.fullName || "",
        designation: user.designation || "",
        location: user.location || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
        avatarURL: user.avatar || "",
      })
      setIsLoading(false)
    }
  }, [user])

  const handleProfileUpdate = async (data: any) => {
    const response = await Auth.updateProfile(data)
    if (response.status === 200) {
      toast({
        title: "Profile updated successfully",
        description: "Your profile has been updated successfully",
      })
      setInfo(data)
      setIsEditing(false)
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update profile",
        description: "Please try again",
      })
    }
  }

  const handleAvatarChange = async (file: File) => {
    setAvatarFile(file)
    const response = await Auth.updateProfileImage(file)
    console.log("imge", response)
    if (response.status === 200) {
      toast({
        title: "Profile image updated successfully",
      })
      console.log("Response", response)
    }
  }

  const handleAvatarRemove = async () => {
    const response = await Auth.removeProfileImage()
    if (response.status === 200) {
      toast({
        title: "Profile image removed successfully",
      })
      console.log("Response", response)
      setAvatarFile(null)
    }
  }

  const MotionCard = motion(Card)

  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (!isEditing) {
    return <ProfileDisplay info={info} avatarFile={avatarFile} user={user} setIsEditing={setIsEditing} />
  }

  return (
    <MotionCard
      className="sticky top-8 shadow-lg max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ProfileForm
        info={info}
        onSubmit={handleProfileUpdate}
        onCancel={() => setIsEditing(false)}
        avatarFile={avatarFile}
        user={user}
      >
        <ProfileImageHandler
          avatarFile={avatarFile}
          user={user}
          info={info}
          onAvatarChange={handleAvatarChange}
          onAvatarRemove={handleAvatarRemove}
        />
      </ProfileForm>
    </MotionCard>
  )
}

