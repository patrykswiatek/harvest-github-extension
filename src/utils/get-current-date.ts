/**
 * Gets the current date in YYYY-MM-DD format.
 *
 * @returns {string} - The current date in YYYY-MM-DD format.
 */
export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0]
}
