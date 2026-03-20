import type { IAlert } from '@/types/api';
import { AlertCircle, Info, CheckCircle } from 'lucide-react';
import { useAlertsStore } from '@/hooks/useAlerts';

interface Props {
  alert: IAlert;
}

const typeIcons = {
  info: Info,
  warning: AlertCircle,
  error: AlertCircle,
} as const;

export default function AlertCard({ alert }: Props) {
  const { toggleRead, deleteAlert } = useAlertsStore();

  const Icon = typeIcons[alert.type as keyof typeof typeIcons] || Info;

  const handleToggleRead = () => toggleRead(alert._id);
  const handleDelete = () => deleteAlert(alert._id);

  return (
    <div
      className={`card flex gap-4 p-6 ${!alert.isRead ? 'ring-2 ring-primary-200 bg-primary-50' : ''}`}
    >
      <div className="flex-shrink-0">
        <Icon
          className={`h-8 w-8 ${alert.type === 'error' ? 'text-red-500' : alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {alert.title}
        </h3>
        <p className="text-gray-600 mb-3 line-clamp-3">{alert.message}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{alert.createdAt}</span>
          <div className="flex space-x-2">
            <button
              onClick={handleToggleRead}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              {alert.isRead ? 'Mark Unread' : 'Mark Read'}
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
