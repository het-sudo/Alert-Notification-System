import { useAlertsStore } from '@/hooks/useAlerts';
import AlertCard from '@/components/AlertCard';
import { useMemo } from 'react';
import { Bell } from 'lucide-react';

export default function AlertList() {
  const { alerts, isLoading } = useAlertsStore();

  const unreadCount = useMemo(
    () => alerts.filter((alert) => !alert.isRead).length,
    [alerts],
  );

  if (!isLoading && alerts.length === 0) {
    return (
      <div className="card text-center py-16">
        <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No alerts yet
        </h3>
        <p className="text-gray-500 mb-6">Create your first alert above.</p>
        <div className="text-sm text-gray-400">
          Use "Sync External" to import sample alerts
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Recent Alerts</h3>
        {unreadCount > 0 && (
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            {unreadCount} unread
          </span>
        )}
      </div>
      <div className="grid gap-4">
        {alerts.map((alert) => (
          <AlertCard key={alert._id} alert={alert} />
        ))}
      </div>
      {isLoading && alerts.length > 0 && (
        <div className="text-center py-12 text-gray-500">
          Loading more alerts...
        </div>
      )}
    </div>
  );
}
