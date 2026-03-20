import { useEffect } from 'react';
import api from '@/utils/api';
import { useAuthStore } from '@/hooks/useAuth';
import { useAlertsStore } from '@/hooks/useAlerts';
import AlertForm from '@/components/AlertForm';
import AlertList from './AlertList';
import Actions from './Actions';
import PaginationComp from '@/components/Pagination';
import { RefreshCw, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { alerts, pagination, getAlerts, isLoading } = useAlertsStore();
  const { user } = useAuthStore();

  useEffect(() => {
    getAlerts();
  }, []);

  const handleRefresh = () => {
    getAlerts();
  };

  const handleExternal = async () => {
    try {
      await api.get('/alerts/v1/external?page=1&limit=10');
      getAlerts();
      toast.success('External alerts synced!');
    } catch {
      toast.error('Sync failed');
    }
  };

  if (isLoading && alerts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-gray-400 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading alerts...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-900">Alerts Dashboard</h1>
          <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
            {alerts.length} alerts
          </span>
        </div>
        <div className="flex items-center space-x-3">
          {/* <button
            onClick={handleRefresh}
            className="btn-primary flex items-center space-x-2 px-4 py-2 text-sm"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button> */}
          <button
            onClick={handleExternal}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary-600 bg-white border border-primary-200 hover:bg-primary-50 rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            <ExternalLink size={16} />
            <span>Sync External</span>
          </button>
        </div>
      </div>
      <AlertForm />
      <Actions />
      <AlertList />
      <PaginationComp pagination={pagination} />
    </div>
  );
}
