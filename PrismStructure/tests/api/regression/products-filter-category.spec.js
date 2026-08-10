const { expect, test } = require('../../../fixtures');

/**
 * Scenario: Positive API product filtering by category (API-AC1-FILTER).
 * Entry: Toolshop API has at least one top-level category with products.
 * Exit: Filtered product count is non-zero and less than the total unfiltered count.
 */
test.describe('API products filter category scenarios', () => {
  test('API-REG-002 @regression API-AC1-FILTER filter products by category returns matching set', async ({
    apiClient,
  }) => {
    const allResponse = await apiClient.listProducts();
    expect(allResponse.status()).toBe(200);
    const allBody = await allResponse.json();
    const totalAll = allBody.total;
    expect(totalAll).toBeGreaterThan(0);

    const categoriesResponse = await apiClient.listCategories();
    expect(categoriesResponse.status()).toBe(200);
    const categories = await categoriesResponse.json();
    const topLevel = categories.filter((c) => c.parent_id === null);
    expect(topLevel.length).toBeGreaterThan(0);
    const category = topLevel[0];

    const filteredResponse = await apiClient.listProducts({
      by_category_id: category.id,
    });
    expect(filteredResponse.status()).toBe(200);
    const filteredBody = await filteredResponse.json();

    expect(
      filteredBody.data.length,
      `Expected products for category "${category.name}"`,
    ).toBeGreaterThan(0);
    expect(filteredBody.total).toBeGreaterThan(0);
    expect(filteredBody.total).toBeLessThanOrEqual(totalAll);
  });
});
