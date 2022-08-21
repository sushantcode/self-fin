import * as AWS from "aws-sdk";
import { decrypt, encrypt } from "./Encryption";
import { getPassword } from "./Authentication";

const configuration = {
  region: "decrypt(process.env.REACT_APP_AWS_REGION, getPassword())",
  secretAccessKey:
    "decrypt(process.env.REACT_APP_AWS_SECRETKEY, getPassword())",
  accessKeyId: "decrypt(process.env.REACT_APP_AWS_ACCESSKEY, getPassword())",
  correctClockSkew: true
};

const docClient = new AWS.DynamoDB.DocumentClient(configuration);

export const putData = (tableName, hashKey, data) => {
  const encryptedData = encrypt(data, getPassword());
  const recordToBeAdded = {
    year_month: hashKey,
    item: encryptedData
  };
  var params = {
    TableName: tableName,
    Item: recordToBeAdded
  };

  return docClient.put(params).promise();
};

export const getData = (tableName, date) => {
  const hashKey = date.substring(0, 7);
  var params = {
    TableName: tableName,
    KeyConditionExpression: "year_month = :hkey",
    ExpressionAttributeValues: {
      ":hkey": hashKey
    }
  };

  return docClient.query(params).promise();
};

export const getBatchData = (tableList, keyList) => {
  const keysObject =
    keyList && Array.isArray(keyList)
      ? keyList.map(element => {
          return {
            HashKey: element
          };
        })
      : null;
  const requestItems = {};
  if (keysObject && tableList && Array.isArray(tableList)) {
    tableList.forEach(element => {
      requestItems[element] = {
        Keys: keysObject
      };
    });
  }
  const params = {
    RequestItems: requestItems
  };
  return docClient.batchGet(params).promise();
};
