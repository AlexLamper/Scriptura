import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

const bibleVersions = [
  { id: 1, name: "King James Version (KJV)", language: "English" },
  { id: 2, name: "New International Version (NIV)", language: "English" },
  { id: 3, name: "English Standard Version (ESV)", language: "English" },
  { id: 4, name: "Reina-Valera 1960 (RVR1960)", language: "Spanish" },
]

const commentaries = [
  { id: 1, title: "Matthew Henry's Commentary", author: "Matthew Henry" },
  { id: 2, title: "MacArthur Bible Commentary", author: "John MacArthur" },
  { id: 3, title: "The Bible Knowledge Commentary", author: "John F. Walvoord & Roy B. Zuck" },
]

const studyTools = [
  { id: 1, name: "Strong's Concordance", description: "Lexicon of biblical words" },
  { id: 2, name: "Bible Atlas", description: "Maps and geographical information" },
  { id: 3, name: "Greek and Hebrew Interlinear", description: "Original language study tool" },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-6">Resources</h1>
        <Tabs defaultValue="bibleVersions">
          <TabsList className="mb-4 dark:bg-[#292b2f]">
            <TabsTrigger
              value="bibleVersions"
              className="data-[state=active]:text-white data-[state=active]:bg-[#1f2023] rounded"
            >
              Bible Versions
            </TabsTrigger>
            <TabsTrigger
              value="commentaries"
              className="data-[state=active]:text-white data-[state=active]:bg-[#1f2023] rounded"
            >
              Commentaries
            </TabsTrigger>
            <TabsTrigger
              value="studyTools"
              className="data-[state=active]:text-white data-[state=active]:bg-[#1f2023] rounded"
            >
              Study Tools
            </TabsTrigger>
          </TabsList>
          <TabsContent value="bibleVersions">
            <Card className="dark:bg-[#292b2f] dark:border-none">
              <CardHeader>
                <CardTitle>Bible Versions</CardTitle>
              </CardHeader>
              <CardContent>
                <Input placeholder="Search Bible versions..." className="dark:bg-[#18181a] dark:border-[#ffffff6f] mb-4" />
                <ul className="space-y-4">
                  {bibleVersions.map((version) => (
                    <li key={version.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{version.name}</h3>
                        <p className="text-sm text-gray-500">{version.language}</p>
                      </div>
                      <Button variant="outline" className="dark:bg-[#18181a] dark:border-[#ffffff2b]">Read</Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="commentaries">
            <Card className="dark:bg-[#292b2f] dark:border-none">
              <CardHeader>
                <CardTitle>Commentaries</CardTitle>
              </CardHeader>
              <CardContent>
                <Input placeholder="Search commentaries..." className="dark:bg-[#18181a] dark:border-[#ffffff6f] mb-4" />
                <ul className="space-y-4">
                  {commentaries.map((commentary) => (
                    <li key={commentary.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{commentary.title}</h3>
                        <p className="text-sm text-gray-500">by {commentary.author}</p>
                      </div>
                      <Button variant="outline" className="dark:bg-[#18181a] dark:border-[#ffffff2b]">Access</Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="studyTools">
            <Card className="dark:bg-[#292b2f] dark:border-none">
              <CardHeader>
                <CardTitle>Study Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <Input placeholder="Search study tools..." className="dark:bg-[#18181a] dark:border-[#ffffff6f] mb-4" />
                <ul className="space-y-4">
                  {studyTools.map((tool) => (
                    <li key={tool.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{tool.name}</h3>
                        <p className="text-sm text-gray-500">{tool.description}</p>
                      </div>
                      <Button variant="outline" className="dark:bg-[#18181a] dark:border-[#ffffff2b]">Use Tool</Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

