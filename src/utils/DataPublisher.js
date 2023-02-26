import { SCHEMA } from '../data_model';
import { getPassword } from './Authentication';
import { getData, putData } from './DDBClients';
import { decrypt } from './Encryption';

export class DataPublisher {
  static validateSchema(data, table) {
    const errors = [];
    if (!Object.keys(SCHEMA).includes(table)) {
      errors.push('Invalid: Provided table name is invalid.');
    } else {
      const schema = SCHEMA[table];
      const schemaAttributes = new Set(Object.keys(schema.item));
      const dataAttributes = new Set(Object.keys(data));

      const schemaCompareResult = this.compareSets(
        schemaAttributes,
        dataAttributes
      );
      errors.push(...schemaCompareResult);
    }

    return errors;
  }

  static compareSets(set1, set2) {
    const errors = [];
    Array.from(set1).forEach((item) => {
      if (!set2.has(item)) {
        errors.push('Missing: Item is missing ' + item + ' attribute.');
      }
    });
    Array.from(set2).forEach((item) => {
      if (!set1.has(item)) {
        errors.push('Extra: Item has extra ' + item + ' attribute.');
      }
    });

    return errors;
  }

  static async publishData(tableName, newItem, newItemKey) {
    try {
      await this.loadData(tableName, newItem, newItemKey);
    } catch (error) {
      throw error;
    }
  }

  static async loadData(tableName, newItem, newItemKey) {
    try {
      const getDataClient = getData(tableName, newItemKey);
      if (getDataClient !== null) {
        await getDataClient
          .then((response) => {
            this.handleResponse(response, tableName, newItemKey, newItem);
          })
          .catch((err) => {
            console.log(err);
            throw new Error('Error occured while polling data. Try again!!!');
          });
      } else {
        throw new Error("Oops! Couldn't find the credential.");
      }
    } catch (err) {
      throw err;
    }
  }

  static async handleResponse(response, tableName, newItemKey, newItem) {
    try {
      if (response.Count > 0) {
        const decryptedData = decrypt(response.Items[0].item, getPassword());
        decryptedData.push(...newItem);
        await this.uploadData(tableName, newItemKey, decryptedData);
      } else {
        await this.uploadData(tableName, newItemKey, newItem);
      }
    } catch (error) {
      throw error;
    }
  }

  static async uploadData(tableName, newItemKey, newItem) {
    if (newItem !== null) {
      const putDataDDBClient = putData(tableName, newItemKey, newItem);
      if (putDataDDBClient !== null) {
        await putDataDDBClient
          .then(() => {
            console.log('Uploaded successfully!');
          })
          .catch((err) => {
            console.log(err);
            throw new Error('Error occured!');
          });
      } else {
        throw new Error(
          "Couldn't put DDB client. Make sure you have right credentials."
        );
      }
    } else {
      throw new Error('Error occured!');
    }
  }
}
