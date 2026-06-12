# API 명세서

## 1. 공통 규칙

### 1-1. Base URL

```
http://localhost:3000
```

### 1-2. 요청 형식

- 요청 body는 JSON 형식으로 전달한다.
- 요청 body가 필요한 API는 `Content-Type: application/json`을 사용한다.

### 1-3. 응답 형식

- 응답 body는 JSON 형식으로 전달한다.
- 삭제 성공 응답은 body를 반환하지 않는다.
- 에러 응답은 공통 에러 응답 형식으로 반환한다.

### 1-4. 주요 식별자

| 이름      | 설명      |
| --------- | --------- |
| `order`   | 주문 정보 |
| `coupons` | 쿠폰 정보 |

### 1-5. 상태 코드

| 상태 코드                   | 설명                 |
| --------------------------- | -------------------- |
| `200 OK`                    | 조회, 수정 성공      |
| `201 Created`               | 생성 성공            |
| `204 No Content`            | 삭제 성공            |
| `400 Bad Request`           | 잘못된 요청          |
| `404 Not Found`             | 존재하지 않는 리소스 |
| `500 Internal Server Error` | 서버 내부 오류       |

### 1-6. 에러 응답

```json
{
  "message": "유효하지 않은 쿠폰입니다."
}
```

## 2. 주문 정보 API

### 2-1. 주문 정보 조회

```http
GET /order
```

#### Request

없음

#### Response

`200 OK`

```json
{
  "orderId": "order-20260612-0001",
  "orderProducts": [
    {
      "productId": "prod-1001",
      "productName": "상품A",
      "productPrice": 16000,
      "imgUrl": "./asset/imageA.png",
      "quantity": 2
    },
    {
      "productId": "prod-1002",
      "productName": "상품B",
      "productPrice": 11000,
      "imgUrl": "./asset/imageB.png",
      "quantity": 1
    }
  ],
  "isIsland": false,
  "couponIds": ["coupon-5000", "coupon-night10"],
  "priceInfo": {
    "orderPrice": 58000,
    "discountPrice": 10800,
    "DeliveryFee": 3000,
    "totalPrice": 50200
  }
}
```

#### Error

없음

---

### 2-2. 주문 정보 추가

```http
POST /order
```

#### Request

```json
{
  "orderProducts": [
    {
      "productId": "prod-1001",
      "quantity": 2
    },
    {
      "productId": "prod-1002",
      "quantity": 1
    }
  ]
}
```

- 그 외 속성값들은 모두 내부적으로 초기화

| 이름            | 필수 여부 | 설명                                                         |
| --------------- | --------- | ------------------------------------------------------------ |
| `orderProducts` | 필수      | 빈 배열인 경우                                               |
| `productId`     | 필수      | productId가 유효하지 않거나 존재하지 않은 상품인 경우        |
| `quantity`      | 필수      | quantity가 유효하지 않거나 수량이 1 이상 99 이하가 아닌 경우 |

#### Response

`201 Created`

```json
{
  "orderId": "order-20260612-0001"
}
```

#### Error

Request 필드 안에 필수 필드가 정의되지 않았거나, 필드 값이 유효하지 않을 때 `400 Bad Request`를 응답한다.

```json
{
  "message": "유효하지 않은 상품 이름입니다."
}
```

productId에 해당하는 상품이 존재하지 않는 경우 `404 Not Found`를 응답한다.

```json
{
  "message": "존재하지 않는 상품 이름입니다."
}
```

---

### 2-3. 주문 정보 수정

```http
PATCH /order
```

#### Request

```json
{
  "couponIds": ["coupon-5000", "coupon-night10"],
  "isIsland": true
}
```

| 이름        | 필수 여부 | 설명                                             |
| ----------- | --------- | ------------------------------------------------ |
| `couponIds` | 선택      | couponIds가 유효하지 않거나 2개 이하가 아닌 경우 |
| `couponIds` | 선택      | couponIds가 존재하지 않는 경우                   |
| `isIsland`  | 선택      | isIsland가 유효하지 않은 경우                    |

#### Response

`200 OK`

```json
{
  "priceInfo": {
    "orderPrice": 58000,
    "discountPrice": 10800,
    "DeliveryFee": 6000,
    "totalPrice": 53200
  }
}
```

#### Error

Request 필드 안에 필수 필드가 정의되지 않았거나, 필드 값이 유효하지 않을 때 `400 Bad Request`를 응답한다.

```json
{
  "message": "유효하지 않은 쿠폰입니다."
}
```

couponIds에 해당하는 쿠폰이 존재하지 않는 경우 `404 Not Found`를 응답한다.

```json
{
  "message": "존재하지 않는 쿠폰입니다."
}
```

### 2-4. 할인율 계산

```http
POST /order/discount-price
```

#### Request

```json
{
  "couponIds": ["coupon-5000", "coupon-night10"]
}
```

| 이름        | 필수 여부 | 설명                           |
| ----------- | --------- | ------------------------------ |
| `couponIds` | 선택      | couponIds가 유효하지 않은 경우 |
| `couponIds` | 선택      | couponIds가 존재하지 않는 경우 |

