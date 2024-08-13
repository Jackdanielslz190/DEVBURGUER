import Sequelize, { Model } from "sequelize";
import bcrypt from 'bcrypt';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: {
          type: Sequelize.VIRTUAL,
          set(value) {
            this.setDataValue('password', value);
          },
        },
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

 async comparePassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
