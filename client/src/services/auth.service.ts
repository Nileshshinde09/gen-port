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
        `[Guest User Creation Error]: ${error.response?.data?.message || error.message
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
        `[Upgrade Guest Error]: ${error.response?.data?.message || error.message
        }`
      );
      throw new Error(
        error.response?.data?.message ||
        "An error occurred while upgrading the guest user."
      );
    }
  }
  async updateProfile(data: any): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.post(`/api/v1/user/update-profile`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error: any) {
      console.error(
        `[Update Profile Error]: ${error.response?.data?.message || error.message}`
      );
      throw new Error(
        error.response?.data?.message || "An error occurred while updating the profile."
      );
    }
  }

  async getRemoteUserById(id: string): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get(`/api/v1/user/remote-user/${id}`);
      return response;
    } catch (error: any) {
      console.error(`[Get Remote User Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while fetching the remote user.");
    }
  }
  async findUsersByUsername(username: string): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get(`/api/v1/user/find-users-by-username/${username}`);
      console.log(response)
      return response;
    } catch (error: any) {
      console.error(`[Find Users By Username Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while finding users by username.");
    }
  }
  async updateProfileImage(image: File): Promise<AxiosResponse<any>> {
    try {
      if(!image) throw new Error("Image is required");
      const formData = new FormData();
      formData.append("file", image);
      const response = await axios.post(
        "/api/v1/user/update-account-image",
        formData,
      );
      
      return response;
    } catch (error: any) {
      console.error(
        `[Update Profile Error]: ${error.response?.data?.message || error.message}`
      );
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while updating profile."
      );
    }
  }
  
  async generateOTP() {
    try {
      return await axios.post("/api/v1/user/generate-otp");
    } catch (error: any) {
      console.error(`[Generate OTP Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while generating OTP.");
    }
  }

  async validateOTP({otp}:{otp:string}) {
    try {
      return await axios.post("/api/v1/user/validate-otp",{otp} );  
    } catch (error: any) {
      console.error(`[Validate OTP Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while validating OTP.");
    }
  }

  async sendResetForgotPasswordEmail({email,passwordResetUrl}:{email:string,passwordResetUrl:string}) {
    try {
      return await axios.post("/api/v1/user/send-reset-forgot-password-email",{email,passwordResetUrl} );
    } catch (error: any) {
      console.error(`[Send Reset Forgot Password Email Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while sending reset forgot password email.");
    }
  }

  async resetForgotPassword({newPassword,token}:{newPassword:string,token:string}) {
    try {
      return await axios.post("/api/v1/user/reset-forgot-password",{newPassword}, {
        headers: { Authorization: `Bearer ${token}` }
      } );
    } catch (error: any) {
      console.error(`[Reset Forgot Password Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while resetting forgot password.");
    }
  }

  async resetForgotPasswordVerification({token}:{token:string}) {
    try {
      return await axios.post(
        "/api/v1/user/reset-forgot-password-page-verification",
        { token },
        {
          withCredentials: true,  
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error: any) {
      console.error(`[Reset Forgot Password Verification Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while verifying reset forgot password.");
    }
  }
  async changeCurrentPassword({oldPassword,newPassword}:{oldPassword:string,newPassword:string}){
    try {
        if (!newPassword || !oldPassword) throw new Error("Old password and new password are required");
        return await axios.post('/api/v1/user/change-password',
            {

                oldPassword, newPassword
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                }
            })
    } catch (error: any) {
      console.error(`[Change Password Error]: ${error.response?.data?.message || error.message}`);
      throw new Error(error.response?.data?.message || "An error occurred while changing password.");
    }
  }
}

export const Auth = new _Auth();
