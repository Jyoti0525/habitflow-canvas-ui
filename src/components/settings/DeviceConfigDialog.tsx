
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Headphones, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeviceConfigDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeviceConfigDialog = ({ isOpen, onClose }: DeviceConfigDialogProps) => {
  const [deviceConfig, setDeviceConfig] = useState({
    browser: true,
    mobile: true
  });

  const saveDeviceConfig = () => {
    localStorage.setItem("device_notifications", JSON.stringify(deviceConfig));
    onClose();
    toast.success("Device notification settings saved!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Device Notifications</DialogTitle>
          <DialogDescription>
            Configure which devices should receive notifications
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Headphones className="w-4 h-4" />
              <span>Browser Notifications</span>
            </div>
            <Switch
              checked={deviceConfig.browser}
              onCheckedChange={(checked) => 
                setDeviceConfig(prev => ({ ...prev, browser: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4" />
              <span>Mobile Notifications</span>
            </div>
            <Switch
              checked={deviceConfig.mobile}
              onCheckedChange={(checked) => 
                setDeviceConfig(prev => ({ ...prev, mobile: checked }))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={saveDeviceConfig}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
