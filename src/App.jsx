import React, { useState } from "react";
import { Container, Box, Typography, Paper, Button } from "@mui/material";
import FileUpload from "./components/FileUpload";
import DataDisplay from "./components/DataDisplay";
import ColumnMapper from "./components/ColumnMapper";
import { useFileReader } from "./hooks/useFileReader";

/**
 * App Component
 *
 * Main application component that orchestrates file upload, data display,
 * column mapping, and JSON export functionality. Manages the overall state
 * and coordinates between child components.
 *
 * @returns {JSX.Element} Main application layout with file processing features
 */
const App = () => {
  /**
   * State for managing uploaded file data
   * @type {Array<object>} Array of objects representing the Excel file data
   */
  const [fileData, setFileData] = useState([]);

  /**
   * State for managing column mappings
   * @type {object} Object mapping source columns to target properties
   */
  const [columnMappings, setColumnMappings] = useState({});

  /**
   * Initialize file reader hook with data handling callback
   * @type {object} Object containing handleFileUpload function and error state
   */
  const { handleFileUpload, error } = useFileReader((newData) => {
    setFileData(newData);
    setColumnMappings({});
  });

  /**
   * Handles column mapping updates
   * @param {string} sourceColumn Source column name
   * @param {string} targetProperty Target property name
   */
  const mapColumn = (sourceColumn, targetProperty) => {
    setColumnMappings((prev) => ({
      ...prev,
      [sourceColumn]: targetProperty,
    }));
  };

  /**
   * Generates JSON string from mapped data
   * @returns {string} Formatted JSON string with transformed data
   */
  const generateJSON = () => {
    return JSON.stringify(
      fileData.map((item) =>
        Object.entries(columnMappings).reduce((obj, [source, target]) => {
          obj[target] = item[source];
          return obj;
        }, {})
      ),
      null,
      2
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Excel File Processor
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Upload your Excel file and transform your data
        </Typography>
      </Box>

      {/* File upload section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <FileUpload onFileUpload={handleFileUpload} />
        {error && (
          <Box
            sx={{ mt: 2, p: 2, backgroundColor: "#ffebee", borderRadius: 1 }}
          >
            <Typography color="error">{error}</Typography>
          </Box>
        )}
      </Paper>

      {/* Conditional rendering of data processing sections */}
      {fileData.length > 0 && (
        <>
          {/* Data preview section */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Data Preview
            </Typography>
            <DataDisplay data={fileData} />
          </Paper>

          {/* Column mapping section */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Column Mapping
            </Typography>
            <ColumnMapper
              data={fileData}
              columnMappings={columnMappings}
              onMapColumn={mapColumn}
            />
          </Paper>

          {/* Export button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const json = generateJSON();
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "mapped_data.json";
                a.click();
              }}
            >
              Export JSON
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default App;
