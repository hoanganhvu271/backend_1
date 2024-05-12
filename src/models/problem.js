const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Problem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

<<<<<<< HEAD
            // console.log(models.Test)

=======
            // //console.log(models.Test)
        
>>>>>>> 1b34965137f6fd98da198142b0c2db0c634fc911
        }
    }
    Problem.init(
        {
            MaVanDe: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            TenVanDe: {
                type: DataTypes.STRING,
            },
            ThoiGianTao: DataTypes.DATE,
        },
        {
            // options
            sequelize,
            modelName: 'Problem',
            tableName: 'Problem',
            timestamps: false,

        },
    );

    Problem.removeAttribute('id');
    return Problem;
};