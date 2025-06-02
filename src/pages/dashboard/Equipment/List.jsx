import { useContext, useState } from 'react';
import { DataContext } from '../../../context/DataContext';
import { useNavigate } from 'react-router-dom';

export default function EquipmentList() {
  const { state, dispatch } = useContext(DataContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', category: '', condition: '', status: 'Available' });

  function handleAdd() {
    if (!form.name || !form.category || !form.condition) return;
    dispatch({ type: 'ADD_EQUIPMENT', payload: form });
    setForm({ name: '', category: '', condition: '', status: 'Available' });
  }

  function handleDelete(id) {
    dispatch({ type: 'DELETE_EQUIPMENT', payload: id });
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Equipment Inventory</h2>
        <button
          onClick={handleAdd}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          Add Equipment
        </button>
      </div>

      <div className="grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <input
          className="border border-gray-300 p-3 rounded shadow-sm focus:outline-primary col-span-1"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border border-gray-300 p-3 rounded shadow-sm focus:outline-primary col-span-1"
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <input
          className="border border-gray-300 p-3 rounded shadow-sm focus:outline-primary col-span-1"
          placeholder="Condition"
          value={form.condition}
          onChange={e => setForm({ ...form, condition: e.target.value })}
        />
        <select
          className="border border-gray-300 p-3 rounded shadow-sm focus:outline-primary col-span-1"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option>Available</option>
          <option>Rented</option>
          <option>Maintenance</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {state.equipment.map(eq => (
          <div
            key={eq.id}
            className="glass-card p-6 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
            onClick={() => navigate(`/equipment/${eq.id}`)}
          >
            <h3 className="text-xl font-semibold mb-2">{eq.name}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">Category: {eq.category}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Condition: {eq.condition}</p>
            <span
              className={`inline-block px-3 py-1 mt-3 text-xs font-medium rounded-full ${
                eq.status === 'Available'
                  ? 'bg-green-100 text-green-700'
                  : eq.status === 'Rented'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {eq.status}
            </span>
            <button
              onClick={e => { e.stopPropagation(); handleDelete(eq.id); }}
              className="block mt-4 ml-auto text-red-500 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
