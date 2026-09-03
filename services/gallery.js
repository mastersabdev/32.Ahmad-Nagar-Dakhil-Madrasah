"use server";

const base_url = process.env.BASE_API_URL;
const school_id = process.env.SCHOOL_ID;

export const getGalleries = async (page = 1, limit = 8) => {
  const res = await fetch(
    `${base_url}/galleries/public/school/${school_id}?page=${page}&limit=${limit}`
  );
  const data = await res.json();
  return data;
};
