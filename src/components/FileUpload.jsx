import React from "react";
import PropTypes from "prop-types";
import { Button, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUpload = ({ onFileUpload }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <input
      id="fileInput"
      type="file"
      accept=".xlsx"
      onChange={onFileUpload}
      aria-label="Select Excel file"
      style={{ display: "none" }}
    />
    <label htmlFor="fileInput">
      <Button
        variant="contained"
        color="primary"
        component="span"
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <CloudUploadIcon />
          Choose File
        </Box>
      </Button>
    </label>
    <Typography variant="body2" color="text.secondary">
      (.xlsx files only)
    </Typography>
  </Box>
);

FileUpload.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

export default FileUpload;
