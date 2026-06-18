import React, { useState, useMemo } from "react";
import type { UserDTO } from "../types";

interface UserTableProps {
  users: UserDTO[];
  roles: string[];
  onRowClick: (user: UserDTO) => void;
  onEdit: (user: UserDTO) => void;
  onDelete: (user: UserDTO) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  roles,
  onRowClick,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = selectedRole ? user.roleName === selectedRole : true;
      const matchesStatus = selectedStatus
        ? user.status === selectedStatus
        : true;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, selectedRole, selectedStatus]);

  // Reset pagination on filter change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRole, selectedStatus]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "ROLE_SUPER_ADMIN":
        return "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-200";
      case "ROLE_ADMIN":
        return "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-200";
      case "ROLE_HR_MANAGER":
        return "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950 dark:text-teal-200";
      case "ROLE_INVENTORY_MANAGER":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-200";
      case "ROLE_CASHIER":
        return "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950 dark:text-sky-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200";
    }
  };

  const formatRoleName = (role: string) => {
    return role.replace("ROLE_", "").replace("_", " ");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center bg-base-100 p-4 rounded-2xl shadow-sm border border-base-200">
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Search users..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-3.5 opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
            </svg>
          </span>
        </div>

        <div className="flex w-full md:w-auto gap-3 items-center">
          <select
            className="select select-bordered w-full md:w-44"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {formatRoleName(role)}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full md:w-40"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="LOCKED">Locked</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-sm border border-base-200">
        <table className="table table-md w-full">
          <thead>
            <tr className="border-b border-base-200 bg-base-200/50">
              <th className="py-4">User</th>
              <th className="py-4">Email</th>
              <th className="py-4">Role</th>
              <th className="py-4">Status</th>
              <th className="py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                onClick={() => onRowClick(user)}
                className="hover:bg-base-200/50 transition-colors cursor-pointer border-b border-base-100"
              >
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-primary/10 text-primary rounded-full w-10 h-10 font-bold border border-primary/20">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-base-content leading-tight">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs opacity-60">@{user.username}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 text-base-content/85">{user.email}</td>
                <td className="py-3.5">
                  <span className={`badge border text-xs font-semibold px-2.5 py-1 ${getRoleBadgeClass(user.roleName)}`}>
                    {formatRoleName(user.roleName)}
                  </span>
                </td>
                <td className="py-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${user.status === "LOCKED" ? "bg-error" : "bg-success"}`} />
                    <span className={`text-xs font-medium ${user.status === "LOCKED" ? "text-error" : "text-success"}`}>
                      {user.status === "LOCKED" ? "Locked" : "Active"}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="inline-flex gap-1.5">
                    <button
                      className="btn btn-ghost btn-sm btn-square text-info hover:bg-info/10"
                      onClick={() => onEdit(user)}
                      title="Edit User"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.83 20.082a4.5 4.5 0 0 1-2.052 1.238l-4.1 1.472a.75.75 0 0 1-.948-.948l1.5-4.1a4.5 4.5 0 0 1 1.228-2.04l12.285-12.287Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125 16.5 4.125" />
                      </svg>
                    </button>
                    <button
                      className="btn btn-ghost btn-sm btn-square text-error hover:bg-error/10"
                      onClick={() => onDelete(user)}
                      title="Delete User"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-base-content/60">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-2 mt-2">
          <span className="text-xs text-base-content/60">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </span>
          <div className="join">
            <button
              className="join-item btn btn-outline btn-xs"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((c) => c - 1)}
            >
              « Previous
            </button>
            <button className="join-item btn btn-outline btn-xs pointer-events-none">
              Page {currentPage} of {totalPages}
            </button>
            <button
              className="join-item btn btn-outline btn-xs"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((c) => c + 1)}
            >
              Next »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
