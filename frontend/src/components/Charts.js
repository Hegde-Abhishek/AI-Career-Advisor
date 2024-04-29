import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

const Charts = ({ type, data }) => {
  let ChartComponent;

  switch (type) {
    case 'bar':
      ChartComponent = Bar;
      break;
    case 'line':
      ChartComponent = Line;
      break;
    case 'pie':
      ChartComponent = Pie;
      break;
    default:
      ChartComponent = Bar;
  }

  return <ChartComponent data={data} />;
};

export default Charts;
