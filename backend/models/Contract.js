

module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define(
    "contract",
    {


     // paused: {type: DataTypes.boolean},

     // intervall: { type: DataTypes.DOUBLE },
     //  revenue: { type: DataTypes.DOUBLE },
     // unlimited: { type: DataTypes.DOUBLE },
      name: { type: DataTypes.STRING },
     // actual_value: { type: DataTypes.DOUBLE },
      startdate: { type: DataTypes.DATE },
      enddate: { type: DataTypes.DATE },
      lastcreateddate: { type: DataTypes.DATE },
    //  revenue: {type: DataTypes.DOUBLE},
      userId: {
        type: DataTypes.INTEGER,

        field: "user_id", // Hier wird das Feld umbenannt
      },
      kategorie_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "contract",
      timestamps: false,
    }
  );
  return Contract;
};
