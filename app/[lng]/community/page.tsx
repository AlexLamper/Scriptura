import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const discussionTopics = [
  { id: 1, title: "Understanding the Book of Revelation", replies: 23, lastActivity: "2 hours ago" },
  { id: 2, title: "The role of women in the early church", replies: 15, lastActivity: "5 hours ago" },
  { id: 3, title: "Interpreting Old Testament prophecies", replies: 31, lastActivity: "1 day ago" },
  { id: 4, title: "The Sermon on the Mount: practical applications", replies: 42, lastActivity: "3 days ago" },
]

const studyGroups = [
  { id: 1, name: "Psalms Study Group", members: 12, nextMeeting: "Tomorrow, 7 PM" },
  { id: 2, name: "New Testament Greek", members: 8, nextMeeting: "Friday, 6 PM" },
  { id: 3, name: "Apologetics Discussion", members: 15, nextMeeting: "Next Monday, 8 PM" },
]

export default async function CommunityPage() {

    const session = await getServerSession();
    if(!session || !session.user) {
        redirect("/api/auth/signin");
    }

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-6">Community</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="dark:bg-[#292b2f] dark:border-none">
              <CardHeader>
                <CardTitle>Discussion Forum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input placeholder="Search discussions..." className="dark:bg-[#18181a] dark:border-[#ffffff6f]" />
                </div>
                <ul className="space-y-4">
                  {discussionTopics.map((topic) => (
                    <li key={topic.id} className="border-b dark:border-b-[#4e4d4d52] pb-4 last:border-b-0">
                      <h3 className="font-semibold">{topic.title}</h3>
                      <div className="text-sm text-gray-500">
                        <span>{topic.replies} replies</span> · <span>Last activity {topic.lastActivity}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button className="mt-4">Start New Discussion</Button>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="dark:bg-[#292b2f] dark:border-none">
              <CardHeader>
                <CardTitle>Study Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {studyGroups.map((group) => (
                    <li key={group.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{group.name}</h3>
                        <p className="text-sm text-gray-500">{group.members} members</p>
                        <p className="text-sm text-gray-500">Next: {group.nextMeeting}</p>
                      </div>
                      <Button variant="outline" size="sm" className="dark:bg-[#18181a] dark:border-[#ffffff2b]">
                        Join
                      </Button>
                    </li>
                  ))}
                </ul>
                <Button className="mt-4 w-full">Create Study Group</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

