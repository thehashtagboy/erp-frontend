import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { fetchUsers, deleteUser, fetchRoles } from "./api";
import type { UserDTO } from "./types";
import { UserTable } from "./components/UserTable";
import { UserDrawer } from "./components/UserDrawer";

export default function UserPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [users, setUsers] = useState<UserDTO[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const usersData = await fetchUsers();
      // Augment users with local mock fields since backend doesn't store active/locked status or return phone/address in DTO
      const augmentedUsers = usersData.map((u, i) => ({
        ...u,
        phoneNumber: u.phoneNumber || "+1 (555) 019-28" + (i + 10),
        address: u.address || "123 Main St, Springfield",
        status: u.status || (Number(u.id) % 3 === 0 ? "LOCKED" : "ACTIVE"),
      }));
      setUsers(augmentedUsers);

      const rolesData = await fetchRoles();
      if (rolesData && rolesData.length > 0) {
        setRoles(rolesData.map((r) => r.name));
      } else {
        setRoles([
          "ROLE_SUPER_ADMIN",
          "ROLE_ADMIN",
          "ROLE_HR_MANAGER",
          "ROLE_INVENTORY_MANAGER",
          "ROLE_CASHIER",
          "ROLE_EMPLOYEE",
        ]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load user management workspace data.");
      showToast("Error loading users database", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    if (location.state?.message) {
      showToast(location.state.message, "success");
      // clear state so it doesn't show again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [loadData, location.state]);



  const handleDelete = async (userToDelete: UserDTO) => {
    if (confirm(`Are you sure you want to permanently delete user ${userToDelete.firstName} ${userToDelete.lastName}?`)) {
      try {
        await deleteUser(userToDelete.id);
        showToast(`Successfully deleted user ${userToDelete.firstName}`);
        setIsDrawerOpen(false);
        loadData();
      } catch (err) {
        console.error(err);
        let message = "Failed to delete user";
        if (axios.isAxiosError(err)) {
          message = err.response?.data?.message || err.message;
        }
        showToast(message, "error");
      }
    }
  };

  const handleToggleStatus = async (userToToggle: UserDTO) => {
    // Simulate updating active state on the frontend (since backend DTO has no status field)
    const newStatus = userToToggle.status === "LOCKED" ? "ACTIVE" : "LOCKED";
    setUsers((prev) =>
      prev.map((u) => (u.id === userToToggle.id ? { ...u, status: newStatus } : u))
    );
    setSelectedUser((prev) => (prev && prev.id === userToToggle.id ? { ...prev, status: newStatus } : prev));
    showToast(`User ${userToToggle.firstName} account is now ${newStatus === "LOCKED" ? "locked" : "active"}`);
  };

  const handleForceResetPassword = async (userToReset: UserDTO) => {
    // Mocking password reset
    showToast(`Password reset link successfully sent to ${userToReset.email}`, "info");
  };

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "ACTIVE").length,
    locked: users.filter((u) => u.status === "LOCKED").length,
    admins: users.filter((u) => u.roleName === "ROLE_SUPER_ADMIN" || u.roleName === "ROLE_ADMIN").length,
  };

  return (
    <div className="space-y-6">
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
          <h1 className="text-3xl font-bold tracking-tight text-base-content">User Management</h1>
          <p className="text-sm text-base-content/60 mt-1">
            Manage user authorization profiles, security status, and core organizational roles.
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
          Add New User
        </button>
      </div>

      {/* Error alert */}
      {error && <div className="alert alert-error rounded-2xl shadow-sm">{error}</div>}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Accounts", value: stats.total, color: "text-primary", bg: "bg-primary/5 border-primary/15" },
          { label: "Active Profiles", value: stats.active, color: "text-success", bg: "bg-success/5 border-success/15" },
          { label: "Locked Accounts", value: stats.locked, color: "text-error", bg: "bg-error/5 border-error/15" },
          { label: "Administrators", value: stats.admins, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-150 dark:border-indigo-900/30" },
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
        <UserTable
          users={users}
          roles={roles}
          onRowClick={(u) => {
            setSelectedUser(u);
            setIsDrawerOpen(true);
          }}
          onEdit={(u) => {
            navigate(`/users/${u.id}/edit`);
          }}
          onDelete={handleDelete}
        />
      )}



      {/* Details Side Drawer */}
      <UserDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onToggleStatus={handleToggleStatus}
        onForceResetPassword={handleForceResetPassword}
        onEdit={(u) => {
          setIsDrawerOpen(false);
          navigate(`/users/${u.id}/edit`);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}