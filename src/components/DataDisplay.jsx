// src/components/DataDisplay.jsx
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

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
    <div style={{ height: "400px", overflow: "auto" }}>
      <Table stickyHeader aria-label="Excel data preview">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>
                <TableSortLabel
                  active={sortConfig.key === header}
                  direction={
                    sortConfig.key === header ? sortConfig.direction : "asc"
                  }
                  onClick={() => requestSort(header)}
                >
                  {header}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header) => (
                <TableCell key={`${rowIndex}-${header}`}>
                  {row[header]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

DataDisplay.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataDisplay;
