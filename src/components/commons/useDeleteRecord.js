import { useEffect, useState } from 'react';
import { putData } from '../../utils/DDBClients';

const useDeleteRecord = (data, table, date) => {
  const [updateData, setUpdateData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (updateData && date.length !== 0) {
      setLoading(true);
      setError('');
      const hashKey = date.substring(0, 7);
      callUpdateData(data, table, hashKey);
    }
    setUpdateData(false);
  }, [updateData]);

  const callUpdateData = async (data, tableName, hashKey) => {
    try {
      const putDataDdbClient = putData(tableName, hashKey, data);
      if (putDataDdbClient !== null) {
        await putDataDdbClient
          .then(() => {
            setError('');
          })
          .catch((err) => {
            console.log(err);
            setError('Error occured!');
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setError("Oops! Couldn't find the credential.");
        setLoading(false);
      }
    } catch (err) {
      setError('Oops! Your provided credentials is not right.');
      setLoading(false);
    }
  };

  return [setUpdateData, error, loading];
};

export default useDeleteRecord;
