const dotenv = require('dotenv').config();

module.exports = {
    mongodb: {
        connectionString: process.env.MONGOCONNECTSTRING,
    },
    firebaseConn:{
        "type": process.env.FIREBASECONN_TYPE,
        "project_id": process.env.FIREBASECONN_PROJECT_ID,
        "private_key_id": process.env.FIREBASECONN_PRIV_KEY_ID,
        "private_key": process.env.FIREBASECONN_PRIV_KEY,
        "client_email": process.env.FIREBASECONN_CLIENT_EMAIL,
        "client_id": process.env.FIREBASECONN_CLIENT_ID,
        "auth_uri": process.env.FIREBASECONN_AUTH_URI,
        "token_uri": process.env.FIREBASECONN_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.FIREBASECONN_AUTH_PROV_CERT_URL,
        "client_x509_cert_url": process.env.FIREBASECONN_CERT_URL
      },
}
