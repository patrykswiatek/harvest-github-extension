/**
 * Converts time in 'HH:mm' format to decimal representation.
 *
 * @param {string} time - The time string in 'HH:mm' format (e.g., '12:30').
 * @returns {number} - The decimal representation of the time.
 */
export const timeToDecimal = (time: string) => {
  const [hours, minutes] = time.split(':');
  const decimal = parseFloat(hours) + parseFloat(String(+minutes / 60));

  return parseFloat(decimal.toFixed(2));
}
