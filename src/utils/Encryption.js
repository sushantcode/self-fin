import CryptoJS from "crypto-js";

const keySalt = process.env.REACT_APP_ENCRYPTION_SALT;

export const encrypt = (inputText, userKey) => {
  const plainText = JSON.stringify(inputText);
  const key = userKey + keySalt;
  const encrypted = CryptoJS.AES.encrypt(plainText, key).toString();
  const base64Encoded = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(encrypted)
  );
  return base64Encoded;
};

export const decrypt = (inputText, userKey) => {
  const base64Decoded = CryptoJS.enc.Base64.parse(inputText).toString(
    CryptoJS.enc.Utf8
  );
  const key = userKey + keySalt;
  const decrytedObj = CryptoJS.AES.decrypt(base64Decoded, key).toString(
    CryptoJS.enc.Utf8
  );
  return JSON.parse(decrytedObj);
};
