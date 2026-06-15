import {
  CouponContext,
  CouponDiscount,
  CouponDiscountResult,
  CouponPolicy,
} from '../interfaces/couponPolicy.interface.js';
import { createCouponCombinations } from './couponCombination.js';

export const priceCalculator = {
  calculateOrderPrice(context: CouponContext) {
    return context.orderProducts.reduce((sum, product) => {
      return sum + product.productPrice * product.quantity;
    }, 0);
  },

  calculateDeliveryFee(context: CouponContext) {
    const defaultFee = this.calculateOrderPrice(context) < 100000 ? 3000 : 0;
    const isIslandFee = context.isIsland ? 3000 : 0;

    return defaultFee + isIslandFee;
  },

  calculateBestCouponDiscount(
    context: CouponContext,
    coupons: CouponPolicy[],
  ): CouponDiscountResult {
    const combinations = createCouponCombinations(context, coupons);

    return combinations.reduce((bestDiscount, combination) => {
      const currentDiscount = this.calculateCouponDiscount(
        context,
        combination,
      );

      if (
        currentDiscount.totalDiscountPrice <= bestDiscount.totalDiscountPrice
      ) {
        return bestDiscount;
      }

      return currentDiscount;
    }, this.calculateCouponDiscount(context, []));
  },

  calculateSelectedCouponDiscount(
    context: CouponContext,
    selectedCoupons: CouponPolicy[],
  ): CouponDiscountResult {
    return this.calculateCouponDiscount(context, selectedCoupons);
  },

  calculateCouponDiscount(
    context: CouponContext,
    coupons: CouponPolicy[],
  ): CouponDiscountResult {
    const productDiscountPrice = this.calculateProductDiscountPrice(
      context,
      coupons,
    );
    const deliveryDiscountPrice = this.calculateDeliveryDiscountPrice(
      context,
      coupons,
    );

    return {
      couponIds: coupons.map((coupon) => coupon.couponId),
      productDiscountPrice,
      deliveryDiscountPrice,
      totalDiscountPrice: productDiscountPrice + deliveryDiscountPrice,
    };
  },
  calculateProductDiscountPrice(
    context: CouponContext,
    coupons: CouponPolicy[],
  ) {
    // 정액, 정율 쿠폰 분리
    const fixedDiscountCoupons = coupons.filter(
      (coupon) => coupon.discountType === 'FIXED',
    );
    const rateDiscountCoupons = coupons.filter(
      (coupon) => coupon.discountType === 'RATE',
    );

    // 정액 쿠폰 먼저 적용
    const fixedDiscountPrice = fixedDiscountCoupons.reduce((sum, coupon) => {
      const discount = coupon.calculateDiscount(context);

      return sum + discount.productDiscountPrice;
    }, 0);

    // 정액 쿠폰 할인을 적용한 후의 주문 금액
    const priceAfterFixedDiscount = Math.max(
      context.orderPrice - fixedDiscountPrice,
      0,
    );

    const rateDiscountPrice = rateDiscountCoupons.reduce((sum, coupon) => {
      const rateContext = {
        ...context,
        orderPrice: Math.max(priceAfterFixedDiscount - sum, 0),
      };

      const discount = coupon.calculateDiscount(rateContext);

      return sum + discount.productDiscountPrice;
    }, 0);

    return Math.min(fixedDiscountPrice + rateDiscountPrice, context.orderPrice);
  },
  calculateDeliveryDiscountPrice(
    context: CouponContext,
    coupons: CouponPolicy[],
  ) {
    const deliveryDiscountCoupons = coupons.filter(
      (coupon) => coupon.discountType === 'DELIVERY',
    );

    return deliveryDiscountCoupons.reduce((sum, coupon) => {
      return sum + coupon.calculateDiscount(context).deliveryDiscountPrice;
    }, 0);
  },
};
