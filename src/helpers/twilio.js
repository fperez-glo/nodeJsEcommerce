import 'dotenv/config';
import twilio from 'twilio';

const { TWILIO_SMS_SID, TWILIO_SMS_TOKEN, MY_PHONE_NUMBER, TWILIO_PHONE_NUMBER, TWILIO_PHONE_WP_NUMBER  } = process.env;
const client = twilio("AC95f5721120c5029e9a0778322e522828", "91bf1cdf1ffd97eb1e3b94760fc2c38a");

console.log('TWILIO_SMS_SID:',TWILIO_SMS_SID)

export const sendSMS = async(text, addressee = MY_PHONE_NUMBER) => {
    try {
        client.messages.create({
            body: text,
            from: TWILIO_PHONE_NUMBER,
            to: addressee,
        });
    } catch (error) {
        throw error;
    };
};

export const sendWhatsapp = async(text, addressee = MY_PHONE_NUMBER) => {
    try {
        client.messages.create({
            body: text,
            from: `whatsapp:${TWILIO_PHONE_WP_NUMBER}`,
            to: `whatsapp:${addressee}`,
        });
    } catch (error) {
        throw error;
    };
};