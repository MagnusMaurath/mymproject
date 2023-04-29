const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connectedNew..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.entries = require("./Entry.js")(sequelize, DataTypes);
db.users = require("./User.js")(sequelize, DataTypes);
db.categories = require("./Category.js")(sequelize, DataTypes);
db.contracts = require("./Contract.js")(sequelize, DataTypes);
db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

//1 to many Relation
db.users.hasMany(db.entries, {
  foreingKey: "userId",
  as: "entry",
});

db.entries.belongsTo(db.users, {
  foreingKey: "userId",
  as: "user",
});

db.categories.hasMany(db.entries, {
  foreingKey: "categoryId",
  as: "entry",
});

db.entries.belongsTo(db.categories, {
  foreingKey: "categoryId",
  as: "category",
});

db.users.hasMany(db.categories, {
  foreingKey: "userId",
  as: "category",
});

db.categories.belongsTo(db.users, {
  foreingKey: "userId",
  as: "user",
});

db.contracts.hasMany(db.entries, {
  foreingKey: "contractId",
  as: "entry",
});

db.entries.belongsTo(db.contracts, {
  foreingKey: "contractId",
  as: "contract",
});


module.exports = db;

/*
const { Category } = require("./Category");
const { User } = require("./User");
const { Entry } = require("./Entry");

const initModels = (sequelize) => {
  const models = {};

  models.Category = Category.init(sequelize);
  models.User = User.init(sequelize);
  models.Entry = Entry.init(sequelize);

  // Assoziationen
  Object.keys(models).forEach((modelName) => {
    if ("associate" in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  return models;
};

module.exports = { initModels };
*/
