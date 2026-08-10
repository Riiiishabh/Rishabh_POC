const crypto = require('node:crypto');

function uniqueSuffix() {
  return `${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
}

function createUser(overrides = {}) {
  const suffix = uniqueSuffix();
  const user = {
    first_name: 'Pratibha',
    last_name: 'Tester',
    dob: '1992-06-20',
    address: {
      street: 'Baker Street',
      house_number: '10',
      city: 'Springfield',
      state: 'Florida',
      country: 'TG',
      postal_code: '1234AA',
    },
    phone: '0698765432',
    email: `pratibha.qa.${suffix}@example.com`,
    password: `Qa!${suffix}Ab9`,
  };

  return {
    ...user,
    ...overrides,
    address: {
      ...user.address,
      ...(overrides.address || {}),
    },
  };
}

function createInvoicePayload(cartId, user, overrides = {}) {
  return {
    billing_street: user.address.street,
    billing_city: user.address.city,
    billing_state: user.address.state,
    billing_country: user.address.country,
    billing_postal_code: user.address.postal_code,
    payment_method: 'cash-on-delivery',
    payment_details: {},
    cart_id: cartId,
    ...overrides,
  };
}

function createProfileUpdate(user, overrides = {}) {
  return {
    first_name: 'Updated',
    last_name: 'ProfileTest',
    email: user.email,
    dob: user.dob,
    phone: user.phone,
    address: { ...user.address },
    ...overrides,
  };
}

module.exports = {
  createInvoicePayload,
  createProfileUpdate,
  createUser,
};
