"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { ShieldCheck } from "lucide-react";

interface UserItem {
  _id: string;
  name: string;
  email: string;
  subscribed: boolean;
  isAdmin: boolean;
}
interface User { isAdmin: boolean }

export default function ManageUsers() {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);

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
        const usersRes = await fetch("/api/admin/users");
        if (usersRes.ok) {
          const data = await usersRes.json();
          setUsers(data.users);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session, router]);

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
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <div className="bg-purple-600 text-white flex items-center gap-1 px-2 py-1 rounded-md">
          <ShieldCheck className="h-4 w-4" />
          <span>Admin Access</span>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Subscribed</th>
                  <th className="p-2">Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t">
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">{u.subscribed ? "Yes" : "No"}</td>
                    <td className="p-2">{u.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Button variant="outline" onClick={() => router.push("/admin")}>Back to Dashboard</Button>
      </div>
    </div>
  );
}