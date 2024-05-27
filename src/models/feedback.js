const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Feedback extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // //console.log(models.Test)
        }
    }
    Feedback.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            content: DataTypes.STRING,
            img_url: DataTypes.STRING,
            user_id: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: "Feedback",
            tableName: "Feedback",
            timestamps: false,
        }
    );

    Feedback.removeAttribute("id");
    return Feedback;
};
