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
interface GuestUserResponse {
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
      return await axios.post("/api/v1/user/signup", {
        fullName,
        username,
        email,
        gender,
        password: createPassword,
      });
    } catch (error: any) {
      console.error(
        `[Signup Error]: ${error.response?.data?.message || error.message}`
      );
      throw new Error(
        error.response?.data?.message || "An error occurred during signup."
      );
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
      console.error(
        `[Login Error]: ${error.response?.data?.message || error.message}`
      );
      throw new Error(
        error.response?.data?.message || "An error occurred during login."
      );
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
      console.error(
        `[Logout Error]: ${error.response?.data?.message || error.message}`
      );
      throw new Error(
        error.response?.data?.message || "An error occurred during logout."
      );
    }
  }

  // Get current user method
  async getUser(): Promise<AxiosResponse<UserResponse>> {
    try {
      const response = await axios.get<UserResponse>(
        "/api/v1/user/current-user",
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error: any) {
      console.error(
        `[Get User Error]: ${error.response?.data?.message || error.message}`
      );
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching user data."
      );
    }
  }

  // Create Guest User
  async createGuestUser(): Promise<
    AxiosResponse<GuestUserResponse>
  > {
    try {
      const response = await axios.post<GuestUserResponse>(
        "/api/v1/user/guest/signup",
        {}
      );
      return response;
    } catch (error: any) {
      console.error(
        `[Guest User Creation Error]: ${
          error.response?.data?.message || error.message
        }`
      );
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while creating a guest user."
      );
    }
  }

  // Upgrade Guest User
  async upgradeGuestUser({
    email,
    password,
    fullName,
    username,
    token,
  }: {
    email: string;
    password: string;
    fullName?: string;
    username?: string;
    token: string; // Guest user's authentication token
  }): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.post(
        "/api/v1/user/guest/upgrade",
        { email, password, fullName, username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error: any) {
      console.error(
        `[Upgrade Guest Error]: ${
          error.response?.data?.message || error.message
        }`
      );
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while upgrading the guest user."
      );
    }
  }
}

export const Auth = new _Auth();
