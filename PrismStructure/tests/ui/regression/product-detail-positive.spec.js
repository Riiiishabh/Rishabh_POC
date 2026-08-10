const { expect, test } = require('../../../fixtures');
const { CatalogPage } = require('../../../pages/catalog.page');

/**
 * Scenario: Product detail page displays correct name and price (UI-AC1-DETAIL).
 * Entry: Toolshop UI/API are reachable and at least one purchasable product exists.
 * Exit: Visible product name matches the API-supplied name; price is numeric and positive;
 *       Add to cart button is enabled.
 */
test.describe('UI product detail positive scenarios', () => {
  test('UI-REG-002 @regression UI-AC1-DETAIL product detail page displays correct data', async ({
    page,
    apiClient,
  }) => {
    const catalog = new CatalogPage(page);
    const [product] = await apiClient.getPurchasableProducts(1);

    await catalog.openProduct(product.id);

    await expect(catalog.productName).toHaveText(product.name);

    // The detail page renders price without data-test="product-price"; match the visible dollar amount
    const formattedPrice = `$${Number(product.price).toFixed(2)}`;
    await expect(
      page.getByText(formattedPrice, { exact: false }),
    ).toBeVisible();
    expect(Number(product.price)).toBeGreaterThan(0);

    await expect(catalog.addToCartButton).toBeVisible();
    await expect(catalog.addToCartButton).toBeEnabled();
  });
});
