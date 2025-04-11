import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './components/login/Login';
import CompanyList from './components/companies/CompanyList';
import AddCompany from './components/companies/AddCompany';
import CompanyDetail from './components/companies/CompanyDetail';
const Landing = lazy(() => import('./components/landing/LandingPage'));
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/add" element={<AddCompany />} />
        <Route path="/companies/:id/edit" element={<AddCompany />} />
        <Route path="/companies/:id" element={<CompanyDetail />} />
        {/*<Route path="/dashboard" element={<Dashboard />} />*/}
        {/* Agrega más rutas protegidas aquí */}
      </Route>
    </Routes>
  );
};
