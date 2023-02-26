const compareByDate = (a, b) => {
  if (a.date > b.date) return 1;
  else if (a.date < b.date) return -1;
  return 0;
};

export const sortByDate = (data) => {
  data?.sort(compareByDate);
  return data;
};

export const findSumOfAmounts = (data) => {
  try {
    const totalSum = data?.reduce((sum, item) => {
      sum += parseFloat(item.amount);
      return sum;
    }, 0.0);
    return totalSum;
  } catch (exception) {
    throw exception;
  }
};

export const groupByDate = (data) => {
  const grouppedDataByDate = data?.reduce((acc, item) => {
    const date = item.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return grouppedDataByDate;
};
