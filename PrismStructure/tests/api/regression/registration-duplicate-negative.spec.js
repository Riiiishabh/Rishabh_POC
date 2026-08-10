const { expect, test } = require('../../../fixtures');

/**
 * Scenario: Negative API duplicate email registration (API-AC1-NEGATIVE).
 * Entry: Toolshop API is reachable and a customer account has already been registered.
 * Exit: A second registration with the same email is rejected with 422 and a non-empty error message.
 */
test.describe('API registration duplicate negative scenarios', () => {
  test('API-REG-003 @regression API-AC1-NEGATIVE reject duplicate email registration', async ({
    apiClient,
    userData,
  }) => {
    const firstResponse = await apiClient.register(userData);
    expect(firstResponse.status()).toBe(201);
    const registered = await firstResponse.json();
    expect(registered.email).toBe(userData.email);

    const secondResponse = await apiClient.register(userData);
    expect(
      secondResponse.status(),
      'Second registration with the same email must be rejected',
    ).toBe(409);

    const error = await secondResponse.json();
    // Response body: {"email": ["A customer with this email address already exists."]}
    const errorText = JSON.stringify(error);
    expect(errorText.length).toBeGreaterThan(0);
    expect(errorText.toLowerCase()).toMatch(/email|already|exists/i);
  });
});
