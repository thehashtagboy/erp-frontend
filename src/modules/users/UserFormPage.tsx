import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fetchUserById, createUser, updateUser, fetchRoles } from "./api";
import type { CreateUserRequest, UpdateUserRequest } from "./types";

type FormFieldName = "firstName" | "lastName" | "email" | "username" | "password" | "phoneNumber" | "address" | "roleName";

export default function UserFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<Record<FormFieldName, string>>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    address: "",
    roleName: "",
  });

  const [roles, setRoles] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const rolesData = await fetchRoles();
        const availableRoles = rolesData && rolesData.length > 0 
          ? rolesData.map((r) => r.name)
          : [
              "ROLE_SUPER_ADMIN",
              "ROLE_ADMIN",
              "ROLE_HR_MANAGER",
              "ROLE_INVENTORY_MANAGER",
              "ROLE_CASHIER",
              "ROLE_EMPLOYEE",
            ];
        setRoles(availableRoles);

        if (isEditMode && id) {
          const user = await fetchUserById(id);
          setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            username: user.username || "",
            password: "",
            phoneNumber: user.phoneNumber || "",
            address: user.address || "",
            roleName: user.roleName || availableRoles[0],
          });
        } else {
          setFormData((prev) => ({ ...prev, roleName: availableRoles[0] }));
        }
      } catch (err) {
        console.error("Failed to load form data", err);
        showToast("Failed to load required data. Please try again.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!isEditMode) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (isEditMode && id) {
        const updatePayload: UpdateUserRequest = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          roleName: formData.roleName,
        };
        await updateUser(id, updatePayload);
      } else {
        const createPayload: CreateUserRequest = { ...formData };
        await createUser(createPayload);
      }
      navigate("/users", { state: { message: isEditMode ? "Profile updated successfully" : "User onboarded successfully" } });
    } catch (err) {
      console.error(err);
      let errMsg = "An error occurred during submission";
      if (axios.isAxiosError(err)) {
        errMsg = err.response?.data?.message || err.message;
      }
      showToast(errMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const formFields = [
    { name: "firstName", label: "First Name *", type: "text", gridClass: "col-span-1" },
    { name: "lastName", label: "Last Name *", type: "text", gridClass: "col-span-1" },
    { name: "email", label: "Email Address *", type: "email", gridClass: "col-span-2" },
    { name: "username", label: "Username *", type: "text", gridClass: isEditMode ? "col-span-2" : "col-span-2 md:col-span-1" },
    ...(!isEditMode ? [{ name: "password", label: "Password *", type: "password", gridClass: "col-span-2 md:col-span-1" }] : []),
    { name: "phoneNumber", label: "Phone Number", type: "text", gridClass: "col-span-2 md:col-span-1", placeholder: "+1 (555) 000-0000" },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {toast && (
        <div className="toast toast-top toast-end z-[100]">
          <div className={`alert ${toast.type === "error" ? "alert-error" : toast.type === "info" ? "alert-info" : "alert-success"} shadow-lg rounded-xl`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="btn btn-circle btn-ghost btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-base-content">
            {isEditMode ? "Edit User Profile" : "Onboard New User"}
          </h1>
          <p className="text-sm text-base-content/60 mt-1">
            {isEditMode ? "Update details for this account." : "Fill out the fields to create a new user account."}
          </p>
        </div>
      </div>

      <div className="bg-base-100 border shadow-sm rounded-3xl p-6 md:p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-4">
          {formFields.map((field) => (
            <div key={field.name} className={field.gridClass}>
              <label className="label label-text font-medium pb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name as FormFieldName] || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`input input-bordered w-full ${errors[field.name] ? "input-error" : ""}`}
              />
              {errors[field.name] && (
                <span className="text-error text-xs mt-1 block">{errors[field.name]}</span>
              )}
            </div>
          ))}

          {/* Role Dropdown */}
          <div className="col-span-2 md:col-span-1">
            <label className="label label-text font-medium pb-1">Role *</label>
            <select
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r.replace("ROLE_", "").replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="label label-text font-medium pb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, City, Country"
              className="input input-bordered w-full"
            />
          </div>

          <div className="col-span-2 border-t mt-6 pt-6 flex justify-end gap-3">
            <button type="button" onClick={() => navigate("/users")} disabled={isSubmitting} className="btn btn-outline rounded-xl">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary rounded-xl px-8 shadow-sm">
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : isEditMode ? (
                "Save Changes"
              ) : (
                "Onboard User"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
