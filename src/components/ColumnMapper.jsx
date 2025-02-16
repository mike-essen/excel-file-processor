import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Box, MenuItem, Button } from "@mui/material";

/**
 * ColumnMapper Component
 *
 * Handles mapping columns from source data to target properties. Provides a dropdown
 * selection interface for choosing columns and displaying current mappings.
 *
 * @param {object} props Component properties
 * @param {Array<object>} props.data Source data array containing column definitions
 * @param {object} props.columnMappings Current mapping configuration
 * @param {function} props.onMapColumn Callback for handling column mapping updates
 */
const ColumnMapper = ({ data, columnMappings, onMapColumn }) => {
  /**
   * State for tracking selected column
   */
  const [selectedColumn, setSelectedColumn] = useState("");

  /**
   * Handles form submission when mapping a column
   * @param {Event} event Form submission event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedColumn) {
      // Maps the selected column to itself in the target system
      onMapColumn(selectedColumn, selectedColumn);
      // Resets selection after successful mapping
      setSelectedColumn("");
    }
  };

  /**
   * Extracts column names from the first data item
   */
  const sourceColumns = data.length ? Object.keys(data[0]) : [];

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Box display="flex" gap={2}>
        {/* Column selection dropdown */}
        <TextField
          select
          label="Column"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          fullWidth
        >
          {sourceColumns.map((column) => (
            <MenuItem key={column} value={column}>
              {column}
            </MenuItem>
          ))}
        </TextField>

        {/* Submit button */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!selectedColumn}
        >
          Map Column
        </Button>
      </Box>

      {/* Display current mappings if any exist */}
      {Object.entries(columnMappings).length > 0 && (
        <div className="mapping-summary" style={{ marginTop: "1rem" }}>
          <h3>Current Mappings:</h3>
          <ul>
            {Object.entries(columnMappings).map(([column, property]) => (
              <li key={column}>
                {column} → {property}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Box>
  );
};

/**
 * Prop type definitions for ColumnMapper component
 */
ColumnMapper.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columnMappings: PropTypes.object.isRequired,
  onMapColumn: PropTypes.func.isRequired,
};

export default ColumnMapper;
