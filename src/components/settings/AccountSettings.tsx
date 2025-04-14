
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Smartphone } from "lucide-react";
import { toast } from "sonner";

export const AccountSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState<boolean>(() => {
    return localStorage.getItem("settings_email") === "true";
  });
  
  const [dataSyncing, setDataSyncing] = useState<boolean>(() => {
    return localStorage.getItem("settings_sync") === "true" || true;
  });

  useEffect(() => {
    localStorage.setItem("settings_email", String(emailNotifications));
    localStorage.setItem("settings_sync", String(dataSyncing));
  }, [emailNotifications, dataSyncing]);

  const toggleEmailNotifications = () => {
    setEmailNotifications(prev => !prev);
    toast.success(`Email notifications ${!emailNotifications ? 'enabled' : 'disabled'}`);
  };
  
  const toggleDataSyncing = () => {
    setDataSyncing(prev => !prev);
    toast.success(`Data syncing ${!dataSyncing ? 'enabled' : 'disabled'}`);
  };

  return (
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
  );
};
