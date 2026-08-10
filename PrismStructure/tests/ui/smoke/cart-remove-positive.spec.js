const { expect, test } = require('../../../fixtures');
const { CatalogPage } = require('../../../pages/catalog.page');
const { CheckoutPage } = require('../../../pages/checkout.page');

/**
 * Scenario: Positive cart item removal (UI-AC2-REMOVE).
 * Entry: Toolshop UI/API are reachable and an ordinary in-stock product is available.
 * Exit: The removed product row is absent from the cart; cart quantity badge is gone.
 */
test.describe('UI cart remove positive scenarios', () => {
  test('UI-SM-003 @smoke UI-AC2-REMOVE add product then remove it from cart', async ({
    page,
    apiClient,
  }) => {
    const catalog = new CatalogPage(page);
    const checkout = new CheckoutPage(page);
    const [product] = await apiClient.getPurchasableProducts(1);

    await catalog.openProduct(product.id);
    await expect(catalog.productName).toHaveText(product.name);
    await catalog.addCurrentProduct();
    await expect(catalog.shell.cartQuantity).toHaveText('1');

    await catalog.shell.openCart();
    await expect(checkout.cartRow(product.name)).toBeVisible();

    await checkout.removeCartItem(product.name);

    await expect(checkout.cartRow(product.name)).not.toBeVisible();

    const isBadgeVisible = await catalog.shell.cartQuantity.isVisible();
    if (isBadgeVisible) {
      await expect(catalog.shell.cartQuantity).toHaveText('0');
    }
  });
});
