const { test: base, expect } = require('@playwright/test');
const { ToolshopApiClient } = require('../utils/api-client');
const { createUser } = require('../utils/data-factory');
const logger = require('../utils/logger');

const test = base.extend({
  apiClient: async ({ request }, use, testInfo) => {
    const apiURL =
      testInfo.config.metadata.apiURL ||
      'https://api.practicesoftwaretesting.com';
    await use(new ToolshopApiClient(request, apiURL));
  },

  userData: async ({}, use) => {
    await use(createUser());
  },

  authenticatedCustomer: async ({ apiClient, userData }, use) => {
    const registerResponse = await apiClient.register(userData);
    if (registerResponse.status() !== 201) {
      throw new Error(
        `Customer registration failed with HTTP ${registerResponse.status()}: ${await registerResponse.text()}`,
      );
    }

    const loginResponse = await apiClient.login(
      userData.email,
      userData.password,
    );
    if (!loginResponse.ok()) {
      throw new Error(
        `Customer login failed with HTTP ${loginResponse.status()}: ${await loginResponse.text()}`,
      );
    }

    const loginBody = await loginResponse.json();
    if (!loginBody.access_token) {
      throw new Error('Customer login response did not contain access_token');
    }

    logger.info('Created isolated customer', { email: userData.email });
    await use({
      user: userData,
      token: loginBody.access_token,
    });
  },
});

module.exports = { expect, test };
