const { Model, DataTypes, INTEGER, BOOLEAN, DATE } = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

const sequelize = require('./sequelize');

class user extends Model {}

user.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duns: {
        type: INTEGER,
        allowNull: true,
      },
  
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user',
  }
);

const User = sequelize.define('User', {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  active: DataTypes.BOOLEAN,
  role: DataTypes.STRING
}, {
  timestamps: false,
  createdAt: true,
  updatedAt: true,
});

user.beforeSave((user) => {
  if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  }
});

user.prototype.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });

  // full method from this link: https://stackoverflow.com/questions/54288226/how-correct-create-new-entry-in-sequelize-js-orm //
};

module.exports = user;
