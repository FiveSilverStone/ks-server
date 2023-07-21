"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Store extends Model {
		static associate(models) {
			Store.hasMany(models.Review, {
				foreignKey: "storeId"
			});
		}
  }
	Store.init({
		name: DataTypes.STRING,
		address: DataTypes.STRING,
		category: DataTypes.STRING,
		image: DataTypes.TEXT,
	}, {
		sequelize,
		modelName: "Store",
	});
	return Store;
};
