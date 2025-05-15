"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface CourseCardProps {
  id: string | number;
  title: string;
  category: string;
  progress: string;
  language: string;
  imageUrl: string;
}

export function CourseCard({
  title,
  category,
  imageUrl,
}: CourseCardProps) {
  // Hardcoded progress value (50%)
  const progressPercentage = 50;

  return (
    <div className="group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border bg-white dark:border-[#b6b6b63d] dark:bg-[#2a2b2f] h-full">
      
      {/* Image Container */}
      <div className="relative w-full h-32">
        <Image
          src={imageUrl}
          alt={`${title} cover`}
          fill
          className="object-cover opacity-70 hover:opacity-80 transition-all duration-300"
          unoptimized
        />
      </div>
      
      {/* Card Content */}
      <div className="flex items-center p-5">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            {title}
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#e9ebfa] dark:bg-blue-900/30 dark:text-blue-400 border border-black/10 dark:border-[#b6b6b63d] text-[#1f1f1f9d]">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5 pt-3">
        <div className="mb-2 flex justify-between text-xs">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {/* Removed actual progress, can use hardcoded label instead */}
            50%
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full transition-all duration-300 group-hover:brightness-110 bg-[#0f172b] dark:bg-blue-600"
          />
        </div>
        <Button className="text-sm font-medium transition-all duration-300 group-hover:translate-y-[-2px] px-4 py-1.5 rounded-md">
          Continue
        </Button>
      </div>
    </div>
  );
}
