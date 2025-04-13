
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Bell, Moon, Sun, Volume2, VolumeX, ChevronRight, Smartphone } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import { toast } from "sonner";

const Settings = () => {
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const saveSettings = () => {
    toast.success("Settings saved successfully!");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-20 lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Settings</h1>
        </header>
        
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Settings Panel */}
            <div className="md:col-span-2 space-y-6">
              {/* Notifications Section */}
              <div className="card">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div>
                      <h3 className="font-medium">Reminder Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for your habits
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={remindersEnabled}
                        onChange={() => setRemindersEnabled(!remindersEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div>
                      <h3 className="font-medium">Sound Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Play sounds for notifications
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={soundEnabled}
                        onChange={() => setSoundEnabled(!soundEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Device Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Enable notifications on mobile devices
                      </p>
                    </div>
                    <button className="text-primary flex items-center">
                      Configure <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Appearance Section */}
              <div className="card">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Sun className="h-5 w-5 mr-2" />
                  Appearance
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div>
                      <h3 className="font-medium">Theme</h3>
                      <p className="text-sm text-muted-foreground">
                        Toggle between light and dark mode
                      </p>
                    </div>
                    <ThemeToggle />
                  </div>
                  
                  <div className="py-2">
                    <h3 className="font-medium mb-2">Color Scheme</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { name: "Blue", color: "#3B82F6" },
                        { name: "Purple", color: "#8B5CF6" },
                        { name: "Pink", color: "#EC4899" },
                        { name: "Green", color: "#10B981" },
                        { name: "Amber", color: "#F59E0B" },
                      ].map((scheme) => (
                        <button
                          key={scheme.name}
                          className="h-10 rounded-md border-2 border-transparent hover:border-primary focus:border-primary focus:outline-none transition-colors"
                          style={{ backgroundColor: scheme.color }}
                          title={scheme.name}
                          aria-label={`Select ${scheme.name} theme`}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Account Section */}
              <div className="card">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Account Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly summary and tips
                      </p>
                    </div>
                    <button className="text-primary flex items-center">
                      Configure <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Data Syncing</h3>
                      <p className="text-sm text-muted-foreground">
                        Control how your data syncs across devices
                      </p>
                    </div>
                    <button className="text-primary flex items-center">
                      Configure <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Statistics Panel */}
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Statistics Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span>Current Streak</span>
                    <span className="font-semibold">7 days</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span>Longest Streak</span>
                    <span className="font-semibold">21 days</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span>Consistency Rate</span>
                    <span className="font-semibold">84%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Most Completed</span>
                    <span className="font-semibold">Morning Meditation</span>
                  </div>
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-primary/10 to-secondary/10">
                <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
                <p className="text-muted-foreground mb-4">
                  Our support team is always ready to assist you with any questions or issues.
                </p>
                <button className="btn-primary w-full">Contact Support</button>
              </div>
              
              <div className="text-center">
                <button 
                  onClick={saveSettings}
                  className="btn-primary px-8"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
