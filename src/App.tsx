import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import ptBR from "@/lib/antd-locale-pt-BR";
// TEMPORARIAMENTE DESABILITADO - Reativar quando necessário
// import { AuthProvider } from "./contexts/AuthContext";
// import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AppLayout } from "./components/layout/AppLayout";
// import Login from "./pages/Login";
import FinanciamentoAPS from "./pages/FinanciamentoAPS";
import QualidadeVisaoGeral from "./pages/QualidadeVisaoGeral";
import QualidadeRelatorio from "./pages/QualidadeRelatorio";
import QualidadeIndividualizado from "./pages/QualidadeIndividualizado";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Ant Design v4 - tematização via CSS
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider locale={ptBR}>
      {/* TEMPORARIAMENTE DESABILITADO - Reativar AuthProvider quando necessário */}
      {/* <AuthProvider> */}
        <BrowserRouter>
          <Routes>
            {/* TEMPORARIAMENTE DESABILITADO - Rota de login */}
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/" element={<Navigate to="/financiamento-aps" replace />} />
            {/* TEMPORARIAMENTE DESABILITADO - ProtectedRoute wrapper */}
            {/* <Route element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }> */}
            <Route element={<AppLayout />}>
              <Route path="/financiamento-aps" element={<FinanciamentoAPS />} />
              <Route path="/financiamento-aps/qualidade-esf-eap" element={<QualidadeVisaoGeral />} />
              <Route path="/financiamento-aps/qualidade-esf-eap/relatorio" element={<QualidadeRelatorio />} />
              <Route path="/financiamento-aps/qualidade-esf-eap/individualizado" element={<QualidadeIndividualizado />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      {/* </AuthProvider> */}
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
