"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Review extends Model {
		static associate(models) {
			Review.belongsTo(models.Store, {
				foreignKey: "storeId"
			});
			Review.belongsTo(models.Admin, {
				foreignKey: "adminId"
			});
		}
  }
	Review.init({
		review: DataTypes.TEXT,
		taste_rating: DataTypes.INTEGER,
		service_rating: DataTypes.INTEGER,
		price_rating: DataTypes.INTEGER,
		hygiene_rating: DataTypes.INTEGER,
		storeId: DataTypes.INTEGER,
		adminId: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: "Review",
	});
	return Review;
};