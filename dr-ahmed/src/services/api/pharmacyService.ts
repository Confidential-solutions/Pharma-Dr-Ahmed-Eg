import { apiClient } from "./client";
import type { PharmacyInfoDto, PharmacyServiceDto, OperatingHourItem } from "@/types/api";

export const pharmacyService = {
  async getInfo(): Promise<PharmacyInfoDto> {
    const res = await apiClient<PharmacyInfoDto>("pharmacy/info");
    if (!res.data) throw new Error("Failed to load pharmacy details");
    return res.data;
  },

  async getHours(): Promise<OperatingHourItem[]> {
    const res = await apiClient<OperatingHourItem[]>("pharmacy/hours");
    return res.data ?? [];
  },

  async getServices(): Promise<PharmacyServiceDto[]> {
    const res = await apiClient<PharmacyServiceDto[]>("services");
    return res.data ?? [];
  },
};

