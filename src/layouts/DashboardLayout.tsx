import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-base-100 overflow-hidden font-sans text-base-content">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-base-200">
          {/* Dashboard Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <p className="text-sm opacity-70">Welcome back, here's what's happening today.</p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-sm btn-outline">Export</button>
              <button className="btn btn-sm btn-primary">Generate Report</button>
            </div>
          </div>

          {/* Placeholder Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard title="Total Sales" value="$45,231.89" percent="+20.1%" trend="up" />
            <StatsCard title="Active Employees" value="1,234" percent="+3.2%" trend="up" />
            <StatsCard title="Inventory Items" value="8,549" percent="-1.5%" trend="down" />
            <StatsCard title="New Customers" value="342" percent="+12.0%" trend="up" />
          </div>

          {/* Main Content Area via React Router Outlet */}
          <div className="bg-base-100 rounded-box shadow-sm border border-base-300 min-h-[400px] p-6">
            <Outlet />
            {/* Fallback mock content if Outlet is empty */}
            <div className="text-center text-sm opacity-50 mt-20">
              <div className="inline-block p-4 bg-base-200 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p>Select a module from the sidebar to view details.</p>
            </div>
          </div>
        </main>
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
               <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
            ) : (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" /></svg>
            )}
            {percent}
          </span>
        </div>
      </div>
    </div>
  );
}