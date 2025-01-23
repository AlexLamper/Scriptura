import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export async function Header() {
    const session = await getServerSession();
    if(!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                Welcome to <span className="text-red-500">Scriptura,</span> <span>{session.user.name}!</span>
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Input type="search" placeholder="Search" className="w-64 pl-10" />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                    <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="User" />
                    </Avatar>
                <div className="text-sm">
                    <p className="font-medium">{session.user.name}</p>
                    <p className="text-gray-500 text-[0.8rem]">{session.user.email}</p>
                </div>
            </div>
        </header>
    )
}

