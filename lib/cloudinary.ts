export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName   = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary env vars missing");
  }

  const formData = new FormData();
  formData.append("file",           file);
  formData.append("upload_preset",  uploadPreset);
  formData.append("folder",         "pstu-fisheries/profiles");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!response.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await response.json();
  // Let Cloudinary deliver a compressed, device-appropriate image instead of
  // serving the original upload bytes to every directory card.
  return data.secure_url.replace("/upload/", "/upload/f_auto,q_auto,c_limit,w_1600/");
}
