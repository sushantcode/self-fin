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
  groupBySubject,
} from '../../../utils/DataFormatter';

const stokeColorPerSubject = {
  Expense: '#df0e0e',
  Income: '#0d8d07',
  Investments: '#6a329f',
  Loans: '#c90076',
  Savings: '#3d85c6',
  TransferHome: '#ffb006',
};

const ReportGraph = ({ data }) => {
  const subjects = data?.data.reduce((acc, item) => {
    if (!acc.includes(item.subject)) {
      acc.push(item.subject);
    }
    return acc;
  }, []);

  const groupedByDateData = groupByDate(data ? data.data : []);

  const accumulatedDataByDateAndSubject = Object.entries(groupedByDateData).map(
    ([date, dateGrouped]) => {
      const subjectGrouped = groupBySubject(dateGrouped);

      const amountPerSubject = Object.entries(subjectGrouped).map(
        ([subject, subjectGroupedItems]) => {
          const totalSum = findSumOfAmounts(subjectGroupedItems);
          return {
            subject: subject,
            amount: totalSum,
          };
        }
      );

      const consolidatedDataWithTransSubject = amountPerSubject.reduce(
        (acc, subjectObj) => {
          const subjectKey = subjectObj.subject;
          if (!acc[subjectKey]) {
            acc[subjectKey] = subjectObj.amount;
          }
          return acc;
        },
        { date: date }
      );

      const subjectsWithTrans = Object.keys(subjectGrouped);
      const selectedSubjectsWithNoTrans = subjects.filter(
        (item) => !subjectsWithTrans.includes(item)
      );

      const finalConsolidatedData = selectedSubjectsWithNoTrans.reduce(
        (acc, subjectItem) => {
          if (!acc[subjectItem]) {
            acc[subjectItem] = 0.0;
          }
          return acc;
        },
        consolidatedDataWithTransSubject
      );

      return finalConsolidatedData;
    }
  );

  const grouppedAndSortedData = sortByDate(accumulatedDataByDateAndSubject);

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
            width={500}
            height={300}
            data={grouppedAndSortedData}
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
            {subjects &&
              subjects.length > 0 &&
              subjects.map((subject, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={subject}
                  stroke={stokeColorPerSubject[subject]}
                  activeDot={{ r: 8 }}
                />
              ))}
          </LineChart>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ReportGraph;
