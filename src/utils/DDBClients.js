import * as AWS from "aws-sdk";
import { decrypt, encrypt } from "./Encryption";
import { getPassword } from "./Authentication";

const configuration = {
  region: "decrypt(process.env.REACT_APP_AWS_REGION, getPassword())",
  secretAccessKey:
    "decrypt(process.env.REACT_APP_AWS_SECRETKEY, getPassword())",
  accessKeyId: "decrypt(process.env.REACT_APP_AWS_ACCESSKEY, getPassword())",
  correctClockSkew: true,
};

const docClient = new AWS.DynamoDB.DocumentClient(configuration);

export const putData = (tableName, hashKey, data) => {
  const encryptedData = encrypt(data, getPassword());
  const recordToBeAdded = {
    year_month: hashKey,
    item: encryptedData,
  };
  var params = {
    TableName: tableName,
    Item: recordToBeAdded,
  };

  return docClient.put(params).promise();
};

export const getData = (tableName, date) => {
  const dateParts = date.split("-");
  const hashKey = dateParts[0] + "-" + dateParts[1];
  var params = {
    TableName: tableName,
    KeyConditionExpression: "year_month = :hkey",
    ExpressionAttributeValues: {
      ":hkey": hashKey,
    },
  };

  return docClient.query(params).promise();
};
