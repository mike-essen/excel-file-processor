import React, { useState } from "react";
import { Container, Box, Typography, Paper, Button } from "@mui/material";
import FileUpload from "./components/FileUpload";
import DataDisplay from "./components/DataDisplay";
import ColumnMapper from "./components/ColumnMapper";
import { useFileReader } from "./hooks/useFileReader";

const App = () => {
  const [fileData, setFileData] = useState([]);
  const [columnMappings, setColumnMappings] = useState({});

  const { handleFileUpload, error } = useFileReader((newData) => {
    setFileData(newData);
    setColumnMappings({});
  });

  const mapColumn = (sourceColumn, targetProperty) => {
    setColumnMappings((prev) => ({
      ...prev,
      [sourceColumn]: targetProperty,
    }));
  };

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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Excel File Processor
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Upload your Excel file and transform your data
        </Typography>
      </Box>

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

      {fileData.length > 0 && (
        <>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Data Preview
            </Typography>
            <DataDisplay data={fileData} />
          </Paper>

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
