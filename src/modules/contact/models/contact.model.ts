import Sequelize from 'sequelize';

import sequelize from '../../../database/connection';

const Model = Sequelize.Model;

class Contact extends Model {}

Contact.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    contactType: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    deletedAt: "deletedAt",
    modelName: "contact",
  }
)

export default Contact;