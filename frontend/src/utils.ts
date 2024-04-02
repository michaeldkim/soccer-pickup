// utils.ts

/**
 * Formats a Date object to a string suitable for html date input value.
 * @param {Date} date - The date object to format.
 * @returns {string} - The formatted date string.
 */
export const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // JS months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
  }
  