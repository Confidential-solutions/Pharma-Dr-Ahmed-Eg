import { supabase } from "@/lib/supabase";

export interface UploadResult {
  url: string;
  path: string;
}

export const storageService = {
  /**
   * Upload prescription image to Supabase Storage bucket.
   * Defaults to bucket 'prescriptions', falls back to public url generation.
   */
  async uploadPrescriptionImage(
    file: File,
    bucketName: string = "prescriptions"
  ): Promise<UploadResult> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    return {
      url: data.publicUrl,
      path: filePath,
    };
  },
};

