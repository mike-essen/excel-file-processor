import { useState } from "react";

export const useColumnMapping = () => {
  const [columnMappings, setColumnMappings] = useState({});

  const mapColumn = (sourceColumn, targetProperty) => {
    setColumnMappings((prev) => ({
      ...prev,
      [sourceColumn]: targetProperty,
    }));
  };

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
