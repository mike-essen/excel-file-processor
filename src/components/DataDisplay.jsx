import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

/**
 * DataDisplay Component
 *
 * A reusable table component that displays data with sorting capabilities.
 * Handles various data types and provides visual feedback for sorting state.
 *
 * @param {object} props Component properties
 * @param {Array<object>} props.data Array of objects to display in the table
 */
const DataDisplay = ({ data }) => {
  /**
   * State for tracking current sort configuration
   * @type {{key: string, direction: "asc" | "desc"}}
   */
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  /**
   * Memoized sorted data based on current sort configuration
   * Handles null values, strings, and numbers appropriately
   */
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      // Handle null/undefined values by pushing them to the end
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      // Handle string comparison using localeCompare for proper string sorting
      if (typeof aVal === "string") {
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      // Handle numeric comparison
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [data, sortConfig]);

  /**
   * Handles sort request by toggling direction when same key is clicked
   * @param {string} key The column key to sort by
   */
  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Early return if no data available
  if (!data.length) return null;

  // Extract column headers from first data item
  const headers = Object.keys(data[0]);

  return (
    <Paper elevation={2} sx={{ overflow: "hidden" }}>
      {/* Header section with download icon and title */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        <CloudDownloadIcon />
        <Typography variant="h6">Data Preview</Typography>
      </Box>

      {/* Scrollable table container */}
      <Box sx={{ height: 400, overflow: "auto" }}>
        <Table stickyHeader aria-label="Excel data preview">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header}
                  sx={{ backgroundColor: "primary.light" }}
                >
                  <TableSortLabel
                    active={sortConfig.key === header}
                    direction={
                      sortConfig.key === header ? sortConfig.direction : "asc"
                    }
                    onClick={() => requestSort(header)}
                    sx={{ color: "primary.contrast" }}
                  >
                    {header}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  "&:hover": {
                    backgroundColor: "primary.lightest",
                  },
                }}
              >
                {headers.map((header) => (
                  <TableCell key={`${rowIndex}-${header}`}>
                    {row[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

/**
 * Prop type definitions for DataDisplay component
 */
DataDisplay.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataDisplay;
