import { apiClient } from "./client";
import type { CreatePrescriptionDto, PrescriptionResponseDto } from "@/types/api";

export const prescriptionService = {
  async submit(data: CreatePrescriptionDto): Promise<PrescriptionResponseDto> {
    const res = await apiClient<PrescriptionResponseDto>("prescriptions", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.data) throw new Error("Failed to submit prescription");
    return res.data;
  },

  async getById(id: string): Promise<PrescriptionResponseDto> {
    const res = await apiClient<PrescriptionResponseDto>(`prescriptions/${id}`);
    if (!res.data) throw new Error("Prescription not found");
    return res.data;
  },
};

