export const removeUndefined = (record?: Record<number, string | undefined>) => {
  if (!record) return {}

  return Object.fromEntries(Object.entries(record).filter(([, value]) => value !== undefined)) as Record<number, string>
}
