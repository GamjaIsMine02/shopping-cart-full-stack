import { CartItem } from './modules/cart/cartItem.model.js';
import { Product } from './modules/products/product.model.js';

export const productsDB = new Map<string, Product>();

export const cartItemsDB = new Map<string, CartItem>();

const seedProducts = [
  new Product({
    productId: 'product-1',
    productName: '상품이름A',
    productPrice: 35000,
    remainingQuantity: 10,
    imageUrl: '/images/shoes-a.png',
  }),
  new Product({
    productId: 'product-2',
    productName: '상품이름B',
    productPrice: 25000,
    remainingQuantity: 99,
    imageUrl: '/images/shoes-b.png',
  }),
];

const seedCartItems = [
  new CartItem({
    cartItemId: 'cart-item-1',
    productId: 'product-1',
    purchaseQuantity: 2,
  }),
  new CartItem({
    cartItemId: 'cart-item-2',
    productId: 'product-2',
    purchaseQuantity: 2,
  }),
];

if (process.env.NODE_ENV !== 'test') {
  seedProducts.forEach((product) => {
    productsDB.set(product.productId, product);
  });

  seedCartItems.forEach((cartItem) => {
    cartItemsDB.set(cartItem.cartItemId, cartItem);
  });
}
