import axios, { AxiosResponse } from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface UserStatsResponse {
  success: boolean;
  data: {
    _id: string;
    userId: string;
    userData: {
      _id: string;
      email: string;
      username: string;
    };
    changePassword: number;
    logins: number;
    logouts: number;
    passwordChanges: number;
    profileUpdates: number;
    refreshAccessToken: number;
    requests: number;
  };
  message: string;
}

// Interface for getUserActiveHistory response
interface AppActivityHistoryResponse {
  success: boolean;
  data: Array<{
    totalRequestsToday: number;
    totalUsers: number;
    newUsers: number;
    adminCount: number;
    date: string;
  }>;
  message: string;
}

interface UserResponse {
  success: boolean;
  data: {
    user: any;
  };
}

class _Auth {
  // Signup method
  async signup({
    fullName,
    username,
    email,
    gender,
    createPassword,
  }: {
    fullName: string;
    username: string;
    email: string;
    gender: string;
    createPassword: string;
  }): Promise<AxiosResponse<any>> {
    try {
      return await axios.post("/api/v1/user/register", {
        fullName,
        username,
        email,
        gender,
        password: createPassword,
      });
    } catch (error: any) {
      console.error(`[Signup Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred during signup.");
    }
  }

  // Login method
  async loginToAccount({
    email,
    password,
  }: LoginPayload): Promise<AxiosResponse<LoginResponse>> {
    try {
      const response = await axios.post<LoginResponse>(
        "/api/v1/user/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error: any) {
      console.error(`[Login Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred during login.");
    }
  }

  // Logout method
  async logout(): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.post(
        "/api/v1/user/logout",
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error: any) {
      console.error(`[Logout Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred during logout.");
    }
  }

  // Get current user method
  async getUser() {
    try {
      const response = await axios.get<UserResponse>("/api/v1/user/current-user", {
        headers: { "Content-Type": "application/json" },
      });
      return response?.data;
    } catch (error: any) {
      console.error(`[Get User Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while fetching user data.");
    }
  }
  async getAllUsers() {
    try {
      const response = await axios.get<any>("/api/v1/user/get-all-users", {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error: any) {
      console.error(`[Get User Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while fetching users data.");
    }
  }
  
  async getUserById({userId}:{userId:string}) {
    try {
      const response = await axios.get<any>(`/api/v1/user/get-user-by-id/${userId}`, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error: any) {
      console.error(`[Get User Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while fetching users data.");
    }
  }

  async blockUser({payload}:{payload:{
    blockType:"ONE_MONTH"| "THREE_MONTHS"| "ONE_YEAR"| "PERMANENT";
    userId:string;
  }}) {
    try { 
      const response = await axios.post(`/api/v1/user/block-user/${payload.userId}`,{blockType:payload.blockType}, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error: any) {
      console.error(`[Get User Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while fetching users data.");
    }
  }

  async unblockUser({userId}:{userId:string}) {
    try {
      const response = await axios.post(`/api/v1/user/unblock-user/${userId}`,{
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error: any) {
      console.error(`[Get User Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while fetching users data.");
    }
  }

  async checkBlockedStatus({userId}:{userId:string}) {
    try {
      const response = await axios.get(`/api/v1/user/check-blocked-status/${userId}`,{
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error: any) {
      console.error(`[Get User Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while fetching users data.");
    }
  }

  async getUserStats({ credential }: { credential: string }): Promise<AxiosResponse<UserStatsResponse>> {
    try {
      const response = await axios.get<UserStatsResponse>(
        `/api/v1/user/get-user-stats/${credential}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error: any) {
      console.error(`[Get User Stats Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while fetching user stats.");
    }
  }

  // Get App Activity History service
  async getAppActivityHistory({ duration }: { duration: number }): Promise<AxiosResponse<AppActivityHistoryResponse>> {
    try {
      const response = await axios.get<AppActivityHistoryResponse>(
        `/api/v1/user/get-app-activity-history/${duration}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error: any) {
      console.error(`[Get App Activity History Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while fetching app activity history.");
    }
  }
}

export const Auth = new _Auth();

