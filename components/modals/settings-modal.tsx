"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-settings";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";

export const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">
            My settings
          </h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>
              Appearance
            </Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how MCITotion looks on your device
            </span>
            <Label>
              Language
            </Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize your language
            </span>
          </div>
          <div className="translate-y-[-50%]"> {/* 这里添加了一个 div 并应用了 translate-y 类 */}
            <ModeToggle/>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
