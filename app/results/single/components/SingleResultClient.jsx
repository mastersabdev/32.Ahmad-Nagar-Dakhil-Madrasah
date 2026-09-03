"use client";

import { useEffect, useMemo, useState } from "react";
import { FiPrinter, FiSearch } from "react-icons/fi";
import StudentMarksheetPrintView from "./StudentMarksheetPrintView";
import { buildMarksheetPrintFileName } from "@/lib/buildMarksheetRows";
import {
  fetchStudentResult,
  fetchStudentResultFilters,
} from "@/services/exam-result";

const inputClassName =
  "w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-none focus:border-primary-300 focus:bg-white duration-300 transition";

const printStyles = `
  @media print {
    body.printing-student-result > *:not(#student-result-print-wrapper) {
      display: none !important;
    }

    #student-result-print-wrapper {
      display: block !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      border: none !important;
      box-shadow: none !important;
    }

    #student-result-print-wrapper,
    #student-result-print-wrapper * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    #student-result-print-wrapper .marksheet-print-root {
      padding: 0 !important;
      margin: 0 !important;
    }

    #student-result-print-wrapper .marksheet-print-surface {
      padding: 0 !important;
    }

    #student-result-print-wrapper .marksheet-marks-head th {
      background-color: #e4f2ff !important;
    }

    #student-result-print-wrapper .marksheet-marks-foot td {
      background-color: #edf8ea !important;
    }

    #student-result-print-wrapper .marksheet-grading-head th {
      background-color: #f3f4f6 !important;
    }
  }
`;

