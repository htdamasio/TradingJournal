import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import DashboardPage from "@/pages/dashboard";
import AboutPage from "@/pages/about";
import RegistrationPage from "@/pages/registration";
import { UserProvider } from "@/contexts/user_context_provider";
import ProtectedRoutes from "@/contexts/protected_route_provider";

export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<DocsPage />} path="/docs" />
        <Route element={<PricingPage />} path="/pricing" />
        <Route element={<AboutPage />} path="/about" />
        <Route
          element={<RegistrationPage bIsLogin={false} />}
          path="/registration"
        />
        <Route element={<RegistrationPage bIsLogin={true} />} path="/login" />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<DashboardPage />} path="/dashboard" />
          {/* Trade Page -> Add trades, manage open trade and edit trades */}
          {/* Dashboard page -> page for analisys of the trades */}
        </Route>
      </Routes>
    </UserProvider>
  );
}