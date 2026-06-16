import { cartItemsDB, ordersDB, productsDB } from '../../src/db.js';
import { Product } from '../../src/modules/products/product.model.js';

export const resetTestDatabase = () => {
  productsDB.clear();
  cartItemsDB.clear();
  ordersDB.clear();
};

export const resetOrderDatabase = () => {
  ordersDB.clear();
};

export const seedProduct = (productId: string, product: Product) => {
  productsDB.set(productId, product);
};
