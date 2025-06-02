import { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { NotificationContext } from '../../context/NotificationContext';

export default function Maintenance() {
  const { state, dispatch } = useContext(DataContext);
  const { push } = useContext(NotificationContext);
  const [record, setRecord] = useState({
    equipmentId: '',
    date: '',
    type: '',
    notes: ''
  });

  function handleAdd() {
    if (!record.equipmentId || !record.date || !record.type) return;
    dispatch({ type: 'ADD_MAINTENANCE', payload: record });
    push(`Maintenance scheduled for Equipment ID ${record.equipmentId}`);
    setRecord({ equipmentId: '', date: '', type: '', notes: '' });
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Maintenance Records</h2>
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <select
          className="p-2 border rounded"
          value={record.equipmentId}
          onChange={e => setRecord({ ...record, equipmentId: e.target.value })}
        >
          <option value="">Select Equipment</option>
          {state.equipment.map(eq => (
            <option key={eq.id} value={eq.id}>
              {eq.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="p-2 border rounded"
          value={record.date}
          onChange={e => setRecord({ ...record, date: e.target.value })}
        />
        <input
          placeholder="Maintenance Type"
          className="p-2 border rounded"
          value={record.type}
          onChange={e => setRecord({ ...record, type: e.target.value })}
        />
        <input
          placeholder="Notes"
          className="p-2 border rounded"
          value={record.notes}
          onChange={e => setRecord({ ...record, notes: e.target.value })}
        />
      </div>
      <button
        className="bg-primary text-white px-4 py-2 rounded shadow"
        onClick={handleAdd}
      >
        Add Record
      </button>

      <h3 className="mt-10 mb-2 text-xl font-semibold">Maintenance History</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        {state.maintenance.map((m, idx) => (
          <li key={idx}>
            <strong>{m.date}</strong> – Equipment #{m.equipmentId} – {m.type} ({m.notes})
          </li>
        ))}
      </ul>
    </div>
  );
}
