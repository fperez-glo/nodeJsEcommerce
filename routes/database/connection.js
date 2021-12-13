module.exports = connections = {
  mysql: {
    client: "mysql",
    connection: {
      host: "192.168.0.135",
      user: "developer",
      password: "developer",
      database: "ecommerce",
      multipleStatements: true,
    },
    pool: { min: 2, max: 8 },
  },
  sqlite3: {
    client: "sqlite3",
    connection: {
      filename: "./db/ecommerce.sqlite",
    },

    pool: { min: 2, max: 8 },
    useNullAsDefault: true,
  },


  ///conections para sequelize ORM
  mysqlSeq: {
    db: "ecommerce",
    dbUser: "developer",
    dbPwd: "developer",
    server: { host: "192.168.0.14", dialect: "mysql", port:'3307' },
  },
  sqlite3Seq: {
    //FIXME: Tengo que revisar bien ya que no logro leer datos de la tabla "mensajes" que tiene la db de sqlite.
    server: { storage: "../../db/ecommerce.sqlite", dialect: "sqlite" },
  },

  //conections para mongoose ORM  
  //string para mongodb local
  //mongoConnString: `mongodb://developer:developer@faqu-pc:27017/ecommerce?authSource=admin`, 
  //string para mongodb atlas cloud
  mongoConnString: 'mongodb+srv://developer:developer@ecommerceatlas.js6ut.mongodb.net/ecommerce?retryWrites=true&w=majority',
};

