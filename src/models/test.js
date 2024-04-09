const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Test extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Test.hasMany(models.Question, { foreignKey: 'MaBaiThi' });
        }
    }
    Test.init(
        {
            MaBaiThi: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            TenBaithi: DataTypes.STRING,
            ThoiGianBatDau: DataTypes.STRING,
            ThoiGianThi: DataTypes.INTEGER,
            SoLuongCau: DataTypes.INTEGER,
            TheLoai: DataTypes.STRING,
            TrangThai: DataTypes.STRING
        },
        {
            // options
            sequelize,
            modelName: 'Test',
            tableName: 'baithi',
            timestamps: false,

        },
    );
    Test.removeAttribute('id');

    return Test;
};






