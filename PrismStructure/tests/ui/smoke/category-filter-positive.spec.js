const { expect, test } = require('../../../fixtures');
const { CatalogPage } = require('../../../pages/catalog.page');

/**
 * Scenario: Positive category filter on the catalog page (UI-AC1-FILTER).
 * Entry: Toolshop UI/API are reachable; at least one top-level category has products.
 * Exit: Clicking a category link shows a non-empty filtered product list.
 */
test.describe('UI category filter positive scenarios', () => {
  test('UI-SM-002 @smoke UI-AC1-FILTER filter products by category shows results', async ({
    page,
    apiClient,
  }) => {
    const catalog = new CatalogPage(page);

    const categoriesResponse = await apiClient.listCategories();
    expect(categoriesResponse.status()).toBe(200);
    const allCategories = await categoriesResponse.json();
    const topLevel = allCategories.filter((c) => c.parent_id === null);
    expect(topLevel.length).toBeGreaterThan(0);
    const targetCategory = topLevel[0];

    await catalog.openCatalog();
    const initialCount = await page.getByTestId('product-name').count();
    expect(initialCount).toBeGreaterThan(0);

    await catalog.filterByCategoryId(targetCategory.id);

    await expect(page.getByTestId('product-name').first()).toBeVisible();
    const filteredCount = await page.getByTestId('product-name').count();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });
});
