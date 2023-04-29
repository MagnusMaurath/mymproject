module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id", // Hier wird das Feld umbenannt
      },
      color: { type: DataTypes.STRING },
      revenue: { type: DataTypes.BOOLEAN },
      icon: { type: DataTypes.STRING },
    },
    {
      tableName: "kategorie",
      timestamps: false,
    }
  );
  return Category;
};
