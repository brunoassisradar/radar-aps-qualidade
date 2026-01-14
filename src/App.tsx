import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";
import { AppLayout } from "./components/layout/AppLayout";
import FinanciamentoAPS from "./pages/FinanciamentoAPS";
import QualidadeVisaoGeral from "./pages/QualidadeVisaoGeral";
import QualidadeRelatorio from "./pages/QualidadeRelatorio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const antTheme = {
  token: {
    colorPrimary: "#1677ff",
    borderRadius: 6,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider locale={ptBR} theme={antTheme}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/financiamento-aps" replace />} />
            <Route element={<AppLayout />}>
              <Route path="/financiamento-aps" element={<FinanciamentoAPS />} />
              <Route path="/financiamento-aps/qualidade-esf-eap" element={<QualidadeVisaoGeral />} />
              <Route path="/financiamento-aps/qualidade-esf-eap/relatorio" element={<QualidadeRelatorio />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
