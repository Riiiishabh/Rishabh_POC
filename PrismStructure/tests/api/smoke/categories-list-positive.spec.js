const { expect, test } = require('../../../fixtures');

/**
 * Scenario: Positive API category listing (API-AC1-CATEGORIES).
 * Entry: Toolshop API is reachable.
 * Exit: Response is 200 and each category item has id, name, and slug fields.
 */
test.describe('API categories list positive scenarios', () => {
  test('API-SM-003 @smoke API-AC1-CATEGORIES list categories returns valid structure', async ({
    apiClient,
  }) => {
    const response = await apiClient.listCategories();
    expect(response.status()).toBe(200);

    const categories = await response.json();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);

    const topLevel = categories.filter((c) => c.parent_id === null);
    expect(topLevel.length).toBeGreaterThan(0);

    const first = categories[0];
    expect(first.id).toBeTruthy();
    expect(typeof first.name).toBe('string');
    expect(first.name.length).toBeGreaterThan(0);
    expect(typeof first.slug).toBe('string');
  });
});
