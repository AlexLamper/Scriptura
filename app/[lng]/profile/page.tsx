import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import connectMongoDB from "../../../libs/mongodb"
import User from "../../../models/User"
import { ProfileForm } from "../../../components/profile/profile-form"
import { ProfileImageUpload } from "../../../components/profile/profile-image-upload"
import { SubscriptionStatus } from "../../../components/profile/subscription-status"

export default async function ProfilePage() {
  const session = await getServerSession()
  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }

  // Fetch user data from database to get the most up-to-date information
  await connectMongoDB()
  const user = await User.findOne({ email: session.user.email })

  if (!user) {
    // Handle case where user is not found in the database
    console.error("User not found in database")
    // Could redirect to an error page or create the user
    redirect("/api/auth/signin")
  }

  return (
    <div className="min-h-screen w-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 dark:bg-[#292b2f] dark:border-none">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm initialName={user.name} initialEmail={user.email} initialBio={user.bio || ""} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="dark:bg-[#292b2f] dark:border-none">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ProfileImageUpload initialImage={user.image} userName={user.name} />
            </CardContent>
          </Card>

          <SubscriptionStatus userId={user._id.toString()} />
        </div>
      </div>

      <div className="mt-6">
        <Card className="dark:bg-[#292b2f] dark:border-none">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
                <div className="text-center py-8">
                  <p className="text-lg">Course progress information will be displayed here</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-lg">You are not enrolled in any courses yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
