/** Mock mínimo de req/res para handlers da API Vercel/Express. */
export function createMockRes() {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
}

export function createMockReq(overrides = {}) {
  return {
    method: "GET",
    headers: {},
    query: {},
    body: {},
    ...overrides,
  };
}
