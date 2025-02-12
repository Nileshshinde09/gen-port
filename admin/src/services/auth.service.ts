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

  
}

export const Auth = new _Auth();