#### Response

`200 OK`

```json
{
  "discountPrice": 6000
}
```

#### Error

Request 필드 안에 필수 필드가 정의되지 않았거나, 필드 값이 유효하지 않을 때 `400 Bad Request`를 응답한다.

```json
{
  "message": "유효하지 않은 쿠폰입니다."
}
```

couponIds에 해당하는 쿠폰이 존재하지 않는 경우 `404 Not Found`를 응답한다.

```json
{
  "message": "존재하지 않는 쿠폰입니다."
}
```

## 3. 쿠폰 정보 API

### 3-1. 쿠폰 목록 조회

```http
GET /coupons
```

#### Request

없음

#### Response

`200 OK`

```json
{
  "couponList": [
    {
      "couponId": "FIXED5000",
      "couponName": "5,000원 할인 쿠폰",
      "isDisabled": false,
      "couponExpiration": 1796050799000,
      "option": "최소 주문 금액: 100,000원"
    },
    {
      "couponId": "BOGO",
      "couponName": "2개 구매 시 1개 무료 쿠폰",
      "isDisabled": true,
      "couponExpiration": 1782831599000
    },
    {
      "couponId": "FREESHIPPING",
      "couponName": "5만원 이상 구매 시 무료 배송 쿠폰",
      "isDisabled": true,
      "couponExpiration": 1788188399000,
      "option": "최소 주문 금액: 50,000원"
    },
    {
      "couponId": "MIRACLESALE",
      "couponName": "미라클모닝 30% 할인 쿠폰",
      "isDisabled": false,
      "couponExpiration": 1785509999000,
      "option": "사용 가능 시간: 오전 4시부터 7시까지"
    }
  ]
}
```

- couponDB에는 isDisabled 속성이 없지만, BE에서 계산해서 같이 내려준다.

#### Error

없음

---

## 시퀀스 다이어그램과 API 설계 이유

### 1. 주문 확인 페이지로 이동하기 전에 할인 최대 조합을 계산하는 이유

- 주문 확인 페이지에 들어가자마자 할인 적용된 상태여야 하기 때문이다.

### 2. GET /order 요청 시 productDB에 접근하는 이유

- orderDB에는 product에 대한 정보가 없기 때문에, product 정보를 가져와서 합친 후 전달해주기 위해서다.

### 3-1. GET /coupons 요청 시 orderDB에 접근하는 이유

- 응답 객체에 각 쿠폰의 disabled를 포함해서 전달해야 하는데, disabled를 계산하기 위해서 각 총 결제 금액과 상품의 개수를
  알아야 하기 때문이다.

### 3-2. GET /coupons 요청 시 모달에서 필요한 할인 금액을 보내주지 않는 이유

- 이미 주문 확인 페이지가 로드되었을 때 가져온 order로 보여줄 수 있기 때문이다.

### 4. 쿠폰 선택 시마다 couponIds를 프론트에서 관리하다가, 쿠폰 적용 버튼을 누를 때 DB에 업데이트한 이유

- 모달에서 x버튼을 누르면, 쿠폰 적용이 되지 않아야 한다고 생각했다. 예를 들어, 적용된 쿠폰이 0개였다가 쿠폰을2개 선택하고,
  모달 x버튼을 누르고 다시 모달을 열면, 적용된 쿠폰이 0개여야 한다.
  -> 최종적으로, 최종 금액은 be에서 계산하기 때문에 쿠폰 적용 버튼을 눌러야만 할인이 적용되도록 의도했다.

### 5. 사용자가 쿠폰을 사용했을 때, 에러를 바로 띄우고 쿠폰 선택 상태를 초기화하기로 설계한 이유

- 빠른 피드백이 가능하기 때문이다.

### 6. 배송 정보 변경 시 priceInfo를 받지만, productDB에는 접근하지 않은 이유

- 상품의 개수와 관계없이 할인 금액만 변경되기 때문이다.

### 7. 쿠폰 적용이나 계산 로직이 FE에 없는 이유

- 정확한 계산을 하기 위해서이다.
- 변경에 유연하기 때문이다. (쿠폰이 추가되거나, 계산 로직이 수정되거나)
- DB에 직접 접근하는 BE가 더 신뢰성이 있다.

### 8. orderTable을 DB로 둔 이유

- 만약 상품 목록을 이전 페이지에서 전달한다면, 주문 확인 페이지에서 새로고침 시 데이터가 사라질 수 있다.
- 장바구니 페이지에서 다룬 데이터가 DB와 로컬 스토리지에 흩어져 있어서, 그걸 선택된 상품들에 대한 DB를 만들어서
  한 곳으로 모았다.

### 9. 쿠폰 선택할 때마다 BE에서 최종 할인 금액을 계산하기로 결정한 이유

- 쿠폰이 추후에 추가되거나 정책이 변경되면 프론트에서와 백에서의 싱크가 맞지 않을 수 있다.
