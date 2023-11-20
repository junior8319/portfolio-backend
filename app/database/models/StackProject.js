'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StackProject extends Model {}
  
  StackProject.init({
    stackId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StackProject',
    tableName: 'stacksProjects',
    underscored: true,
    timestamps: false,
  });
  return StackProject;
};