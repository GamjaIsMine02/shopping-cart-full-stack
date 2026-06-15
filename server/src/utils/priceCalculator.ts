import {
  CouponContext,
  CouponDiscount,
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

  calculateBestDiscount(
    context: CouponContext,
    coupons: CouponPolicy[],
  ): CouponDiscount {
    // 모든 조합에 대해 할인 금액을 계산하고, 그 중 제일 할인 금액이 큰 CouponDiscount로 반환

    // 1. 쿠폰 목록에 대해서 가능한 조합 가져오기
    const combinations = createCouponCombinations(context, coupons);

    // 가능한 쿠폰 조합들에 대해,
    // 1. 조합당 할인 금액 계산
    // 2. 이전 최고 할인 금액 불러오기
    // 3.
    return combinations.reduce(
      (bestDiscount, combination) => {
        // 이전 최고 할인 금액 가져오기
        const bestDiscountPrice =
          bestDiscount.productDiscountPrice +
          bestDiscount.deliveryDiscountPrice;

        // 이 조합에 대해 할인 금액 가져오기
        const discount = this.calculateCouponDiscount(context, combination);

        // 이 조합에 대해 상품 할인 + 배송 할인 금액 계산
        const currentDiscountPrice =
          discount.productDiscountPrice + discount.deliveryDiscountPrice;

        // 이전 최고 할인 금액이 더 클 경우 유지
        if (currentDiscountPrice <= bestDiscountPrice) return bestDiscount;

        // 이 조합에 대한 할인 금액이 큰 경우 업데이트
        return discount;
      },
      {
        productDiscountPrice: 0,
        deliveryDiscountPrice: 0,
      },
    );
  },

  calculateCouponDiscount(
    context: CouponContext,
    coupons: CouponPolicy[],
  ): CouponDiscount {
    const productDiscountPrice = this.calculateProductDiscountPrice(
      context,
      coupons,
    );
    const deliveryDiscountPrice = this.calculateDeliveryDiscountPrice(
      context,
      coupons,
    );

    return {
      productDiscountPrice,
      deliveryDiscountPrice,
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
