import React from "react";
import PropTypes from "prop-types";
import { Button, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

/**
 * FileUpload Component
 *
 * A file upload interface specifically designed for Excel (.xlsx) files.
 * Provides a clean, accessible interface with proper ARIA labels and
 * visual feedback for file selection.
 *
 * @param {object} props Component properties
 * @param {function} props.onFileUpload Callback function triggered when a file is selected
 * @returns {JSX.Element} File upload interface with button and file type indicator
 */
const FileUpload = ({ onFileUpload }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    {/* Hidden file input with ARIA label for accessibility */}
    <input
      id="fileInput"
      type="file"
      accept=".xlsx"
      onChange={onFileUpload}
      aria-label="Select Excel file"
      style={{ display: "none" }}
    />

    {/* Label wrapper for the hidden input */}
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
        {/* Icon and text container with flex layout */}
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <CloudUploadIcon />
          Choose File
        </Box>
      </Button>
    </label>

    {/* File type indicator */}
    <Typography variant="body2" color="text.secondary">
      (.xlsx files only)
    </Typography>
  </Box>
);

/**
 * Prop type definitions for FileUpload component
 */
FileUpload.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

export default FileUpload;
