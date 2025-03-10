import axios, { AxiosResponse } from "axios";

interface FeedbackPayload {
  rating: number;
  comment: string;
}

interface UserResponse {
  success: boolean;
  data:any
}
interface RaiseSupportTicketPayload {
  ticketId: string;
  status:string;
}
class _HelpDesk { 

  // Get feedback testimonials method
  async getFeedbackAllFeedbacks(): Promise<AxiosResponse<UserResponse>> {
    try {
      const response = await axios.get<UserResponse>(
        "/api/v1/helpdesk/a/get-all-feedbacks",
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

  async changeTicketState({
      ticketId,
      status
  }: RaiseSupportTicketPayload): Promise<AxiosResponse<any>> {
    try {
      return await axios.put(`/api/v1/helpdesk/a/change-ticket-state/${ticketId}`, {
        status
      });
    } catch (error: any) {
      console.error(
        `[Support Ticket Error]: ${
          error.response?.data?.message || "Failed to change a support ticket state."
        }`
      );
      throw new Error(
        error.response?.data?.message ||
          "Something went wrong while updating support ticket. Please try again later."
      );
    }
  }
  async getMyAllTickets(): Promise<AxiosResponse<any>> {
    try {
      return await axios.get("/api/v1/helpdesk/a/get-all-support-tickets");
    } catch (error: any) {
      console.error(
        `[Fetch Tickets Error]: ${
          error.response?.data?.message || "Unable to retrieve tickets."
        }`
      );
      throw new Error(
        error.response?.data?.message ||
          "Something went wrong while fetching tickets. Please try again later."
      );
    }
  }
}

export const HelpDesk = new _HelpDesk();
