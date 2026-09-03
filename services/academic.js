"use server";

const base_url = process.env.BASE_API_URL;
const school_id = process.env.SCHOOL_ID;

export const getManagingCommittees = async () => {
  const res = await fetch(
    `${base_url}/managing-committees/public/school/${school_id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch committees");
  }
  const data = await res.json();
  return data?.item;
};

export const classRoutines = async () => {
  const res = await fetch(
    `${base_url}/class-routines/public/school/${school_id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch class routines");
  }
  const data = await res.json();
  return data?.item;
};

export const getStudentSummary = async (page = 1, limit = 8) => {
  const res = await fetch(
    `${base_url}/student-summary/public/school/${school_id}?page=${page}&limit=${limit}`
  );
  const data = await res.json();
  return data;
};
