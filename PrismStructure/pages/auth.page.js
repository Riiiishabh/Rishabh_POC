const { AppShell } = require('./app-shell.page');

class AuthPage {
  constructor(page) {
    this.page = page;
    this.shell = new AppShell(page);
    this.firstName = page.getByTestId('first-name');
    this.lastName = page.getByTestId('last-name');
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.loginSubmit = page.getByTestId('login-submit');
    this.profileTitle = page.getByTestId('page-title');
  }

  async openRegistration() {
    await this.shell.goto('/auth/register');
    await this.page.getByTestId('register-form').waitFor();
  }

  async register(user) {
    await this.firstName.fill(user.first_name);
    await this.lastName.fill(user.last_name);
    await this.page.getByTestId('dob').fill(user.dob);

    const country = this.page.getByTestId('country');
    await country.selectOption(user.address.country);

    await this.page
      .getByTestId('postal_code')
      .fill(user.address.postal_code);
    await this.page
      .getByTestId('house_number')
      .fill(user.address.house_number);
    await this.page.getByTestId('street').fill(user.address.street);
    await this.page.getByTestId('city').fill(user.address.city);
    await this.page.getByTestId('state').fill(user.address.state);
    await this.page.getByTestId('phone').fill(user.phone);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.page.getByTestId('register-submit').click();
    await this.page.getByTestId('login-form').waitFor({ state: 'visible' });
  }

  async openLogin() {
    await this.shell.goto('/auth/login');
    await this.page.getByTestId('login-form').waitFor();
  }

  async login(user) {
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.loginSubmit.click();
    await this.page.getByTestId('nav-menu').waitFor({ state: 'visible' });
  }

  async openProfile() {
    await this.shell.goto('/account/profile');
    await this.profileTitle.waitFor({ state: 'visible' });
  }
}

module.exports = { AuthPage };
