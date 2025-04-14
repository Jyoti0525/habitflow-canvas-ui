
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Bell, Moon, Sun, Volume2, VolumeX, ChevronRight, Smartphone } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const [remindersEnabled, setRemindersEnabled] = useState(() => {
    return localStorage.getItem("settings_reminders") === "true";
  });
  
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem("settings_sound") === "true" || true;
  });
  
  const [emailNotifications, setEmailNotifications] = useState(() => {
    return localStorage.getItem("settings_email") === "true";
  });
  
  const [dataSyncing, setDataSyncing] = useState(() => {
    return localStorage.getItem("settings_sync") === "true" || true;
  });
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("settings_reminders", String(remindersEnabled));
    localStorage.setItem("settings_sound", String(soundEnabled));
    localStorage.setItem("settings_email", String(emailNotifications));
    localStorage.setItem("settings_sync", String(dataSyncing));
  }, [remindersEnabled, soundEnabled, emailNotifications, dataSyncing]);
  
  const saveSettings = () => {
    // Settings are already saved in localStorage via useEffect,
    // so this is just a confirmation for the user
    toast.success("Settings saved successfully!");
  };
  
  const toggleReminders = () => {
    setRemindersEnabled(!remindersEnabled);
    toast.success(`Reminder notifications ${!remindersEnabled ? 'enabled' : 'disabled'}`);
  };
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast.success(`Sound notifications ${!soundEnabled ? 'enabled' : 'disabled'}`);
  };
  
  const toggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
    toast.success(`Email notifications ${!emailNotifications ? 'enabled' : 'disabled'}`);
  };
  
  const toggleDataSyncing = () => {
    setDataSyncing(!dataSyncing);
    toast.success(`Data syncing ${!dataSyncing ? 'enabled' : 'disabled'}`);
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
                    <Switch 
                      checked={remindersEnabled}
                      onCheckedChange={toggleReminders}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div>
                      <h3 className="font-medium">Sound Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Play sounds for notifications
                      </p>
                    </div>
                    <Switch 
                      checked={soundEnabled}
                      onCheckedChange={toggleSound}
                    />
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
                          onClick={() => {
                            document.documentElement.style.setProperty(
                              '--primary', 
                              scheme.name.toLowerCase() === 'blue' ? "205 87% 61%" :
                              scheme.name.toLowerCase() === 'purple' ? "262 83% 76%" :
                              scheme.name.toLowerCase() === 'pink' ? "336 80% 58%" :
                              scheme.name.toLowerCase() === 'green' ? "142 76% 36%" :
                              "38 92% 50%" // amber
                            );
                            toast.success(`${scheme.name} theme applied`);
                          }}
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
                    <Switch 
                      checked={emailNotifications}
                      onCheckedChange={toggleEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Data Syncing</h3>
                      <p className="text-sm text-muted-foreground">
                        Control how your data syncs across devices
                      </p>
                    </div>
                    <Switch 
                      checked={dataSyncing}
                      onCheckedChange={toggleDataSyncing}
                    />
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
