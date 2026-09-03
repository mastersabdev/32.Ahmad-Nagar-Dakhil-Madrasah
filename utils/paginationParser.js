export function parsePagination(meta) {
  const page = meta.page ?? 1;
  const limit = meta.limit ?? 8;
  const totalPages = meta.totalPages ?? 1;
  return {
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
