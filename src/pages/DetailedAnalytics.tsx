
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
import { Calendar as CalendarIcon, ChevronLeft, Filter } from "lucide-react";
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
  Legend,
} from "recharts";
import { Link } from "react-router-dom";

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

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#4285F4",
  },
  total: {
    label: "Total",
    color: "#E0E0E0",
  },
  streak: {
    label: "Streak",
    color: "#9b87f5",
  }
};

const DetailedAnalytics = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 3, 1),
    to: new Date(2025, 3, 15),
  });

  const chartData = date ? generateMockData(date.from!, date.to!) : [];

  return (
    <div className="min-h-screen bg-background dark:bg-[#0e1525]">
      <Sidebar />
      <div className="flex-1 ml-[80px] lg:ml-64">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Link to="/analytics" className="text-muted-foreground hover:text-foreground">
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-3xl font-bold">Detailed Analytics</h1>
            </div>
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "MMM dd, yyyy")} -{" "}
                          {format(date.to, "MMM dd, yyyy")}
                        </>
                      ) : (
                        format(date.from, "MMM dd, yyyy")
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
                    className="pointer-events-auto"
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
            <Card className="bg-card dark:bg-[#1a2332] border-border dark:border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle>Habit Completion Rate</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-[350px] px-4 pb-4">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ left: 0, right: 0, top: 20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="date" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#8E9196' }}
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#8E9196' }}
                          domain={[0, 12]}
                          ticks={[0, 3, 6, 9, 12]}
                        />
                        <ChartTooltip 
                          content={<ChartTooltipContent />} 
                          cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                        />
                        <Bar 
                          dataKey="total" 
                          fill="#E0E0E0" 
                          radius={[4, 4, 0, 0]} 
                          name="Total" 
                          maxBarSize={45}
                        />
                        <Bar 
                          dataKey="completed" 
                          fill="#4285F4" 
                          radius={[4, 4, 0, 0]} 
                          name="Completed"
                          maxBarSize={45} 
                        />
                        <Legend 
                          content={<ChartLegendContent />}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card dark:bg-[#1a2332] border-border dark:border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle>Streak Progress</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-[350px] px-4 pb-4">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ left: 0, right: 0, top: 20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="date"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#8E9196' }}
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#8E9196' }}
                          domain={[0, 12]}
                          ticks={[0, 3, 6, 9, 12]}
                        />
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="streak" 
                          stroke="#9b87f5" 
                          strokeWidth={2}
                          dot={{ fill: "#9b87f5", r: 4, strokeWidth: 0 }}
                          activeDot={{ r: 6, fill: "#9b87f5" }}
                        />
                        <Legend 
                          content={<ChartLegendContent />}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailedAnalytics;
