import React from 'react';
import { Alert, mockAlerts } from './types/alert';

const App = () => {
  const alerts = mockAlerts;
  const unreadCount = alerts.filter((alert) => !alert.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Alert Notification System</h1>
          <p className="text-xl text-gray-600">
            {unreadCount > 0 && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-2">
                {unreadCount} unread
              </span>
            )}
            Total: {alerts.length} notifications
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button className="px-6 py-3 bg-green-100 hover:bg-green-200 text-green-800 font-medium rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              Mark All Read
            </button>
            <button className="px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              Create Alert
            </button>
            <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              Show Read
            </button>
            <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ml-2">
              Show Unread
            </button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {alerts.map((alert) => (
              <div
                key={alert._id}
                className={`p-6 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                  alert.isRead ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-100 shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          alert.type === 'info'
                            ? 'bg-blue-100 text-blue-800'
                            : alert.type === 'warning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {alert.type.toUpperCase()}
                      </span>
                      <h3
                        className={`font-bold text-lg ${
                          alert.isRead ? 'text-gray-600' : 'text-gray-900'
                        }`}
                      >
                        {alert.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-3 leading-relaxed">{alert.message}</p>
                    <span className="text-xs text-gray-500">{alert.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        alert.isRead ? 'bg-gray-300' : 'bg-green-400'
                      }`}
                    />
                    <button
                      className="p-2 hover:bg-gray-200 rounded-xl transition-colors duration-200"
                      title="Toggle Read/Unread"
                    >
                      <svg
                        className={`w-5 h-5 ${alert.isRead ? 'text-gray-400' : 'text-blue-600'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                    <button
                      className="p-2 hover:bg-red-100 rounded-xl transition-colors duration-200 text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
