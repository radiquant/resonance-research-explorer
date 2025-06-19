
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppLayout } from "@/components/layout/AppLayout";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

// Lazy load all pages for optimal performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ClientManagement = lazy(() => import("./pages/ClientManagement"));
const ClientGroups = lazy(() => import("./pages/ClientGroups"));
const DatabaseManagement = lazy(() => import("./pages/DatabaseManagement"));
const AlgorithmCenter = lazy(() => import("./pages/AlgorithmCenter"));
const CopenAlgorithms = lazy(() => import("./pages/CopenAlgorithms"));
const AnalysisCenter = lazy(() => import("./pages/AnalysisCenter"));
const HarmonizationCenter = lazy(() => import("./pages/HarmonizationCenter"));
const Workspace = lazy(() => import("./pages/Workspace"));
const ReportsAnalytics = lazy(() => import("./pages/ReportsAnalytics"));
const Archive = lazy(() => import("./pages/Archive"));
const Settings = lazy(() => import("./pages/Settings"));
const ImportPage = lazy(() => import("./pages/ImportPage"));
const CopenGeneratorPage = lazy(() => import("./pages/CopenGeneratorPage"));
const FormulasPage = lazy(() => import("./pages/FormulasPage"));
const LegacyIndex = lazy(() => import("./pages/LegacyIndex"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="radionik-app-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SidebarProvider>
              <div className="min-h-screen flex w-full">
                <AppLayout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/clients" element={<ClientManagement />} />
                      <Route path="/clients/groups" element={<ClientGroups />} />
                      <Route path="/databases" element={<DatabaseManagement />} />
                      <Route path="/algorithms" element={<AlgorithmCenter />} />
                      <Route path="/algorithms/copen" element={<CopenAlgorithms />} />
                      <Route path="/analysis" element={<AnalysisCenter />} />
                      <Route path="/harmonization" element={<HarmonizationCenter />} />
                      <Route path="/workspace" element={<Workspace />} />
                      <Route path="/reports" element={<ReportsAnalytics />} />
                      <Route path="/archive" element={<Archive />} />
                      <Route path="/settings" element={<Settings />} />
                      
                      {/* Legacy routes for backward compatibility */}
                      <Route path="/import" element={<ImportPage />} />
                      <Route path="/copen-generator" element={<CopenGeneratorPage />} />
                      <Route path="/formulas" element={<FormulasPage />} />
                      <Route path="/legacy" element={<LegacyIndex />} />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </AppLayout>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
