module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define(
    "entry",
    {
      name: { type: DataTypes.STRING },
      preis: { type: DataTypes.DOUBLE },
      datum: { type: DataTypes.DATE },
      revenue: {type: DataTypes.DOUBLE},
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id", // Hier wird das Feld umbenannt
      },
      categoryId: {
        type: DataTypes.INTEGER,
        field: "kategorie_id", // Hier wird das Feld umbenannt
      },
      contractId: {
        type: DataTypes.INTEGER,
        field: "contract_id", // Hier wird das Feld umbenannt
      },
    },
    {
      tableName: "ausgabe",
      timestamps: false,
    }
  );
  return Entry;
};

/*
const { sequelize } = require("../modernDBConnection");
const { Model, DataTypes } = require("sequelize");
const { User } = require("./User");
const { Category } = require("./Category");
class Entry extends Model {}
Entry.init(
  {
    name: { type: DataTypes.STRING },

    preis: { type: DataTypes.DOUBLE },
    datum: { type: DataTypes.DATE },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id", // Hier wird das Feld umbenannt
    },
    categoryId: {
      type: DataTypes.INTEGER,

      field: "kategorie_id", // Hier wird das Feld umbenannt
    },
  },
  { sequelize, modelName: "entry", tableName: "ausgabe", timestamps: false }
);


Entry.associate = (models) => {
  Entry.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });
  Entry.belongsTo(models.Category, {
    foreignKey: "categoryId",
    as: "category",
  });


};


exports.Entry = Entry;
*/
