const { expect, test } = require('../../../fixtures');

/**
 * Scenario: Positive API cart item removal (API-AC2-REMOVE).
 * Entry: Toolshop API is reachable and an ordinary in-stock product is available.
 * Exit: DELETE returns success and GET confirms the item is no longer in the cart.
 */
test.describe('API cart remove positive scenarios', () => {
  test('API-SM-002 @smoke API-AC2-REMOVE add then delete cart item via API', async ({
    apiClient,
  }) => {
    const [product] = await apiClient.getPurchasableProducts(1);

    const createResponse = await apiClient.createCart();
    expect(createResponse.status()).toBe(201);
    const { id: cartId } = await createResponse.json();

    const addResponse = await apiClient.addCartItem(cartId, product.id, 1);
    expect(addResponse.status()).toBe(200);

    const cartBefore = await (await apiClient.getCart(cartId)).json();
    const itemExists = cartBefore.cart_items.some(
      (item) => item.product_id === product.id,
    );
    expect(itemExists, 'Item should be present before deletion').toBe(true);

    const removeResponse = await apiClient.removeCartItem(cartId, product.id);
    expect(
      removeResponse.ok(),
      `DELETE /carts/${cartId}/product/${product.id} failed with HTTP ${removeResponse.status()}`,
    ).toBe(true);

    const cartAfter = await (await apiClient.getCart(cartId)).json();
    const itemGone = !cartAfter.cart_items.some(
      (item) => item.product_id === product.id,
    );
    expect(itemGone, 'Item should be absent from cart after deletion').toBe(true);
  });
});
