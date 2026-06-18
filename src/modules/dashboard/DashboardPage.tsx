import { useEffect, useState } from "react";
import { apiClient } from "../../app/apiClient";

interface DashboardSummary {
  message: string;
  username: string;
  role: string;
  totalUsers: number;
  totalOrders: number;
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await apiClient.get<DashboardSummary>("/api/home/summary");
        setSummary(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      {/* Dashboard Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content tracking-tight">Dashboard Overview</h1>
          <p className="text-sm opacity-70 mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-outline">Export</button>
          <button className="btn btn-sm btn-primary">Generate Report</button>
        </div>
      </div>

      {error && <div className="alert alert-error mb-6">{error}</div>}

      {/* Operational Metrics (Real-Time API Data) */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-base-content/80 mb-4 uppercase tracking-wider text-xs">Operational Metrics</h2>
        {summary ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-sm border border-base-300 border-l-4 border-blue-500">
              <div className="card-body p-4 md:p-6">
                <h3 className="card-title text-sm opacity-70 font-medium">Welcome</h3>
                <p className="text-xl font-bold text-base-content mt-1">{summary.username}</p>
                <div className="badge badge-primary badge-sm mt-2">{summary.role}</div>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-sm border border-base-300 border-l-4 border-green-500">
              <div className="card-body p-4 md:p-6">
                <h3 className="card-title text-sm opacity-70 font-medium">Total Users</h3>
                <p className="text-3xl font-bold text-base-content mt-1">{summary.totalUsers}</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-sm border border-base-300 border-l-4 border-purple-500">
              <div className="card-body p-4 md:p-6">
                <h3 className="card-title text-sm opacity-70 font-medium">Total Orders</h3>
                <p className="text-3xl font-bold text-base-content mt-1">{summary.totalOrders}</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm border border-base-300 border-l-4 border-orange-500">
              <div className="card-body p-4 md:p-6">
                <h3 className="card-title text-sm opacity-70 font-medium">System Status</h3>
                <p className="text-md font-semibold text-green-600 mt-2">{summary.message || "Online"}</p>
              </div>
            </div>
          </div>
        ) : (
          !error && <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg"></span></div>
        )}
      </div>

      {/* Sales & Resource Overview (Pseudo Analytics) */}
      <div>
        <h2 className="text-lg font-bold text-base-content/80 mb-4 uppercase tracking-wider text-xs">Sales & Resource Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Sales" value="$45,231.89" percent="+20.1%" trend="up" />
          <StatsCard title="Active Employees" value="1,234" percent="+3.2%" trend="up" />
          <StatsCard title="Inventory Items" value="8,549" percent="-1.5%" trend="down" />
          <StatsCard title="New Customers" value="342" percent="+12.0%" trend="up" />
        </div>
      </div>
    </div>
  );
}

// Reusable Stats Card Component
function StatsCard({ title, value, percent, trend }: { title: string, value: string, percent: string, trend: 'up' | 'down' }) {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body p-4 md:p-6">
        <h3 className="card-title text-sm opacity-70 font-medium">{title}</h3>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-bold">{value}</span>
          <span className={`text-xs font-semibold flex items-center ${trend === 'up' ? 'text-success' : 'text-error'}`}>
            {trend === 'up' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
              </svg>
            )}
            {percent}
          </span>
        </div>
      </div>
    </div>
  );
}