export interface UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roleName: string;
  createdAt?: string;
  updatedAt?: string;
  // Local/UI extended fields
  phoneNumber?: string;
  address?: string;
  status?: 'ACTIVE' | 'LOCKED';

  // Demographic / LOV Fields
  salutation?: string;
  civilStatus?: string;
  gender?: string;
  nationality?: string;
  
  // Geographic / LOV Fields
  country?: string;
  stateProvince?: string;
  city?: string;

  // Employment / LOV Fields
  employmentStatus?: string;
  employmentType?: string;
  department?: string;
  positionLevel?: string;
  shiftType?: string;
  payFrequency?: string;

  // Dates
  birthDate?: string;
  dateHired?: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  roleName?: string;

  salutation?: string;
  civilStatus?: string;
  gender?: string;
  nationality?: string;
  country?: string;
  stateProvince?: string;
  city?: string;
  employmentStatus?: string;
  employmentType?: string;
  department?: string;
  positionLevel?: string;
  shiftType?: string;
  payFrequency?: string;
  birthDate?: string;
  dateHired?: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber?: string;
  address?: string;
  roleName?: string;

  salutation?: string;
  civilStatus?: string;
  gender?: string;
  nationality?: string;
  country?: string;
  stateProvince?: string;
  city?: string;
  employmentStatus?: string;
  employmentType?: string;
  department?: string;
  positionLevel?: string;
  shiftType?: string;
  payFrequency?: string;
  birthDate?: string;
  dateHired?: string;
}

export interface RoleDTO {
  id: number;
  name: string;
  description?: string;
}

export interface LovDTO {
  id?: string | number;
  lovType: string;
  lovKey: string;
  lovValue: string;
  parentKey?: string;
}

