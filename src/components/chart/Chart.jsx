import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import { useState } from "react";



const month = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const Chart = ({ aspect, title, chartIncome }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Chart Income',chartIncome)
    if(chartIncome.length > 0){
      const tempData = chartIncome?.map((item) => ({
        ...item,
        name: month[item._id],
      }));
      if (tempData.length < 2) {
        tempData.unshift({
          _id: tempData[0]._id - 1,
          name: month[tempData[0]._id - 1],
          count:0
        });
      }
      setData(tempData);
      console.log(tempData)
    }
  }, [chartIncome]);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fillOpacity={1}
            fill="#E1E0F5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
