"use client";

import { createContactUs } from "@/services/contact-us";
import { useState } from "react";

const ContactForm = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await createContactUs(formData);
      if (response?.success) {
        setSuccess(true);
        form.reset();
      }
    } catch (error) {
      setError(error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="text-red-500 mb-4 p-3 rounded-xl bg-red-50 border border-red-100">
          একটি সমস্যা হয়েছে: {error?.message}
        </div>
      )}
      <form className="space-y-5" onSubmit={onSubmit}>
        {[
          { name: "name", label: "নাম *", type: "text" },
          { name: "email", label: "ইমেইল *", type: "email" },
          { name: "subject", label: "বিষয় *", type: "text" },
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-primary-800 font-medium mb-2">
              {label}
            </label>
            <input
              name={name}
              type={type}
              id={name}
              className="input-field"
              required
            />
          </div>
        ))}
        <div>
          <label htmlFor="message" className="block text-primary-800 font-medium mb-2">
            বার্তা *
          </label>
          <textarea
            name="message"
            id="message"
            rows="4"
            className="input-field resize-none"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-medium focus:outline-none duration-200 transition-all ${
            loading
              ? "bg-slate-300 cursor-not-allowed text-slate-500"
              : "btn-primary"
          }`}
        >
          {loading ? "পাঠানো হচ্ছে..." : "পাঠান"}
        </button>
      </form>
      {success && (
        <div className="text-primary-700 mt-4 p-3 rounded-xl bg-primary-50 border border-primary-200">
          আপনার বার্তা সফলভাবে পাঠানো হয়েছে!
        </div>
      )}
    </>
  );
};

export default ContactForm;
