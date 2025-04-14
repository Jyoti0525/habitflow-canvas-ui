
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Bell, Volume2 } from "lucide-react";
import { toast } from "sonner";

export const NotificationSettings = () => {
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>(() => {
    return localStorage.getItem("settings_reminders") === "true";
  });
  
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem("settings_sound") === "true" || true;
  });

  useEffect(() => {
    localStorage.setItem("settings_reminders", String(remindersEnabled));
    localStorage.setItem("settings_sound", String(soundEnabled));
  }, [remindersEnabled, soundEnabled]);

  const toggleReminders = () => {
    setRemindersEnabled(prev => !prev);
    toast.success(`Reminder notifications ${!remindersEnabled ? 'enabled' : 'disabled'}`);
  };
  
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    toast.success(`Sound notifications ${!soundEnabled ? 'enabled' : 'disabled'}`);
  };

  return (
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
      </div>
    </div>
  );
};
