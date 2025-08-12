import { BasePage } from '../pages/base_page.ts';
import { Page } from '@playwright/test';
import { UserDynamic, UserStatic } from '../data/test_data.ts';

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get registerHeader() {
    return this.page.getByText('Enter Account Information');
  }
  get titleRadioMr() {
    return this.page.getByRole('radio', { name: 'Mr.' });
  }
  get titleRadioMrs() {
    return this.page.getByRole('radio', { name: 'Mrs.' });
  }
  get nameRegForm() {
    return this.page.getByRole('textbox', { name: 'Name *', exact: true });
  }
  get emailRegForm() {
    return this.page.getByRole('textbox', { name: 'Email *' });
  }
  get passwordRegForm() {
    return this.page.getByRole('textbox', { name: 'Password *' });
  }
  get dayOfDOB() {
    return this.page.locator('#days');
  }
  get monthOfDOB() {
    return this.page.locator('#months');
  }
  get yearOfDOB() {
    return this.page.locator('#years');
  }
  get newsletterCheckbox() {
    return this.page.getByRole('checkbox', {
      name: 'Sign up for our newsletter!',
    });
  }
  get specialOffersCheckbox() {
    return this.page.getByRole('checkbox', {
      name: 'Receive special offers from',
    });
  }

  get registerFirstName() {
    return this.page.getByRole('textbox', { name: 'First name *' });
  }
  get registerLastName() {
    return this.page.getByRole('textbox', { name: 'Last name *' });
  }
  get registerAddress() {
    return this.page.getByRole('textbox', {
      name: 'Address * (Street address, P.',
    });
  }
  get registerCountryDropDown() {
    return this.page.getByLabel('Country *');
  }
  get registerState() {
    return this.page.getByRole('textbox', { name: 'State *' });
  }
  get registerCity() {
    return this.page.getByRole('textbox', { name: 'City * Zipcode *' });
  }
  get registerZipCode() {
    return this.page.locator('#zipcode');
  }
  get registerMobileNumber() {
    return this.page.getByRole('textbox', { name: 'Mobile Number *' });
  }
  get createAcountBtn() {
    return this.page.getByRole('button', { name: 'Create Account' });
  }

  get confirmationHeader() {
    return this.page.getByText('Account Created!');
  }
  get confirmationBtnContinue() {
    return this.page.getByRole('link', { name: 'Continue' });
  }
  get logoutIcon() {
    return this.page.getByRole('link', { name: ' Logout' });
  }

  async registration(user: UserDynamic | UserStatic) {
    await this.waitForVisible(this.registerHeader);

    await this.waitForClickable(this.titleRadioMr);
    await this.titleRadioMr.click();

    await this.waitForClickable(this.passwordRegForm);
    await this.passwordRegForm.fill(user.password);

    await this.waitForClickable(this.dayOfDOB);
    console.log('Selecting day:', user.day);
    await this.dayOfDOB.selectOption({ value: String(user.day) });

    await this.waitForClickable(this.monthOfDOB);
    console.log('Selecting day:', user.month);
    await this.monthOfDOB.selectOption({ value: String(user.month) });

    await this.waitForClickable(this.yearOfDOB);
    console.log('Selecting day:', user.year);
    await this.yearOfDOB.selectOption({ value: String(user.year) });

    await this.waitForClickable(this.registerFirstName);
    await this.registerFirstName.fill(user.firstName);

    await this.waitForClickable(this.registerLastName);
    await this.registerLastName.fill(user.lastName);

    await this.waitForClickable(this.registerAddress);
    await this.registerAddress.fill(user.address);

    await this.waitForClickable(this.registerCountryDropDown);
    await this.registerCountryDropDown.selectOption(user.country);

    await this.waitForClickable(this.registerState);
    await this.registerState.fill(user.state);

    await this.waitForClickable(this.registerCity);
    await this.registerCity.fill(user.city);

    await this.waitForClickable(this.registerZipCode);
    await this.registerZipCode.fill(user.zipcode);

    await this.waitForClickable(this.registerMobileNumber);
    await this.registerMobileNumber.fill(user.mobileNumber);
  }
}
