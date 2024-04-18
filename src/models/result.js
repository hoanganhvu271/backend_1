const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // console.log(models.Test)
      Result.belongsTo(models.Test, { foreignKey: "MaBaiThi" });
      //Result.belongsTo(models.Student, {foreignKey:"MaSinhVien"});
    }
  }
  Result.init(
    {
      MaKetQua: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      MaSinhVien: DataTypes.STRING,
      MaBaiThi: DataTypes.STRING,
      Diem: DataTypes.FLOAT,
    },
    {
      // options
      sequelize,
      modelName: "Result",
      tableName: "ketqua",
      timestamps: false,
    }
  );

  Result.removeAttribute("id");
  return Result;
};
