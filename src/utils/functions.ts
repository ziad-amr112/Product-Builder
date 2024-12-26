/**
 * Slices a given text to a specified maximum length and adds ellipsis if it exceeds the limit.
 *
 * @param {string} txt - The input text to be sliced.
 * @param {number} [max=50] - The maximum allowed length for the text. Default is 50.
 * @returns {string} - The sliced text with ellipsis added if the length exceeds the limit.
 */
export function txtSlicer(txt: string, max: number = 75): string {
    if (txt.length >= max) return `${txt.slice(0, max)}...`;
    return txt;
}
/**
 *
 * @param {string} x - The numeric string to be formatted.
 * @returns {string} A formatted version of the input numeric string with commas as thousand separators.
 *
 */
export function numberWithCommas(x: string): string {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  