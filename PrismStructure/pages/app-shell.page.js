class AppShell {
  constructor(page) {
    this.page = page;
    this.homeLink = page.getByTestId('nav-home');
    this.cartLink = page.getByTestId('nav-cart');
    this.cartQuantity = page.getByTestId('cart-quantity');
  }

  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await this.waitForToolshop();
  }

  async waitForToolshop() {
    const marker = this.page
      .getByTestId('nav-home')
      .or(this.page.getByTestId('search-query'))
      .or(this.page.getByTestId('login-form'))
      .or(this.page.getByTestId('register-form'));

    try {
      await marker.first().waitFor({ state: 'visible', timeout: 30_000 });
    } catch (error) {
      const title = await this.page.title().catch(() => '');
      if (/just a moment|attention required/i.test(title)) {
        throw new Error(
          `Toolshop is blocked by a Cloudflare challenge: "${title}"`,
        );
      }
      throw error;
    }
  }

  async openCart() {
    await this.cartLink.click();
    await this.page.getByTestId('proceed-1').waitFor({ state: 'visible' });
  }
}

module.exports = { AppShell };
