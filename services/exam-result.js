"use server";

const campusMasterBaseUrl = (process.env.CAMPUSMASTER_BASE_URL || "").replace(
  /\/$/,
  "",
);
const instituteId =
  process.env.INSTITUTE_ID || process.env.INSITUTE_ID || "";
const branchId = process.env.BRANCH_ID || "";

function buildExamResultPayload(body) {
  const payload = {
    institute_id: instituteId,
    ...body,
  };

  if (branchId) {
    payload.branch_id = Number(branchId);
  }

  return payload;
}

function failure(message) {
  return {
    ok: false,
    data: null,
    message: message || "Request failed",
  };
}

function success(data) {
  return {
    ok: true,
    data: data ?? null,
    message: null,
  };
}

async function postExamResult(path, body) {
  if (!campusMasterBaseUrl) {
    return failure("CAMPUSMASTER_BASE_URL is not configured");
  }

  if (!instituteId) {
    return failure("INSTITUTE_ID is not configured");
  }

  if (!branchId) {
    return failure("BRANCH_ID is not configured");
  }

  try {
    const response = await fetch(
      `${campusMasterBaseUrl}/api/exam-result/${path}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildExamResultPayload(body)),
        cache: "no-store",
      },
    );

    let json = null;
    try {
      json = await response.json();
    } catch {
      return failure(
        response.ok
          ? "Invalid response from server"
          : `Request failed (${response.status})`,
      );
    }

    if (!response.ok || json?.status === false) {
      return failure(json?.message || `Request failed (${response.status})`);
    }

    return success(json?.data);
  } catch (error) {
    return failure(error?.message || "Request failed");
  }
}

export async function fetchStudentResultFilters(studentId) {
  return postExamResult("filters", {
    student_id: String(studentId || "").trim(),
  });
}

export async function fetchStudentResult(
  studentId,
  academicYear,
  examConfigurationId,
) {
  return postExamResult("search", {
    student_id: String(studentId || "").trim(),
    academic_year: Number(academicYear),
    exam_configuration_id: Number(examConfigurationId),
  });
}

export async function fetchSectionWiseOptions(academicYear) {
  const body = {};

  if (academicYear) {
    body.academic_year = Number(academicYear);
  }

  return postExamResult("section-wise/options", body);
}

export async function fetchSectionWiseResults({
  academicYear,
  sectionId,
  groupId,
  examConfigurationId,
}) {
  return postExamResult("section-wise/results", {
    academic_year: Number(academicYear),
    section_id: Number(sectionId),
    group_id: Number(groupId),
    exam_configuration_id: Number(examConfigurationId),
  });
}
