// This file is used to store helper functions that are used in multiple places in the application.
module.exports = {
  // Format date as MM/DD/YYYY
  format_date: (date) => {
    // Use JavaScript's date method to format the date
    return date.toLocaleDateString();
  },
};