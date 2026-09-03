"use server";

const base_url = process.env.BASE_API_URL;
const school_id = process.env.SCHOOL_ID;

export const getAboutUs = async () => {
  const res = await fetch(`${base_url}/about-us/public/school/${school_id}`);
  const data = await res.json();
  return data?.item;
};