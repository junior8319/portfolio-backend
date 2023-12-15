'use strict';
const { Model } = require('sequelize');

class Stack extends Model {}

module.exports = (sequelize, DataTypes) => {
  Stack.init(
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
      imageUrl: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false,
      },
      stackDocsUrl: {
        type: DataTypes.STRING,
      },
      stackUrl: {
        type: DataTypes.STRING,
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
      modelName: 'Stack',
      tableName: 'stacks',
      underscored: true,
    }
  );

  return Stack;
};

Stack.associate = (models) => {
  Stack.belongsToMany(
    models.Project,
    {
      through: models.StackProject,
      // foreignKey: 'stackId',
      constraints: false,
    },
  );
};
