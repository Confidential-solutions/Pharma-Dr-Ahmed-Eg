import { apiClient } from "./client";
import type { CreateContactInquiryDto, ContactInquiryResponseDto } from "@/types/api";

export const contactService = {
  async submitInquiry(data: CreateContactInquiryDto): Promise<ContactInquiryResponseDto> {
    const res = await apiClient<ContactInquiryResponseDto>("contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.data) throw new Error("Failed to submit contact message");
    return res.data;
  },
};

