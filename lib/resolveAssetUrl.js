export function resolveAssetUrl(path, baseUrl, options = {}) {
  if (!path) {
    return undefined;
  }

  const raw = String(path).trim();
  if (!raw) {
    return undefined;
  }

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  const normalizedBase = String(baseUrl || "").replace(/\/$/, "");
  const cleaned = raw.replace(/^\/+/, "");

  if (!cleaned) {
    return undefined;
  }

  if (!normalizedBase) {
    return cleaned;
  }

  if (cleaned.startsWith("storage/")) {
    return `${normalizedBase}/${cleaned}`;
  }

  if (cleaned.startsWith("uploads/")) {
    return `${normalizedBase}/${cleaned}`;
  }

  if (cleaned.includes("/")) {
    return `${normalizedBase}/${cleaned}`;
  }

  const folder = String(options.defaultFolder || "")
    .replace(/^\//, "")
    .replace(/\/?$/, "");

  if (folder) {
    return `${normalizedBase}/storage/${folder}/${cleaned}`;
  }

  return `${normalizedBase}/storage/${cleaned}`;
}

export function resolveSchoolLogoUrl(logo, baseUrl) {
  const resolved = resolveAssetUrl(logo, baseUrl, { defaultFolder: "logos" });
  if (!resolved) {
    return undefined;
  }

  const raw = String(logo ?? "").trim().replace(/^\/+/, "");
  if (raw.startsWith("uploads/")) {
    return `${String(baseUrl || "").replace(/\/$/, "")}/${raw}`;
  }

  return resolved;
}
