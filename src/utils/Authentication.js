import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs';
import { decrypt, encrypt } from './Encryption';

const passwordEncrypter = process.env.REACT_APP_PASSWORD_ENCRYPTER;
const authPassword = process.env.REACT_APP_AUTH_PASSWORD;

export const validatePassword = (inputPassword) => {
    const hasMatched = bcrypt.compareSync(inputPassword, authPassword);

    return hasMatched;
};

export const writePassword = (password) => {
    const authToken = encrypt(password, passwordEncrypter);
    Cookies.set('authToken', authToken, {
        expires: 1,
        path: '/',
    });
};

export const isAuthenticated = () => {
    if (getPassword() && validatePassword(getPassword())) return true;
    else return false;
};

export const getPassword = () => {
    const authToken = Cookies.get('authToken');
    if (password) return decrypt(authToken, passwordEncrypter);
    return null;
};

export const logout = () => {
    Cookies.remove('authToken');
};
