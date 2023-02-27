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
      if (item['amount']) {
        sum += parseFloat(item['amount']);
        return sum;
      } else if (item['incoming'] && item['incoming'] !== '-') {
        sum += parseFloat(item['incoming']);
        return sum;
      } else {
        sum += parseFloat(item['outgoing']);
        return sum;
      }
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

export const groupByAttribute = (data, attribute) => {
  const groupedDataByAttribute = data?.reduce((acc, item) => {
    const attributeValue = item[attribute];
    if (!acc[attributeValue]) {
      acc[attributeValue] = [];
    }
    acc[attributeValue].push(item);
    return acc;
  }, {});

  return groupedDataByAttribute;
};
