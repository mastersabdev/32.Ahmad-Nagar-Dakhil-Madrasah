"use server";

const base_url = process.env.BASE_API_URL;
const school_id = process.env.SCHOOL_ID;

export const getHeader = async () => {
  try {
    const res = await fetch(`${base_url}/headers/public/school/${school_id}`);
    const data = await res.json();
    return data?.item;
  } catch (error) {
    console.error("Error fetching header:", error);
    return null;
  }
};

export const getFooter = async () => {
  const res = await fetch(`${base_url}/footers/public/school/${school_id}`);
  const data = await res.json();
  return data?.item;
};

export const getSliderImages = async () => {
  const res = await fetch(
    `${base_url}/slider-images/public/school/${school_id}`
  );
  const data = await res.json();
  return data?.item;
};

export const getWelcomeSpeeches = async () => {
  const res = await fetch(
    `${base_url}/welcome-speeches/public/school/${school_id}`
  );
  const data = await res.json();
  return data?.item;
};

export const getNotices = async () => {
  const res = await fetch(`${base_url}/notices/public/school/${school_id}`, {
    next: {
      revalidate: 60, // Revalidate every 60 seconds
    },
  });
  const data = await res.json();
  return data?.item;
};

export const getTeachers = async () => {
  const res = await fetch(`${base_url}/teachers/public/school/${school_id}`);
  const data = await res.json();
  return data?.item;
};

export const getImportantLinks = async () => {
  const res = await fetch(
    `${base_url}/important-links/public/school/${school_id}`
  );
  const data = await res.json();
  return data?.item;
};
