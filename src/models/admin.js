const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // console.log(models.Test)
    }
  }
  Admin.init(
    {
      UserName: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      Email: DataTypes.STRING,
      Facebook: DataTypes.STRING,
      Instagram: DataTypes.STRING,
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      Pass: DataTypes.STRING,
      Avatar: DataTypes.STRING,
    },
    {
      // options
      sequelize,
      modelName: "Admin",
      tableName: "admin",
      timestamps: false,
    }
  );

  Admin.removeAttribute("username");
  return Admin;
};
