import CryptoJS from "crypto-js";

const keySalt = process.env.REACT_APP_ENCRYPTION_SALT;

export const encrypt = (inputText, userKey) => {
  const plainText = JSON.stringify(inputText);
  const key = userKey + keySalt;
  console.log(plainText);
  console.log(userKey);
  console.log(keySalt);
  console.log(key);
  const encrypted = CryptoJS.AES.encrypt(plainText, key).toString();
  console.log(encrypted);
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
