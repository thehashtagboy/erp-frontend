import { apiClient } from "../../app/apiClient";
import type { UserDTO, CreateUserRequest, UpdateUserRequest, RoleDTO } from "./types";

export const fetchUsers = async (): Promise<UserDTO[]> => {
  const response = await apiClient.get<UserDTO[]>("/api/users");
  return response.data;
};

export const fetchUserById = async (id: string): Promise<UserDTO> => {
  const response = await apiClient.get<UserDTO>(`/api/users/${id}`);
  return response.data;
};

export const createUser = async (data: CreateUserRequest): Promise<UserDTO> => {
  const response = await apiClient.post<UserDTO>("/api/users", data);
  return response.data;
};

export const updateUser = async (id: string, data: UpdateUserRequest): Promise<UserDTO> => {
  const response = await apiClient.put<UserDTO>(`/api/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/users/${id}`);
};

export const fetchRoles = async (): Promise<RoleDTO[]> => {
  const response = await apiClient.get<RoleDTO[]>("/api/roles");
  return response.data;
};
