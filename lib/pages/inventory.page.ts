import test, { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../pages/base.page';

export class SwagLabsInventoryPage extends BasePage {
    readonly inventoryItems: Locator;
    readonly sortDropdown: Locator;
    readonly activeSortOption: Locator;

    constructor (page: Page) {
        super(page);
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.sortDropdown = page.locator('select[data-test="product-sort-container"]');
        this.activeSortOption = page.locator('[data-test="active-option"]');
    }

    async goto () {
        await test.step('Navigate to inventory page', async () => {
            await super.goto('/inventory.html');
        });
    }

    async sortProducts (option: 'az' | 'za' | 'lohi' | 'hilo') {
        await test.step(`Sort products by: ${option}`, async () => {
            await this.sortDropdown.selectOption(option);
            await expect(this.activeSortOption).toHaveText(this.getSortOptionText(option));
        });
    }

    private getSortOptionText (option: string): string {
        switch (option) {
        case 'az':
            return 'Name (A to Z)';
        case 'za':
            return 'Name (Z to A)';
        case 'lohi':
            return 'Price (low to high)';
        case 'hilo':
            return 'Price (high to low)';
        default:
            return '';
        }
    }

    async addItemToCart (itemName: string) {
        await  test.step(`Add item: ${itemName} to cart`, async () => {
            const item = this.inventoryItems.filter({ hasText: itemName }).first();
            await item.locator('button').click();
        });
    }

    async removeItemFromCart (itemName: string) {
        await test.step(`Remove item: ${itemName} from cart`, async () => {
            const item = this.inventoryItems.filter({ hasText: itemName }).first();
            await item.locator('button').click();
        });
    }

    async searchProduct (productName: string) {
        await test.step(`Search for product: ${productName}`, async () => {
            const searchInput = this.page.locator('input[data-test="product-search"]');
            await searchInput.fill(productName);
            await searchInput.press('Enter');
        });
    }

    async verifySearchResults (productName: string) {
        await test.step(`Verify search results for product: ${productName}`, async () => {
            const results = this.inventoryItems.filter({ hasText: productName });
            await expect(results).toHaveCount(1);
            await expect(results.first().locator('[data-test="inventory-item-name"]')).toHaveText(productName);
        });
    }
}
