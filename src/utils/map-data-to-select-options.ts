export const mapDataToSelectOptions = <T, R extends keyof T, S extends keyof T>(
  data: T[],
  [idParam, titleParam]: [R, S]
) => {
  return data.map(({ [idParam]: id, [titleParam]: title }) => ({ id, title }));
}
