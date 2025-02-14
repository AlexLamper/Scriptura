"use client";

import { Button } from "../../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../../components/ui/tabs";

export default function LessonPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-6">Test Title</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video">
                    <p className="p-6">
                        <span>
                            <span>
                                <strong>John 3:16</strong> - For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.
                                <br /><br />
                                <strong>Psalm 23:1</strong> - The Lord is my shepherd; I shall not want.
                                <br /><br />
                                <strong>Philippians 4:13</strong> - I can do all things through him who strengthens me.
                                <br /><br />
                                <strong>Romans 8:28</strong> - And we know that in all things God works for the good of those who love him, who have been called according to his purpose.
                                <br /><br />
                                <strong>Proverbs 3:5-6</strong> - Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.
                                <br /><br />
                                <strong>Isaiah 40:31</strong> - But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.
                                <br /><br />
                                <strong>Matthew 11:28</strong> - Come to me, all you who are weary and burdened, and I will give you rest.
                                <br /><br />
                                <strong>Jeremiah 29:11</strong> - For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.
                                <br /><br />
                                <strong>1 Corinthians 13:4-7</strong> - Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.
                                <br /><br />
                                <strong>Genesis 1:1</strong> - In the beginning, God created the heavens and the earth.
                            </span>
                        </span>
                    </p>
                </div>
              </CardContent>
            </Card>
            <Tabs defaultValue="content" className="mt-6">
              <TabsList>
                <TabsTrigger value="content">Lesson Content</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                <TabsTrigger value="resources">Additional Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <Card>
                  <CardContent className="prose max-w-none mt-6">
                    <div dangerouslySetInnerHTML={{ __html: "test" }}></div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="discussion">
                <Card>
                  <CardContent>
                    <p className="text-gray-600">Discussion forum for this lesson (to be implemented)</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="resources">
                <Card>
                  <CardContent>
                    <p className="text-gray-600">Additional resources for this lesson (to be implemented)</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Lesson Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Previous Lesson
                </Button>
                <Button className="w-full justify-start">Next Lesson</Button>
                <Button variant="secondary" className="w-full justify-start">
                  Back to Course
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}