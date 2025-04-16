import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { 
  Award, 
  Calendar, 
  CheckCircle, 
  Filter, 
  Flame, 
  Sparkles, 
  TrendingUp
} from "lucide-react";
import { format, subDays, subMonths } from "date-fns";

const weeklyData = [
  { day: "Mon", completed: 5, total: 7 },
  { day: "Tue", completed: 6, total: 7 },
  { day: "Wed", completed: 4, total: 7 },
  { day: "Thu", completed: 7, total: 7 },
  { day: "Fri", completed: 5, total: 7 },
  { day: "Sat", completed: 3, total: 7 },
  { day: "Sun", completed: 6, total: 7 },
];

const monthlyTrendData = [
  { date: "01/01", streak: 5 },
  { date: "01/08", streak: 8 },
  { date: "01/15", streak: 12 },
  { date: "01/22", streak: 10 },
  { date: "01/29", streak: 15 },
  { date: "02/05", streak: 18 },
];

const categoryData = [
  { name: "Fitness", value: 35, color: "#4285F4" },
  { name: "Health", value: 25, color: "#34A853" },
  { name: "Learning", value: 20, color: "#FBBC05" },
  { name: "Mindfulness", value: 15, color: "#EA4335" },
  { name: "Other", value: 5, color: "#9b87f5" },
];

const habitConsistencyData = [
  { name: "Morning Exercise", consistency: 90 },
  { name: "Reading", consistency: 85 },
  { name: "Meditation", consistency: 75 },
  { name: "Water Intake", consistency: 95 },
  { name: "Journaling", consistency: 60 },
];

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
  },
  fitness: {
    label: "Fitness",
    color: "#4285F4",
  },
  health: {
    label: "Health",
    color: "#34A853",
  },
  learning: {
    label: "Learning",
    color: "#FBBC05",
  },
  mindfulness: {
    label: "Mindfulness",
    color: "#EA4335",
  },
  other: {
    label: "Other",
    color: "#9b87f5",
  },
};

