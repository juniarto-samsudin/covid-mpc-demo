import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { BasicTable } from './BasicTable';

const CSVFileLoader = () => {
  const [csvData, setCSVData] = useState(null);
  
  const handleFile = (data, fileInfo) => {
    console.log(`File "${fileInfo.name}" loaded successfully.`);
    console.log('Data:', data);

    const jsonData = convertCSVToJSON(data);
    setCSVData(jsonData);
  };

  const convertCSVToJSON = (csvData) => {
    const headers = csvData[0];
    const jsonData = [];

    for (let i = 1; i < csvData.length; i++) {
      const row = csvData[i];
      const entry = {};

      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = row[j];
      }

      jsonData.push(entry);
    }

    return jsonData;
  }

  return {
    jsx: (
    <div>
      <h2>Secret Sharing Your Data</h2>
      <CSVReader onFileLoaded={handleFile} />
      
      {csvData && (
        <div>
          {/* <h3>CSV Data:</h3>
          <pre>{JSON.stringify(csvData, null, 2)}</pre> */}
          <BasicTable data={csvData} />  
        </div>
      )}
    </div>
    ),
    value: JSON.stringify(csvData, null, 2)
        };
};

export default CSVFileLoader;
