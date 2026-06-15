export type CouponType = 'FIXED_AMOUNT' | 'BOGO' | 'FREE_SHIPPING' | 'RATE';

export type CouponContext = {
  orderProducts: {
    productId: string;
    productName: string;
    productPrice: number;
    quantity: number;
  }[];
  orderPrice: number;
  deliveryFee: number;
  isIsland: boolean;
  now: Date;
};

export type CouponDiscount = {
  productDiscountPrice: number;
  deliveryDiscountPrice: number;
};

export interface CouponPolicy {
  couponId: string;
  expiresAt: Date;
  type: CouponType;

  isApplicable(context: CouponContext): boolean;
  calculateDiscount(context: CouponContext): CouponDiscount;
}
