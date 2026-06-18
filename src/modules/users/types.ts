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
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber?: string;
  address?: string;
  roleName?: string;
}

export interface RoleDTO {
  id: number;
  name: string;
  description?: string;
}
