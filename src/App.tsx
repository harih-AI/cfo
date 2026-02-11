import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Items from "./pages/Items";
import Customers from "./pages/Customers";
import Vendors from "./pages/Vendors";
import Invoices from "./pages/Invoices";
import Bills from "./pages/Bills";
import Expenses from "./pages/Expenses";
import Payments from "./pages/Payments";
import Banking from "./pages/Banking";
import Journals from "./pages/Journals";
import Budgets from "./pages/Budgets";
import Reports from "./pages/Reports";
import Documents from "./pages/Documents";
import AIChat from "./pages/AIChat";
import Agents from "./pages/Agents";
import Approvals from "./pages/Approvals";
import AuditLog from "./pages/AuditLog";
import Risks from "./pages/Risks";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/items" element={<Items />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/banking" element={<Banking />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/audit" element={<AuditLog />} />
            <Route path="/risks" element={<Risks />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/credit-notes" element={<Documents />} />
            <Route path="/chart-of-accounts" element={<Reports />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
