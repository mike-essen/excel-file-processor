import { useState } from "react";

/**
 * useColumnMapping Custom Hook
 *
 * Manages column mapping state and provides functionality to transform data
 * based on the mappings. Useful for converting data between different column
 * structures while maintaining a mapping configuration.
 *
 * @returns {object} Object containing column mappings, mapping function, and data transformation function
 */
export const useColumnMapping = () => {
  /**
   * State for storing column mappings
   * @type {object} Object where keys are source columns and values are target properties
   */
  const [columnMappings, setColumnMappings] = useState({});

  /**
   * Maps a source column to a target property
   * @param {string} sourceColumn The source column name to map from
   * @param {string} targetProperty The target property name to map to
   */
  const mapColumn = (sourceColumn, targetProperty) => {
    setColumnMappings((prev) => ({
      ...prev,
      [sourceColumn]: targetProperty,
    }));
  };

  /**
   * Generates JSON string from data using current column mappings
   * @param {Array<object>} data Array of objects to transform
   * @returns {string} Formatted JSON string with transformed data
   */
  const generateJSON = (data) => {
    return JSON.stringify(
      data.map((item) =>
        Object.entries(columnMappings).reduce((obj, [source, target]) => {
          obj[target] = item[source];
          return obj;
        }, {})
      ),
      null,
      2
    );
  };

  return { columnMappings, mapColumn, generateJSON };
};
