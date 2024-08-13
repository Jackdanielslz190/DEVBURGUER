import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      price: Sequelize.INTEGER,
      path: Sequelize.STRING,
      offer: Sequelize.BOOLEAN,
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3001/product-file/${this.path}`;
        },
      },
    }, 
    {
      sequelize,
    });
  
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, { // Corrigido 'category' para 'Category'
      foreignKey: 'category_id', // Corrigido 'foreigKey' para 'foreignKey'
      as: 'category',
    });
  }
}

export default Product;

