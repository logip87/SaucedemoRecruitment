import test, { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './../base.page';

export class SwagLabsCheckoutOverviewPage extends BasePage {
    readonly checkoutTitle: Locator;
    readonly cartList: Locator;
    readonly cartItems: Locator;
    readonly paymentInfoLabel: Locator;
    readonly paymentInfoValue: Locator;
    readonly shippingInfoLabel: Locator;
    readonly shippingInfoValue: Locator;
    readonly totalInfoLabel: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;

    constructor (page: Page) {
        super(page);
        this.checkoutTitle = page.locator('span[data-test="title"]');
        this.cartList = page.locator('[data-test="cart-list"]');
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.paymentInfoLabel = page.locator('[data-test="payment-info-label"]');
        this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
        this.shippingInfoLabel = page.locator('[data-test="shipping-info-label"]');
        this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
        this.totalInfoLabel = page.locator('[data-test="total-info-label"]');
        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
        this.taxLabel = page.locator('[data-test="tax-label"]');
        this.totalLabel = page.locator('[data-test="total-label"]');
        this.cancelButton = page.locator('button#cancel');
        this.finishButton = page.locator('button[data-test="finish"]');
    }

    async goto () {
        await super.goto('/checkout-step-two.html');
    }

    async cancelCheckout () {
        await test.step('Cancel checkout', async () => {
            await this.cancelButton.click();
        });
    }

    async finishCheckout () {
        await test.step('Finish checkout', async () => {
            await this.finishButton.click();
        });
    }

    async verifySummaryInfo (paymentInfo: string, shippingInfo: string, itemTotal: string, tax: string, total: string) {
        await test.step('Verify summary info', async () => {
            await expect(this.paymentInfoLabel).toHaveText('Payment Information:');
            await expect(this.paymentInfoValue).toHaveText(paymentInfo);
            await expect(this.shippingInfoLabel).toHaveText('Shipping Information:');
            await expect(this.shippingInfoValue).toHaveText(shippingInfo);
            await expect(this.totalInfoLabel).toHaveText('Price Total');
            await expect(this.subtotalLabel).toHaveText(`Item total: ${itemTotal}`);
            await expect(this.taxLabel).toHaveText(`Tax: ${tax}`);
            await expect(this.totalLabel).toHaveText(`Total: ${total}`);
        });
    }

    async verifyCartItemQuantity (itemName: string, quantity: number) {
        await test.step('Verify cart item quantity', async () => {
            const item = this.cartItems.filter({ hasText: itemName }).first();
            const qty = await item.locator('[data-test="item-quantity"]').textContent();
            expect(qty).toBe(quantity.toString());
        });
    }
}
