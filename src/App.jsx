import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import DashboardHome from './pages/dashboard/Home';
import EquipmentList from './pages/dashboard/Equipment/List';
import Orders from './pages/dashboard/Orders';
import Maintenance from './pages/dashboard/Maintenance';
import PrivateRoute from './routes/PrivateRoute';
import NotificationCenter from './components/NotificationCenter';
import DashboardLayout from './components/layout/DashboardLayout';

export default function App() {
  return (<>
<NotificationCenter />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        <Route index element={<DashboardHome />} />
        <Route path="equipment" element={<EquipmentList />} />
        <Route path="orders" element={<Orders />} />
        <Route path="maintenance" element={<Maintenance />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
</>)
  ;
}
