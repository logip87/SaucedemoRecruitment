import test, { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './../base.page';

export class SwagLabsCheckoutInfoPage extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly errorMessageContainer: Locator;
    readonly cancelButton: Locator;
    readonly continueButton: Locator;

    constructor (page: Page) {
        super(page);
        this.firstNameInput = page.locator('input[data-test="firstName"]');
        this.lastNameInput = page.locator('input[data-test="lastName"]');
        this.postalCodeInput = page.locator('input[data-test="postalCode"]');
        this.errorMessageContainer = page.locator('.error-message-container');
        this.cancelButton = page.locator('button#cancel');
        this.continueButton = page.locator('input[data-test="continue"]');
    }

    async goto () {
        await super.goto('/checkout-step-one.html');
    }

    async fillCheckoutInfo (firstName: string, lastName: string, postalCode: string) {
        await test.step('Fill checkout info', async () => {
            await this.firstNameInput.fill(firstName);
            await this.lastNameInput.fill(lastName);
            await this.postalCodeInput.fill(postalCode);
        });
    }

    async submitCheckout () {
        await test.step('Submit checkout', async () => {
            await this.continueButton.click();
        });
    }

    async cancelCheckout () {
        await test.step('Cancel checkout', async () => {
            await this.cancelButton.click();
        });
    }

    async verifyErrorMessageVisible () {
        await test.step('Verify error message visible', async () => {
            await expect(this.errorMessageContainer).toBeVisible();
        });
    }
}
