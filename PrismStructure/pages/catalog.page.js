const { AppShell } = require('./app-shell.page');

class CatalogPage {
  constructor(page) {
    this.page = page;
    this.shell = new AppShell(page);
    this.productName = page.getByTestId('product-name');
    this.quantity = page.getByTestId('quantity');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.searchInput = page.getByTestId('search-query');
    this.sortSelect = page.getByTestId('sort');
    this.productPrice = page.getByTestId('product-price');
  }

  async openCatalog() {
    await this.shell.goto('/');
    await this.searchInput.waitFor({ state: 'visible' });
    await this.page.getByTestId('product-name').first().waitFor({ state: 'visible' });
  }

  async openProduct(productId) {
    await this.shell.goto(`/product/${productId}`);
    await this.productName.waitFor({ state: 'visible' });
  }

  async addCurrentProduct(quantity = 1) {
    if (quantity !== 1) {
      await this.quantity.fill(String(quantity));
    }
    if (await this.addToCartButton.isDisabled()) {
      throw new Error(
        `Product "${await this.productName.innerText()}" became unavailable before it could be added`,
      );
    }
    await this.addToCartButton.click();
    await this.shell.cartQuantity.waitFor({ state: 'visible' });
  }

  async search(term) {
    await this.searchInput.fill(term);
    await this.page.getByTestId('search-submit').click();
    await this.page
      .getByTestId('search-caption')
      .or(this.page.getByTestId('no-results'))
      .first()
      .waitFor({ state: 'visible' });
  }

  async resetSearch() {
    await this.page.getByTestId('search-reset').click();
    await this.page.getByTestId('product-name').first().waitFor();
  }

  async sortBy(sortValue) {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/products') &&
        response.request().method() === 'GET' &&
        response.status() === 200,
    );
    await this.sortSelect.selectOption(sortValue);
    await responsePromise;
    // Wait for the product list to update after sort
    await this.page.waitForTimeout(1000); // Allow DOM to fully update
    await this.page.getByTestId('product-name').first().waitFor({ state: 'visible' });
    await this.page.getByTestId('product-price').first().waitFor({ state: 'visible' });
  }

  async filterByCategoryId(categoryId) {
    await this.shell.goto(`/?by_category_id=${categoryId}`);
    await this.page.getByTestId('product-name').first().waitFor({ state: 'visible' });
  }
}

module.exports = { CatalogPage };
