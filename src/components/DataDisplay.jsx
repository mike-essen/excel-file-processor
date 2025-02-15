import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const DataDisplay = ({ data }) => {
  if (!data.length) return null;

  const headers = Object.keys(data[0]);

  return (
    <Table aria-label="Excel data preview">
      <TableHead>
        <TableRow>
          {headers.map(header => (
            <TableCell key={header} align="left">{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {headers.map(header => (
              <TableCell key={`${rowIndex}-${header}`}>{row[header]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

DataDisplay.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DataDisplay;