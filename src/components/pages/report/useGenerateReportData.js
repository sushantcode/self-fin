import React, { useEffect, useState } from "react";
import { mock_data, report } from "../../../Mock_data";
import { getPassword } from "../../../utils/Authentication";
import { getBatchData } from "../../../utils/DDBClients";
import { decrypt } from "../../../utils/Encryption";

const useGenerateReportData = (selectedDatesArr, selectedSubjects) => {
  const [loadData, setLoadData] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    () => {
      if (loadData && selectedSubjects.length > 0) {
        setLoading(true);
        setError("");
        const keys = selectedDatesArr.map(element => element.substring(0, 7));
        // setData(report.expense[0].item);
        // setLoading(false);

        // Call to dynamoDB tables for data
        getBatchData(selectedSubjects, keys)
          .then(response => {
            handleResponse(response);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setError("Error occured while polling data. Try again!!!");
            setLoading(false);
          });
      }
      setLoadData(false);
    },
    [loadData]
  );

  const handleResponse = response => {
    console.log(response.Responses);
    let resoneData = response.Responses;
    if (resoneData) {
      Object.keys(resoneData).forEach(element => {
        resoneData[element].forEach(record => {
          record.item = decrypt(record.item, getPassword());
        });
      });
      setData(resoneData);
    }
  };

  return [setLoadData, error, loading, data];
};

export default useGenerateReportData;
