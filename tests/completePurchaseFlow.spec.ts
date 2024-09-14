import { expect, test } from '@playwright/test';
import { SwagLabsInventoryPage } from '../lib/pages/inventory.page';
import { SwagLabsCartPage } from '../lib/pages/cart.page';
import { SwagLabsCheckoutInfoPage } from '../lib/pages/checkout/checkout-one.page';
import { SwagLabsCheckoutOverviewPage } from '../lib/pages/checkout/checkout-two.page';
import { SwagLabsCheckoutCompletePage } from '../lib/pages/checkout/checkout-complete.page';
import { SwagLabsLoginPage } from '../lib/pages/login.page';

test.describe('Purchase Flow Tests', () => {
    test('Complete purchase flow with standard_user', async ({ page }) => {
        const swagLabsLoginPage = new SwagLabsLoginPage(page);
        await swagLabsLoginPage.goto();
        await swagLabsLoginPage.login('standard_user');

        const inventoryPage = new SwagLabsInventoryPage(page);
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
        await inventoryPage.goToCart();

        const cartPage = new SwagLabsCartPage(page);
        await cartPage.verifyCartItemQuantity('Sauce Labs Backpack', 1);
        await cartPage.checkout();

        const checkoutInfoPage = new SwagLabsCheckoutInfoPage(page);
        await checkoutInfoPage.fillCheckoutInfo('John', 'Doe', '12345');
        await checkoutInfoPage.submitCheckout();

        const checkoutOverviewPage = new SwagLabsCheckoutOverviewPage(page);
        await checkoutOverviewPage.verifySummaryInfo('SauceCard #31337', 'Free Pony Express Delivery!', '$29.99', '$2.40', '$32.39');
        await checkoutOverviewPage.finishCheckout();

        const checkoutCompletePage = new SwagLabsCheckoutCompletePage(page);
        await checkoutCompletePage.verifyCompletionMessage();
        await checkoutCompletePage.clickBackHome();

        await inventoryPage.verifyFooterLinks();
    });

    test('Login with locked_out_user should fail', async ({ page }) => {
        const swagLabsLoginPage = new SwagLabsLoginPage(page);
        await swagLabsLoginPage.goto();
        await swagLabsLoginPage.login('locked_out_user');
        await swagLabsLoginPage.verifyErrorMessageVisible();
    });

    test('Login with problem_user and add to cart', async ({ page }) => {
        const swagLabsLoginPage = new SwagLabsLoginPage(page);
        await swagLabsLoginPage.goto();
        await swagLabsLoginPage.login('problem_user');

        const inventoryPage = new SwagLabsInventoryPage(page);
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    });

    test('Login with performance_glitch_user and complete purchase', async ({ page }) => {
        test.setTimeout(5000);

        const swagLabsLoginPage = new SwagLabsLoginPage(page);
        await swagLabsLoginPage.goto();
        await swagLabsLoginPage.login('performance_glitch_user');

        const inventoryPage = new SwagLabsInventoryPage(page);
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
        await inventoryPage.goToCart();

        const cartPage = new SwagLabsCartPage(page);
        await cartPage.verifyCartItemQuantity('Sauce Labs Backpack', 1);
        await cartPage.checkout();

        const checkoutInfoPage = new SwagLabsCheckoutInfoPage(page);
        await checkoutInfoPage.fillCheckoutInfo('Jane', 'Smith', '54321');
        await checkoutInfoPage.submitCheckout();

        const checkoutOverviewPage = new SwagLabsCheckoutOverviewPage(page);
        await checkoutOverviewPage.verifySummaryInfo('SauceCard #31337', 'Free Pony Express Delivery!', '$29.99', '$2.40', '$32.39');
        await checkoutOverviewPage.finishCheckout();

        const checkoutCompletePage = new SwagLabsCheckoutCompletePage(page);
        await checkoutCompletePage.verifyCompletionMessage();
        await checkoutCompletePage.clickBackHome();

        await inventoryPage.verifyFooterLinks();
    });

    // This test should fail due to the user having problems through the process 
    test('Login with error_user and go thought the process', async ({ page }) => {
        const swagLabsLoginPage = new SwagLabsLoginPage(page);
        await swagLabsLoginPage.goto();
        await swagLabsLoginPage.login('error_user');

        const inventoryPage = new SwagLabsInventoryPage(page);
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
        await inventoryPage.goToCart();

        const cartPage = new SwagLabsCartPage(page);
        await cartPage.verifyCartItemQuantity('Sauce Labs Backpack', 1);
        await cartPage.checkout();

        const checkoutInfoPage = new SwagLabsCheckoutInfoPage(page);
        await checkoutInfoPage.fillCheckoutInfo('Jane', 'Smith', '54321');
        await checkoutInfoPage.submitCheckout();

        const checkoutOverviewPage = new SwagLabsCheckoutOverviewPage(page);
        await checkoutOverviewPage.verifySummaryInfo('SauceCard #31337', 'Free Pony Express Delivery!', '$29.99', '$2.40', '$32.39');
        await checkoutOverviewPage.finishCheckout();

        const checkoutCompletePage = new SwagLabsCheckoutCompletePage(page);
        await checkoutCompletePage.verifyCompletionMessage();
        await checkoutCompletePage.clickBackHome();

        await inventoryPage.verifyFooterLinks();
    });

    test('Login with visual_user and verify UI', async ({ page }) => {
        const swagLabsLoginPage = new SwagLabsLoginPage(page);
        await swagLabsLoginPage.goto();
        await swagLabsLoginPage.login('visual_user');

        const inventoryPage = new SwagLabsInventoryPage(page);
        await expect.soft(page).toHaveScreenshot();

        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await expect.soft(inventoryPage.shoppingCartBadge).toHaveText('1');
        await inventoryPage.goToCart();

        const cartPage = new SwagLabsCartPage(page);
        await expect.soft(page).toHaveScreenshot();
        await cartPage.verifyCartItemQuantity('Sauce Labs Backpack', 1);
        await cartPage.checkout();

        const checkoutInfoPage = new SwagLabsCheckoutInfoPage(page);
        await expect.soft(page).toHaveScreenshot();
        await checkoutInfoPage.fillCheckoutInfo('Jane', 'Smith', '54321');
        await checkoutInfoPage.submitCheckout();

        const checkoutOverviewPage = new SwagLabsCheckoutOverviewPage(page);
        await expect.soft(page).toHaveScreenshot();
        await checkoutOverviewPage.verifySummaryInfo('SauceCard #31337', 'Free Pony Express Delivery!', '$29.99', '$2.40', '$32.39');
        await checkoutOverviewPage.finishCheckout();

        const checkoutCompletePage = new SwagLabsCheckoutCompletePage(page);
        await expect.soft(page).toHaveScreenshot();
        await checkoutCompletePage.verifyCompletionMessage();
        await checkoutCompletePage.clickBackHome();

        await inventoryPage.verifyFooterLinks();
    });
});
