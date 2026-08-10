const { expect, test } = require('../../../fixtures');

/**
 * Scenario: Positive API current-user profile retrieval (API-AC3-PROFILE).
 * Entry: A unique authenticated customer exists with a valid bearer token.
 * Exit: GET /users/me returns 200 and profile fields match the registration data.
 */
test.describe('API profile retrieval positive scenarios', () => {
  test('API-REG-001 @regression API-AC3-PROFILE GET /users/me returns registered user data', async ({
    apiClient,
    authenticatedCustomer,
  }) => {
    const getResponse = await apiClient.getCurrentUser(
      authenticatedCustomer.token,
    );
    expect(
      getResponse.status(),
      `GET /users/me failed: ${await getResponse.text()}`,
    ).toBe(200);

    const profile = await getResponse.json();
    expect(profile.first_name).toBe(authenticatedCustomer.user.first_name);
    expect(profile.last_name).toBe(authenticatedCustomer.user.last_name);
    expect(profile.email).toBe(authenticatedCustomer.user.email);
    expect(profile.id).toBeTruthy();
  });
});
