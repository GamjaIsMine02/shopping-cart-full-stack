import { CartItem } from './modules/cart/cartItem.model.js';
import { Order } from './modules/orders/orders.model.js';
import { Product } from './modules/products/product.model.js';

export const productsDB = new Map<string, Product>();

export const cartItemsDB = new Map<string, CartItem>();

export const ordersDB = new Map<string, Order>();
