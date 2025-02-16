import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Box, MenuItem, Button } from "@mui/material";

const ColumnMapper = ({ data, columnMappings, onMapColumn }) => {
  const [selectedColumn, setSelectedColumn] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedColumn) {
      onMapColumn(selectedColumn, selectedColumn);
      setSelectedColumn("");
    }
  };

  const sourceColumns = data.length ? Object.keys(data[0]) : [];

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Box display="flex" gap={2}>
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!selectedColumn}
        >
          Map Column
        </Button>
      </Box>

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

ColumnMapper.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columnMappings: PropTypes.object.isRequired,
  onMapColumn: PropTypes.func.isRequired,
};

export default ColumnMapper;
