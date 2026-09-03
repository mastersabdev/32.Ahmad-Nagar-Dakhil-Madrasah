"use client";

import {
  buildMarksheetDisplayRows,
  formatMarkValue,
  formatSubjectName,
  getActiveShortCodeColumns,
  getShortCodeValueForRow,
} from "@/lib/buildMarksheetRows";
import { resolveAssetUrl, resolveSchoolLogoUrl } from "@/lib/resolveAssetUrl";

const marksTableHeadBg = "#e4f2ff";
const marksTableFootBg = "#edf8ea";
const gradingScaleHeadBg = "#f3f4f6";

const thClass =
  "border border-black px-2 py-1.5 text-center text-xs font-bold text-black";
const tdClass = "border border-black px-2 py-1.5 text-center text-xs text-black";

function formatGpa(value) {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return "-";
  }
  return Number(value).toFixed(2);
}

function InfoRow({ label, value }) {
  return (
    <tr>
      <td className="w-28 whitespace-nowrap py-0.5 pr-2 text-gray-900">{label}</td>
      <td className="w-2 px-0 text-center text-gray-400">:</td>
      <td className="py-0.5 font-medium text-gray-900">{value || "-"}</td>
    </tr>
  );
}

export default function StudentMarksheetPrintView({ data, assetBaseUrl }) {
  const displayRows = buildMarksheetDisplayRows(data);
  const shortCodeColumns = getActiveShortCodeColumns(data, displayRows);
  const shortCodeColSpan = Math.max(shortCodeColumns.length, 1);
  const schoolLogo = resolveSchoolLogoUrl(data.school?.logo, assetBaseUrl);
  const studentImage = resolveAssetUrl(data.student?.image, assetBaseUrl, {
    defaultFolder: "users",
  });

  return (
    <div className="marksheet-print-root bg-white p-4 text-sm text-gray-900 print:p-0">
      <div className="marksheet-print-surface p-4">
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td colSpan={3} className="pb-1 text-center">
                <h1 className="m-0 w-full text-xl font-semibold text-gray-900">
                  {data.school?.name || "School"}
                </h1>
              </td>
            </tr>
            <tr>
              <td className="w-[18%] align-top">
                {studentImage ? (
                  <img
                    src={studentImage}
                    alt="Student"
                    className="h-20 w-20 border border-gray-200 object-cover object-top"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : null}
              </td>
              <td className="align-top px-2 text-center">
                {data.school?.address ? (
                  <p className="m-0 text-sm text-gray-900">{data.school.address}</p>
                ) : null}
                {schoolLogo ? (
                  <div className="my-1.5 flex justify-center">
                    <img
                      src={schoolLogo}
                      alt="School Logo"
                      className="max-h-12 max-w-12 object-contain"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                ) : null}
                <p className="m-0 mt-1.5 w-fit border-b border-blue-300 px-4 pb-px text-base font-medium text-gray-800 mx-auto">
                  Exam Result
                </p>
              </td>
              <td className="w-[18%] align-top">
                <table className="marksheet-grading-scale ml-auto w-[118px] border-collapse border border-gray-300 text-[9px] leading-tight">
                  <thead>
                    <tr className="marksheet-grading-head" style={{ backgroundColor: gradingScaleHeadBg }}>
                      <th className="border border-gray-700 px-0.5 py-px text-center font-medium">
                        Range
                      </th>
                      <th className="border border-gray-700 px-0.5 py-px text-center font-medium">
                        Grade
                      </th>
                      <th className="border border-gray-700 px-0.5 py-px text-center font-medium">
                        GPA
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.grading_scale || []).map((scale) => (
                      <tr key={`${scale.range}-${scale.grade}`}>
                        <td className="border border-gray-700 px-0.5 py-px text-center">
                          {scale.range}
                        </td>
                        <td className="border border-gray-700 px-0.5 py-px text-center">
                          {scale.grade}
                        </td>
                        <td className="border border-gray-700 px-0.5 py-px text-center">
                          {scale.point}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="mt-4 w-full border-collapse">
          <tbody>
            <tr>
              <td className="w-1/2 align-top pr-4">
                <table className="w-full border-collapse">
                  <tbody>
                    <InfoRow label="Name of Student" value={data.student?.name} />
                    <InfoRow label="Mother's Name" value={data.student?.mother_name} />
                    <InfoRow label="Student ID" value={data.student?.student_id} />
                    <InfoRow label="Class" value={data.student?.class_name} />
                    <InfoRow label="Roll No." value={data.student?.roll} />
                  </tbody>
                </table>
              </td>
              <td className="w-1/2 align-top">
                <table className="w-full border-collapse">
                  <tbody>
                    <InfoRow label="Father's Name" value={data.student?.father_name} />
                    <InfoRow label="Exam" value={data.exam_config?.exam_name} />
                    <InfoRow label="Year/Session" value={data.academic_year_label} />
                    <InfoRow label="Group" value={data.student?.group_name} />
                    <InfoRow label="Section" value={data.student?.section_name} />
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="marksheet-marks-table mt-4 w-full table-fixed border-collapse border border-black text-xs">
          <thead>
            <tr className="marksheet-marks-head" style={{ backgroundColor: marksTableHeadBg }}>
              <th rowSpan={2} className={`${thClass} w-[24%] text-left`}>
                Name of Subjects
              </th>
              <th rowSpan={2} className={`${thClass} w-[8%]`}>
                Full Marks
              </th>
              <th colSpan={shortCodeColSpan} className={thClass}>
                Obtaining Marks
              </th>
              <th rowSpan={2} className={`${thClass} w-[8%]`}>
                Total Marks
              </th>
              <th rowSpan={2} className={`${thClass} w-[9%]`}>
                Letter Grade
              </th>
              <th rowSpan={2} className={`${thClass} w-[9%]`}>
                Grade Point
              </th>
            </tr>
            <tr className="marksheet-marks-head" style={{ backgroundColor: marksTableHeadBg }}>
              {shortCodeColumns.length > 0 ? (
                shortCodeColumns.map((column) => (
                  <th key={column.slot} className={thClass}>
                    {column.label}
                  </th>
                ))
              ) : (
                <th className={thClass}>-</th>
              )}
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row) => (
              <tr key={row.key}>
                <td className={`${tdClass} text-left font-bold`}>
                  {formatSubjectName(row.subject_name, row.is_optional)}
                </td>
                <td className={tdClass}>{formatMarkValue(row.full_mark)}</td>
                {shortCodeColumns.length > 0 ? (
                  shortCodeColumns.map((column) => (
                    <td key={`${row.key}-sc-${column.slot}`} className={tdClass}>
                      {formatMarkValue(getShortCodeValueForRow(row, column.slot))}
                    </td>
                  ))
                ) : (
                  <td className={tdClass}>-</td>
                )}
                <td className={tdClass}>{formatMarkValue(row.total_score)}</td>
                {row.show_grade_cell ? (
                  <>
                    <td
                      rowSpan={row.grade_rowspan}
                      className={`${tdClass} align-middle font-bold`}
                    >
                      {row.letter_grade || "-"}
                    </td>
                    <td
                      rowSpan={row.grade_rowspan}
                      className={`${tdClass} align-middle font-bold`}
                    >
                      {formatMarkValue(row.grade_point)}
                    </td>
                  </>
                ) : null}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="marksheet-marks-foot font-bold" style={{ backgroundColor: marksTableFootBg }}>
              <td className={`${tdClass} text-left`}>Total Exam Marks</td>
              <td className={tdClass}>{formatMarkValue(data.result?.total_mark)}</td>
              <td colSpan={shortCodeColSpan} className={tdClass}>
                Obtained Marks &amp; GPA
              </td>
              <td className={tdClass}>{formatMarkValue(data.result?.obtain_mark)}</td>
              <td className={tdClass}>{data.result?.letter_grade || "-"}</td>
              <td className={tdClass}>
                {formatGpa(data.result?.avg_gpa_with_optional)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
