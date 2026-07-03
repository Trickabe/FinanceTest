import { Navigate, Route, Routes } from 'react-router-dom';

import { useDemo } from './store/AppContext';
import { Layout } from './components/Layout';
import { RiskAlertModal } from './components/RiskAlertModal';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AssetsPage } from './pages/AssetsPage';
import { AdvisorPage } from './pages/AdvisorPage';
import { LearningPage } from './pages/LearningPage';
import { GrowthPage } from './pages/GrowthPage';

export function App() {
  const { demoMode, riskAlerts, dismissAlert } = useDemo();
  const activeAlert = riskAlerts[0];

  if (!demoMode) {
    return <LoginPage />;
  }

  return (
    <Layout>
      {activeAlert ? <RiskAlertModal alert={activeAlert} onClose={() => dismissAlert(activeAlert.id)} /> : null}
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/assets" element={<AssetsPage />} />
        <Route path="/advisor" element={<AdvisorPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/growth" element={<GrowthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
