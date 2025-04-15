
import { ArrowRight, Calendar, Bell, BarChart2, CheckCircle, Star, LayoutDashboard } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroBackground from "../components/HeroBackground";

const Index = () => {
  const scrollToDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20 md:py-32 relative overflow-hidden">
          <HeroBackground />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-12 md:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up [animation-delay:0.1s] opacity-0">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Consistency
                  </span>{" "}
                  is Key
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up [animation-delay:0.2s] opacity-0">
                  Build lasting habits with a beautiful, intuitive habit tracker that helps you stay consistent and achieve your goals.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up [animation-delay:0.3s] opacity-0">
                  <RouterLink to="/dashboard" className="btn-primary flex items-center justify-center group">
                    Get Started 
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </RouterLink>
                  <button onClick={scrollToDemo} className="btn-secondary flex items-center justify-center group">
                    Try Demo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 relative animate-slide-right [animation-delay:0.4s] opacity-0">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6 relative z-10 rotate-2 transform hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">My Habits</h3>
                      <span className="text-sm text-muted-foreground">April 13</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Morning Meditation", completed: true },
                        { name: "Read 20 pages", completed: true },
                        { name: "Workout", completed: false },
                        { name: "Drink 2L water", completed: false },
                      ].map((habit, index) => (
                        <div key={index} className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                            habit.completed
                              ? "bg-green-100 dark:bg-green-900"
                              : "bg-gray-100 dark:bg-gray-700"
                          }`}>
                            <CheckCircle
                              className={`w-4 h-4 ${
                                habit.completed
                                  ? "text-green-500 dark:text-green-400"
                                  : "text-gray-400 dark:text-gray-500"
                              }`}
                            />
                          </div>
                          <span className={habit.completed ? "line-through text-muted-foreground" : ""}>
                            {habit.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-secondary/20 rounded-full blur-3xl z-0"></div>
                <div className="absolute -top-4 -left-4 w-40 h-40 bg-primary/20 rounded-full blur-3xl z-0"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 md:py-28" id="demo-section">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground">Everything you need to build better habits and achieve your goals.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
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
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="card hover:shadow-md group transition-all duration-300 hover:scale-105 hover:rotate-1"
                >
                  <div className="mb-4 p-3 bg-primary/10 rounded-full inline-block group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-muted-foreground">Join thousands who have transformed their lives with HabitFlow.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah J.",
                  role: "Fitness Enthusiast",
                  content: "HabitFlow helped me stay consistent with my workouts. I've built a 90-day streak and counting!",
                  avatar: "S"
                },
                {
                  name: "Michael L.",
                  role: "Software Developer",
                  content: "The clean interface and reminders make it so easy to track my coding practice and reading habits.",
                  avatar: "M"
                },
                {
                  name: "Aisha T.",
                  role: "Medical Student",
                  content: "As a busy student, HabitFlow's analytics help me see which study habits are most effective for me.",
                  avatar: "A"
                }
              ].map((testimonial, index) => (
                <div key={index} className="card">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-medium mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+')] opacity-20"></div>
              
              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Habit Journey Today</h2>
                <p className="text-lg mb-8">Join thousands of users who are building better habits one day at a time.</p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <RouterLink to="/dashboard" className="btn-primary">
                    Get Started For Free
                  </RouterLink>
                  <RouterLink to="/features" className="btn-secondary">
                    Learn More
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
