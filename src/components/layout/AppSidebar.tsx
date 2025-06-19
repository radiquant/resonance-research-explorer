
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Home, Users, Database, Calculator, Search, Heart, Folder, BarChart, Archive, Settings, Waves, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
  },
  {
    title: "Klientenverwaltung",
    icon: Users,
    url: "/clients",
    items: [
      { title: "Klientenliste", url: "/clients" },
      { title: "Klientengruppen", url: "/clients/groups" },
      { title: "Klientenhistorie", url: "/clients/history" },
    ],
  },
  {
    title: "Datenbankenverwaltung",
    icon: Database,
    url: "/databases",
    items: [
      { title: "Datenbanken", url: "/databases" },
      { title: "Datenbankgruppen", url: "/databases/groups" },
      { title: "Import/Export", url: "/databases/import-export" },
    ],
  },
  {
    title: "Algorithmen & Formeln",
    icon: Calculator,
    url: "/algorithms",
    items: [
      { title: "Copen-Raten", url: "/algorithms/copen" },
      { title: "Rife-Frequenzen", url: "/algorithms/rife" },
      { title: "Tesla-Formeln", url: "/algorithms/tesla" },
      { title: "Custom-Algorithmen", url: "/algorithms/custom" },
    ],
  },
  {
    title: "Analyse-Center",
    icon: Search,
    url: "/analysis",
    items: [
      { title: "Analysenliste", url: "/analysis" },
      { title: "Echtzeit-Analysen", url: "/analysis/realtime" },
      { title: "Auswertungen", url: "/analysis/evaluations" },
    ],
  },
  {
    title: "Harmonisierung",
    icon: Heart,
    url: "/harmonization",
    items: [
      { title: "Harmonisierungslisten", url: "/harmonization" },
      { title: "Templates", url: "/harmonization/templates" },
      { title: "Prozeduren", url: "/harmonization/procedures" },
    ],
  },
  {
    title: "Arbeitsbereich",
    icon: Folder,
    url: "/workspace",
    items: [
      { title: "Zwischenablagen", url: "/workspace/clipboard" },
      { title: "Aktive Sessions", url: "/workspace/sessions" },
      { title: "Notizen", url: "/workspace/notes" },
    ],
  },
  {
    title: "Berichte & Grafiken",
    icon: BarChart,
    url: "/reports",
    items: [
      { title: "Statistiken", url: "/reports/statistics" },
      { title: "Charts & Diagramme", url: "/reports/charts" },
      { title: "Export-Center", url: "/reports/export" },
    ],
  },
  {
    title: "Archiv",
    icon: Archive,
    url: "/archive",
    items: [
      { title: "Abgeschlossene Analysen", url: "/archive/analyses" },
      { title: "Historische Daten", url: "/archive/historical" },
      { title: "Backup-Verwaltung", url: "/archive/backups" },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();

  const isActive = (url: string) => {
    if (url === "/") return location.pathname === "/";
    return location.pathname.startsWith(url);
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex items-center gap-2">
            <Waves className="h-6 w-6 text-primary" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Radionik Pro</span>
              <span className="text-xs text-muted-foreground">v2.0.0</span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Hauptnavigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible
                      defaultOpen={isActive(item.url)}
                      className="group/collapsible"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={isActive(item.url)}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={location.pathname === subItem.url}
                              >
                                <Link to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive(item.url)}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Legacy Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Legacy Theorien">
                  <Link to="/legacy">
                    <Zap />
                    <span>Theorien Explorer</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings">
                    <Settings />
                    <span>Einstellungen</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-4 py-2">
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
