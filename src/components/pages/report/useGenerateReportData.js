import React, { useEffect, useState } from "react";
import { mock_data, report, reportData } from "../../../Mock_data";
import { getPassword } from "../../../utils/Authentication";
import { tableNames } from "../../../utils/Constants";
import { getBatchData } from "../../../utils/DDBClients";
import { decrypt } from "../../../utils/Encryption";

const useGenerateReportData = (selectedDatesArr, selectedSubjects) => {
  const [loadData, setLoadData] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loadData && selectedSubjects.length > 0) {
      setLoading(true);
      setError("");
      const keys = selectedDatesArr.map((element) => element.substring(0, 7));
      // setData(report.expense[0].item);
      handleResponse(reportData);
      setLoading(false);

      // Call to dynamoDB tables for data
      // getBatchData(selectedSubjects, keys)
      //   .then(response => {
      //     handleResponse(response);
      //     setLoading(false);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     setError("Error occured while polling data. Try again!!!");
      //     setLoading(false);
      //   });
    }
    setLoadData(false);
  }, [loadData]);

  const handleResponse = (response) => {
    console.log(response.Responses);
    let resoneData = response.Responses;
    let combinedRecords = [];
    if (resoneData) {
      Object.keys(resoneData).forEach((element) => {
        resoneData[element].forEach((record) => {
          // const decryptedData = decrypt(record.item, getPassword());
          const decryptedData = record.item;
          // record.item = decryptedData
          combinedRecords = [
            ...combinedRecords,
            ...formatData(decryptedData, element),
          ];
        });
      });
      const totals = calculateTotals(combinedRecords);
      setData({
        data: combinedRecords,
        total_incoming: totals[0],
        total_outgoing: totals[1],
      });
    }
  };

  const formatData = (rawData, tableName) => {
    switch (tableName) {
      case tableNames.EXPENSE:
        return rawData && Array.isArray(rawData)
          ? rawData.map((record) => {
              return {
                subject: "Expense",
                description: record.category + " (" + record.location + ")",
                date: record.date,
                incoming: "-",
                outgoing: record.amount,
                remarks: record.remarks,
              };
            })
          : [];

      case tableNames.INCOME:
        return rawData && Array.isArray(rawData)
          ? rawData.map((record) => {
              return {
                subject: "Income",
                description: record.source,
                date: record.date,
                incoming: record.amount,
                outgoing: "-",
                remarks: record.remarks,
              };
            })
          : [];

      case tableNames.INVESTMENTS:
        return rawData && Array.isArray(rawData)
          ? rawData.map((record) => {
              return {
                subject: "Investments",
                description:
                  record.broker +
                  " (" +
                  record.stock +
                  (record.company.length !== 0 ? " - " + record.company : "") +
                  ")",
                date: record.date,
                incoming: "-",
                outgoing: record.amount,
                remarks: record.remarks,
              };
            })
          : [];

      case tableNames.LOANTOFRIEND:
        return rawData && Array.isArray(rawData)
          ? rawData.map((record) => {
              return {
                subject: "Loans",
                description: record.person,
                date: record.date,
                incoming: "-",
                outgoing: record.amount,
                remarks: record.remarks,
              };
            })
          : [];

      case tableNames.SAVING:
        return rawData && Array.isArray(rawData)
          ? rawData.map((record) => {
              return {
                subject: "Savings",
                description: record.where + " (At " + record.interest + "%)",
                date: record.date,
                incoming: "-",
                outgoing: record.amount,
                remarks: record.remarks,
              };
            })
          : [];

      case tableNames.HOME:
        return rawData && Array.isArray(rawData)
          ? rawData.map((record) => {
              return {
                subject: "Transfer-Home",
                description: record.service + " (To: " + record.receiver + ")",
                date: record.date,
                incoming: "-",
                outgoing: record.usd,
                remarks: record.remarks,
              };
            })
          : [];

      default:
        break;
    }
  };

  const calculateTotals = (combinedRecords) => {
    let totalIncoming = 0;
    let totalOutgoing = 0;
    combinedRecords.forEach((record) => {
      if (record.incoming === "-") {
        totalOutgoing += parseFloat(record.outgoing);
      } else {
        totalIncoming += parseFloat(record.incoming);
      }
    });
    return [totalIncoming, totalOutgoing];
  };

  return [setLoadData, error, loading, data];
};

export default useGenerateReportData;
