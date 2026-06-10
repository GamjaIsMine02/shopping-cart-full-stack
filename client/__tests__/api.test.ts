import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../src/mocks/server';
import {
  deleteCartItemApi,
  getCartItemsApi,
  patchCartItemQuantityApi,
} from '../src/api/cart/cartApi';
import { ApiError } from '../src/api/errors/ApiError';

describe('cartApi', () => {
  describe('getCartItemsApi', () => {
    it('장바구니 목록 조회에 성공하면 장바구니 상품 목록을 반환한다', async () => {
      const cartItems = await getCartItemsApi();

      expect(cartItems).toEqual([
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
      ]);
    });

    it('장바구니 목록이 비어 있으면 빈 배열을 반환한다', async () => {
      server.use(
        http.get('*/cart/items', () => {
          return HttpResponse.json([]);
        }),
      );

      const cartItems = await getCartItemsApi();

      expect(cartItems).toEqual([]);
    });

    it('장바구니 목록 조회 실패 시 ApiError를 던진다', async () => {
      server.use(
        http.get('*/cart/items', () => {
          return HttpResponse.json(
            {
              code: 'INTERNAL_SERVER_ERROR',
              message: '서버 내부 오류가 발생했습니다.',
            },
            {
              status: 500,
            },
          );
        }),
      );

      await expect(getCartItemsApi()).rejects.toBeInstanceOf(ApiError);
    });

    it('장바구니 목록 조회 실패 시 status, code, message를 ApiError에 담는다', async () => {
      server.use(
        http.get('*/cart/items', () => {
          return HttpResponse.json(
            {
              code: 'INTERNAL_SERVER_ERROR',
              message: '서버 내부 오류가 발생했습니다.',
            },
            {
              status: 500,
            },
          );
        }),
      );

      try {
        await getCartItemsApi();
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);

        if (error instanceof ApiError) {
          expect(error.status).toBe(500);
          expect(error.code).toBe('INTERNAL_SERVER_ERROR');
          expect(error.message).toBe('서버 내부 오류가 발생했습니다.');
        }
      }
    });
  });

  describe('deleteCartItemApi', () => {
    it('장바구니 상품 삭제에 성공하면 undefined를 반환한다', async () => {
      await expect(deleteCartItemApi('1')).resolves.toBeUndefined();
    });

    it('장바구니 상품 삭제 실패 시 ApiError를 던진다', async () => {
      server.use(
        http.delete('*/cart/items/:cartItemId', () => {
          return HttpResponse.json(
            {
              code: 'CART_ITEM_NOT_FOUND',
              message: '존재하지 않는 장바구니 상품입니다.',
            },
            {
              status: 404,
            },
          );
        }),
      );

      await expect(deleteCartItemApi('999')).rejects.toBeInstanceOf(ApiError);
    });

    it('장바구니 상품 삭제 실패 시 status, code, message를 ApiError에 담는다', async () => {
      server.use(
        http.delete('*/cart/items/:cartItemId', () => {
          return HttpResponse.json(
            {
              code: 'CART_ITEM_NOT_FOUND',
              message: '존재하지 않는 장바구니 상품입니다.',
            },
            {
              status: 404,
            },
          );
        }),
      );

      try {
        await deleteCartItemApi('999');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);

        if (error instanceof ApiError) {
          expect(error.status).toBe(404);
          expect(error.code).toBe('CART_ITEM_NOT_FOUND');
          expect(error.message).toBe('존재하지 않는 장바구니 상품입니다.');
        }
      }
    });
  });

  describe('patchCartItemQuantityApi', () => {
    it('장바구니 상품 수량 변경에 성공하면 변경된 수량 정보를 반환한다', async () => {
      server.use(
        http.patch('*/cart/items/:cartItemId', async ({ params, request }) => {
          const body = (await request.json()) as {
            purchaseQuantity: number;
          };

          return HttpResponse.json(
            {
              cartItemId: params.cartItemId,
              purchaseQuantity: body.purchaseQuantity,
            },
            {
              status: 200,
            },
          );
        }),
      );

      const result = await patchCartItemQuantityApi('1', {
        purchaseQuantity: 3,
      });

      expect(result).toEqual({
        cartItemId: '1',
        purchaseQuantity: 3,
      });
    });

    it('유효하지 않은 구매 수량이면 ApiError를 던진다', async () => {
      server.use(
        http.patch('*/cart/items/:cartItemId', () => {
          return HttpResponse.json(
            {
              code: 'INVALID_PURCHASE_QUANTITY',
              message: '유효하지 않은 구매 수량입니다.',
            },
            {
              status: 400,
            },
          );
        }),
      );

      await expect(
        patchCartItemQuantityApi('1', {
          purchaseQuantity: 0,
        }),
      ).rejects.toBeInstanceOf(ApiError);
    });

    it('장바구니 상품 수량 변경 실패 시 status, code, message를 ApiError에 담는다', async () => {
      server.use(
        http.patch('*/cart/items/:cartItemId', () => {
          return HttpResponse.json(
            {
              code: 'INVALID_PURCHASE_QUANTITY',
              message: '유효하지 않은 구매 수량입니다.',
            },
            {
              status: 400,
            },
          );
        }),
      );

      try {
        await patchCartItemQuantityApi('1', {
          purchaseQuantity: 0,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);

        if (error instanceof ApiError) {
          expect(error.status).toBe(400);
          expect(error.code).toBe('INVALID_PURCHASE_QUANTITY');
          expect(error.message).toBe('유효하지 않은 구매 수량입니다.');
        }
      }
    });

    it('존재하지 않는 장바구니 상품이면 ApiError를 던진다', async () => {
      server.use(
        http.patch('*/cart/items/:cartItemId', () => {
          return HttpResponse.json(
            {
              code: 'CART_ITEM_NOT_FOUND',
              message: '존재하지 않는 장바구니 상품입니다.',
            },
            {
              status: 404,
            },
          );
        }),
      );

      await expect(
        patchCartItemQuantityApi('999', {
          purchaseQuantity: 3,
        }),
      ).rejects.toBeInstanceOf(Error);
    });
  });
});
