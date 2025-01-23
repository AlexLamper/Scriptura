import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
    const session = await getServerSession();
    if(!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <div className="bg-gray-100 min-h-screen w-full">
            <div className="mx-auto">
                <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" defaultValue={session.user.name ?? ""} />
                                    </div>
                                    {/* <div>
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" defaultValue="Doe" />
                                    </div> */}
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue={session.user.email ?? ""} />
                                </div>
                                <div>
                                    <Label htmlFor="bio">Bio</Label>
                                    <textarea
                                        id="bio"
                                        className="w-full min-h-[100px] p-2 border rounded-md"
                                        defaultValue="I'm passionate about studying the Bible and growing in my faith."
                                    ></textarea>
                                </div>
                                <Button>Save Changes</Button>
                            </form>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <Avatar className="w-32 h-32 mb-4">
                                <AvatarImage src={session.user.image ?? undefined} />
                                <AvatarFallback>{session.user.name}</AvatarFallback>
                            </Avatar>
                            <Button>Change Picture</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}