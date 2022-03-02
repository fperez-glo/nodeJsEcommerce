const { createDecipheriv, createCipheriv, scryptSync } = await import('crypto');
//import { createDecipheriv, createCipheriv, scryptSync } from 'crypto';
import 'dotenv/config';
const { CRYPTO_SECRET } = process.env;

const algorithm = "aes-256-cbc";
const iVector = scryptSync(CRYPTO_SECRET, 'GfG', 16);
const Securitykey = scryptSync(CRYPTO_SECRET, 'GfG', 32);   

export const encrypt = (inputToEncode) => {

    //Encriptador
    const cipher = createCipheriv(algorithm, Securitykey, iVector);

    let dataEncrypted = cipher.update(inputToEncode, 'utf-8', 'hex');
    return dataEncrypted += cipher.final("hex");
};

export const  decrypt = (inputToDecode) => {
    //Desencriptador
    const decipher = createDecipheriv(algorithm, Securitykey, iVector);

    let dataDecrypted = decipher.update(inputToDecode, 'hex', 'utf-8');
    return dataDecrypted += decipher.final('utf8');
};

export const compare = (notEncryptedInput, encryptedInput) => {
    const decryptInput = decrypt(encryptedInput);
    return decryptInput === notEncryptedInput  ?  true : false;
};
