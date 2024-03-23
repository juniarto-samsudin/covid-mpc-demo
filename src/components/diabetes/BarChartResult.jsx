import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartExample = (props) => {
  // Sample data
  /* const data = [
    { name: 'Category 1', value: 10 },
    { name: 'Category 2', value: 20 },
    { name: 'Category 3', value: 15 },
    { name: 'Category 4', value: 25 },
  ]; */
    const data = props.data;
    console.log('BarChartExample')
    console.log(data) //[{"mild": 20, "moderate": 10, "critical": 10, "death": 30}]

    const convertedArray = Object.entries(data[0]).map(([name, value]) => ({
        name,
        value
      }));

    console.log('convertedArray')
    console.log(convertedArray)

  return (
    <BarChart width={600} height={400} data={convertedArray} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

export default BarChartExample;