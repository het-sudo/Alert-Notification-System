import { useState } from 'react';
import { useAlertsStore } from '@/hooks/useAlerts';
import type { CreateAlertRequest } from '@/types/api';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

export default function AlertForm() {
  const [formData, setFormData] = useState<CreateAlertRequest>({
    title: '',
    message: '',
    type: 'info',
  });
  const [loading, setLoading] = useState(false);
  const { createAlert } = useAlertsStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createAlert(formData);
      toast.success('Alert created!');
      setFormData({ title: '', message: '', type: 'info' });
    } catch (error) {
      toast.error('Failed to create alert');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-8">
      <div className="flex items-center mb-6">
        <Plus className="h-6 w-6 text-primary-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Create New Alert</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="input-field"
            placeholder="Enter alert title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="input-field resize-vertical"
            placeholder="Enter alert message"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as CreateAlertRequest['type'],
              })
            }
            className="input-field"
          >
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-lg font-medium flex items-center justify-center space-x-2"
        >
          <span>{loading ? 'Creating...' : 'Create Alert'}</span>
        </button>
      </form>
    </div>
  );
}
