import { useAlertsStore } from '@/hooks/useAlerts';
import toast from 'react-hot-toast';
import { Eye, Trash2 } from 'lucide-react';

export default function Actions() {
  const { markAllRead } = useAlertsStore();

  const handleMarkAllRead = async () => {
    if (confirm('Mark all alerts as read?')) {
      try {
        await markAllRead();
        toast.success('All alerts marked as read!');
      } catch {
        toast.error('Failed to update alerts');
      }
    }
  };

  return (
    <div className="card p-6 flex flex-wrap gap-3 justify-center sm:justify-start">
      <button
        onClick={handleMarkAllRead}
        className="flex items-center space-x-2 px-6 py-3 bg-green-50 border border-green-200 text-green-800 font-medium rounded-xl hover:bg-green-100 transition-all shadow-sm hover:shadow-md text-sm"
      >
        <Eye size={18} />
        <span>Mark All Read</span>
      </button>
    </div>
  );
}
