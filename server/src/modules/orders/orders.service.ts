import { AppError } from '../../errors/AppError.js';
import { ModelError } from '../../errors/ModelError.js';
import type {
  OrderRepository,
  CouponRepository,
  ProductRepository,
} from '../../interfaces/repository.interface.js';
import { orderRepository } from './orders.repository.js';
import { couponRepository } from '../coupons/coupons.repository.js';
import { productRepository } from '../products/product.repository.js';
import { priceCalculator } from '../../utils/priceCalculator.js';
import { Product } from '../products/product.model.js';
import { Order } from './orders.model.js';

export type AddOrderRequest = {
  products: {
    productId: string;
    quantity: number;
  }[];
  couponIds: string[];
};

export const createOrderService = ({
  orderRepository,
  couponRepository,
  productRepository,
}: {
  orderRepository: OrderRepository;
  couponRepository: CouponRepository;
  productRepository: ProductRepository;
}) => ({
  addOrder(params: AddOrderRequest) {
    // 주문 생성에 필요한 최소한의 데이터를 받아 전체 데이터를 구성
    const { products, couponIds } = params;

    // 상품을 찾을 수 없거나, 상품 목록이 비어 있을 경우 에러 반환
    const productIds = products.map((product) => product.productId);
    findProductsOrThrow(productIds, productRepository);

    try {
      const order = new Order({
        orderId: crypto.randomUUID(),
        products,
        couponIds,
      });

      orderRepository.save(order);

      return { orderId: order.orderId };
    } catch (error) {
      if (error instanceof ModelError) {
        throw new AppError(400, error.code, error.message);
      }
      throw error;
    }
  },
  getOrder(orderId: string) {
    const order = findOrderOrThrow(orderId, orderRepository);

    return createOrderResponse(order, productRepository, couponRepository);
  },
  applyCoupons(orderId: string, couponIds: string[]) {
    // 쿠폰 검증
    const order = findOrderOrThrow(orderId, orderRepository);
    const coupons = findCouponsOrThrow(couponIds, couponRepository);

    const productIds = order.products.map((product) => product.productId);
    const products = findProductsOrThrow(productIds, productRepository);
    const orderProducts = createOrderProductsResponse(order, products);

    const orderContext = priceCalculator.createCouponContext({
      orderProducts,
      isIsland: order.isIsland,
      now: new Date(),
    });

    const hasInvalidCoupon = coupons.some(
      (coupon) => !coupon.isApplicable(orderContext),
    );
    if (hasInvalidCoupon) {
      throw new AppError(400, 'INVALID_COUPON', '적용할 수 없는 쿠폰입니다.');
    }

    // 쿠폰 업데이트
    order.changeCoupons(couponIds);
    orderRepository.save(order);

    // 새로 계산된 priceInfo 반환
    return createOrderResponse(order, productRepository, couponRepository);
  },
  changeDeliveryArea(orderId: string, isIsland: boolean) {
    // 배송지 업데이트
    const order = findOrderOrThrow(orderId, orderRepository);

    order.changeDeliveryArea(isIsland);
    orderRepository.save(order);

    // 새로 계산된 priceInfo 반환
    return createOrderResponse(order, productRepository, couponRepository);
  },
});

const findOrderOrThrow = (
  orderId: string,
  orderRepository: OrderRepository,
) => {
  const order = orderRepository.findById(orderId);

  if (!order) {
    throw new AppError(404, 'ORDER_NOT_FOUND', '존재하지 않는 주문입니다.');
  }

  return order;
};
const findProductsOrThrow = (
  productIds: string[],
  productRepository: ProductRepository,
) => {
  return productIds.map((productId) => {
    const product = productRepository.findById(productId);

    if (!product) {
      throw new AppError(404, 'PRODUCT_NOT_FOUND', '존재하지 않는 상품입니다.');
    }

    return product;
  });
};
const findCouponsOrThrow = (
  couponIds: string[],
  couponRepository: CouponRepository,
) => {
  const coupons = couponRepository.findByIds(couponIds);

  if (!coupons) {
    throw new AppError(404, 'COUPON_NOT_FOUND', '존재하지 않는 쿠폰입니다.');
  }

  return coupons;
};

const createOrderResponse = (
  order: Order,
  productRepository: ProductRepository,
  couponRepository: CouponRepository,
) => {
  const productIds = order.products.map((product) => product.productId);
  const products = findProductsOrThrow(productIds, productRepository);

  const coupons = findCouponsOrThrow(order.couponIds, couponRepository);
  const orderProducts = createOrderProductsResponse(order, products);

  const orderContext = {
    orderProducts,
    isIsland: order.isIsland,
    now: new Date(),
  };

  // priceInfo 계산
  const orderPrice = priceCalculator.calculateOrderPrice(orderContext);
  const deliveryFee = priceCalculator.calculateDeliveryFee(orderContext);
  const discount = priceCalculator.calculateSelectedCouponDiscount(
    orderContext,
    coupons,
  );

  return {
    orderId: order.orderId,
    products: orderProducts,
    isIsland: order.isIsland,
    couponIds: order.couponIds,
    priceInfo: {
      orderPrice,
      productDiscountPrice: discount.productDiscountPrice,
      deliveryDiscountPrice: discount.deliveryDiscountPrice,
      deliveryFee,
      totalPrice:
        orderPrice -
        discount.productDiscountPrice -
        discount.deliveryDiscountPrice +
        deliveryFee,
    },
  };
};
const createOrderProductsResponse = (order: Order, products: Product[]) => {
  const productMap = new Map(
    products.map((product) => [product.productId, product]),
  );

  return order.products.map((orderProduct) => {
    const product = productMap.get(orderProduct.productId);

    if (!product) {
      throw new AppError(404, 'PRODUCT_NOT_FOUND', '존재하지 않는 상품입니다.');
    }

    return {
      productId: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      imageUrl: product.imageUrl,
      quantity: orderProduct.quantity,
    };
  });
};

export const orderService = createOrderService({
  orderRepository,
  couponRepository,
  productRepository,
});
