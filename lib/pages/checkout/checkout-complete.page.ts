import test, { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './../base.page';

export class SwagLabsCheckoutCompletePage extends BasePage {
    readonly checkoutTitle: Locator;
    readonly ponyExpressImage: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomeButton: Locator;

    constructor (page: Page) {
        super(page);
        this.checkoutTitle = page.locator('span[data-test="title"]');
        this.ponyExpressImage = page.locator('img[data-test="pony-express"]');
        this.completeHeader = page.locator('h2[data-test="complete-header"]');
        this.completeText = page.locator('div[data-test="complete-text"]');
        this.backHomeButton = page.locator('button#back-to-products');
    }

    async goto () {
        await super.goto('/checkout-complete.html');
    }

    async clickBackHome () {
        await test.step('Click back home button', async () => {
            await this.backHomeButton.click();
        });
    }

    async verifyCompletionMessage () {
        await test.step('Verify completion message', async () => {
            await expect(this.completeHeader).toHaveText('Thank you for your order!');
            await expect(this.completeText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
            await expect(this.ponyExpressImage).toBeVisible();
        });
    }

    async verifyShoppingCartBadge (expectedCount: string) {
        await test.step('Verify shopping cart badge', async () => { 
            await expect(this.shoppingCartBadge).toHaveText(expectedCount);
        });
    }
}
