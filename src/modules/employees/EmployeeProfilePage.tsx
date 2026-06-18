import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchUsers } from "../users/api";
import type { UserDTO } from "../users/types";
import { EmployeeTable } from "./components/EmployeeTable";
import { EmployeeDrawer } from "./components/EmployeeDrawer";

export default function EmployeeProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [employees, setEmployees] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<UserDTO | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const usersData = await fetchUsers();
      // For demo purposes, we will mock some demographic fields if they are missing
      const augmentedEmployees = usersData.map((u, i) => {
         const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];
         const civilStatuses = ["Single", "Married", "Divorced", "Widowed"];
         
         return {
            ...u,
            phoneNumber: u.phoneNumber || `+1 (555) 019-28${i + 10}`,
            address: u.address || "123 Main St, Springfield",
            gender: u.gender || genders[i % genders.length],
            civilStatus: u.civilStatus || civilStatuses[i % civilStatuses.length],
            country: u.country || "United States",
            city: u.city || (i % 2 === 0 ? "New York" : "San Francisco"),
         };
      });
      setEmployees(augmentedEmployees);
    } catch (err) {
      console.error(err);
      setError("Failed to load employee profile data.");
      showToast("Error loading employees database", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    if (location.state?.message) {
      showToast(location.state.message, "success");
      window.history.replaceState({}, document.title);
    }
  }, [loadData, location.state]);

  const stats = {
    total: employees.length,
    completedProfiles: employees.filter(e => e.gender && e.civilStatus && e.address).length,
    male: employees.filter((e) => e.gender?.toLowerCase() === "male").length,
    female: employees.filter((e) => e.gender?.toLowerCase() === "female").length,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Alert */}
      {toast && (
        <div className="toast toast-top toast-end z-[100] animate-fade-in">
          <div className={`alert ${toast.type === "error" ? "alert-error" : toast.type === "info" ? "alert-info" : "alert-success"} shadow-lg rounded-xl`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <div className="text-sm breadcrumbs mb-2 opacity-70">
            <ul>
              <li><a onClick={() => navigate('/employees')}>Employee Directory</a></li>
              <li>Core Profile & Information</li>
            </ul>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-base-content">Core Profiles</h1>
          <p className="text-sm text-base-content/60 mt-1">
            Manage employee personal records, demographic information, and contact details.
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/users/onboard");
          }}
          className="btn btn-primary gap-2 rounded-2xl shadow-sm hover:shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Employee
        </button>
      </div>

      {/* Error alert */}
      {error && <div className="alert alert-error rounded-2xl shadow-sm">{error}</div>}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Employees", value: stats.total, color: "text-primary", bg: "bg-primary/5 border-primary/15" },
          { label: "Complete Profiles", value: stats.completedProfiles, color: "text-success", bg: "bg-success/5 border-success/15" },
          { label: "Male Staff", value: stats.male, color: "text-info", bg: "bg-info/5 border-info/15" },
          { label: "Female Staff", value: stats.female, color: "text-secondary", bg: "bg-secondary/5 border-secondary/15" },
        ].map((stat, i) => (
          <div key={i} className={`p-5 rounded-3xl border bg-base-100 shadow-sm flex flex-col justify-between min-h-[100px] ${stat.bg}`}>
            <span className="text-xs font-semibold text-base-content/65 uppercase tracking-wider">{stat.label}</span>
            <span className={`text-3xl font-black mt-2 ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Main Table View */}
      {loading ? (
        <div className="flex justify-center p-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <EmployeeTable
          employees={employees}
          onRowClick={(emp) => {
            setSelectedEmployee(emp);
            setIsDrawerOpen(true);
          }}
          onEdit={(emp) => {
            navigate(`/users/${emp.id}/edit`);
          }}
        />
      )}

      {/* Details Side Drawer */}
      <EmployeeDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        onEdit={(emp) => {
          setIsDrawerOpen(false);
          navigate(`/users/${emp.id}/edit`);
        }}
      />
    </div>
  );
}
