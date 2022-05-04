import React, { Component } from 'react';

import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class ChartExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: '', dat: 0, huy: 0},
        {name: 'Tháng 1', dat: 50, huy: 13},
        {name: 'Tháng 2', dat: 20, huy: 8},
        {name: 'Tháng 3', dat: 27, huy: 8},
        {name: 'Tháng 4', dat: 18, huy: 4},
        {name: 'Tháng 5', dat: 23, huy: 38},
        {name: 'Tháng 6', dat: 34, huy: 4},
        {name: 'Tháng 7', dat: 34, huy: 30},
        {name: 'Tháng 8', dat: 34, huy: 4},
        {name: 'Tháng 9', dat: 34, huy: 30},
        {name: 'Tháng 10', dat: 90, huy: 40},
        {name: 'Tháng 11', dat: 49, huy: 30},
        {name: 'Tháng 12', dat: 39, huy: 40},
      ]
    }
  }

  render() {
    const { data } = this.state;

    return (
      <ResponsiveContainer className="chart" height={600}>
        <LineChart 
         width={600} 
         height={300} 
         data={data}
         margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="dat" stroke="#8884d8" activeDot={{r: 8}}/>
        <Line type="monotone" dataKey="huy" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default ChartExample;