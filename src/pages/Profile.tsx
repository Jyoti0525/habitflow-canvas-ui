
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  User, 
  Mail, 
  Lock, 
  LogOut, 
  Edit2, 
  Save,
  Settings as SettingsIcon
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(user?.name || "");
  
  const handleUpdateName = () => {
    if (nameValue.trim() === "") {
      toast.error("Name cannot be empty");
      return;
    }
    
    if (nameValue !== user?.name) {
      updateProfile({ name: nameValue });
    }
    
    setIsEditingName(false);
  };
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = () => {
    return user?.name ? user.name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar - Avatar and quick actions */}
          <div className="md:w-1/3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4 text-xl">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  
                  {isEditingName ? (
                    <div className="flex items-center gap-2 mb-2">
                      <Input 
                        value={nameValue} 
                        onChange={e => setNameValue(e.target.value)} 
                        className="max-w-[200px]"
                      />
                      <Button 
                        size="icon"
                        variant="outline" 
                        onClick={handleUpdateName} 
                        title="Save"
                      >
                        <Save size={18} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-bold">{user?.name}</h2>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => setIsEditingName(true)}
                        title="Edit name"
                      >
                        <Edit2 size={16} />
                      </Button>
                    </div>
                  )}
                  
                  <p className="text-muted-foreground mb-6">{user?.email}</p>
                  
                  <div className="w-full border-t pt-4 flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/settings")}
                    >
                      <SettingsIcon size={16} className="mr-2" />
                      Account Settings
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right side - Tabs with account information and stats */}
          <div className="md:w-2/3">
            <Tabs defaultValue="account">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="account">Account Info</TabsTrigger>
                <TabsTrigger value="stats">Habit Stats</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Manage your account details and personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <User size={18} className="mr-2 text-muted-foreground" />
                        <span className="font-medium">Name</span>
                      </div>
                      <p>{user?.name}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail size={18} className="mr-2 text-muted-foreground" />
                        <span className="font-medium">Email</span>
                      </div>
                      <p>{user?.email}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Lock size={18} className="mr-2 text-muted-foreground" />
                        <span className="font-medium">Password</span>
                      </div>
                      <p>••••••••</p>
                      <Button variant="outline" size="sm">Change Password</Button>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <p className="text-muted-foreground text-sm">
                        Account created: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="stats" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Habit Statistics</CardTitle>
                    <CardDescription>
                      Your habit progress and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-1">Total Habits</h3>
                        <p className="text-3xl font-bold">5</p>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-1">Current Streak</h3>
                        <p className="text-3xl font-bold">7 days</p>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-1">Best Streak</h3>
                        <p className="text-3xl font-bold">14 days</p>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-1">Completion Rate</h3>
                        <p className="text-3xl font-bold">87%</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium mb-3">Achievements</h3>
                      <div className="flex flex-wrap gap-3">
                        <div className="bg-primary/20 text-primary p-2 rounded-md text-sm">
                          7 Day Streak
                        </div>
                        <div className="bg-muted p-2 rounded-md text-sm">
                          30 Day Streak
                        </div>
                        <div className="bg-primary/20 text-primary p-2 rounded-md text-sm">
                          Habit Master
                        </div>
                        <div className="bg-muted p-2 rounded-md text-sm">
                          Early Bird
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
