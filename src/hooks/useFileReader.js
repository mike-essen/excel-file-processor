import { useState } from "react";
import * as xlsx from "xlsx";

export const useFileReader = (onDataChange) => {
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (
      !file ||
      ![
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.type)
    ) {
      setError("Please upload a valid XLSX file");
      return;
    }

    setError(null);

    try {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = xlsx.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
        const headers = jsonData.shift();

        const processedData = jsonData.map((row) => {
          return headers.reduce((obj, header, index) => {
            obj[header] = row[index];
            return obj;
          }, {});
        });

        onDataChange(processedData);
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      setError("Error processing file");
    }
  };

  return { handleFileUpload, error };
};
