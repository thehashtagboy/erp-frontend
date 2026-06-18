import React, { useState } from "react";
import type { UserDTO } from "../types";

interface UserDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDTO | null;
  onToggleStatus: (user: UserDTO) => Promise<void>;
  onForceResetPassword: (user: UserDTO) => Promise<void>;
  onEdit: (user: UserDTO) => void;
  onDelete: (user: UserDTO) => void;
}

export const UserDrawer: React.FC<UserDrawerProps> = ({
  isOpen,
  onClose,
  user,
  onToggleStatus,
  onForceResetPassword,
  onEdit,
  onDelete,
}) => {
  const [isResetting, setIsResetting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  if (!isOpen || !user) return null;

  const handleToggleStatus = async () => {
    setIsToggling(true);
    try {
      await onToggleStatus(user);
    } finally {
      setIsToggling(false);
    }
  };

  const handleForceReset = async () => {
    if (confirm(`Are you sure you want to force a password reset for ${user.firstName}?`)) {
      setIsResetting(true);
      try {
        await onForceResetPassword(user);
      } finally {
        setIsResetting(false);
      }
    }
  };

  const formatRoleName = (role: string) => {
    return role.replace("ROLE_", "").replace("_", " ");
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        {/* Sliding Panel */}
        <div className="w-screen max-w-md bg-base-100 shadow-2xl flex flex-col border-l border-base-300 animate-slide-in">
          {/* Header */}
          <div className="p-6 border-b border-base-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-base-content">User Profile Details</h2>
            <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Avatar & Header Info */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-20 h-20 text-3xl font-bold ring-4 ring-primary/10">
                  {user.firstName[0]}{user.lastName[0]}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-base-content">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-base-content/60">@{user.username}</p>
                <div className="mt-2">
                  <span className="badge badge-primary badge-outline font-semibold px-3 py-2 text-xs">
                    {formatRoleName(user.roleName)}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="bg-base-200/50 rounded-2xl p-4 space-y-4 border border-base-200">
              <div className="flex items-start gap-3">
                <span className="text-base-content/50 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Email Address</p>
                  <p className="text-sm text-base-content font-medium break-all">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base-content/50 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.557-5.127-3.86-6.683-6.683l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Phone Number</p>
                  <p className="text-sm text-base-content font-medium">{user.phoneNumber || "+1 (555) 019-2834"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base-content/50 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25g3 3 0 1 1 6 0ZM19.5 10.5a7.5 7.5 0 1 0-15 0" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Address</p>
                  <p className="text-sm text-base-content font-medium">{user.address || "123 Main St, Springfield"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base-content/50 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </span>
                <div className="grid grid-cols-1 gap-1">
                  <div>
                    <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Created At</p>
                    <p className="text-sm text-base-content font-medium">{formatDate(user.createdAt)}</p>
                  </div>
                  <div className="mt-1">
                    <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Last Updated</p>
                    <p className="text-sm text-base-content font-medium">{formatDate(user.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Section */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-base-content uppercase tracking-wider opacity-60">
                Quick Administrative Actions
              </h4>

              <div className="bg-base-200/50 rounded-2xl p-4 space-y-3 border border-base-200">
                {/* Toggle status action */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-base-content">
                      {user.status === "LOCKED" ? "Unlock User Account" : "Lock User Account"}
                    </p>
                    <p className="text-xs text-base-content/60">
                      {user.status === "LOCKED" ? "Enable access to this user" : "Temporarily suspend user access"}
                    </p>
                  </div>
                  <button
                    onClick={handleToggleStatus}
                    disabled={isToggling}
                    className={`btn btn-sm ${user.status === "LOCKED" ? "btn-success" : "btn-warning"}`}
                  >
                    {isToggling ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : user.status === "LOCKED" ? (
                      "Activate"
                    ) : (
                      "Lock"
                    )}
                  </button>
                </div>

                <div className="divider my-1"></div>

                {/* Force Password Reset action */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-base-content">Force Password Reset</p>
                    <p className="text-xs text-base-content/60">Require user to change password</p>
                  </div>
                  <button
                    onClick={handleForceReset}
                    disabled={isResetting}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    {isResetting ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "Reset"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-base-200 bg-base-200/30 flex gap-3">
            <button
              onClick={() => onEdit(user)}
              className="flex-1 btn btn-primary gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.83 20.082a4.5 4.5 0 0 1-2.052 1.238l-4.1 1.472a.75.75 0 0 1-.948-.948l1.5-4.1a4.5 4.5 0 0 1 1.228-2.04l12.285-12.287Z" />
              </svg>
              Edit Profile
            </button>
            <button
              onClick={() => onDelete(user)}
              className="btn btn-error btn-square hover:bg-error/20 btn-outline"
              title="Delete User"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