const generateTimeRangeData = (timeRange: string) => {
  const today = new Date();
  let data;
  
  switch (timeRange) {
    case "week":
      data = weeklyData;
      break;
    case "month":
      data = Array.from({ length: 30 }, (_, i) => ({
        day: format(subDays(today, i), "MM/dd"),
        completed: Math.floor(Math.random() * 8) + 2,
        total: Math.floor(Math.random() * 3) + 8,
      })).reverse();
      break;
    case "year":
      data = Array.from({ length: 12 }, (_, i) => ({
        day: format(subMonths(today, i), "MMM"),
        completed: Math.floor(Math.random() * 80) + 20,
        total: Math.floor(Math.random() * 30) + 80,
      })).reverse();
      break;
    default:
      data = weeklyData;
  }
  
  return data;
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("week");
  const navigate = useNavigate();
  const chartData = generateTimeRangeData(timeRange);

  return (
    <div className="min-h-screen bg-background dark:bg-[#0e1525]">
      <Sidebar />
      <div className="flex-1 ml-[80px] lg:ml-64">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="mb-6 bg-gradient-to-r from-primary/20 to-secondary/20 border-none">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center">
                <div className="mr-4 bg-white dark:bg-gray-800 p-3 rounded-full">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">You're crushing it! Keep going 💪</h2>
                  <p className="text-muted-foreground">You've completed 36 habits this week - that's 18% more than last week!</p>
                </div>
              </div>
              <div className="hidden md:block">
                <Button onClick={() => navigate('/detailed-analytics')}>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Habit Analytics</h1>
            <div className="flex items-center gap-2">
              <Button 
                variant={timeRange === "week" ? "default" : "outline"}
                onClick={() => setTimeRange("week")}
              >
                Week
              </Button>
              <Button 
                variant={timeRange === "month" ? "default" : "outline"}
                onClick={() => setTimeRange("month")}
              >
                Month
              </Button>
              <Button 
                variant={timeRange === "year" ? "default" : "outline"}
                onClick={() => setTimeRange("year")}
              >
                Year
              </Button>
              <Button 
                variant="outline" 
                className="ml-2"
                onClick={() => navigate('/detailed-analytics')}
              >
                <Filter className="h-4 w-4 mr-2" />
                Custom
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">This Week</span>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">36</p>
                  <p className="text-sm text-muted-foreground">Habits Completed</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#34A853]">
                  <TrendingUp className="h-3 w-3" />
                  <span>+18% vs last week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-secondary/10 rounded-md">
                    <Flame className="h-5 w-5 text-secondary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Current</span>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">15</p>
                  <p className="text-sm text-muted-foreground">Days Streak</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#34A853]">
                  <TrendingUp className="h-3 w-3" />
                  <span>Getting close to your best!</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-accent/10 rounded-md">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">All Time</span>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">21</p>
                  <p className="text-sm text-muted-foreground">Longest Streak</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Achieved on April 3, 2025</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-destructive/10 rounded-md">
                    <CheckCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Consistency</span>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">85%</p>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#34A853]">
                  <TrendingUp className="h-3 w-3" />
                  <span>+5% vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="bg-card dark:bg-[#1a2332] border-border dark:border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Completed vs. total habits per day</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-[350px] px-4 pb-4">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={chartData} 
                        barGap={0} 
                        barCategoryGap="30%"
                        margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          dy={10}
                          tick={{ fontSize: 12, fill: '#8E9196' }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          dx={-10}
                          tick={{ fontSize: 12, fill: '#8E9196' }}
                        />
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                          cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Bar 
                          dataKey="total" 
                          fill="#E0E0E0" 
                          radius={[4, 4, 0, 0]} 
                          maxBarSize={45}
                        />
                        <Bar 
                          dataKey="completed" 
                          fill="#4285F4" 
                          radius={[4, 4, 0, 0]} 
                          maxBarSize={45}
                        />
                        <Legend 
                          content={<ChartLegendContent />}
                          verticalAlign="bottom"
                          height={36}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card dark:bg-[#1a2332] border-border dark:border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle>Streak Trend</CardTitle>
                <CardDescription>Your habit streak over time</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-[350px] px-4 pb-4">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={monthlyTrendData}
                        margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="date"
                          axisLine={false}
                          tickLine={false}
                          dy={10}
                          tick={{ fontSize: 12, fill: '#8E9196' }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          dx={-10}
                          tick={{ fontSize: 12, fill: '#8E9196' }}
                        />
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                        />
                        <Line 
                          type="monotone"
                          dataKey="streak"
                          stroke="#9b87f5"
                          strokeWidth={3}
                          dot={{ fill: "#9b87f5", r: 4, strokeWidth: 0 }}
                          activeDot={{ r: 6, fill: "#9b87f5" }}
                        />
                        <Legend 
                          content={<ChartLegendContent />}
                          verticalAlign="bottom"
                          height={36}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card dark:bg-[#1a2332] border-border dark:border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle>Habit Categories</CardTitle>
                <CardDescription>Distribution of your habits by category</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-[350px] px-4 pb-4 flex justify-center">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                        />
                        <Legend 
                          content={<ChartLegendContent />}
                          verticalAlign="bottom"
                          height={36}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card dark:bg-[#1a2332] border-border dark:border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle>Habit Consistency</CardTitle>
                <CardDescription>Consistency rate by habit</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-[350px] px-4 pb-4">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={habitConsistencyData}
                        layout="vertical"
                        margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          type="number" 
                          domain={[0, 100]} 
                          tickFormatter={(value) => `${value}%`}
                          tick={{ fontSize: 12, fill: '#8E9196' }}
                        />
                        <YAxis
                          dataKey="name"
                          type="category"
                          scale="band"
                          axisLine={false}
                          tickLine={false}
                          width={100}
                          tick={{ fontSize: 12, fill: '#8E9196' }}
                        />
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                        />
                        <Bar
                          dataKey="consistency"
                          fill="#4285F4"
                          radius={[0, 4, 4, 0]}
                          label={{ 
                            position: 'right', 
                            formatter: (value: number) => `${value}%`,
                            fill: '#8E9196',
                            fontSize: 12
                          }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-primary" />
                Personal Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">You're more consistent in the mornings</h3>
                    <p className="text-sm text-muted-foreground">
                      Morning habits have an 87% completion rate, compared to 63% for evening habits.
                      Consider scheduling more important habits earlier in the day.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="bg-secondary/10 p-2 rounded-md">
                    <Calendar className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Mondays and Fridays are your challenge days</h3>
                    <p className="text-sm text-muted-foreground">
                      Your completion rate drops by 15% on these days. 
                      Try setting smaller goals or adding extra reminders to stay on track.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="bg-accent/10 p-2 rounded-md">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">You're just 6 days away from a new streak record!</h3>
                    <p className="text-sm text-muted-foreground">
                      Keep going to beat your previous best streak of 21 days.
                      You're currently at 15 days and making great progress!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
