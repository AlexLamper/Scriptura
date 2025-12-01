"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { ShieldCheck, Trash2, Pencil } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  category: string;
  isPremium: boolean;
}

interface User { isAdmin: boolean }

export default function ManageCourses() {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        router.push("/api/auth/signin");
        return;
      }
      try {
        const userRes = await fetch("/api/user");
        if (userRes.ok) {
          const data = await userRes.json();
          setUser(data.user);
          if (!data.user.isAdmin) {
            router.push("/");
            return;
          }
        } else {
          router.push("/");
          return;
        }
        const res = await fetch("/api/admin/courses");
        if (res.ok) {
          const data = await res.json();
          setCourses(data.courses);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session, router]);

  const deleteCourse = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCourses(courses.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full mx-auto px-4 pt-2 pb-4 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user?.isAdmin) return null;

  return (
    <div className="min-h-screen w-full mx-auto px-4 pt-2 pb-4">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold">Manage Courses</h1>
        <div className="bg-purple-600 text-white flex items-center gap-1 px-2 py-1 rounded-md">
          <ShieldCheck className="h-4 w-4" />
          <span>Admin Access</span>
        </div>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {courses.map((course) => (
              <Card key={course._id} className="overflow-hidden">
                <div className="flex items-center p-4 border-b justify-between">
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-gray-500">{course.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => router.push(`/admin/courses/edit/${course._id}`)}>
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteCourse(course._id)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.push("/admin")}>Back to Dashboard</Button>
        <Button onClick={() => router.push("/admin/courses/create")}>Create New Course</Button>
      </div>
    </div>
  );
}