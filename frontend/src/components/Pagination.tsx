import type { Pagination } from '@/types/api';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAlertsStore } from '@/hooks/useAlerts';

interface Props {
  pagination: Pagination | null;
}

export default function PaginationComp({ pagination }: Props) {
  const { getAlerts } = useAlertsStore();

  if (!pagination) return null;

  const handlePageChange = (page: number) => {
    getAlerts(page, 10);
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <button
        onClick={() => handlePageChange(1)}
        disabled={pagination.page === 1}
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ArrowLeft size={16} />
        <span>First</span>
      </button>

      <button
        onClick={() => handlePageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
        <span>Previous</span>
      </button>

      <div className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg">
        Page <span className="font-bold">{pagination.page}</span> of{' '}
        <span className="font-bold">{pagination.pages}</span>
        <span className="text-gray-500">({pagination.total} total)</span>
      </div>

      <button
        onClick={() => handlePageChange(pagination.page + 1)}
        disabled={pagination.page === pagination.pages}
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span>Next</span>
        <ChevronRight size={16} />
      </button>

      <button
        onClick={() => handlePageChange(pagination.pages)}
        disabled={pagination.page === pagination.pages}
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span>Last</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
