export default class PasswordUtil {
    static generateRandom(length: number) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = '';
        for (let i = 0, n = charset.length; i < length; ++i)
            result += charset.charAt(Math.floor(Math.random() * n));
        return result;
    }
}