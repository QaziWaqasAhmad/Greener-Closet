import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const products = [
  {
    name: "Pizza",
    sales: 1000,
  },
  {
    name: "Fries",
    sales: 500,
  },
  {
    name: "Burger",
    sales: 800,
  },
  {
    name: "Sandwitch",
    sales: 100,
  },
  {
    name: "Drinks",
    sales: 200,
  },
  {
    name: "catnees",
    sales: 400,
  },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088fe", "#00c49f"];
const ProductsChart = () => {
  return (
    <>
      <ResponsiveContainer width="100%">
        {/* <PieChart data={products} width={400} height={400}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Pie dataKey="sales" type="monotone" stroke="#8884d8" fill="#fff" />
        </PieChart> */}

        <PieChart width={730} height={250}>
        {/* <Legend verticalAlign="top" layout="verticle" iconSize="10" align="right" iconType="line"/> */}
          <Pie
            data={products}
            dataKey="sales"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {products.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS?.length]} />
            ))}
          </Pie>
          <Tooltip/>
         
        </PieChart>
        
      </ResponsiveContainer>
    </>
  );
};

export default ProductsChart;
