import { http, HttpResponse } from 'msw';

const cartItems = [
  {
    cartItemId: '1',
    productId: '1',
    productName: '상품이름A',
    productPrice: 35000,
    imageUrl: 'https://placehold.co/80x80',
    purchaseQuantity: 2,
  },
  {
    cartItemId: '2',
    productId: '2',
    productName: '상품이름B',
    productPrice: 25000,
    imageUrl: 'https://placehold.co/80x80',
    purchaseQuantity: 2,
  },
];

export const handlers = [
  http.get(`*/cart/items`, () => HttpResponse.json(cartItems)),

  http.patch(
    `*/cart/items/:cartItemId`,
    () => new HttpResponse(null, { status: 204 }),
  ),

  http.delete(
    `*/cart/items/:cartItemId`,
    () => new HttpResponse(null, { status: 204 }),
  ),
];
