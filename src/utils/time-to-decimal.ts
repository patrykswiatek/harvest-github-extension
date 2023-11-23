export const timeToDecimal = (time: string) => {
  const [hours, minutes] = time.split(':');
  const decimal = parseFloat(hours) + parseFloat(String(+minutes / 60));

  return parseFloat(decimal.toFixed(2));
}
