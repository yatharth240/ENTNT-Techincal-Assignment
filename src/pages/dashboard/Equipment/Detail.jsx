import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../../../context/DataContext';

export default function EquipmentDetail() {
  const { id } = useParams();
  const { state } = useContext(DataContext);

  const equipment = state.equipment.find(eq => eq.id === id);
  const rentals = state.orders.filter(o => o.equipmentId === id);

  if (!equipment) return <p className="p-4 text-red-500">Equipment not found.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Equipment Details</h2>
        <p><span className="font-semibold">Name:</span> {equipment.name}</p>
        <p><span className="font-semibold">Category:</span> {equipment.category}</p>
        <p><span className="font-semibold">Condition:</span> {equipment.condition}</p>
        <p><span className="font-semibold">Status:</span> {equipment.status}</p>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Rental History</h3>
        {rentals.length === 0 ? (
          <p className="text-gray-500">No rentals yet.</p>
        ) : (
          <ul className="list-disc pl-6 text-gray-700">
            {rentals.map(r => (
              <li key={r.id}>{r.customer} – {r.startDate} to {r.endDate} ({r.status})</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
