import axios, { AxiosResponse } from "axios";

interface FeedbackPayload {
  rating: number;
  comment: string;
}

interface UserResponse {
  success: boolean;
  data: {
    user: any;
  };
}
interface RaiseSupportTicketPayload {
  issueType: string;
  description: string;
}
class _HelpDesk {
  async sendFeedback({
    rating,
    comment,
  }: FeedbackPayload): Promise<AxiosResponse<any>> {
    try {
      return await axios.post("/api/v1/helpdesk/f/store-user-feedback", {
        rating,
        comment,
      });
    } catch (error: any) {
      console.error(
        `[Feedback Submission Error]: ${
          error.response?.data?.message || "Failed to submit feedback."
        }`
      );
      throw new Error(
        error.response?.data?.message ||
          "Something went wrong while submitting feedback. Please try again later."
      );
    }
  }

  // Get feedback testimonials method
  async getFeedbackTestimonials(): Promise<AxiosResponse<UserResponse>> {
    try {
      const response = await axios.get<UserResponse>(
        "/api/v1/helpdesk/f/get-user-testimonials",
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error: any) {
      console.error(
        `[Fetch Feedback Error]: ${
          error.response?.data?.message || "Unable to retrieve feedback testimonials."
        }`
      );
      throw new Error(
        error.response?.data?.message ||
          "Something went wrong while fetching testimonials. Please try again later."
      );
    }
  }

  async raiseSupportTicket({
    issueType,
    description,
  }: RaiseSupportTicketPayload): Promise<AxiosResponse<any>> {
    try {
      return await axios.post("/api/v1/helpdesk/s/raise-support-ticket", {
        issueType,
        description,
      });
    } catch (error: any) {
      console.error(
        `[Support Ticket Error]: ${
          error.response?.data?.message || "Failed to raise a support ticket."
        }`
      );
      throw new Error(
        error.response?.data?.message ||
          "Something went wrong while raising your support ticket. Please try again later."
      );
    }
  }
}

export const HelpDesk = new _HelpDesk();
