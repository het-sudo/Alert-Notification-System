import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  Bell,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Info,
  Plus,
  MailOpen,
  Mail,
} from "lucide-react";
import api from "../api";
import clsx from "clsx";

interface Alert {
  _id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<"all" | "read" | "unread" | "external">(
    "all",
  );
  const [loading, setLoading] = useState(true);

  // New Alert State
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [newAlertTitle, setNewAlertTitle] = useState("");
  const [newAlertMessage, setNewAlertMessage] = useState("");
  const [newAlertType, setNewAlertType] = useState<
    "info" | "warning" | "error"
  >("info");

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      let endpoint = "/alerts/v1";
      if (filter === "read") endpoint = "/alerts/v1/read";
      if (filter === "unread") endpoint = "/alerts/v1/unread";
      if (filter === "external") endpoint = "/alerts/v1/external";

      const res = await api.get(endpoint);
      setAlerts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [filter]);

  const toggleRead = async (id: string, currentIsRead: boolean) => {
    try {
      const newIsRead = !currentIsRead;
      await api.patch(`/alerts/v1/${id}/read`);
      setAlerts((prev) => {
        const updated = prev.map((a) =>
          a._id === id ? { ...a, isRead: newIsRead } : a,
        );
        if (filter === "unread") return updated.filter((a) => !a.isRead);
        if (filter === "read") return updated.filter((a) => a.isRead);
        return updated;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAlert = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.delete(`/alerts/v1/${id}`);
      setAlerts((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const markAllRead = async () => {
    try {
      await api.patch("/alerts/v1/read-all");
      if (filter === "unread") {
        setAlerts([]);
      } else {
        setAlerts((prev) => prev.map((a) => ({ ...a, isRead: true })));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlertTitle.trim() || !newAlertMessage.trim()) return;
    try {
      const res = await api.post("/alerts/v1", {
        title: newAlertTitle,
        message: newAlertMessage,
        type: newAlertType,
      });
      if (filter === "all" || filter === "unread") {
        setAlerts([res.data, ...alerts]);
      }
      setIsAddingMode(false);
      setNewAlertTitle("");
      setNewAlertMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="text-red-500" size={20} />;
      case "warning":
        return <AlertCircle className="text-amber-500" size={20} />;
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };

  const getTypeClasses = (type: string, isRead: boolean) => {
    if (isRead) return "bg-white border-gray-100 text-gray-500";
    switch (type) {
      case "error":
        return "bg-red-50 border-red-100";
      case "warning":
        return "bg-amber-50 border-amber-100";
      default:
        return "bg-blue-50 border-blue-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-600/20">
            <Bell size={20} />
          </div>
          <span className="font-semibold text-lg text-gray-900 tracking-tight">
            AlertHub
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-600">
            Hi, {user?.name}
          </span>
          <button
            onClick={logout}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-2"
            title="Log out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Your Notifications
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Stay updated with the latest alerts
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsAddingMode(!isAddingMode)}
              className="px-4 py-2 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 shadow-sm"
            >
              <Plus size={16} /> <span>New Alert</span>
            </button>
            <button
              onClick={markAllRead}
              className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <CheckCircle2 size={16} /> <span>Mark all read</span>
            </button>
          </div>
        </div>

        {isAddingMode && (
          <form
            onSubmit={createAlert}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8 animation-fade-in"
          >
            <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Plus size={18} className="text-blue-600" /> Create a test alert
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Alert Title"
                value={newAlertTitle}
                onChange={(e) => setNewAlertTitle(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none w-full"
                required
              />
              <select
                value={newAlertType}
                onChange={(e) => setNewAlertType(e.target.value as any)}
                className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none w-full bg-white"
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            <textarea
              placeholder="Alert Message"
              value={newAlertMessage}
              onChange={(e) => setNewAlertMessage(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none w-full mb-4 resize-none h-24"
              required
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddingMode(false)}
                className="px-5 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm shadow-blue-600/20 transition-colors"
              >
                Publish Alert
              </button>
            </div>
          </form>
        )}

        {/* Filters */}
        <div className="flex space-x-1 p-1 bg-white border border-gray-200 rounded-xl mb-6 w-max shadow-sm overflow-x-auto">
          {["all", "unread", "read", "external"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={clsx(
                "px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all",
                filter === f
                  ? "bg-gray-100 text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Alert List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12 text-gray-400">
              Loading alerts...
            </div>
          ) : alerts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 border-dashed">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Bell size={32} />
              </div>
              <p className="text-gray-500 font-medium">You're all caught up!</p>
              <p className="text-sm text-gray-400 mt-1">
                No alerts found for this filter.
              </p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert._id}
                onClick={() => toggleRead(alert._id, alert.isRead)}
                className={clsx(
                  "p-5 rounded-2xl border flex items-start space-x-4 cursor-pointer transition-all hover:shadow-md",
                  getTypeClasses(alert.type, alert.isRead),
                )}
              >
                <div className={clsx("mt-1", alert.isRead ? "opacity-40" : "")}>
                  {getTypeIcon(alert.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h3
                      className={clsx(
                        "font-semibold truncate",
                        alert.isRead ? "text-gray-500" : "text-gray-900",
                      )}
                    >
                      {alert.title}
                    </h3>
                    <span className="text-xs font-medium text-gray-400 whitespace-nowrap shrink-0 ml-2">
                      {alert.createdAt || "Just now"}
                    </span>
                  </div>
                  <p
                    className={clsx(
                      "text-sm",
                      alert.isRead ? "text-gray-400" : "text-gray-600",
                    )}
                  >
                    {alert.message}
                  </p>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRead(alert._id, alert.isRead);
                    }}
                    className={clsx(
                      "p-2 rounded-lg transition-colors",
                      alert.isRead
                        ? "text-gray-400 hover:text-gray-600 hover:bg-gray-100/50"
                        : "text-blue-600 hover:bg-blue-100/50",
                    )}
                    title={alert.isRead ? "Mark as unread" : "Mark as read"}
                  >
                    {alert.isRead ? <MailOpen size={18} /> : <Mail size={18} />}
                  </button>
                  <button
                    onClick={(e) => deleteAlert(alert._id, e)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete alert"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
