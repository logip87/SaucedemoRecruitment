import test, { expect, type Locator, type Page } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export class BasePage {
    readonly page: Page;
    readonly menuButton: Locator;
    readonly shoppingCartLink: Locator;
    readonly shoppingCartBadge: Locator;
    readonly footerTwitter: Locator;
    readonly footerFacebook: Locator;
    readonly footerLinkedIn: Locator;
    readonly footerCopy: Locator;

    constructor (page: Page) {
        this.page = page;
        this.menuButton = page.locator('button#react-burger-menu-btn');
        this.shoppingCartLink = page.locator('a[data-test="shopping-cart-link"]');
        this.shoppingCartBadge = page.locator('span[data-test="shopping-cart-badge"]');
        this.footerTwitter = page.locator('a[data-test="social-twitter"]');
        this.footerFacebook = page.locator('a[data-test="social-facebook"]');
        this.footerLinkedIn = page.locator('a[data-test="social-linkedin"]');
        this.footerCopy = page.locator('[data-test="footer-copy"]');
    }

    async goto (url: string) {
        await test.step(`Go to ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    async openMenu () {
        await test.step('Open menu', async () => {
            await this.menuButton.click();
        });
    }

    async closeMenu () {
        await test.step('Close menu', async () => {
            const closeButton = this.page.locator('button#react-burger-cross-btn');
            await closeButton.click();
        });
    }

    async verifyFooterLinks () {
        await test.step('Verify footer links', async () => {
            await expect(this.footerTwitter).toBeVisible();
            await expect(this.footerFacebook).toBeVisible();
            await expect(this.footerLinkedIn).toBeVisible();
            await expect(this.footerCopy).toBeVisible();
        });
    }

    async goToCart () {
        await test.step('Go to cart', async () => {
            await this.shoppingCartLink.click();
        });
    }
}