function normalizeMergedResults(mergedResults) {
  if (!mergedResults) {
    return [];
  }

  if (Array.isArray(mergedResults)) {
    return mergedResults;
  }

  return Object.values(mergedResults);
}

function resolveSubjectConfigs(configs, groupId) {
  const configsBySubject = new Map();

  configs.forEach((config) => {
    const existing = configsBySubject.get(config.subject_id) ?? [];
    existing.push(config);
    configsBySubject.set(config.subject_id, existing);
  });

  const resolved = [];

  configsBySubject.forEach((group) => {
    const groupMatch =
      groupId != null
        ? group.find((config) => config.group_id === groupId)
        : undefined;
    const nullMatch = group.find((config) => config.group_id == null);
    const candidate = groupMatch ?? nullMatch ?? group[0];

    if (!candidate) {
      return;
    }

    const mergedCandidate = group.find(
      (config) =>
        config.merge_id > 0 &&
        (groupId == null ||
          config.group_id === groupId ||
          config.group_id == null),
    );

    resolved.push(mergedCandidate ?? candidate);
  });

  return resolved.sort((a, b) => {
    if (a.sort_order !== b.sort_order) {
      return a.sort_order - b.sort_order;
    }
    return a.id - b.id;
  });
}

function buildMergedResultLookup(mergedResults) {
  const bySubjectIdsKey = new Map();
  const byMergeId = new Map();
  const byAnySubjectId = new Map();

  mergedResults.forEach((entry) => {
    const sortedKey = [...entry.subject_ids].sort((a, b) => a - b).join(",");
    bySubjectIdsKey.set(sortedKey, entry);

    if (entry.subject_ids_key) {
      bySubjectIdsKey.set(entry.subject_ids_key, entry);
    }

    if (entry.merge_id > 0) {
      byMergeId.set(entry.merge_id, entry);
    }

    entry.subject_ids.forEach((subjectId) => {
      byAnySubjectId.set(subjectId, entry);
    });
  });

  return { bySubjectIdsKey, byMergeId, byAnySubjectId, all: mergedResults };
}

function findMergedResultForGroup(lookup, subjectIds, mergeId) {
  const sortedIds = [...subjectIds].sort((a, b) => a - b);
  const sortedKey = sortedIds.join(",");

  const exactMatch =
    lookup.bySubjectIdsKey.get(sortedKey) ??
    (mergeId > 0 ? lookup.byMergeId.get(mergeId) : undefined);

  if (exactMatch) {
    return exactMatch;
  }

  const supersetMatch = lookup.all.find((entry) =>
    sortedIds.every((subjectId) => entry.subject_ids.includes(subjectId)),
  );
  if (supersetMatch) {
    return supersetMatch;
  }

  const matchFromSubject = sortedIds
    .map((subjectId) => lookup.byAnySubjectId.get(subjectId))
    .find((entry) => Boolean(entry));

  if (matchFromSubject) {
    return matchFromSubject;
  }

  return lookup.all.find((entry) => {
    const entryIds = [...entry.subject_ids].sort((a, b) => a - b);
    if (entryIds.length !== sortedIds.length) {
      return false;
    }
    return entryIds.every((id, index) => id === sortedIds[index]);
  });
}

function getMergedGradeFromStored(stored) {
  if (!stored) {
    return { letter_grade: "-", grade_point: null };
  }

  const letterGrade = stored.letter_grade || stored.lg || "-";
  const gradePoint = stored.grade_point ?? stored.gp;

  return {
    letter_grade: letterGrade,
    grade_point: Number.isFinite(gradePoint) ? gradePoint : null,
  };
}

function getShortCodeValue(mark, slot) {
  const value = mark[`short_code_${slot}`];
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return Number(value);
}

function buildSubjectComponentMarks(mark, shortCodeColumns, subjectVisibility) {
  const labelBySlot = new Map(
    shortCodeColumns.map((column) => [
      column.slot,
      column.label?.trim() || `SC${column.slot}`,
    ]),
  );

  return [1, 2, 3, 4, 5, 6]
    .filter((slot) => Boolean(subjectVisibility?.[slot]))
    .map((slot) => ({
      slot,
      label: labelBySlot.get(slot) ?? `SC${slot}`,
      value: getShortCodeValue(mark, slot),
    }));
}

function buildSingleRow(mark, shortCodeColumns, subjectVisibility) {
  return {
    subject_name: mark.subject_name,
    full_mark: mark.full_mark,
    highest_mark: mark.highest_mark ?? null,
    is_optional: Boolean(mark.is_optional),
    component_marks: buildSubjectComponentMarks(
      mark,
      shortCodeColumns,
      subjectVisibility,
    ),
    total_score: mark.total_score,
    letter_grade: mark.letter_grade || "-",
    grade_point: mark.grade_point ?? null,
  };
}

