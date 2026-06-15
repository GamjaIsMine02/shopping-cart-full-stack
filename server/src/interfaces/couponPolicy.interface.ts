export type CouponType = 'FIXED_AMOUNT' | 'BOGO' | 'FREE_SHIPPING' | 'RATE';

export type DiscountCouponType = 'FIXED' | 'RATE' | 'DELIVERY';

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

export type CouponDiscountResult = CouponDiscount & {
  couponIds: string[];
  totalDiscountPrice: number;
};

export interface CouponPolicy {
  couponId: string;
  expiresAt: Date;
  type: CouponType;
  discountType: DiscountCouponType;

  isApplicable(context: CouponContext): boolean;
  calculateDiscount(context: CouponContext): CouponDiscount;
}
