const { expect, test } = require('../../../fixtures');

/**
 * Scenario: Positive API product listing structure (API-AC1-LIST).
 * Entry: Toolshop API is reachable.
 * Exit: Response is 200, paginated envelope present, and each product has required fields.
 */
test.describe('API products list positive scenarios', () => {
  test('API-SM-001 @smoke API-AC1-LIST list products returns valid paginated structure', async ({
    apiClient,
  }) => {
    const response = await apiClient.listProducts();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    expect(typeof body.total).toBe('number');
    expect(typeof body.per_page).toBe('number');
    expect(typeof body.current_page).toBe('number');
    expect(body.total).toBeGreaterThan(0);

    const first = body.data[0];
    expect(first.id).toBeTruthy();
    expect(typeof first.name).toBe('string');
    expect(first.name.length).toBeGreaterThan(0);
    expect(Number(first.price)).toBeGreaterThan(0);
    expect(typeof first.in_stock).toBe('boolean');
    expect(typeof first.is_rental).toBe('boolean');
  });
});
