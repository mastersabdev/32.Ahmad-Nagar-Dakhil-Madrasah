"use client";

import { useEffect, useMemo, useState } from "react";
import { FiPrinter, FiSearch } from "react-icons/fi";
import {
  fetchSectionWiseOptions,
  fetchSectionWiseResults,
} from "@/services/exam-result";

const inputClassName =
  "w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-none focus:border-primary-300 focus:bg-white duration-300 transition";

const tableHeadClass =
  "border border-black bg-[#e4f2ff] px-3 py-2 text-left text-xs font-bold text-black";
const tableCellClass =
  "border border-black px-3 py-2 text-left text-xs text-black";

const printStyles = `
  @media print {
    body.printing-section-result > *:not(#section-result-print-wrapper) {
      display: none !important;
    }

    #section-result-print-wrapper {
      display: block !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    #section-result-print-wrapper,
    #section-result-print-wrapper * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    #section-result-print-wrapper .section-result-head th {
      background-color: #e4f2ff !important;
    }
  }
`;

function formatGpa(value) {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return "-";
  }
  return Number(value).toFixed(2);
}

function formatSectionLabel(section) {
  const className = section?.class_name || "";
  const sectionName = section?.section_name || "";
  if (className && sectionName) {
    return `${className} - ${sectionName}`;
  }
  return sectionName || className || "-";
}

