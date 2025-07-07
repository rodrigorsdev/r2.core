import * as CryptoJS from 'crypto-js';

export default class SecurityUtil {

    static aesEncrypt(data: any, key: string) {
        const encryptData = CryptoJS.AES.encrypt(JSON.stringify(data), key);
        return encryptData.toString();
    }

    static aesDecrypt(data: any, key: string) {
        const bytes = CryptoJS.AES.decrypt(data, key);

        if (bytes.toString())
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        return data;
    }
}