function buildMergedRows(
  mergeId,
  mergedConfigs,
  marksBySubjectId,
  shortCodeColumns,
  visibilityBySubject,
  mergedLookup,
  mergedGradesByMergeId,
) {
  const mergedMarks = mergedConfigs
    .map((config) => marksBySubjectId.get(config.subject_id))
    .filter(Boolean);

  if (mergedMarks.length === 0) {
    return [];
  }

  const subjectIds = mergedConfigs
    .map((config) => config.subject_id)
    .filter((id) => id > 0)
    .sort((a, b) => a - b);

  const precomputedGrade =
    mergedGradesByMergeId[String(mergeId)] ?? mergedGradesByMergeId[mergeId];
  const storedMerged =
    precomputedGrade ?? findMergedResultForGroup(mergedLookup, subjectIds, mergeId);
  const mergedGrade = getMergedGradeFromStored(storedMerged);
  const mergedRows = [];

  mergedConfigs.forEach((config) => {
    const mergedMark = marksBySubjectId.get(config.subject_id);
    if (!mergedMark) {
      return;
    }

    const baseRow = buildSingleRow(
      mergedMark,
      shortCodeColumns,
      visibilityBySubject[config.subject_id],
    );

    const isFirstMergedRow = mergedRows.length === 0;

    mergedRows.push({
      key: `merge-${mergeId}-${config.subject_id}`,
      subject_name: baseRow.subject_name,
      full_mark: baseRow.full_mark,
      highest_mark: baseRow.highest_mark,
      is_optional: baseRow.is_optional,
      component_marks: baseRow.component_marks,
      total_score: baseRow.total_score,
      show_grade_cell: isFirstMergedRow,
      grade_rowspan: 1,
      letter_grade: isFirstMergedRow ? mergedGrade.letter_grade : null,
      grade_point: isFirstMergedRow ? mergedGrade.grade_point : null,
    });
  });

  if (mergedRows.length > 0) {
    mergedRows[0].grade_rowspan = mergedRows.length;
  }

  return mergedRows;
}

export function buildMarksheetDisplayRows(data) {
  const marksBySubjectId = new Map(
    data.marks.map((mark) => [mark.subject_id, mark]),
  );

  const visibilityBySubject = data.subject_short_code_visibility;
  const mergedResults = normalizeMergedResults(data.merged_results);
  const mergedLookup = buildMergedResultLookup(mergedResults);
  const mergedGradesByMergeId = data.merged_grades_by_merge_id ?? {};

  const rows = [];
  const renderedSubjectIds = new Set();
  const renderedMergeIds = new Set();

  const subjectConfigs = resolveSubjectConfigs(
    data.class_subject_configs,
    data.student.group_id,
  );

  for (const config of subjectConfigs) {
    const subjectId = config.subject_id;
    if (subjectId <= 0 || renderedSubjectIds.has(subjectId)) {
      continue;
    }

    const mergeId = config.merge_id;

    if (mergeId > 0) {
      if (renderedMergeIds.has(mergeId)) {
        continue;
      }

      const mergedConfigs = subjectConfigs
        .filter((item) => item.merge_id === mergeId)
        .sort((a, b) => {
          if (a.sort_order !== b.sort_order) {
            return a.sort_order - b.sort_order;
          }
          return a.id - b.id;
        });

      mergedConfigs.forEach((mergedConfig) => {
        if (mergedConfig.subject_id > 0) {
          renderedSubjectIds.add(mergedConfig.subject_id);
        }
      });
      renderedMergeIds.add(mergeId);

      const mergedRows = buildMergedRows(
        mergeId,
        mergedConfigs,
        marksBySubjectId,
        data.short_code_columns,
        visibilityBySubject,
        mergedLookup,
        mergedGradesByMergeId,
      );

      if (mergedRows.length > 0) {
        rows.push(...mergedRows);
      }

      continue;
    }

    const mark = marksBySubjectId.get(subjectId);
    if (mark) {
      renderedSubjectIds.add(subjectId);
      const baseRow = buildSingleRow(
        mark,
        data.short_code_columns,
        visibilityBySubject[subjectId],
      );

      rows.push({
        key: `subject-${subjectId}`,
        ...baseRow,
        show_grade_cell: true,
        grade_rowspan: 1,
      });
    }
  }

  data.marks.forEach((mark) => {
    if (renderedSubjectIds.has(mark.subject_id)) {
      return;
    }

    const baseRow = buildSingleRow(
      mark,
      data.short_code_columns,
      visibilityBySubject[mark.subject_id],
    );

    rows.push({
      key: `fallback-${mark.subject_id}`,
      ...baseRow,
      show_grade_cell: true,
      grade_rowspan: 1,
    });
  });

  return rows;
}

export function getActiveShortCodeColumns(data, rows) {
  const usedSlots = new Set();

  rows.forEach((row) => {
    row.component_marks.forEach((component) => {
      usedSlots.add(component.slot);
    });
  });

  const labelBySlot = new Map(
    data.short_code_columns.map((column) => [
      column.slot,
      column.label?.trim() || "-",
    ]),
  );

  return [...usedSlots]
    .sort((a, b) => a - b)
    .map((slot) => ({
      slot,
      label: labelBySlot.get(slot) ?? "-",
    }));
}

export function getShortCodeValueForRow(row, slot) {
  const entry = row.component_marks.find((component) => component.slot === slot);
  return entry?.value ?? null;
}

export function formatSubjectName(name, isOptional) {
  return isOptional ? `${name} (4th)` : name;
}

export function formatMarkValue(value) {
  if (value === null || value === undefined) {
    return "-";
  }
  return Number.isFinite(value) ? String(value) : "-";
}

function sanitizePrintFileNamePart(value) {
  return String(value || "")
    .trim()
    .replace(/[<>:"/\\|?*]+/g, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

export function buildMarksheetPrintFileName(data) {
  const parts = [
    sanitizePrintFileNamePart(data.student?.name || "Student"),
    sanitizePrintFileNamePart(data.exam_config?.exam_name || "Exam"),
    sanitizePrintFileNamePart(data.academic_year_label || ""),
  ].filter(Boolean);

  return parts.join("_") || "Exam_Result";
}
