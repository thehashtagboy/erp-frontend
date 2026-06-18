import React from "react";
import type { UserDTO } from "../../users/types";

interface EmployeeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  employee: UserDTO | null;
  onEdit: (employee: UserDTO) => void;
}

export const EmployeeDrawer: React.FC<EmployeeDrawerProps> = ({
  isOpen,
  onClose,
  employee,
  onEdit,
}) => {
  if (!isOpen || !employee) return null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
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
            <h2 className="text-lg font-bold text-base-content">Core Profile Details</h2>
            <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Avatar & Header Info */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-20 h-20 text-3xl font-bold ring-4 ring-primary/10 flex items-center justify-center">
                  {employee.firstName[0]}{employee.lastName[0]}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-base-content">
                  {employee.salutation ? `${employee.salutation} ` : ''}{employee.firstName} {employee.lastName}
                </h3>
                <p className="text-sm text-base-content/60">@{employee.username}</p>
                <div className="mt-2 text-sm font-semibold opacity-80">
                  {employee.department || 'No Department'} • {employee.positionLevel || 'No Level'}
                </div>
              </div>
            </div>

            {/* Demographics / Personal Info */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-base-content uppercase tracking-wider opacity-60">
                Personal Information
              </h4>
              <div className="bg-base-200/50 rounded-2xl p-4 space-y-3 border border-base-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Gender</p>
                    <p className="text-sm text-base-content font-medium capitalize">{employee.gender || "Unspecified"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Civil Status</p>
                    <p className="text-sm text-base-content font-medium capitalize">{employee.civilStatus || "Unspecified"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Nationality</p>
                    <p className="text-sm text-base-content font-medium capitalize">{employee.nationality || "Unspecified"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Birth Date</p>
                    <p className="text-sm text-base-content font-medium">{formatDate(employee.birthDate)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-base-content uppercase tracking-wider opacity-60">
                Contact Details
              </h4>
              <div className="bg-base-200/50 rounded-2xl p-4 space-y-4 border border-base-200">
                <div className="flex items-start gap-3">
                  <span className="text-base-content/50 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Email Address</p>
                    <p className="text-sm text-base-content font-medium break-all">{employee.email}</p>
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
                    <p className="text-sm text-base-content font-medium">{employee.phoneNumber || "No phone provided"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Geographic Information */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-base-content uppercase tracking-wider opacity-60">
                Location & Address
              </h4>
              <div className="bg-base-200/50 rounded-2xl p-4 space-y-4 border border-base-200">
                <div className="flex items-start gap-3">
                  <span className="text-base-content/50 mt-0.5">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25g3 3 0 1 1 6 0ZM19.5 10.5a7.5 7.5 0 1 0-15 0" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Full Address</p>
                    <p className="text-sm text-base-content font-medium">{employee.address || "No address provided"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pl-8">
                  <div>
                    <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">City</p>
                    <p className="text-sm text-base-content font-medium">{employee.city || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">State/Province</p>
                    <p className="text-sm text-base-content font-medium">{employee.stateProvince || "-"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Country</p>
                    <p className="text-sm text-base-content font-medium">{employee.country || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-base-200 bg-base-200/30 flex gap-3">
            <button
              onClick={() => onEdit(employee)}
              className="flex-1 btn btn-primary gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.83 20.082a4.5 4.5 0 0 1-2.052 1.238l-4.1 1.472a.75.75 0 0 1-.948-.948l1.5-4.1a4.5 4.5 0 0 1 1.228-2.04l12.285-12.287Z" />
              </svg>
              Edit Full Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
