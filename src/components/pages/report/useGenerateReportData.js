import React, { useEffect, useState } from "react";
import { mock_data, report } from "../../../Mock_data";

const useGenerateReportData = selectedDatesArr => {
  const [loadData, setLoadData] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    () => {
      if (loadData) {
        const keys = selectedDatesArr.map(element => element.substring(0, 7));
        console.log(report.expense[0].item);
        setData(report.expense[0].item);
        setLoadData(false);
      }
    },
    [loadData]
  );

  return [setLoadData, error, loading, data];
};

export default useGenerateReportData;
