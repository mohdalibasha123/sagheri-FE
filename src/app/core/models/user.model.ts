export interface UserListItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  isActive: boolean;
  roles: string[];
  createdAt: string;
}

export interface UserFilters {
  search?: string;
  isActive?: boolean;
  role?: string;
}
