import { useEffect, useState } from "react";
import { getPassword } from "../../utils/Authentication";
import { getData, putData } from "../../utils/DDBClients";
import { decrypt } from "../../utils/Encryption";

const useUploadRecord = (table, data) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [addData, setAddData] = useState(false);

  useEffect(() => {
    if (addData && data !== null) {
      setUploading(true);
      setError("");
      loadData(table, data);
    }
    setAddData(false);
  }, [addData]);

  const loadData = async (tableName, newItem) => {
    const yearMonth = newItem.date.substring(0, 7);
    const getDataClient = getData(tableName, yearMonth);
    if (getDataClient !== null) {
      await getDataClient
        .then((response) => {
          handleResponse(response, tableName, yearMonth, newItem);
        })
        .catch((err) => {
          console.log(err);
          setError("Error occured while polling data. Try again!!!");
          setUploading(false);
        });
    } else {
      setError(
        "Couldn't get DDB client. Make sure you have right credentials."
      );
      setUploading(false);
    }
  };

  const handleResponse = (response, tableName, yearMonth, newItem) => {
    console.log(response.Count + " items retrieved.");
    if (response.Count > 0) {
      const decryptedData = decrypt(response.Items[0].item, getPassword());
      decryptedData.push(newItem);
      uploadData(tableName, yearMonth, decryptedData);
    } else {
      const newItemsList = new Array(0);
      newItemsList.push(newItem);
      uploadData(tableName, yearMonth, newItemsList);
    }
  };

  const uploadData = async (tableName, yearMonth, newItemsList) => {
    if (newItemsList !== null) {
      const putDataDDBClient = putData(tableName, yearMonth, newItemsList);
      if (putDataDDBClient !== null) {
        await putDataDDBClient
          .then(() => {
            console.log("Success");
            setError("");
          })
          .catch((err) => {
            console.log(err);
            setError("Error occured!");
          })
          .finally(() => {
            setUploading(false);
          });
      } else {
        setError(
          "Couldn't put DDB client. Make sure you have right credentials."
        );
        setUploading(false);
      }
    } else {
      setError("Error occured!");
      setUploading(false);
    }
  };
  return [setAddData, error, uploading];
};

export default useUploadRecord;
