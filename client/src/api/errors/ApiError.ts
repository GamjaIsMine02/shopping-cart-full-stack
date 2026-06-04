export class ApiError extends Error {
  status: number;
  code?: string;

  constructor({
    status,
    code,
    message,
  }: {
    status: number;
    code?: string;
    message: string;
  }) {
    super(message);
    this.status = status;
    this.code = code;
  }
}
export class NetworkError extends Error {
  constructor(message = '네트워크 연결에 실패했습니다.') {
    super(message);
  }
}
