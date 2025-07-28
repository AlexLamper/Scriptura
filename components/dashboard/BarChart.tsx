import type React from "react";
import { cn } from "../../lib/utils";

export function BarChart() {
  const data = [
    { month: "Jan", value: 42 },
    { month: "Feb", value: 63 },
    { month: "Mar", value: 27 },
    { month: "Apr", value: 38 },
    { month: "May", value: 58 },
    { month: "Jun", value: 85 }, // Highlighted bar
    { month: "Jul", value: 48 },
    { month: "Aug", value: 42 },
    { month: "Sep", value: 20 },
    { month: "Oct", value: 58 },
    { month: "Nov", value: 62 },
    { month: "Dec", value: 48 },
  ];

  const maxValue = 100; // Max value for Y-axis

  return (
    <div className="relative h-64 w-full">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2 text-xs text-gray-500">
        <span>100</span>
        <span>80</span>
        <span>60</span>
        <span>40</span>
        <span>20</span>
        <span>0</span>
      </div>
      {/* Chart area */}
      <div className="absolute left-8 right-0 top-0 h-full flex items-end justify-around pb-6">
        {data.map((item) => (
          <div key={item.month} className="relative flex flex-col items-center h-full justify-end group">
            <div
              className={cn(
                "w-6 rounded-t-sm transition-all duration-300",
                item.month === "Jun" ? "bg-gray-700" : "bg-gray-200",
              )}
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            />
            {item.month === "Jun" && (
              <div className="absolute -top-8 bg-gray-700 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Complete: {item.value}%
              </div>
            )}
            <span className="mt-2 text-xs text-gray-600">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
