
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Zap, Heart, BarChart, Save, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: "Neue Analyse",
      icon: Search,
      action: () => navigate("/analysis"),
      hotkey: "Ctrl+N",
    },
    {
      label: "Harmonisierung starten",
      icon: Heart,
      action: () => navigate("/harmonization"),
      hotkey: "Ctrl+H",
    },
    {
      label: "Auswertung erstellen",
      icon: BarChart,
      action: () => navigate("/reports"),
      hotkey: "Ctrl+R",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {/* Individual Quick Action Buttons */}
      {quickActions.map((action) => (
        <Button
          key={action.label}
          variant="ghost"
          size="icon"
          onClick={action.action}
          className="h-8 w-8"
          title={`${action.label} (${action.hotkey})`}
        >
          <action.icon className="h-4 w-4" />
        </Button>
      ))}

      {/* Quick Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Zap className="mr-2 h-4 w-4" />
            Quick Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 bg-background/95 backdrop-blur-sm border">
          <DropdownMenuLabel>Schnelle Aktionen</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {quickActions.map((action) => (
            <DropdownMenuItem key={action.label} onClick={action.action}>
              <action.icon className="mr-2 h-4 w-4" />
              <span className="flex-1">{action.label}</span>
              <Badge variant="secondary" className="text-xs">
                {action.hotkey}
              </Badge>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/workspace")}>
            <Save className="mr-2 h-4 w-4" />
            <span>Arbeit speichern</span>
            <Badge variant="secondary" className="text-xs">Ctrl+S</Badge>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
