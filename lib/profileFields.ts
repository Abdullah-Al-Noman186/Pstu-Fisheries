export type Field = {
  key: string;
  label: string;
  section: string;
  type?: "text" | "textarea" | "date" | "select" | "tel" | "url";
  options?: string[];
  readOnly?: boolean;
};

export const FIELDS: Field[] = [
  { key: "name", label: "Name", section: "Identity", readOnly: true },
  { key: "id_no", label: "Student ID", section: "Identity", readOnly: true },
  { key: "reg_no", label: "Registration No", section: "Identity", readOnly: true },
  { key: "batch_session", label: "Session", section: "Identity", readOnly: true },
  { key: "email", label: "Account email", section: "Identity", type: "text", readOnly: true },
  { key: "status", label: "Profile status", section: "Identity", type: "select", options: ["current_student", "alumni"] },
  { key: "name_bn", label: "Name (Bangla)", section: "Personal" },
  { key: "gender", label: "Gender", section: "Personal", type: "select", options: ["Male", "Female", "Other"] },
  { key: "dob", label: "Date of birth", section: "Personal", type: "date" },
  { key: "permanent_address", label: "Permanent address", section: "Personal", type: "textarea" },
  { key: "phone", label: "Phone", section: "Contact", type: "tel" },
  { key: "alt_phone", label: "Alternative phone", section: "Contact", type: "tel" },
  { key: "contact", label: "Other contact", section: "Contact", type: "tel" },
  { key: "linkedin", label: "LinkedIn URL", section: "Contact", type: "url" },
  { key: "present_status", label: "Present status", section: "Work & study", type: "select", options: ["Job holder", "Job Seeker", "Higher Study", "Running Students"] },
  { key: "job_title", label: "Job title / position", section: "Work & study" },
  { key: "organization", label: "Organization / university", section: "Work & study" },
  { key: "location", label: "Work location", section: "Work & study" },
  { key: "degree", label: "Degree", section: "Work & study" },
  { key: "current_city", label: "Current city", section: "Work & study" },
  { key: "current_country", label: "Current country", section: "Work & study" },
  { key: "bio", label: "Bio", section: "About", type: "textarea" },
];
