export type OrderResponse = {
  orderId: string;
  products: { productId: string; quantity: number }[];
  couponIds: string[];
  isIsland: boolean;
  priceInfo: {
    orderPrice: number;
    productDiscountPrice: number;
    deliveryDiscountPrice: number;
    deliveryFee: number;
    totalPrice: number;
  };
};

export type PostOrderRequest = {
  products: { productId: string; quantity: number }[];
  couponIds: string[];
};

export type PostOrderResponse = {
  orderId: string;
};

export type PatchOrderRequest = {
  coupons: string[];
  isIsland: boolean;
};

export type PatchOrderResponse = {
  priceInfo: {
    orderPrice: number;
    productDiscountPrice: number;
    deliveryDiscountPrice: number;
    deliveryFee: number;
    totalPrice: number;
  };
};

export type GetDiscountPriceRequest = {
  couponIds: string[];
};
