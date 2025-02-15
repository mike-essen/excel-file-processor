// src/App.jsx
import React, { useState } from "react";
import { Container } from "@mui/material";
import FileUpload from "./components/FileUpload";
import DataDisplay from "./components/DataDisplay";
import ColumnMapper from "./components/ColumnMapper";
import { useFileReader } from "./hooks/useFileReader";

const App = () => {
  const [fileData, setFileData] = useState([]);
  const [columnMappings, setColumnMappings] = useState({});

  const { handleFileUpload, error } = useFileReader((newData) => {
    setFileData(newData);
    setColumnMappings({}); // Reset mappings when new file is uploaded
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
    <Container maxWidth="lg">
      <h1>Excel File Processor</h1>

      <FileUpload onFileUpload={handleFileUpload} />

      {error && (
        <div role="alert" style={{ color: "red" }}>
          {error}
        </div>
      )}

      <DataDisplay data={fileData} />

      {fileData.length > 0 && (
        <>
          <ColumnMapper
            data={fileData}
            columnMappings={columnMappings}
            onMapColumn={mapColumn}
          />

          <div style={{ marginTop: "1rem" }}>
            <button
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
            </button>
          </div>
        </>
      )}
    </Container>
  );
};

export default App;
