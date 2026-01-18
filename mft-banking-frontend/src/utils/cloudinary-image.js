import axios from "axios";

export const uploadImage = async (file) => {
  if (!file) {
    return null
  }
  try {
    const signatureResponse = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/user/cloudinary-signature"
    );
    const { timestamp, signature, apiKey, cloudName } =
      await signatureResponse.data;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", "secure_uploads");

    const uploadRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return await uploadRes.data;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
  }
};
