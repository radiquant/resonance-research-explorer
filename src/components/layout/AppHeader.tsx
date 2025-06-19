
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, Zap, Heart, BarChart, Save } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { NotificationCenter } from "@/components/common/NotificationCenter";
import { QuickActions } from "@/components/common/QuickActions";

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <h1 className="font-semibold text-lg">Radionik Professional</h1>
        <Badge variant="secondary" className="text-xs">Pro</Badge>
      </div>

      {/* Quick Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Globale Suche..."
            className="pl-10 bg-background/50"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Notifications */}
      <NotificationCenter />

      {/* Theme Toggle */}
      <ThemeToggle />
    </header>
  );
}
