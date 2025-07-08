"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { Switch } from "../../../../../components/ui/switch";
import { ShieldCheck } from "lucide-react";

interface User { _id: string; isAdmin: boolean }

export default function CreateQuiz() {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");
  const [language, setLanguage] = useState("en");
  const [isPublic, setIsPublic] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        router.push("/api/auth/signin");
        return;
      }
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          if (!data.user.isAdmin) {
            router.push("/");
            return;
          }
        } else {
          router.push("/");
          return;
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session, router]);

  const submit = async () => {
    if (!title || !description || !category) return;
    const payload = {
      title,
      description,
      category,
      subCategory,
      difficulty,
      language,
      author: user?._id || "",
      questions: [],
      tags: [],
      isPublic,
      isPremium,
    };
    try {
      const res = await fetch("/api/admin/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/admin/quizzes");
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
        <h1 className="text-3xl font-bold">Create Quiz</h1>
        <div className="bg-purple-600 text-white flex items-center gap-1 px-2 py-1 rounded-md">
          <ShieldCheck className="h-4 w-4" />
          <span>Admin Access</span>
        </div>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <Input placeholder="Sub Category" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} />
          <Input placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} />
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="border rounded p-2 w-full">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <div className="flex items-center gap-2">
            <Switch id="public" checked={isPublic} onCheckedChange={(v) => setIsPublic(!!v)} />
            <label htmlFor="public">Public</label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="premium" checked={isPremium} onCheckedChange={(v) => setIsPremium(!!v)} />
            <label htmlFor="premium">Premium</label>
          </div>
          <Button onClick={submit}>Create</Button>
        </CardContent>
      </Card>
    </div>
  );
}
