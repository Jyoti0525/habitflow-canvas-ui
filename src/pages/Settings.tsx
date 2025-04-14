
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import Sidebar from "../components/Sidebar";
import { NotificationSettings } from "../components/settings/NotificationSettings";
import { AppearanceSettings } from "../components/settings/AppearanceSettings";
import { AccountSettings } from "../components/settings/AccountSettings";
import { StatisticsSummary } from "../components/settings/StatisticsSummary";
import { SupportCard } from "../components/settings/SupportCard";
import { DeviceConfigDialog } from "../components/settings/DeviceConfigDialog";
import { ContactSupportDialog } from "../components/settings/ContactSupportDialog";

const Settings = () => {
  const [isDeviceConfigOpen, setIsDeviceConfigOpen] = useState(false);
  const [isContactSupportOpen, setIsContactSupportOpen] = useState(false);
  
  const saveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-20 lg:ml-64">
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Settings</h1>
        </header>
        
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <NotificationSettings />
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="font-medium">Device Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable notifications on mobile devices
                  </p>
                </div>
                <button 
                  className="text-primary flex items-center"
                  onClick={() => setIsDeviceConfigOpen(true)}
                >
                  Configure <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              <AppearanceSettings />
              <AccountSettings />
            </div>
            
            <div className="space-y-6">
              <StatisticsSummary />
              <SupportCard onContactSupport={() => setIsContactSupportOpen(true)} />
              
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

        <DeviceConfigDialog 
          isOpen={isDeviceConfigOpen}
          onClose={() => setIsDeviceConfigOpen(false)}
        />

        <ContactSupportDialog
          isOpen={isContactSupportOpen}
          onClose={() => setIsContactSupportOpen(false)}
        />
      </div>
    </div>
  );
};

export default Settings;
