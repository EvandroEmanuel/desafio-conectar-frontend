import { fetchApi } from "@/lib/fetch-config";
import type { GetUsers, UserDto } from "@/types/global";

export const userService = {
  getUsers: async (): Promise<GetUsers> => {
    return fetchApi("/users");
  },

  getUserById: async (id: string): Promise<any> => {
    return fetchApi(`/users/${id}`);
  },

  createUser: async (data: UserDto) => {
    return fetchApi("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateUser: async (id: string, data: Partial<UserDto>) => {
    return fetchApi(`/users/${id}`, {
      method: "PATCh",
      body: JSON.stringify(data),
    });
  },

  deleteUser: async (id: string) => {
    return fetchApi(`/users/${id}`, {
      method: "DELETE",
    });
  },
};
