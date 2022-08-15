import React, { useState } from "react";

const useGenerateReportData = selectedDatesArr => {
  const [loadData, setLoadData] = useState(false);

  return [setLoadData];
};

export default useGenerateReportData;
