import React, { useState, useMemo } from "react";
import type { UserDTO } from "../../users/types";

interface EmployeeTableProps {
  employees: UserDTO[];
  onRowClick: (employee: UserDTO) => void;
  onEdit: (employee: UserDTO) => void;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onRowClick,
  onEdit,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCivilStatus, setSelectedCivilStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchTerm.toLowerCase()) ||
        emp.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGender = selectedGender ? emp.gender === selectedGender : true;
      const matchesCivilStatus = selectedCivilStatus
        ? emp.civilStatus === selectedCivilStatus
        : true;

      return matchesSearch && matchesGender && matchesCivilStatus;
    });
  }, [employees, searchTerm, selectedGender, selectedCivilStatus]);

  // Reset pagination on filter change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGender, selectedCivilStatus]);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEmployees.slice(start, start + itemsPerPage);
  }, [filteredEmployees, currentPage]);

  // Unique values for dropdowns based on current data
  const genders = useMemo(() => {
      const g = employees.map(e => e.gender).filter(Boolean) as string[];
      return Array.from(new Set(g)).sort();
  }, [employees]);

  const civilStatuses = useMemo(() => {
      const cs = employees.map(e => e.civilStatus).filter(Boolean) as string[];
      return Array.from(new Set(cs)).sort();
  }, [employees]);

  return (
    <div className="flex flex-col gap-4">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center bg-base-100 p-4 rounded-2xl shadow-sm border border-base-200">
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Search employees..."
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
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="">All Genders</option>
            {genders.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <select
            className="select select-bordered w-full md:w-44"
            value={selectedCivilStatus}
            onChange={(e) => setSelectedCivilStatus(e.target.value)}
          >
            <option value="">All Civil Statuses</option>
            {civilStatuses.map((cs) => (
              <option key={cs} value={cs}>{cs}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-sm border border-base-200">
        <table className="table table-md w-full">
          <thead>
            <tr className="border-b border-base-200 bg-base-200/50">
              <th className="py-4">Employee</th>
              <th className="py-4">Contact</th>
              <th className="py-4">Demographics</th>
              <th className="py-4">Location</th>
              <th className="py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((emp) => (
              <tr
                key={emp.id}
                onClick={() => onRowClick(emp)}
                className="hover:bg-base-200/50 transition-colors cursor-pointer border-b border-base-100"
              >
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-primary/10 text-primary rounded-full w-10 h-10 font-bold border border-primary/20 flex items-center justify-center">
                        {emp.firstName[0]}{emp.lastName[0]}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-base-content leading-tight">
                        {emp.salutation ? `${emp.salutation} ` : ''}{emp.firstName} {emp.lastName}
                      </div>
                      <div className="text-xs opacity-60">@{emp.username}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 text-base-content/85">
                   <div className="flex flex-col">
                     <span>{emp.email}</span>
                     <span className="text-xs opacity-70">{emp.phoneNumber || "No phone provided"}</span>
                   </div>
                </td>
                <td className="py-3.5 text-base-content/85">
                   <div className="flex flex-col">
                     <span className="capitalize">{emp.gender || "Unspecified"}</span>
                     <span className="text-xs opacity-70 capitalize">{emp.civilStatus || "Unspecified"}</span>
                   </div>
                </td>
                <td className="py-3.5 text-base-content/85">
                   <div className="flex flex-col">
                     <span>{emp.city || "No city"}</span>
                     <span className="text-xs opacity-70">{emp.country || "No country"}</span>
                   </div>
                </td>
                <td className="py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="inline-flex gap-1.5">
                    <button
                      className="btn btn-ghost btn-sm btn-square text-info hover:bg-info/10"
                      onClick={() => onEdit(emp)}
                      title="Edit Profile"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.83 20.082a4.5 4.5 0 0 1-2.052 1.238l-4.1 1.472a.75.75 0 0 1-.948-.948l1.5-4.1a4.5 4.5 0 0 1 1.228-2.04l12.285-12.287Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125 16.5 4.125" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-base-content/60">
                  No employees found.
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
            {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} of{" "}
            {filteredEmployees.length} employees
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
