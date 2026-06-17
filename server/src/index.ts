import app from './app.js';
import { cartItemsDB, productsDB } from './db.js';
import { CartItem } from './modules/cart/cartItem.model.js';
import { Product } from './modules/products/product.model.js';

const PORT = process.env.PORT ?? 3000;

export const seedDevelopmentData = () => {
  if (productsDB.size > 0) return;

  const productA = new Product({
    productId: 'product-1',
    productName: '콜라',
    productPrice: 12000,
    remainingQuantity: 25,
    imageUrl: 'src/assets/coke.png',
  });
  const productB = new Product({
    productId: 'product-2',
    productName: '사이다',
    productPrice: 30000,
    remainingQuantity: 50,
    imageUrl: 'src/assets/cider.png',
  });

  productsDB.set(productA.productId, productA);
  productsDB.set(productB.productId, productB);

  cartItemsDB.set(
    'cart-item-1',
    new CartItem({
      cartItemId: 'cart-item-1',
      productId: productA.productId,
      purchaseQuantity: 5,
    }),
  );
  cartItemsDB.set(
    'cart-item-2',
    new CartItem({
      cartItemId: 'cart-item-2',
      productId: productB.productId,
      purchaseQuantity: 3,
    }),
  );
};

if (process.env.NODE_ENV === 'development') {
  seedDevelopmentData();
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
