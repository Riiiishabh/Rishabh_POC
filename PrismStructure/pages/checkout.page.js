class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.cartTotal = page
      .getByRole('row')
      .filter({ has: page.getByText('Total', { exact: true }) })
      .getByRole('cell')
      .nth(3);
    this.finishButton = page.getByTestId('finish');
    this.orderConfirmation = page.locator('#order-confirmation');
  }

  cartRow(productName) {
    return this.page.getByRole('row').filter({ hasText: productName });
  }

  async proceedFromCart() {
    await this.page.getByTestId('proceed-1').click();
    await this.page
      .getByRole('heading', { name: 'Login' })
      .waitFor({ state: 'visible' });
  }

  async signIn(user) {
    await this.page.getByTestId('email').fill(user.email);
    await this.page.getByTestId('password').fill(user.password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await this.page.getByTestId('proceed-2').waitFor({ state: 'visible' });
    await this.page.getByTestId('proceed-2').click();
    await this.page.getByTestId('proceed-3').waitFor({ state: 'visible' });
  }

  async updateQuantity(productName, quantity) {
    const input = this.cartRow(productName).getByRole('spinbutton', {
      name: `Quantity for ${productName}`,
    });
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/product/quantity') &&
        response.request().method() === 'PUT',
    );
    await input.fill(String(quantity));
    await input.press('Tab');
    await responsePromise;
  }

  async removeCartItem(productName) {
    const row = this.cartRow(productName);
    await row.locator('.btn-danger').click();
    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/carts/') &&
        response.request().method() === 'DELETE',
    );
  }

  async completeBillingAddress(address) {
    await this.fillOrSelect('country', address.country);
    await this.page.getByTestId('postal_code').fill(address.postal_code);
    await this.page.getByTestId('house_number').fill(address.house_number);
    await this.page.getByTestId('street').fill(address.street);
    await this.page.getByTestId('city').fill(address.city);
    await this.page.getByTestId('state').fill(address.state);
    await this.page.getByTestId('proceed-3').click();
    await this.page
      .getByTestId('payment-method')
      .waitFor({ state: 'visible' });
  }

  async fillOrSelect(testId, value) {
    const locator = this.page.getByTestId(testId);
    const tagName = await locator.evaluate((element) =>
      element.tagName.toLowerCase(),
    );
    if (tagName === 'select') {
      await locator.selectOption(value);
    } else {
      await locator.fill(value);
    }
  }

  async selectCashOnDelivery() {
    await this.page
      .getByTestId('payment-method')
      .selectOption('cash-on-delivery');
  }

  async confirmOrder() {
    await this.finishButton.click();
    await this.page
      .getByTestId('payment-success-message')
      .waitFor({ state: 'visible' });

    const invoiceResponse = this.page.waitForResponse(
      (response) =>
        response.url().endsWith('/invoices') &&
        response.request().method() === 'POST',
    );
    await this.finishButton.click();
    await invoiceResponse;
    await this.orderConfirmation.waitFor({ state: 'visible' });
  }
}

module.exports = { CheckoutPage };
