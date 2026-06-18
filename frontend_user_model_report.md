# Frontend Integration Report: User Module & LOV System

## Overview
The Backend User module has been expanded to integrate with the new hierarchical List of Values (LOV) system. The `User` entity now holds a comprehensive set of demographic, geographic, and employment-related fields. Additionally, the endpoints are now secured via Role-Based Access Control (RBAC).

This document serves as the integration guide for building the Frontend User Management UI.

---

## 1. Updated API Endpoints (RBAC Secured)

The `/api/users` endpoints now require the user to send an `Authorization: Bearer <token>` (once JWT is fully implemented) or basic auth credentials with the appropriate roles.

| Method | Endpoint | Required Roles | Description |
|--------|----------|----------------|-------------|
| **GET** | `/api/users` | `SUPER_ADMIN`, `ADMIN`, `HR_MANAGER` | List all users |
| **GET** | `/api/users/{id}` | `SUPER_ADMIN`, `ADMIN`, `HR_MANAGER` | Get user profile |
| **POST** | `/api/users` | `SUPER_ADMIN`, `HR_MANAGER` | Create a new user |
| **PUT** | `/api/users/{id}`| `SUPER_ADMIN`, `HR_MANAGER` | Update user profile |
| **DELETE**| `/api/users/{id}`| `SUPER_ADMIN`, `HR_MANAGER` | Delete a user |

> [!WARNING]
> If the authenticated user does not have the required role, the API will respond with a **403 Forbidden**. Ensure the frontend hides or disables the Create/Edit/Delete buttons if the current user isn't a Super Admin or HR Manager.

---

## 2. Updated Data Models

The User DTOs have been expanded to include 15 new fields referencing the LOV system. 

### CreateUserRequest Payload
When calling `POST /api/users`, send the following JSON structure. 
*Note: All LOV fields and dates are optional on the backend to allow flexible drafts, but you should enforce required fields on the frontend based on the business workflow.*

```json
{
  // --- REQUIRED CORE FIELDS ---
  "firstName": "Jane",         // required
  "lastName": "Doe",           // required
  "username": "janedoe",       // required, must be unique
  "password": "SecurePass123", // required
  "email": "jane@example.com", // required, must be valid email format
  "roleName": "EMPLOYEE",      // defaults to "ROLE_USER" if omitted
  
  // --- OPTIONAL FIELDS ---
  "phoneNumber": "+639123456789",
  "address": "123 Main St",

  // --- NEW LOV FIELDS (Send the LOV Key, not the Value) ---
  "salutation": "MS",                  // references lovType: SALUTATION
  "civilStatus": "SINGLE",             // references lovType: CIVIL_STATUS
  "gender": "FEMALE",                  // references lovType: GENDER
  "nationality": "FILIPINO",           // references lovType: NATIONALITY
  
  // Geographic LOVs (Hierarchical)
  "country": "PH",                     // references lovType: COUNTRY
  "stateProvince": "NCR",              // references lovType: STATE_PROVINCE
  "city": "MAKATI",                    // references lovType: CITY
  
  // Employment LOVs
  "employmentStatus": "ACTIVE",        // references lovType: EMPLOYMENT_STATUS
  "employmentType": "FULL_TIME",       // references lovType: EMPLOYMENT_TYPE
  "department": "HR",                  // references lovType: DEPARTMENT
  "positionLevel": "MANAGER",          // references lovType: POSITION_LEVEL
  "shiftType": "MORNING",              // references lovType: SHIFT_TYPE
  "payFrequency": "BI_WEEKLY",         // references lovType: PAY_FREQUENCY

  // --- DATES (Format: YYYY-MM-DD) ---
  "birthDate": "1990-05-15",
  "dateHired": "2023-11-01"
}
```

### UpdateUserRequest Payload
When calling `PUT /api/users/{id}`, the structure is identical to `CreateUserRequest` but omits the `password` field (which is handled separately or not updated here).

### UserDTO Response
When calling `GET /api/users` or receiving responses from mutations, the backend returns the full `UserDTO`:

```json
{
  "id": "USR-12345...",
  "firstName": "Jane",
  "lastName": "Doe",
  "username": "janedoe",
  "email": "jane@example.com",
  "roleName": "EMPLOYEE",
  "phoneNumber": "+639123456789",
  "address": "123 Main St",
  "salutation": "MS",
  "civilStatus": "SINGLE",
  "gender": "FEMALE",
  "nationality": "FILIPINO",
  "country": "PH",
  "stateProvince": "NCR",
  "city": "MAKATI",
  "employmentStatus": "ACTIVE",
  "employmentType": "FULL_TIME",
  "department": "HR",
  "positionLevel": "MANAGER",
  "shiftType": "MORNING",
  "payFrequency": "BI_WEEKLY",
  "birthDate": "1990-05-15",
  "dateHired": "2023-11-01",
  "createdAt": "2026-06-18T10:00:00",
  "updatedAt": "2026-06-18T10:00:00"
}
```

---

## 3. UI Implementation Guide for Frontend Agent

1. **Fetching Dropdown Options:**
   To populate the dropdowns in the User form, make `GET` requests to the LOV API.
   - Example: `GET /api/lov?type=DEPARTMENT`
   - Example: `GET /api/lov?type=GENDER`

2. **Handling Hierarchical Dropdowns (Cascading):**
   - **Country Selection:** Fetch all countries via `GET /api/lov?type=COUNTRY`. When the user selects a country (e.g., `"PH"`), store this key.
   - **State Selection:** Fetch states for that country via `GET /api/lov?type=STATE_PROVINCE&parentKey=PH`.
   - **City Selection:** Since cities in our data script are currently parented directly to the Country (e.g. `parentKey=PH`), fetch cities via `GET /api/lov?type=CITY&parentKey=PH`. 

3. **Data Binding:**
   Always bind the HTML `<select>` option value to the `lovKey` (e.g., `MALE`), while displaying the `lovValue` (e.g., `Male`) to the user.
