import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
//import Plot from 'react-plotly.js';


/* const PlotlyChart= ({ data, layout }) => {
  useEffect(() => {
    const plotlyElement = document.getElementById('plotly-chart');

    if (plotlyElement) {
      Plot.newPlot(plotlyElement, data, layout);
    }

    return () => {
      // Cleanup if needed
    };
  }, [data, layout]);

  return <div id="plotly-chart" />;
}; */

/* const PlotlyChart = () => {
  const data = [
    {
      x: [1, 2, 3, 4],
      y: [10, 11, 12, 13],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'red' },
    },
  ];

  const layout = { title: 'My Plotly Chart' };

  return <Plot data={data} layout={layout} />;
}; */


const PlotlyChart = () => {
  const [plotData, setPlotData] = useState([
    {
      x: [1, 2, 3],
      y: [2, 6, 3],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'red' },
    },
    { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
  ]);

  const layout = { width: 320, height: 240, title: 'A Fancy Plot' };

  return <Plot data={plotData} layout={layout} />;
};

export default PlotlyChart;