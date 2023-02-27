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
  groupByAttribute,
  groupByDate,
  sortByDate,
} from '../../../utils/DataFormatter';
import { categories } from './AddExpense';

const stokeColorPerCategory = {
  Personal: '#df0e0e',
  Income: '#0d8d07',
  Food: '#6a329f',
  Rent: '#c90076',
  Utility: '#3d85c6',
  Travel: '#ffb006',
  Gasoline: '#e06666',
  Others: '#4c1130',
};

const CategoryGraph = ({ data }) => {
  const categoryList = categories;

  const groupedByDateData = groupByDate(data ? data : []);

  const accumulatedDataByDateAndCategory = Object.entries(
    groupedByDateData
  ).map(([date, dateGrouped]) => {
    const categoryGrouped = groupByAttribute(dateGrouped, 'category');

    const amountPerCategory = Object.entries(categoryGrouped).map(
      ([category, categoryGroupedItems]) => {
        const totalSum = findSumOfAmounts(categoryGroupedItems);
        return {
          category: category,
          amount: totalSum,
        };
      }
    );

    const consolidatedDataWithTransCategory = amountPerCategory.reduce(
      (acc, cayegoryObj) => {
        const categoryKey = cayegoryObj.category;
        if (!acc[categoryKey]) {
          acc[categoryKey] = cayegoryObj.amount;
        }
        return acc;
      },
      { date: date }
    );

    const categoriesWithTrans = Object.keys(categoryGrouped);
    const selectedCategoriesWithNoTrans = categoryList.filter(
      (item) => !categoriesWithTrans.includes(item)
    );

    const finalConsolidatedData = selectedCategoriesWithNoTrans.reduce(
      (acc, categoryItem) => {
        if (!acc[categoryItem]) {
          acc[categoryItem] = 0.0;
        }
        return acc;
      },
      consolidatedDataWithTransCategory
    );

    return finalConsolidatedData;
  });

  const groupedAndSortedData = sortByDate(accumulatedDataByDateAndCategory);

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
            {categoryList &&
              categoryList.length > 0 &&
              categoryList.map((category, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={category}
                  stroke={stokeColorPerCategory[category]}
                  activeDot={{ r: 8 }}
                />
              ))}
          </LineChart>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CategoryGraph;
