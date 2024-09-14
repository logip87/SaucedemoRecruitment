import test, { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class SwagLabsLoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessageContainer: Locator;
    readonly acceptedUsernames: Locator;
    readonly passwordInfo: Locator;

    constructor (page: Page) {
        super(page);
        this.usernameInput = page.locator('input[data-test="username"]');
        this.passwordInput = page.locator('input[data-test="password"]');
        this.loginButton = page.locator('input[data-test="login-button"]');
        this.errorMessageContainer = page.locator('.error-message-container');
        this.acceptedUsernames = page.locator('#login_credentials');
        this.passwordInfo = page.locator('[data-test="login-password"]');
    }

    async goto () {
        await test.step('Go to login page', async () => {
            await this.page.goto('');
        });
    }

    async login (userType: string) {
        await test.step(`Login with ${userType}`, async () => {
            const username = process.env[`${userType.toUpperCase()}_USERNAME`];
            const password = process.env[`${userType.toUpperCase()}_PASSWORD`];
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        });
    }

    async verifyErrorMessageVisible () {
        await test.step('Verify error message is visible', async () => {
            await expect(this.errorMessageContainer).toBeVisible();
        });
    }

    async verifyLoginButtonEnabled () {
        await test.step('Verify login button is enabled', async () => {
            await expect(this.loginButton).toBeEnabled();
        });
    }
}