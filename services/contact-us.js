"use server";

const base_url = process.env.BASE_API_URL;
const school_id = process.env.SCHOOL_ID;

export const createContactUs = async (formData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  try {
    const response = await fetch(
      `${base_url}/contact-us/public/${school_id}/create`,
      {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
