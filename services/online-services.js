"use server";

const base_url = process.env.BASE_API_URL;
const school_id = process.env.SCHOOL_ID;

export const getOnlineServices = async (page = 1, limit = 8) => {
  const res = await fetch(
    `${base_url}/online-services/public/school/${school_id}`
  );
  const data = await res.json();
  return data?.item;
};
