import { CourseGrid } from "../../../components/course-grid";
import { CourseRecommendation } from "../../../components/course-recommendation";
import { NextLessons } from "../../../components/next-lessons";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getServerSession();
    if(!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <div>
            <CourseGrid params={{
                lng: ""
            }} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <NextLessons params={{
                        lng: ""
                    }} />
                </div>
                <CourseRecommendation params={{
                    lng: ""
                }} />
            </div>
        </div>
    );
}