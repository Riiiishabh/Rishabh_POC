const { expect, test } = require('../../../fixtures');
const { CatalogPage } = require('../../../pages/catalog.page');
const { CheckoutPage } = require('../../../pages/checkout.page');

/**
 * Scenario: Preset quantity before adding to cart (UI-AC2-PRESET).
 * Entry: An ordinary in-stock product detail page is accessible with a quantity field.
 * Exit: Cart badge reflects the preset quantity; the cart row quantity spinner shows the same value.
 */
test.describe('UI cart quantity preset scenarios', () => {
  test('UI-REG-003 @regression UI-AC2-PRESET preset quantity three before adding to cart', async ({
    page,
    apiClient,
  }) => {
    const catalog = new CatalogPage(page);
    const checkout = new CheckoutPage(page);
    const [product] = await apiClient.getPurchasableProducts(1);

    await catalog.openProduct(product.id);
    await expect(catalog.quantity).toHaveValue('1');

    await catalog.addCurrentProduct(3);

    await expect(catalog.shell.cartQuantity).toHaveText('3');

    await catalog.shell.openCart();
    await expect(
      checkout.cartRow(product.name).getByRole('spinbutton', {
        name: `Quantity for ${product.name}`,
      }),
    ).toHaveValue('3');
  });
});
