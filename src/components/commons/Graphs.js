import { Paper, TableContainer } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { mock_data } from "../../Mock_data";

const Graphs = props => {
  const { data } = props;

  const mapDataByDate = () => {
    let dateMappedData = {};
    data.forEach(element => {
      if (dateMappedData.hasOwnProperty(element.date)) {
        dateMappedData[element.date].amount += parseFloat(element.amount);
      } else {
        dateMappedData[element.date] = {
          date: element.date,
          amount: parseFloat(element.amount)
        };
      }
    });
    return Object.values(dateMappedData);
  };

  const mappedData = mapDataByDate(data);

  function compareFn(a, b) {
    if (a.date > b.date) return 1;
    else if (a.date < b.date) return -1;
    return 0;
  }
  mappedData.sort(compareFn);

  return (
    <Box
      sx={{ width: "100%" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={{ width: "100%", mb: 2, mt: 1 }}>
        <TableContainer>
          <LineChart
            width={500}
            height={300}
            data={mappedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Graphs;
