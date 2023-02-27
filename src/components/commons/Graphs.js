import { Paper, TableContainer } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  findSumOfAmounts,
  groupByDate,
  sortByDate,
} from '../../utils/DataFormatter';

const Graphs = (props) => {
  const { data } = props;

  const groupedByDateData = groupByDate(data);

  const accumulatedAmountDataByDate = Object.entries(groupedByDateData).map(
    ([date, groupedData]) => {
      const totalSum = findSumOfAmounts(groupedData);
      return {
        date: date,
        amount: totalSum,
      };
    }
  );

  const groupedAndSortedData = sortByDate(accumulatedAmountDataByDate);

  return (
    <Box
      sx={{ width: '100%' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={{ width: '100%', mb: 2, mt: 1 }}>
        <TableContainer>
          <LineChart
            width={700}
            height={400}
            data={groupedAndSortedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
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
