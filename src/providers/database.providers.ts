
//TODO: REEMPLAZAR ESTE PROVIDER POR MONGOOSE CONECTANDOSE A MONGO ATLAS
// import { Sequelize } from 'sequelize-typescript';

// export const databaseProviders = [
//   {
//     provide: process.env.DB_PROVIDE || 'MSSQL',
//     useFactory: async () => {
//       const sequelize = new Sequelize({
//         dialect: 'mysql',
//         port: parseInt(process.env.DB_PORT, 10) || -1,
//         host: process.env.DB_HOST || '',
//         username: process.env.DB_USERNAME || '',
//         password: process.env.DB_PASSWORD || '',
//         database: process.env.DB_NAME || '',
//         dialectOptions: {
//           options: {
//             encrypt: Boolean(process.env.DB_ENCRYPT) || true,
//             requestTimeout: parseInt(process.env.DB_REQUEST_TIMEOUT,10) * 1000,
//           },
//           instanceName: process.env.DB_INSTANCENAME || '',
//         },
//       });
//       await sequelize.sync();
//       return sequelize;
//     },
//   },
// ];
