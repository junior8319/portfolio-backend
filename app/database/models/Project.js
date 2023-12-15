'use strict';
const { Model } = require('sequelize');

class Project extends Model {}

module.exports = (sequelize, DataTypes) => {
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      snapshot: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false,
      },
      projectUrl: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      startDate: {
        type: DataTypes.DATE,
      },
      finishDate: {
        type: DataTypes.DATE,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Project',
      tableName: 'projects',
      underscored: true,
    }
  );

  return Project;
};

Project.associate = (models) => {
  Project.belongsToMany(
    models.Stack,
    {
      through: models.StackProject,
      // foreignKey: 'projectId',
      constraints: false,
    },
  );
};
