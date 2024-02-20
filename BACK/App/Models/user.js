const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('./sequelize');

class User extends Model {}

User.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duns: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at',
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

User.beforeSave((user) => {
  if (user.changed('password') || user.isNewRecord) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  }
});

User.prototype.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};
// full method from this link: https://stackoverflow.com/questions/54288226/how-correct-create-new-entry-in-sequelize-js-orm //

module.exports = User;
