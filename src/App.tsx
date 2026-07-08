import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

// ─── Lazy-loaded pages ───────────────────────────────────────
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const OtpPage = lazy(() => import('./pages/OtpPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

// ─── Full-page spinner shown while lazy chunks load ──────────
const PageLoader: React.FC = () => (
  <div className="page-loader">
    <div className="spinner" />
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
