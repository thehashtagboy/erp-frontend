import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fetchUserById, createUser, updateUser, fetchRoles, fetchLov } from "./api";
import type { CreateUserRequest, UpdateUserRequest, LovDTO } from "./types";

export default function UserFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<Partial<CreateUserRequest>>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    address: "",
    roleName: "",
    salutation: "",
    civilStatus: "",
    gender: "",
    nationality: "",
    country: "",
    stateProvince: "",
    city: "",
    employmentStatus: "",
    employmentType: "",
    department: "",
    positionLevel: "",
    shiftType: "",
    payFrequency: "",
    birthDate: "",
    dateHired: "",
  });

  const [roles, setRoles] = useState<string[]>([]);
  // LOV states
  const [salutations, setSalutations] = useState<LovDTO[]>([]);
  const [civilStatuses, setCivilStatuses] = useState<LovDTO[]>([]);
  const [genders, setGenders] = useState<LovDTO[]>([]);
  const [nationalities, setNationalities] = useState<LovDTO[]>([]);
  const [countries, setCountries] = useState<LovDTO[]>([]);
  const [states, setStates] = useState<LovDTO[]>([]);
  const [cities, setCities] = useState<LovDTO[]>([]);
  const [employmentStatuses, setEmploymentStatuses] = useState<LovDTO[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<LovDTO[]>([]);
  const [departments, setDepartments] = useState<LovDTO[]>([]);
  const [positionLevels, setPositionLevels] = useState<LovDTO[]>([]);
  const [shiftTypes, setShiftTypes] = useState<LovDTO[]>([]);
  const [payFrequencies, setPayFrequencies] = useState<LovDTO[]>([]);

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
        const [
          rolesData,
          salut,
          civil,
          gend,
          natio,
          countr,
          empStat,
          empType,
          dept,
          posLev,
          shift,
          payFreq
        ] = await Promise.all([
          fetchRoles().catch(() => []),
          fetchLov("SALUTATION").catch(() => []),
          fetchLov("CIVIL_STATUS").catch(() => []),
          fetchLov("GENDER").catch(() => []),
          fetchLov("NATIONALITY").catch(() => []),
          fetchLov("COUNTRY").catch(() => []),
          fetchLov("EMPLOYMENT_STATUS").catch(() => []),
          fetchLov("EMPLOYMENT_TYPE").catch(() => []),
          fetchLov("DEPARTMENT").catch(() => []),
          fetchLov("POSITION_LEVEL").catch(() => []),
          fetchLov("SHIFT_TYPE").catch(() => []),
          fetchLov("PAY_FREQUENCY").catch(() => [])
        ]);

        const availableRoles = rolesData && rolesData.length > 0 
          ? rolesData.map((r) => r.name)
          : ["ROLE_SUPER_ADMIN", "ROLE_ADMIN", "ROLE_HR_MANAGER", "ROLE_INVENTORY_MANAGER", "ROLE_CASHIER", "ROLE_EMPLOYEE"];
        
        setRoles(availableRoles);
        setSalutations(salut);
        setCivilStatuses(civil);
        setGenders(gend);
        setNationalities(natio);
        setCountries(countr);
        setEmploymentStatuses(empStat);
        setEmploymentTypes(empType);
        setDepartments(dept);
        setPositionLevels(posLev);
        setShiftTypes(shift);
        setPayFrequencies(payFreq);

        if (isEditMode && id) {
          const user = await fetchUserById(id);
          setFormData({
            ...user,
            password: "",
            roleName: user.roleName || availableRoles[0]
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

  // Handle cascading LOVs when Country changes
  useEffect(() => {
    const loadStatesAndCities = async () => {
      if (formData.country) {
        try {
          const [statesData, citiesData] = await Promise.all([
            fetchLov("STATE_PROVINCE", formData.country),
            fetchLov("CITY", formData.country)
          ]);
          setStates(statesData);
          setCities(citiesData);
        } catch (err) {
          console.error("Failed to load states and cities", err);
        }
      } else {
        setStates([]);
        setCities([]);
        setFormData(prev => ({ ...prev, stateProvince: "", city: "" }));
      }
    };
    loadStatesAndCities();
  }, [formData.country]);

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
    if (!formData.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!formData.username?.trim()) newErrors.username = "Username is required";

    if (!formData.email?.trim()) {
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
    if (!validate()) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditMode && id) {
        const rest = { ...formData };
        delete rest.password;
        await updateUser(id, rest as UpdateUserRequest);
      } else {
        const createPayload = { ...formData } as CreateUserRequest;
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

  const renderInput = (name: string, label: string, type: string = "text", placeholder: string = "", required: boolean = false) => (
    <div className="form-control w-full">
      <label className="label label-text font-medium pb-1">{label} {required && <span className="text-error">*</span>}</label>
      <input
        type={type}
        name={name}
        value={(formData as Record<string, string>)[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className={`input input-bordered w-full ${errors[name] ? "input-error" : ""}`}
      />
      {errors[name] && <span className="text-error text-xs mt-1 block">{errors[name]}</span>}
    </div>
  );

  const renderSelect = (name: string, label: string, options: LovDTO[] | string[], required: boolean = false, isSimpleString: boolean = false) => (
    <div className="form-control w-full">
      <label className="label label-text font-medium pb-1">{label} {required && <span className="text-error">*</span>}</label>
      <select
        name={name}
        value={(formData as Record<string, string>)[name] || ""}
        onChange={handleChange}
        className={`select select-bordered w-full ${errors[name] ? "select-error" : ""}`}
      >
        <option value="" disabled>Select {label}</option>
        {isSimpleString ? (options as string[]).map((opt) => (
          <option key={opt} value={opt}>{opt.replace("ROLE_", "").replace("_", " ")}</option>
        )) : (options as LovDTO[]).map((opt) => (
          <option key={opt.lovKey} value={opt.lovKey}>{opt.lovValue}</option>
        ))}
      </select>
      {errors[name] && <span className="text-error text-xs mt-1 block">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-10">
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core & Security */}
        <div className="bg-base-100 border shadow-sm rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 text-base-content border-b pb-2">Core & Security</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderInput("firstName", "First Name", "text", "", true)}
            {renderInput("lastName", "Last Name", "text", "", true)}
            {renderInput("username", "Username", "text", "", true)}
            {renderInput("email", "Email Address", "email", "", true)}
            {!isEditMode && renderInput("password", "Password", "password", "", true)}
            {renderSelect("roleName", "System Role", roles, true, true)}
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-base-100 border shadow-sm rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 text-base-content border-b pb-2">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderSelect("salutation", "Salutation", salutations)}
            {renderSelect("gender", "Gender", genders)}
            {renderSelect("civilStatus", "Civil Status", civilStatuses)}
            {renderSelect("nationality", "Nationality", nationalities)}
            {renderInput("birthDate", "Birth Date", "date")}
            {renderInput("phoneNumber", "Phone Number", "text", "+1 (555) 000-0000")}
          </div>
        </div>

        {/* Geographic Information */}
        <div className="bg-base-100 border shadow-sm rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 text-base-content border-b pb-2">Geographic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderSelect("country", "Country", countries)}
            {renderSelect("stateProvince", "State / Province", states)}
            {renderSelect("city", "City", cities)}
            <div className="md:col-span-3">
              {renderInput("address", "Full Address", "text", "123 Main St...")}
            </div>
          </div>
        </div>

        {/* Employment Details */}
        <div className="bg-base-100 border shadow-sm rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 text-base-content border-b pb-2">Employment Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderSelect("employmentStatus", "Employment Status", employmentStatuses)}
            {renderSelect("employmentType", "Employment Type", employmentTypes)}
            {renderSelect("department", "Department", departments)}
            {renderSelect("positionLevel", "Position Level", positionLevels)}
            {renderSelect("shiftType", "Shift Type", shiftTypes)}
            {renderSelect("payFrequency", "Pay Frequency", payFrequencies)}
            {renderInput("dateHired", "Date Hired", "date")}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={() => navigate("/users")} disabled={isSubmitting} className="btn btn-outline rounded-xl px-6">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary rounded-xl px-10 shadow-sm">
            {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : isEditMode ? "Save Changes" : "Onboard User"}
          </button>
        </div>
      </form>
    </div>
  );
}
