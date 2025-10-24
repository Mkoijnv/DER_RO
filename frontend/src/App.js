import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import RodoviasList from './components/Rodovias/RodoviasList';
import RodoviaForm from './components/Rodovias/RodoviaForm';
import RodoviaDetail from './components/Rodovias/RodoviaDetail';
import PontesList from './components/Pontes/PontesList';
import PonteForm from './components/Pontes/PonteForm';
import PonteDetail from './components/Pontes/PonteDetail';
import MapView from './components/Map/MapView';
import PrivateRoute from './components/PrivateRoute';
import authService from './services/authService';
import './App.css';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const location = useLocation();

  // Atualizar estado de autenticação sempre que a rota mudar
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, [location]);

  return (
    <div className="App">
      {isAuthenticated && <Header />}
      
      <main className="main-content">
        <Routes>
            {/* Rotas Públicas */}
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
            } />
            <Route path="/register" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
            } />

            {/* Rotas Privadas */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />

            {/* Rodovias */}
            <Route path="/rodovias" element={
              <PrivateRoute>
                <RodoviasList />
              </PrivateRoute>
            } />
            <Route path="/rodovias/nova" element={
              <PrivateRoute>
                <RodoviaForm />
              </PrivateRoute>
            } />
            <Route path="/rodovias/:id" element={
              <PrivateRoute>
                <RodoviaDetail />
              </PrivateRoute>
            } />
            <Route path="/rodovias/:id/editar" element={
              <PrivateRoute>
                <RodoviaForm />
              </PrivateRoute>
            } />

            {/* Pontes */}
            <Route path="/pontes" element={
              <PrivateRoute>
                <PontesList />
              </PrivateRoute>
            } />
            <Route path="/pontes/nova" element={
              <PrivateRoute>
                <PonteForm />
              </PrivateRoute>
            } />
            <Route path="/pontes/:id" element={
              <PrivateRoute>
                <PonteDetail />
              </PrivateRoute>
            } />
            <Route path="/pontes/:id/editar" element={
              <PrivateRoute>
                <PonteForm />
              </PrivateRoute>
            } />

            {/* Mapa */}
            <Route path="/mapa" element={
              <PrivateRoute>
                <MapView />
              </PrivateRoute>
            } />

            {/* Rota Padrão */}
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            } />
          </Routes>
        </main>

      {isAuthenticated && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <AppContent />
      </Router>
    </ToastProvider>
  );
}

export default App;

