import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { WebsiteSettingsProvider } from '../contexts/WebsiteSettingsContext';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import SEO from '../components/SEO';

export default function AdminRoutes() {
  const { currentUser } = useAuth();

  return (
    <WebsiteSettingsProvider>
      <SEO
        title="Admin - VAT Calculator"
        description="Administrative panel for VAT calculator website management."
        robots="noindex, nofollow"
      />
      <Routes>
        <Route
          path="/login"
          element={
            currentUser ? <Navigate to="/admin" replace /> : <AdminLogin />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </WebsiteSettingsProvider>
  );
}
