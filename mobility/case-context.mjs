// Optional, local-only context for a future activity; not an auth or result payload.
// Only non-identifying, author-assigned tokens belong here. No patient data.
export function readCaseContext(params = new URLSearchParams()) {
  const context = {};
  for (const key of ['case_id', 'phase', 'task_id']) {
    const values = params.getAll(key);
    if (values.length === 1 && /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test(values[0])) {
      context[key] = values[0];
    }
  }
  return Object.freeze(context);
}
