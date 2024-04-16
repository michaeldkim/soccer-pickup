import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { NavigationBar, ProtectedRoute } from './components';
import { HomePage, AboutPage, LoginPage, LeaguesPage, RegisterPage, NotFound, DashboardPage, DashboardLeaguePage } from './pages';

import './App.css';
import LeagueList from './components/LeagueList';

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <RegisterPage />
}

function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leagues" element={<LeaguesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/dashboard/leagues/"
            element={
              <ProtectedRoute>
                <DashboardLeaguePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;