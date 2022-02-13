const { createDecipheriv, createCipheriv, scryptSync } = await import('crypto');
import 'dotenv/config';
const { CRYPTO_SECRET } = process.env;

export default class Crypto {

    constructor() {
        this.algorithm = "aes-256-cbc";
        this.iVector = scryptSync(CRYPTO_SECRET, 'GfG', 16);
        this.Securitykey = scryptSync(CRYPTO_SECRET, 'GfG', 32);
        }
        

    encrypt (inputToEncode) {

        //Encriptador
        const cipher = createCipheriv(this.algorithm, this.Securitykey, this.iVector);

        let dataEncrypted = cipher.update(inputToEncode, 'utf-8', 'hex');
        return dataEncrypted += cipher.final("hex");
    };

    decrypt (inputToDecode) {
        //Desencriptador
        const decipher = createDecipheriv(this.algorithm, this.Securitykey, this.iVector);

        let dataDecrypted = decipher.update(inputToDecode, 'hex', 'utf-8');
        return dataDecrypted += decipher.final('utf8');
    };
};