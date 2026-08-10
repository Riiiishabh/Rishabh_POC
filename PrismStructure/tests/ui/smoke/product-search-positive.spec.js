const { expect, test } = require('../../../fixtures');
const { CatalogPage } = require('../../../pages/catalog.page');

/**
 * Scenario: Positive keyword product search (UI-AC1-SEARCH).
 * Entry: Toolshop UI is reachable and at least one product matching "hammer" exists.
 * Exit: Search results are visible and at least one product name contains the keyword.
 */
test.describe('UI product search positive scenarios', () => {
  test('UI-SM-001 @smoke UI-AC1-SEARCH search by keyword returns matching products', async ({
    page,
  }) => {
    const catalog = new CatalogPage(page);
    const searchTerm = 'hammer';

    await catalog.openCatalog();
    await catalog.search(searchTerm);

    await expect(page.getByTestId('search-term')).toContainText(searchTerm);

    const productNames = page.getByTestId('product-name');
    await expect(productNames.first()).toBeVisible();

    const names = await productNames.allInnerTexts();
    expect(names.length).toBeGreaterThan(0);
    const hasMatch = names.some((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    expect(
      hasMatch,
      `Expected at least one result to contain "${searchTerm}"`,
    ).toBe(true);
  });
});
