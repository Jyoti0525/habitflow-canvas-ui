
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeToggle from "@/components/ThemeToggle";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ProgressBar from "@/components/ProgressBar";
import {
  BadgeCheck,
  Edit2,
  Award,
  Bell,
  Calendar,
  ChevronRight,
  Flame,
  Key,
  Lock,
  Mail,
  Settings,
  Star,
  Upload
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");
  
  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    bio: "Discipline over motivation",
    avatar: "/placeholder.svg", // Using placeholder image
    stats: {
      totalHabits: 12,
      currentStreak: 15,
      bestStreak: 28,
      completionRate: 89
    },
    achievements: [
      { id: 1, title: "Early Bird", description: "Complete a habit before 8 AM for 5 consecutive days", progress: 100, icon: "🌅" },
      { id: 2, title: "Consistent Yogi", description: "Practice yoga for 10 days in a row", progress: 70, icon: "🧘" },
      { id: 3, title: "Bookworm", description: "Read for at least 15 minutes every day for 2 weeks", progress: 50, icon: "📚" },
      { id: 4, title: "Hydration Hero", description: "Track water intake for 30 days straight", progress: 30, icon: "💧" },
    ]
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-[80px] lg:ml-64">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left side - Profile Overview */}
            <div className="w-full md:w-1/3">
              <Card className="overflow-hidden">
                {/* Cover Photo */}
                <div className="h-32 bg-gradient-to-r from-primary/30 to-secondary/30"></div>
                
                {/* Profile Info */}
                <div className="flex flex-col items-center -mt-12 pb-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-background">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md"
                    >
                      <Edit2 size={14} />
                      <span className="sr-only">Edit profile picture</span>
                    </Button>
                  </div>
                  
                  <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
                  <p className="text-muted-foreground italic">"{user.bio}"</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6 w-full px-6">
                    <Card className="p-3 text-center">
                      <p className="text-3xl font-bold text-primary">{user.stats.currentStreak}</p>
                      <p className="text-xs text-muted-foreground">Current Streak</p>
                    </Card>
                    <Card className="p-3 text-center">
                      <p className="text-3xl font-bold text-primary">{user.stats.bestStreak}</p>
                      <p className="text-xs text-muted-foreground">Best Streak</p>
                    </Card>
                  </div>
                </div>
              </Card>
              
              {/* Quick Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Star size={18} className="mr-2 text-secondary" />
                    Habit Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-muted-foreground" />
                      <span className="text-sm">Total Habits</span>
                    </div>
                    <span className="font-bold">{user.stats.totalHabits}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Flame size={16} className="mr-2 text-muted-foreground" />
                      <span className="text-sm">Current Streak</span>
                    </div>
                    <span className="font-bold">{user.stats.currentStreak} days</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award size={16} className="mr-2 text-muted-foreground" />
                      <span className="text-sm">Best Streak</span>
                    </div>
                    <span className="font-bold">{user.stats.bestStreak} days</span>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Completion Rate</span>
                      <span className="text-sm font-bold">{user.stats.completionRate}%</span>
                    </div>
                    <ProgressBar 
                      value={user.stats.completionRate} 
                      maxValue={100} 
                      label=""
                      size="sm"
                      color="bg-secondary"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right side - Tabs Content */}
            <div className="w-full md:w-2/3">
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
                
                {/* Account Tab */}
                <TabsContent value="account" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Mail size={18} className="mr-2 text-primary" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Display Name</label>
                        <div className="flex mt-1">
                          <Input value={user.name} className="flex-1" />
                          <Button variant="outline" size="icon" className="ml-2">
                            <Edit2 size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Email Address</label>
                        <div className="flex mt-1">
                          <Input value={user.email} className="flex-1" />
                          <Button variant="outline" size="icon" className="ml-2">
                            <Edit2 size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Bio / Quote</label>
                        <div className="flex mt-1">
                          <Input value={user.bio} className="flex-1" />
                          <Button variant="outline" size="icon" className="ml-2">
                            <Edit2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Lock size={18} className="mr-2 text-primary" />
                        Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Password</h3>
                          <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                        </div>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Key size={16} />
                          Change Password
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <Button variant="outline">Setup 2FA</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Preferences Tab */}
                <TabsContent value="preferences" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Settings size={18} className="mr-2 text-primary" />
                        App Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Theme</h3>
                          <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
                        </div>
                        <ThemeToggle />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Notifications</h3>
                          <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
                        </div>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Bell size={16} />
                          Configure
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Data Export</h3>
                          <p className="text-sm text-muted-foreground">Download your habit history</p>
                        </div>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Upload size={16} />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Achievements Tab */}
                <TabsContent value="achievements" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Award size={18} className="mr-2 text-primary" />
                        Your Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {user.achievements.map(achievement => (
                          <div 
                            key={achievement.id}
                            className="flex items-start p-4 border rounded-xl bg-background hover:bg-muted/50 transition-colors"
                          >
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 text-2xl">
                              {achievement.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center">
                                <h3 className="font-medium">{achievement.title}</h3>
                                {achievement.progress === 100 && (
                                  <BadgeCheck size={16} className="ml-2 text-secondary" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {achievement.description}
                              </p>
                              <ProgressBar 
                                value={achievement.progress} 
                                maxValue={100} 
                                label=""
                                size="sm"
                                color={achievement.progress === 100 ? "bg-secondary" : "bg-primary"}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 text-center">
                        <Link to="/achievements" className="flex items-center justify-center text-primary hover:underline">
                          <span>View all achievements</span>
                          <ChevronRight size={16} />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
