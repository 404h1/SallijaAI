// # v1. 앱 루트 — React Router + 전역 Provider 조립
// # v2. 모든 페이지(진단, 액션, 이력, 설정) 라우팅 추가

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProfileProvider } from './context/StoreProfileContext';
import { ActionProvider } from './context/ActionContext';
import { DiagnosisProvider } from './context/DiagnosisContext';

import SplashPage from './pages/Splash/SplashPage';
import LandingPage from './pages/Auth/LandingPage';
import SignUpPage from './pages/Auth/SignUpPage';
import BasicInfoPage from './pages/Setup/BasicInfoPage';
import SalesUploadPage from './pages/Setup/SalesUploadPage';
import CostsUploadPage from './pages/Setup/CostsUploadPage';
import ConfirmPage from './pages/Setup/ConfirmPage';

import OnboardingPage from './pages/Onboarding/OnboardingPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import DiagnosisPage from './pages/Diagnosis/DiagnosisPage';
import ContentPage from './pages/Action/ContentPage';
import PolicyPage from './pages/Action/PolicyPage';
import PlanPage from './pages/Action/PlanPage';
import HistoryPage from './pages/History/HistoryPage';
import SettingsPage from './pages/Settings/SettingsPage';
import MarketRadarPage from './pages/Radar/MarketRadarPage';
import PerformancePage from './pages/Performance/PerformancePage';
import DayDetailPage from './pages/Performance/DayDetailPage';
import HomePage from './pages/Home/HomePage';
import DataRegistrationPage from './pages/Data/DataRegistrationPage';

export default function App() {
  return (
    <StoreProfileProvider>
      <DiagnosisProvider>
        <ActionProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SplashPage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/setup/basic" element={<BasicInfoPage />} />
              <Route path="/setup/sales" element={<SalesUploadPage />} />
              <Route path="/setup/costs" element={<CostsUploadPage />} />
              <Route path="/setup/confirm" element={<ConfirmPage />} />
              
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/data" element={<DataRegistrationPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/diagnosis/:moduleId" element={<DiagnosisPage />} />
              <Route path="/action/content" element={<ContentPage />} />
              <Route path="/action/policy" element={<PolicyPage />} />
              <Route path="/action/plan" element={<PlanPage />} />
              <Route path="/radar" element={<MarketRadarPage />} />
              <Route path="/performance" element={<PerformancePage />} />
              <Route path="/performance/day/:date" element={<DayDetailPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </BrowserRouter>
        </ActionProvider>
      </DiagnosisProvider>
    </StoreProfileProvider>
  );
}
