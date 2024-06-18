import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data01 = [
  {
    name: "Jan",
    value: 400,
  },
  {
    name: "Feb",
    value: 300,
  },
  {
    name: "Mar",
    value: 300,
  },
  {
    name: "Apr",
    value: 200,
  },
  {
    name: "May",
    value: 278,
  },
  {
    name: "June",
    value: 189,
  },
];
const data02 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];
const CardsChart = () => {
  return (
    <>
    <ResponsiveContainer width="100%" aspect={2}>
      <BarChart data={data01} width={400} height={400}>
      {/* <CartesianGrid stroke="#f5f5f5" /> */}
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip/>
        <Bar dataKey="value" fill="#8883d8">
        </Bar>
      </BarChart> 
    </ResponsiveContainer>
    
    </>

  );
};

export default CardsChart;
