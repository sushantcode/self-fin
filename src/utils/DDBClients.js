import * as AWS from 'aws-sdk';
import { decrypt, encrypt } from './Encryption';
import { getPassword } from './Authentication';

const awsregion = process.env.REACT_APP_AWS_REGION;
const secretKey = process.env.REACT_APP_AWS_SECRETKEY;
const accessKey = process.env.REACT_APP_AWS_ACCESSKEY;

const getDdbClient = () => {
    var configuration = {};
    if (getPassword() !== null) {
        configuration = {
            region: decrypt(awsregion, getPassword()),
            secretAccessKey: decrypt(secretKey, getPassword()),
            accessKeyId: decrypt(accessKey, getPassword()),
            correctClockSkew: true
        };
        const docClient = new AWS.DynamoDB.DocumentClient(configuration);
        return docClient;
    }
    return null;
};

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
    const docClient = getDdbClient();
    return docClient ? docClient.put(params).promise() : null;
};

export const getData = (tableName, date) => {
    const hashKey = date.substring(0, 7);
    var params = {
        TableName: tableName,
        KeyConditionExpression: 'year_month = :hkey',
        ExpressionAttributeValues: {
            ':hkey': hashKey
        }
    };
    const docClient = getDdbClient();
    return docClient ? docClient.query(params).promise() : null;
};

export const getBatchData = (tableList, keyList) => {
    const keysObject =
        keyList && Array.isArray(keyList)
            ? keyList.map((element) => {
                  return {
                      year_month: element
                  };
              })
            : null;
    const requestItems = {};
    if (keysObject && tableList && Array.isArray(tableList)) {
        tableList.forEach((element) => {
            requestItems[element] = {
                Keys: keysObject
            };
        });
    }
    const params = {
        RequestItems: requestItems
    };
    const docClient = getDdbClient();
    return docClient ? docClient.batchGet(params).promise() : null;
};
