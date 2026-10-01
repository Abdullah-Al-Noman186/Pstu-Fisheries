import Alumni from "@/models/Alumni";
import Student from "@/models/Student";

const values = (value: string) => {
  const unpadded = value.replace(/^0+/, "") || "0";
  return Array.from(new Set([value, unpadded, Number(value)]));
};

const queryFor = (studentId: string, regNo: string) => ({
  $and: [
    { $or: ["studentId", "id_no", "student_id"].map((key) => ({ [key]: { $in: values(studentId) } })) },
    { $or: ["regNo", "reg_no", "registration_no"].map((key) => ({ [key]: { $in: values(regNo) } })) },
  ],
});

export async function findPstuRecord(studentIdInput: string, regNoInput: string) {
  const studentId = studentIdInput.trim().padStart(7, "0");
  const regNo = regNoInput.trim().padStart(5, "0");
  if (!/^\d{7}$/.test(studentId) || !/^\d{5}$/.test(regNo)) return null;

  const alumni = await Alumni.collection.findOne(queryFor(studentId, regNo));
  if (alumni) return { kind: "alumni" as const, record: alumni };
  const student = await Student.collection.findOne(queryFor(studentId, regNo));
  if (student) return { kind: "student" as const, record: student };
  return null;
}
