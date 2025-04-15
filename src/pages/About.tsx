
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">About HabitFlow</h1>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              At HabitFlow, we're passionate about helping people build better habits and achieve their goals. 
              We believe that small, consistent actions lead to remarkable transformations.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2025, HabitFlow began with a simple idea: make habit tracking simple, 
              intuitive, and effective. Today, we're helping thousands of users transform their lives 
              through better habits.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li>🎯 Simplicity in Design</li>
              <li>💪 Commitment to User Success</li>
              <li>🤝 Community Support</li>
              <li>🔒 Privacy First</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
