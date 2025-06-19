
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, Zap, Heart, BarChart, Save, Waves } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { NotificationCenter } from "@/components/common/NotificationCenter";
import { QuickActions } from "@/components/common/QuickActions";

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-radionik-harmony via-radionik-frequency to-radionik-energy">
          <Waves className="h-5 w-5 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-lg bg-gradient-to-r from-primary to-radionik-harmony bg-clip-text text-transparent">
            Radionik Professional
          </h1>
          <Badge variant="secondary" className="text-xs bg-gradient-to-r from-radionik-harmony/10 to-radionik-energy/10 border-radionik-harmony/20">
            Pro v2.0
          </Badge>
        </div>
      </div>

      {/* Quick Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Harmonische Suche..."
            className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20"
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
