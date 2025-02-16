import { useState } from "react";
import * as xlsx from "xlsx";

/**
 * useFileReader Custom Hook
 *
 * Handles file upload and processing of XLSX files, providing error handling
 * and data transformation capabilities. Automatically processes the first sheet
 * and converts data into a structured object format.
 *
 * @param {function} onDataChange Callback function to receive processed data
 * @returns {object} Object containing handleFileUpload function and error state
 */
export const useFileReader = (onDataChange) => {
  /**
   * State for tracking any errors during file processing
   * @type {string|null} Error message or null if no error
   */
  const [error, setError] = useState(null);

  /**
   * Handles file upload and processing
   * @param {Event} event File input change event
   */
  const handleFileUpload = async (event) => {
    // Get the selected file
    const file = event.target.files[0];

    // Validate file type
    if (
      !file ||
      ![
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.type)
    ) {
      setError("Please upload a valid XLSX file");
      return;
    }

    // Clear any existing error
    setError(null);

    try {
      // Create FileReader instance for processing
      const reader = new FileReader();

      // Handle file load completion
      reader.onload = async (e) => {
        // Convert file to array buffer
        const data = new Uint8Array(e.target.result);

        // Parse XLSX file
        const workbook = xlsx.read(data, { type: "array" });

        // Get first sheet name and data
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON with headers as first row
        const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

        // Extract headers from first row
        const headers = jsonData.shift();

        // Transform data into objects using headers
        const processedData = jsonData.map((row) => {
          return headers.reduce((obj, header, index) => {
            obj[header] = row[index];
            return obj;
          }, {});
        });

        // Notify parent component with processed data
        onDataChange(processedData);
      };

      // Start reading file as array buffer
      reader.readAsArrayBuffer(file);
    } catch (err) {
      // Handle any processing errors
      setError("Error processing file");
    }
  };

  // Return handler and error state
  return { handleFileUpload, error };
};
