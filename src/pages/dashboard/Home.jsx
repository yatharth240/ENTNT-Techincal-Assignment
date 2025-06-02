import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';

function Card({ label, value }) {
  return (
    <div className="bg-white shadow rounded p-4 flex-1 text-center">
      <p className="text-gray-500">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

export default function DashboardHome() {
  const { state } = useContext(DataContext);
  const total = state.equipment.length;
  const rented = state.orders.filter(o => o.status === 'Rented').length;
  const available = total - rented;

  // Mock logic for Overdue Rentals and Upcoming Maintenance
  const now = new Date();
  const overdue = state.orders.filter(o => {
    const end = new Date(o.endDate);
    return o.status === 'Rented' && end < now;
  }).length;

  const upcomingMaintenance = state.maintenance.filter(m => {
    const maintDate = new Date(m.date);
    return maintDate >= now && maintDate <= new Date(now.getTime() + 7 * 86400000);
  }).length;

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card label="Total Equipment" value={total} />
        <Card label="Available Equipment" value={available} />
        <Card label="Rented Equipment" value={rented} />
        <Card label="Overdue Rentals" value={overdue} />
        <Card label="Upcoming Maintenance" value={upcomingMaintenance} />
      </div>

      {/* Static chart using Tailwind bars (visual) */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Rental Distribution</h3>
        <div className="flex items-end gap-4 h-40">
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 w-8" style={{ height: rented * 10 || 5 }}></div>
            <p className="text-sm mt-1">Rented</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-500 w-8" style={{ height: available * 10 || 5 }}></div>
            <p className="text-sm mt-1">Available</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-red-500 w-8" style={{ height: overdue * 10 || 5 }}></div>
            <p className="text-sm mt-1">Overdue</p>
          </div>
        </div>
      </div>
    </>
  );
}
