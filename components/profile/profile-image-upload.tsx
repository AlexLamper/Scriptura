"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { useToast } from "../../hooks/use-toast"
import { Camera, Loader2 } from "lucide-react"

interface ProfileImageUploadProps {
  initialImage?: string
  userName: string
}

export function ProfileImageUpload({ initialImage, userName }: ProfileImageUploadProps) {
  const [image, setImage] = useState(initialImage)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        variant: "destructive",
      })
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Create a FormData object to upload the file
      const formData = new FormData()
      formData.append("file", file)

      // In a real implementation, you would upload to a storage service like Vercel Blob
      // For this example, we'll simulate by creating a data URL
      const reader = new FileReader()
      reader.onload = async (event) => {
        const imageUrl = event.target?.result as string

        // Update the image URL in the database
        const response = await fetch("/api/user/upload-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl }),
        })

        if (!response.ok) {
          throw new Error("Failed to update profile image")
        }

        setImage(imageUrl)
        toast({
          title: "Profile image updated",
          description: "Your profile image has been updated successfully.",
        })
      }

      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: "Failed to update profile image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <Avatar
          className="w-32 h-32 mb-4 cursor-pointer group-hover:opacity-80 transition-opacity"
          onClick={handleImageClick}
        >
          <AvatarImage src={image || "/placeholder.svg"} />
          <AvatarFallback className="text-lg">{userName?.charAt(0)?.toUpperCase()}</AvatarFallback>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-8 h-8 text-white" />
          </div>
        </Avatar>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
      </div>
      <Button onClick={handleImageClick} disabled={isUploading} variant="outline">
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
          </>
        ) : (
          "Change Picture"
        )}
      </Button>
    </div>
  )
}
