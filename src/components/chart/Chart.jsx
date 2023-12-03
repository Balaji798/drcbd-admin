"use client";
import React from "react";
import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const Chart = ({ title, data, dataKey, grid }) => {

  const mon = [
    "",
    "jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const userData = [];
  for (let i = 0; i <= 12; i++) {
    let month = new Date(`${new Date().getFullYear()}-${i + 1}-01`).getMonth() + 1;
    let monthData = data.filter(
      (item) => 
      new Date(item.createdAt).getMonth() + 1 === month
    );
    userData.push({
      name: mon[i],
      [dataKey]: monthData.length,
    });
  }
 // console.log(userData)
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" paddingTop="1rem" aspect={4 / 1}>
        <LineChart data={userData}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
// 'use client'
// import React, { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid
// } from "recharts";

// const data = [
//   {
//     name: "Sun",
//     value: 10
//   },
//   {
//     name: "Mon",
//     value: 30
//   },
//   {
//     name: "Tue",
//     value: 100
//   },
//   {
//     name: "Wed",
//     value: 30
//   },
//   {
//     name: "Thu",
//     value: 23
//   },
//   {
//     name: "Fri",
//     value: 34
//   },
//   {
//     name: "Sat",
//     value: 11
//   }
// ];

// const Chart = () => {
//   const [tooltip, setTooltip] = useState(null);
//   const [point, setPoints] = useState(null);

//   const CustomTooltip = ({ payload }) => {
//     if (payload) {
//       return (
//         <div className="flex justify-center items-center bg-secondary-800 text-white w-40 h-32">
//           <p>{payload[0]?.value}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   const updateTooltip = (e) => {
//     let x = Math.round(e.cx);
//     let y = Math.round(e.cy);

//     tooltip.style.opacity = "1";
//     tooltip.style.transform = `translate(${x}px, ${y}px)`;
//     tooltip.childNodes[0].innerHTML = e.value;
//   };

//   const onChartMouseMove = (chart) => {
//     if (chart.isTooltipActive) {
//       if (point) {
//         setPoints(point);
//         updateTooltip(chart);
//       }
//     }
//   };

//   const onChartMouseLeave = (e) => {
//     setPoints(null);
//     updateTooltip(e);
//   };

//   return (
//     <div className="flex caption2 flex-col ui-chart">
//       <div className="ml-24 flex justify-center flex-col w-48 items-center mt-32 mb-10">
//         <p className="caption2">ผลลัพธ์</p>
//         <p className="subheading2">680</p>
//       </div>
//       <LineChart width={650} height={300} data={data}>
//         <CartesianGrid vertical={false} opacity="0.2" />
//         <XAxis
//           tick={{ fill: "black" }}
//           axisLine={false}
//           tickLine={false}
//           dataKey="name"
//         />
//         <YAxis
//           tickCount={7}
//           axisLine={false}
//           tickLine={false}
//           tick={{ fill: "black" }}
//           type="number"
//           domain={[0, 100]}
//         />
//         <Tooltip
//           content={<CustomTooltip />}
//           viewBox={{ x: 0, y: 0, width: 20, height: 20 }}
//           cursor={false}
//           position="top"
//           wrapperStyle={{ display: "hidden" }}
//         />
//         <Line
//           fill="#40C0C0"
//           stroke="#40C0C0"
//           dot={true}
//           type="monotone"
//           dataKey="value"
//           activeDot={(e) => {
//             onChartMouseMove(e);
//             onChartMouseLeave(e);
//           }}
//         />
//       </LineChart>
//       <div
//         className="ui-chart-tooltip text-white flex items-center justify-center"
//         ref={(ref) => setTooltip(ref)}
//       >
//         <div className="ui-chart-tooltip-content"></div>
//       </div>
//     </div>
//   );
// };

// export default Chart;
