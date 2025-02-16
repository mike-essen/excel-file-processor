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

const DataDisplay = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === "string") {
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [data, sortConfig]);

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  if (!data.length) return null;

  const headers = Object.keys(data[0]);

  return (
    <Paper elevation={2} sx={{ overflow: "hidden" }}>
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

DataDisplay.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataDisplay;
