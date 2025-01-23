"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
                  <iframe
                    src="test"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
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