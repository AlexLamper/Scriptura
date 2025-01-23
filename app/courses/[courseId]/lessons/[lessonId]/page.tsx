import { GetServerSideProps } from 'next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  content: string;
}

interface PageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
  lesson: Lesson;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { courseId, lessonId } = context.params as { courseId: string; lessonId: string };

  // Fetch lesson data here
  const lesson = await fetchLessonData(courseId, lessonId);

  return {
    props: {
      params: {
        courseId,
        lessonId,
      },
      lesson,
    },
  };
};

async function fetchLessonData(courseId: string, lessonId: string): Promise<Lesson> {
  // Replace this with your actual data fetching logic
  return {
    id: lessonId,
    title: "Introduction to Genesis",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    content: `
      <h2>Introduction</h2>
      <p>Genesis, the first book of the Old Testament, serves as the foundation for understanding the entire Bible. It introduces us to key themes and concepts that resonate throughout Scripture.</p>
      
      <h2>Key Points</h2>
      <ul>
        <li>The creation account</li>
        <li>The fall of humanity</li>
        <li>God's covenant with Abraham</li>
        <li>The patriarchs: Abraham, Isaac, and Jacob</li>
      </ul>
      
      <h2>Reflection Questions</h2>
      <ol>
        <li>How does the creation account in Genesis inform our understanding of God's nature?</li>
        <li>What lessons can we learn from the fall of Adam and Eve?</li>
        <li>How does God's covenant with Abraham foreshadow His plan for salvation?</li>
      </ol>
    `,
  };
}

export default function LessonPage({ lesson }: PageProps) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video">
                  <iframe
                    src={lesson.videoUrl}
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
                    <div dangerouslySetInnerHTML={{ __html: lesson.content }}></div>
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