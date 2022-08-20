import { useEffect, useState } from "react";
import { mock_data } from "../../Mock_data";
import { getPassword } from "../../utils/Authentication";
import { getData } from "../../utils/DDBClients";
import { decrypt } from "../../utils/Encryption";

const useLoadRecords = (table, date) => {
  const [loadData, setLoadData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableVisibility, setTableVisibility] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(
    () => {
      if (loadData && date.length !== 0) {
        setLoading(true);
        setError("");
        if (tableVisibility) {
          setTableVisibility(false);
          setLoadData(false);
          setLoading(false);
        } else {
          //-------- TODO: Remove these lines-------
          console.log("Data loaded.");
          switch (table) {
            case "expense":
              setData(mock_data.expense);
              setTableVisibility(true);
              setLoading(false);
              break;

            case "investments":
              setData(mock_data.investments);
              setTableVisibility(true);
              setLoading(false);
              break;

            case "toHome":
              setData(mock_data.toHome);
              setTableVisibility(true);
              setLoading(false);
              break;

            default:
              setLoading(false);
              break;
          }
          //----------------------------------------
          //callGetData(table, date);
          setLoadData(false);
        }
      }
    },
    [loadData]
  );

  const callGetData = (tableName, hashKey) => {
    getData(tableName, hashKey)
      .then(response => {
        handleResponse(response, hashKey);
        setTableVisibility(true);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError("Error occured while polling data. Try again!!!");
        setLoading(false);
      });
  };

  const handleResponse = (response, hashKey) => {
    console.log(response.Count + " items retrieved.");
    if (response.Count > 0) {
      const decryptedData = decrypt(response.Items[0].item, getPassword());
      const result = {
        year_month: hashKey.substring(0, 7),
        item: decryptedData
      };
      setData(result);
    } else {
      const result = {
        year_month: hashKey.substring(0, 7),
        item: []
      };
      setData(result);
    }
  };

  return [setLoadData, error, loading, tableVisibility, data];
};

export default useLoadRecords;