export default function SingleResultClient({ assetBaseUrl }) {
  const [studentId, setStudentId] = useState("");
  const [resolvedStudentId, setResolvedStudentId] = useState("");
  const [filters, setFilters] = useState(null);
  const [academicYear, setAcademicYear] = useState("");
  const [examConfigurationId, setExamConfigurationId] = useState("");
  const [resultData, setResultData] = useState(null);

  const [lookupLoading, setLookupLoading] = useState(false);
  const [resultLoading, setResultLoading] = useState(false);
  const [lookupError, setLookupError] = useState(null);
  const [resultError, setResultError] = useState(null);

  const examOptions = useMemo(() => {
    if (!filters || !academicYear) {
      return [];
    }
    return filters.exam_configs_by_year?.[String(academicYear)] ?? [];
  }, [filters, academicYear]);

  useEffect(() => {
    if (!examConfigurationId && examOptions.length === 1) {
      setExamConfigurationId(String(examOptions[0].exam_configuration_id));
    }
  }, [examOptions, examConfigurationId]);

  const handleLookup = async (event) => {
    event.preventDefault();

    const trimmedStudentId = studentId.trim();
    if (!trimmedStudentId) {
      return;
    }

    setLookupLoading(true);
    setLookupError(null);
    setResultError(null);
    setResultData(null);
    setFilters(null);
    setAcademicYear("");
    setExamConfigurationId("");
    setResolvedStudentId(trimmedStudentId);

    try {
      const result = await fetchStudentResultFilters(trimmedStudentId);

      if (!result?.ok) {
        setLookupError(result?.message || "শিক্ষার্থী খুঁজে পাওয়া যায়নি");
        return;
      }

      setFilters(result.data);

      const defaultYear = result.data?.years?.[0]?.id;
      if (defaultYear) {
        setAcademicYear(String(defaultYear));
      }
    } catch (error) {
      setLookupError(error?.message || "শিক্ষার্থী খুঁজে পাওয়া যায়নি");
    } finally {
      setLookupLoading(false);
    }
  };

  const handleViewResult = async (event) => {
    event.preventDefault();

    if (!resolvedStudentId || !academicYear || !examConfigurationId) {
      return;
    }

    setResultLoading(true);
    setResultError(null);

    try {
      const result = await fetchStudentResult(
        resolvedStudentId,
        Number(academicYear),
        Number(examConfigurationId),
      );

      if (!result?.ok) {
        setResultData(null);
        setResultError(result?.message || "ফলাফল পাওয়া যায়নি");
        return;
      }

      setResultData(result.data);
    } catch (error) {
      setResultData(null);
      setResultError(error?.message || "ফলাফল পাওয়া যায়নি");
    } finally {
      setResultLoading(false);
    }
  };

  const handlePrint = () => {
    const printableContent = document.querySelector(
      "#single-result-printable-card .marksheet-print-root",
    );
    if (!printableContent) {
      return;
    }

    const existingWrapper = document.getElementById("student-result-print-wrapper");
    if (existingWrapper) {
      existingWrapper.remove();
    }

    const originalTitle = document.title;
    const wrapper = document.createElement("div");
    wrapper.id = "student-result-print-wrapper";
    wrapper.innerHTML = printableContent.outerHTML;

    document.body.appendChild(wrapper);
    document.body.classList.add("printing-student-result");
    document.title = resultData
      ? buildMarksheetPrintFileName(resultData)
      : "Exam_Result";

    const cleanup = () => {
      document.body.classList.remove("printing-student-result");
      wrapper.remove();
      document.title = originalTitle;
      window.removeEventListener("afterprint", cleanup);
    };

    window.addEventListener("afterprint", cleanup);
    window.print();
  };

  return (
    <section className="container py-4">
      <style>{printStyles}</style>

      <header className="mb-4 gov-panel">
        <h1 className="gov-panel-header">একক ফলাফল</h1>
        <p className="px-3 pb-2 text-sm text-slate-600">
          শিক্ষার্থী আইডি, শিক্ষাবর্ষ ও পরীক্ষা নির্বাচন করে ফলাফল দেখুন ও প্রিন্ট করুন।
        </p>
      </header>

      <div className="page-card mb-6 print:hidden">
        <form className="grid gap-4 md:grid-cols-3" onSubmit={handleLookup}>
          <div>
            <label htmlFor="student_id" className="mb-2 block text-slate-700">
              শিক্ষার্থী আইডি *
            </label>
            <input
              id="student_id"
              name="student_id"
              type="text"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
              className={inputClassName}
              placeholder="শিক্ষার্থী আইডি লিখুন"
              required
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={lookupLoading}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-medium shadow-sm transition duration-300 ${
                lookupLoading
                  ? "cursor-not-allowed bg-slate-300 text-slate-500"
                  : "bg-primary-600 text-white hover:bg-primary-700"
              }`}
            >
              <FiSearch />
              {lookupLoading ? "খোঁজা হচ্ছে..." : "খুঁজুন"}
            </button>
          </div>
        </form>
      </div>

      {lookupError ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {lookupError}
        </div>
      ) : null}

      {filters ? (
        <div className="page-card mb-6 print:hidden">
          <form
            className="grid gap-4 md:grid-cols-3"
            onSubmit={handleViewResult}
          >
            <div>
              <label htmlFor="academic_year" className="mb-2 block text-slate-700">
                শিক্ষাবর্ষ *
              </label>
              <select
                id="academic_year"
                value={academicYear}
                onChange={(event) => {
                  setAcademicYear(event.target.value);
                  setExamConfigurationId("");
                }}
                className={inputClassName}
                required
              >
                <option value="">শিক্ষাবর্ষ নির্বাচন করুন</option>
                {(filters.years || []).map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="exam_configuration_id" className="mb-2 block text-slate-700">
                পরীক্ষার নাম *
              </label>
              <select
                id="exam_configuration_id"
                value={examConfigurationId}
                onChange={(event) => setExamConfigurationId(event.target.value)}
                className={inputClassName}
                required
                disabled={!academicYear}
              >
                <option value="">পরীক্ষা নির্বাচন করুন</option>
                {examOptions.map((exam) => (
                  <option
                    key={exam.exam_configuration_id}
                    value={exam.exam_configuration_id}
                  >
                    {exam.exam_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-3">
              <button
                type="submit"
                disabled={resultLoading}
                className={`rounded-xl px-5 py-2.5 font-medium shadow-sm transition duration-300 ${
                  resultLoading
                    ? "cursor-not-allowed bg-slate-300 text-slate-500"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                }`}
              >
                {resultLoading ? "লোড হচ্ছে..." : "ফলাফল দেখুন"}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                disabled={!resultData}
                className={`inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 font-medium transition duration-300 ${
                  resultData
                    ? "border-primary-200 bg-white text-primary-700 hover:bg-primary-50"
                    : "cursor-not-allowed border-slate-200 text-slate-400"
                }`}
              >
                <FiPrinter />
                প্রিন্ট
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {resultError ? (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
          {resultError}
        </div>
      ) : null}

      {resultData ? (
        <div
          id="single-result-printable-card"
          className="page-card overflow-x-auto print:border-0 print:shadow-none print:p-0"
        >
          <StudentMarksheetPrintView data={resultData} assetBaseUrl={assetBaseUrl} />
        </div>
      ) : null}

      {!filters && !lookupLoading && !lookupError ? (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-600">
          শিক্ষার্থী আইডি লিখে খুঁজুন বাটনে ক্লিক করুন।
        </div>
      ) : null}
    </section>
  );
}
