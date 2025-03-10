import axios, { AxiosResponse } from "axios";

interface PortfolioResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface CreatePortfolioPayload {

  portfolioId: string;
  isDeployed: boolean;
  // Add other portfolio fields as needed
}

class _Portfolio {
  // Create new portfolio
  async createPortfolio(payload: CreatePortfolioPayload): Promise<AxiosResponse<PortfolioResponse>> {
    try {
      const response = await axios.post<PortfolioResponse>(
        "/api/v1/portfolio",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      return response;
    } catch (error: any) {
      console.error(
        `[Create Portfolio Error]: ${error.response?.data?.message || error.message}`
      );
      throw new Error(
        error.response?.data?.message || "An error occurred while creating portfolio."
      );
    }
  }

  // Get all portfolios for current user
  async getMyPortfolioList(): Promise<AxiosResponse<PortfolioResponse>> {
    try {
      const response = await axios.get<PortfolioResponse>(
        "/api/v1/portfolio/my-portfolios",
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error: any) {
      console.error(
        `[Get Portfolios Error]: ${error.response?.data?.message || error.message}`
      );
      throw new Error(
        error.response?.data?.message || "An error occurred while fetching portfolios."
      );
    }
  }

  // Get single portfolio by ID
  async getPortfolio(portfolioId: string): Promise<AxiosResponse<PortfolioResponse>> {
    try {
      const response = await axios.get<PortfolioResponse>(
        `/api/v1/portfolio/${portfolioId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error: any) {
      console.error(
        `[Get Portfolio Error]: ${error.response?.data?.message || error.message}`
      );
      throw new Error(
        error.response?.data?.message || "An error occurred while fetching portfolio."
      );
    }
  }

  // Get public portfolio using ID and access token
  async getPublicPortfolio(
    portfolioId: string,
    accessToken: string
  ): Promise<AxiosResponse<PortfolioResponse>> {
    try {
      const response = await axios.get<PortfolioResponse>(
        `/api/v1/portfolio/public/${portfolioId}/${accessToken}`
      );
      return response;
    } catch (error: any) {
      console.error(
        `[Get Public Portfolio Error]: ${error.response?.data?.message || error.message}`
      );
      throw new Error(
        error.response?.data?.message || "An error occurred while fetching public portfolio."
      );
    }
  }

  async getPortfolioPreview(
    _id:string
  ): Promise<AxiosResponse<PortfolioResponse>> {
    try {
      const response = await axios.get<PortfolioResponse>(
        `/api/v1/portfolio/preview/${_id}`
      );
      return response;
    } catch (error: any) {
      console.error(
        `[Get Public Portfolio Error]: ${error.response?.data?.message || error.message}`
      );
      throw new Error(
        error.response?.data?.message || "An error occurred while fetching public portfolio."
      );
    }
  }
  // Update portfolio
  async updatePortfolio(
    portfolioId: string,
    payload: Partial<CreatePortfolioPayload>
  ): Promise<AxiosResponse<PortfolioResponse>> {
    try {
      const response = await axios.patch<PortfolioResponse>(
        `/api/v1/portfolio/${portfolioId}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error: any) {
      console.error(
        `[Update Portfolio Error]: ${error.response?.data?.message || error.message}`
      );
      throw new Error(
        error.response?.data?.message || "An error occurred while updating portfolio."
      );
    }
  }

  // Delete portfolio
  async deletePortfolio(portfolioId: string): Promise<AxiosResponse<PortfolioResponse>> {
    try {
      const response = await axios.delete<PortfolioResponse>(
        `/api/v1/portfolio/${portfolioId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error: any) {
      console.error(
        `[Delete Portfolio Error]: ${error.response?.data?.message || error.message}`
      );
      throw new Error(
        error.response?.data?.message || "An error occurred while deleting portfolio."
      );
    }
  }
}

export const Portfolio = new _Portfolio(); 