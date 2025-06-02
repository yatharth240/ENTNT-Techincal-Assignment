import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

export default function NotificationCenter() {
  const { notifs, dismiss } = useContext(NotificationContext);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifs.map(n => (
        <div
          key={n.id}
          className="bg-white dark:bg-gray-800 border shadow p-4 rounded w-64 text-sm flex justify-between items-start"
        >
          <span>{n.message}</span>
          <button
            onClick={() => dismiss(n.id)}
            className="text-red-500 text-xs ml-2"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
