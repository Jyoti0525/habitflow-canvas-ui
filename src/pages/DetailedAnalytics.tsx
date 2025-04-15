
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data generator based on date range
const generateMockData = (startDate: Date, endDate: Date) => {
  const data = [];
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    data.push({
      date: format(currentDate, 'MM/dd'),
      completed: Math.floor(Math.random() * 8) + 2,
      total: Math.floor(Math.random() * 3) + 8,
      streak: Math.floor(Math.random() * 10) + 5,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
};

const DetailedAnalytics = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 3, 1),
    to: new Date(2025, 3, 15),
  });

  const chartData = date ? generateMockData(date.from!, date.to!) : [];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-[80px] lg:ml-64">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Detailed Analytics</h1>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal w-[300px]",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Habit Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[400px]">
                  <BarChart data={chartData} margin={{ left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="total" fill="#E0E0E0" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completed" fill="#4285F4" radius={[4, 4, 0, 0]} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Streak Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[400px]">
                  <LineChart data={chartData} margin={{ left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="streak" 
                      stroke="#9b87f5" 
                      strokeWidth={2}
                      dot={{ fill: "#9b87f5", r: 4 }}
                      activeDot={{ r: 6, fill: "#9b87f5" }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailedAnalytics;
