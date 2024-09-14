import test, { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class SwagLabsCartPage extends BasePage {
    readonly cartList: Locator;
    readonly cartItems: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor (page: Page) {
        super(page);
        this.cartList = page.locator('[data-test="cart-list"]');
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.continueShoppingButton = page.locator('button#continue-shopping');
        this.checkoutButton = page.locator('button#checkout');
    }

    async goto () {
        await super.goto('/cart.html');
    }

    async removeItemFromCart (itemName: string) {
        await test.step('Remove item from cart', async () => {
            const item = this.cartItems.filter({ hasText: itemName }).first();
            await item.locator('button').click();
        });
    }

    async continueShopping () {
        await test.step('Continue shopping', async () => {
            await this.continueShoppingButton.click();
        });
    }

    async checkout () {
        await test.step('Checkout', async () => {
            await this.checkoutButton.click();
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
