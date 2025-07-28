import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type React from "react";

export function TopPerformersCard() {
  return (
    <Card className="p-6 bg-white shadow-sm rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
        <CardTitle className="text-lg font-semibold text-gray-800">Top Performers</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Report</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-0">
        <div className="relative h-32 w-32">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(
                #60A5FA 0% 51.2%,
                #9CA3AF 51.2% 69.5%,
                #D1D5DB 69.5% 100%
              )`,
            }}
          />
          <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white">
            <div className="text-center">
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-xl font-bold text-gray-800">100%</div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm w-full">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            <span className="text-gray-600">Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-gray-400" />
            <span className="text-gray-600">Status</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            <span className="text-gray-600">Summary</span>
          </div>
          <div className="font-semibold text-gray-800">51.2%</div>
          <div className="font-semibold text-gray-800">18.3%</div>
          <div className="font-semibold text-gray-800">30.5%</div>
        </div>
      </CardContent>
    </Card>
  );
}
