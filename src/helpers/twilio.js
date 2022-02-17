import 'dotenv/config';
import twilio from 'twilio';

const { TWILIO_SMS_SID, TWILIO_SMS_TOKEN, MY_PHONE_NUMBER, TWILIO_PHONE_NUMBER  } = process.env;
const client = twilio(TWILIO_SMS_SID, TWILIO_SMS_TOKEN);

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