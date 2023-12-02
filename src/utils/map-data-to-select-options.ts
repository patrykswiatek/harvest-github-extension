/**
 * Maps data array to an array of objects with 'id' and 'title' properties.
 *
 * @template T - Type of the data array elements.
 * @template R - Type of the 'id' property in the data elements.
 * @template S - Type of the 'title' property in the data elements.
 * @param {T[]} data - The array of data to map.
 * @param {[R, S]} [idParam, titleParam] - Tuple containing the keys for 'id' and 'title' properties.
 * @returns {Array<{ id: T[R], title: T[S] }>} - Array of objects with 'id' and 'title' properties.
 */
export const mapDataToSelectOptions = <T, R extends keyof T, S extends keyof T>(
  data: T[],
  [idParam, titleParam]: [R, S]
) => {
  return data.map(({ [idParam]: id, [titleParam]: title }) => ({ id, title }));
}
