module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING },
      username: { type: DataTypes.STRING, unique: true },
      vorname: { type: DataTypes.STRING },
      nachname: { type: DataTypes.STRING },
      datum: { type: DataTypes.DATE },
    },
    {
      tableName: "user",
      timestamps: false,
    }
  );
  return User;
};

/*const { sequelize } = require("../modernDBConnection");
const { Model, DataTypes } = require("sequelize");
const { Entry } = require("./Entry");
class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING, unique: true },
    vorname: { type: DataTypes.STRING },
    nachname: { type: DataTypes.STRING },
    datum: { type: DataTypes.DATE },
  },
  { sequelize, modelName: "user", tableName: "user", timestamps: false }
);
/*
User.associate = (models) => {
  User.hasMany(models.Entry, {
    foreignKey: "userId",
    as: "entries",
  });
};
*/
//User.hasMany(Entry, { as: "entities", foreignKey: "userId" });

//exports.User = User;
