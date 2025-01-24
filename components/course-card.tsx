import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  description: string;
  category: string;
  totalDuration: number;
  difficulty: string;
  tags: string[];
}

export function CourseCard({
  title,
  description,
  category,
  totalDuration,
  difficulty,
  tags,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105">
      <div className="mb-2">
        <Badge variant="secondary" className="text-xs uppercase font-semibold tracking-wide">
          {category}
        </Badge>
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-700 mb-4">{description}</p>
      <div className="text-sm text-gray-600 mb-4">
        <p>
          <span className="font-medium">Total Duration:</span> {totalDuration} minutes
        </p>
        <p>
          <span className="font-medium">Difficulty:</span> {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <Badge key={index} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Button>View Course</Button>
      </div>
    </div>
  );
}