export default function SectionResultClient() {
  const [options, setOptions] = useState(null);
  const [academicYear, setAcademicYear] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [examConfigurationId, setExamConfigurationId] = useState("");
  const [resultData, setResultData] = useState(null);

  const [optionsLoading, setOptionsLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [optionsError, setOptionsError] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const selectedSection = useMemo(() => {
    return (options?.sections || []).find(
      (section) => String(section.id) === String(sectionId),
    );
  }, [options, sectionId]);

  const examOptions = useMemo(() => {
    const exams = options?.exams || [];
    if (!selectedSection?.class_id) {
      return exams;
    }
    return exams.filter(
      (exam) => Number(exam.class_id) === Number(selectedSection.class_id),
    );
  }, [options, selectedSection]);

  useEffect(() => {
    let cancelled = false;

    async function loadOptions() {
      setOptionsLoading(true);
      setOptionsError(null);

      try {
        const result = await fetchSectionWiseOptions(academicYear || undefined);
        if (!cancelled) {
          if (!result?.ok) {
            setOptionsError(result?.message || "ফিল্টার অপশন লোড করা যায়নি");
            setOptions(null);
            return;
          }
          setOptions(result.data);
        }
      } catch (error) {
        if (!cancelled) {
          setOptionsError(error?.message || "ফিল্টার অপশন লোড করা যায়নি");
        }
      } finally {
        if (!cancelled) {
          setOptionsLoading(false);
        }
      }
    }

    loadOptions();

    return () => {
      cancelled = true;
    };
  }, [academicYear]);

  useEffect(() => {
    if (!examConfigurationId && examOptions.length === 1) {
      setExamConfigurationId(String(examOptions[0].exam_configuration_id));
    }
  }, [examOptions, examConfigurationId]);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!academicYear || !sectionId || !groupId || !examConfigurationId) {
      return;
    }

    setSearchLoading(true);
    setSearchError(null);

    try {
      const result = await fetchSectionWiseResults({
        academicYear,
        sectionId,
        groupId,
        examConfigurationId,
      });

      if (!result?.ok) {
        setResultData(null);
        setSearchError(result?.message || "ফলাফল পাওয়া যায়নি");
        return;
      }

      setResultData(result.data);
    } catch (error) {
      setResultData(null);
      setSearchError(error?.message || "ফলাফল পাওয়া যায়নি");
    } finally {
      setSearchLoading(false);
    }
  };

  const handlePrint = () => {
    const printableContent = document.querySelector(
      "#section-result-printable-card",
    );
    if (!printableContent) {
      return;
    }

    const existingWrapper = document.getElementById("section-result-print-wrapper");
    if (existingWrapper) {
      existingWrapper.remove();
    }

    const originalTitle = document.title;
    const wrapper = document.createElement("div");
    wrapper.id = "section-result-print-wrapper";
    wrapper.innerHTML = printableContent.innerHTML;

    document.body.appendChild(wrapper);
    document.body.classList.add("printing-section-result");
    document.title = resultData
      ? `Section_Result_${resultData.section_name || "result"}`
      : "Section_Result";

    const cleanup = () => {
      document.body.classList.remove("printing-section-result");
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
        <h1 className="gov-panel-header">শাখা ভিত্তিক ফলাফল</h1>
        <p className="px-3 pb-2 text-sm text-slate-600">
          শিক্ষাবর্ষ, শাখা, গ্রুপ ও পরীক্ষা নির্বাচন করে শাখার ফলাফল দেখুন।
        </p>
      </header>

      <div className="page-card mb-6 print:hidden">
        <form
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
          onSubmit={handleSearch}
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
                setResultData(null);
              }}
              className={inputClassName}
              required
              disabled={optionsLoading}
            >
              <option value="">শিক্ষাবর্ষ নির্বাচন করুন</option>
              {(options?.years || []).map((year) => (
                <option key={year.id} value={year.id}>
                  {year.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="section_id" className="mb-2 block text-slate-700">
              শাখা *
            </label>
            <select
              id="section_id"
              value={sectionId}
              onChange={(event) => {
                setSectionId(event.target.value);
                setExamConfigurationId("");
                setResultData(null);
              }}
              className={inputClassName}
              required
              disabled={optionsLoading}
            >
              <option value="">শাখা নির্বাচন করুন</option>
              {(options?.sections || []).map((section) => (
                <option key={section.id} value={section.id}>
                  {formatSectionLabel(section)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="group_id" className="mb-2 block text-slate-700">
              গ্রুপ *
            </label>
            <select
              id="group_id"
              value={groupId}
              onChange={(event) => {
                setGroupId(event.target.value);
                setResultData(null);
              }}
              className={inputClassName}
              required
              disabled={optionsLoading}
            >
              <option value="">গ্রুপ নির্বাচন করুন</option>
              {(options?.groups || []).map((group) => (
                <option key={group.id} value={group.id}>
                  {group.group_name}
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
              onChange={(event) => {
                setExamConfigurationId(event.target.value);
                setResultData(null);
              }}
              className={inputClassName}
              required
              disabled={optionsLoading || !academicYear}
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
              disabled={searchLoading || optionsLoading}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-medium shadow-sm transition duration-300 ${
                searchLoading || optionsLoading
                  ? "cursor-not-allowed bg-slate-300 text-slate-500"
                  : "bg-primary-600 text-white hover:bg-primary-700"
              }`}
            >
              <FiSearch />
              {searchLoading ? "খোঁজা হচ্ছে..." : "খুঁজুন"}
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

      {optionsError ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {optionsError}
        </div>
      ) : null}

      {searchError ? (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
          {searchError}
        </div>
      ) : null}

      {resultData ? (
        <div
          id="section-result-printable-card"
          className="page-card overflow-x-auto print:border-0 print:shadow-none print:p-0"
        >
          <div className="mb-4 text-center">
            <h2 className="m-0 text-lg font-semibold text-gray-900">
              Section Wise Exam Result
            </h2>
            <p className="mt-1 text-sm text-gray-700">
              {resultData.class_name ? `${resultData.class_name} - ` : ""}
              {resultData.section_name || "-"} | {resultData.group_name || "-"} |{" "}
              {resultData.exam_name || "-"} | {resultData.academic_year_label || "-"}
            </p>
          </div>

          <table className="section-result-table w-full min-w-[760px] border-collapse border border-black text-sm">
            <thead>
              <tr className="section-result-head">
                <th className={`${tableHeadClass} w-12 text-center`}>ক্রম</th>
                <th className={`${tableHeadClass} w-28`}>শিক্ষার্থী আইডি</th>
                <th className={tableHeadClass}>শিক্ষার্থীর নাম</th>
                <th className={`${tableHeadClass} w-20`}>রোল</th>
                <th className={`${tableHeadClass} w-24 text-center`}>মোট নম্বর</th>
                <th className={`${tableHeadClass} w-20 text-center`}>গ্রেড</th>
                <th className={`${tableHeadClass} w-16 text-center`}>জিপিএ</th>
                <th className={`${tableHeadClass} w-24 text-center`}>ফলাফল</th>
                <th className={`${tableHeadClass} w-28 text-center`}>অকৃতকার্য বিষয়</th>
              </tr>
            </thead>
            <tbody>
              {(resultData.students || []).length > 0 ? (
                resultData.students.map((student, index) => (
                  <tr key={student.result_id || `${student.student_id}-${index}`}>
                    <td className={`${tableCellClass} text-center`}>{index + 1}</td>
                    <td className={tableCellClass}>{student.student_id || "-"}</td>
                    <td className={tableCellClass}>{student.student_name || "-"}</td>
                    <td className={tableCellClass}>{student.roll || "-"}</td>
                    <td className={`${tableCellClass} text-center`}>
                      {student.total_marks ?? "-"}
                    </td>
                    <td className={`${tableCellClass} text-center`}>
                      {student.letter_grade || "-"}
                    </td>
                    <td className={`${tableCellClass} text-center`}>
                      {formatGpa(student.grading_point)}
                    </td>
                    <td className={`${tableCellClass} text-center`}>
                      {student.result_status || "-"}
                    </td>
                    <td className={`${tableCellClass} text-center`}>
                      {student.failed_subject_count ?? 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="border border-black px-3 py-6 text-center text-sm text-gray-600"
                  >
                    এই ফিল্টারে কোনো ফলাফল পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}

      {!resultData && !searchLoading && !optionsLoading && !optionsError ? (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-600 print:hidden">
          ফিল্টার নির্বাচন করে খুঁজুন বাটনে ক্লিক করুন।
        </div>
      ) : null}
    </section>
  );
}
