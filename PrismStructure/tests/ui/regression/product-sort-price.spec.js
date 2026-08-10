const { expect, test } = require('../../../fixtures');
const { CatalogPage } = require('../../../pages/catalog.page');

/**
 * Scenario: Price sort ascending on the catalog page (UI-AC1-SORT).
 * Entry: Toolshop catalog has at least two products with different prices visible.
 * Exit: All displayed prices are in non-decreasing order after selecting price ascending sort.
 */
test.describe('UI product sort price scenarios', () => {
  test('UI-REG-001 @regression UI-AC1-SORT sort products by price low-to-high', async ({
    page,
  }) => {
    const catalog = new CatalogPage(page);

    await catalog.openCatalog();
    await catalog.sortBy('price,asc');

    const priceElements = catalog.productPrice;
    await expect(priceElements.first()).toBeVisible();
    
    // Wait for the page to stabilize after sorting
    await page.waitForLoadState('networkidle');

    const rawPrices = await priceElements.allInnerTexts();
    expect(rawPrices.length).toBeGreaterThan(1);

    const prices = rawPrices.map((text) =>
      parseFloat(text.replace(/[^0-9.]/g, '')),
    );

    for (let i = 0; i < prices.length - 1; i++) {
      expect(
        prices[i],
        `Price at index ${i} (${prices[i]}) should be ≤ price at index ${i + 1} (${prices[i + 1]})`,
      ).toBeLessThanOrEqual(prices[i + 1]);
    }
  });
});
