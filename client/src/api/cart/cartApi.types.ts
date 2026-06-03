export type CartItemResponse = {
  cartItemId: string;
  productId: string;
  productName: string;
  productPrice: number;
  imageUrl?: string;
  purchaseQuantity: number;
};

export type UpdateCartItemQuantityRequest = {
  purchaseQuantity: number;
};

export type UpdateCartItemQuantityResponse = {
  cartItemId: string;
  purchaseQuantity: number;
};
