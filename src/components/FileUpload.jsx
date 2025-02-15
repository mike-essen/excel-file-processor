import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const FileUpload = ({ onFileUpload }) => (
  <div className="file-upload">
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
        sx={{ cursor: "pointer" }}
      >
        Choose File
      </Button>
    </label>
  </div>
);

FileUpload.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

export default FileUpload;
