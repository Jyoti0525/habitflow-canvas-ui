
import { Card } from "@/components/ui/card";
import { LayoutDashboard, Calendar, BarChart2, Bell, CheckCircle, Star } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
      title: "Intuitive Dashboard",
      description: "Track all your habits at a glance with a beautifully designed dashboard that makes habit tracking a joy."
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Habit Calendar",
      description: "Visualize your progress with a customizable calendar view that shows your streak and consistency."
    },
    {
      icon: <BarChart2 className="h-10 w-10 text-primary" />,
      title: "Progress Analytics",
      description: "Gain insights into your habits with detailed analytics and charts that show your improvement over time."
    },
    {
      icon: <Bell className="h-10 w-10 text-primary" />,
      title: "Smart Reminders",
      description: "Never miss a habit with customizable reminders that help you stay on track with your goals."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Daily Streaks",
      description: "Build momentum with daily streaks that motivate you to maintain your habits consistently."
    },
    {
      icon: <Star className="h-10 w-10 text-primary" />,
      title: "AI Suggestions",
      description: "Get personalized habit recommendations based on your goals and existing habits."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Our Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:scale-105 transition-transform duration-300 hover:shadow-lg">
              <div className="mb-4 p-3 bg-primary/10 rounded-full inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
