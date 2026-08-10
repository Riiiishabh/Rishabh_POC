class ToolshopApiClient {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  url(path) {
    return `${this.baseURL}${path}`;
  }

  authHeaders(token) {
    return { Authorization: `Bearer ${token}` };
  }

  register(user) {
    return this.request.post(this.url('/users/register'), { data: user });
  }

  login(email, password) {
    return this.request.post(this.url('/users/login'), {
      data: { email, password },
    });
  }

  getCurrentUser(token) {
    return this.request.get(this.url('/users/me'), {
      headers: this.authHeaders(token),
    });
  }

  updateUserProfile(token, data) {
    return this.request.put(this.url('/users/me'), {
      data,
      headers: this.authHeaders(token),
    });
  }

  listProducts(params = {}) {
    return this.request.get(this.url('/products'), { params });
  }

  getProduct(productId) {
    return this.request.get(this.url(`/products/${productId}`));
  }

  listCategories() {
    return this.request.get(this.url('/categories'));
  }

  createCart(location) {
    return this.request.post(this.url('/carts'), {
      data: location || {},
    });
  }

  addCartItem(cartId, productId, quantity = 1) {
    return this.request.post(this.url(`/carts/${cartId}`), {
      data: { product_id: productId, quantity },
    });
  }

  getCart(cartId) {
    return this.request.get(this.url(`/carts/${cartId}`));
  }

  updateCartQuantity(cartId, productId, quantity) {
    return this.request.put(
      this.url(`/carts/${cartId}/product/quantity`),
      {
        data: { product_id: productId, quantity },
      },
    );
  }

  removeCartItem(cartId, productId) {
    return this.request.delete(
      this.url(`/carts/${cartId}/product/${productId}`),
    );
  }

  createInvoice(token, payload) {
    return this.request.post(this.url('/invoices'), {
      data: payload,
      headers: this.authHeaders(token),
    });
  }

  listInvoices(token, params = {}) {
    return this.request.get(this.url('/invoices'), {
      headers: this.authHeaders(token),
      params,
    });
  }

  getInvoice(token, invoiceId) {
    return this.request.get(this.url(`/invoices/${invoiceId}`), {
      headers: this.authHeaders(token),
    });
  }

  async getPurchasableProducts(count = 1) {
    const response = await this.listProducts();
    if (!response.ok()) {
      throw new Error(`Unable to list products: HTTP ${response.status()}`);
    }

    const body = await response.json();
    const products = body.data
      .filter(
        (product) =>
          product.in_stock === true &&
          product.is_rental === false &&
          !/thor hammer/i.test(product.name),
      )
      .sort(() => Math.random() - 0.5);

    if (products.length < count) {
      throw new Error(
        `Expected at least ${count} purchasable products, found ${products.length}`,
      );
    }

    return products.slice(0, count);
  }
}

module.exports = { ToolshopApiClient };
