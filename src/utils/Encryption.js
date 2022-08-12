import CryptoJS from "crypto-js";

const keySalt = process.env.REACT_APP_ENCRYPTION_SALT;

export const encrypt = (inputText, userKey) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(inputText),
    userKey + keySalt
  ).toString();
  const base64Encoded = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(encrypted)
  );
  return base64Encoded;
};

export const decrypt = (inputText, userKey) => {
  const base64Decoded = CryptoJS.enc.Base64.parse(inputText).toString(
    CryptoJS.enc.Utf8
  );
  const decrytedObj = CryptoJS.AES.decrypt(
    base64Decoded,
    userKey + keySalt
  ).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrytedObj);
};
