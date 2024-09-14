# 📦 Swag Labs Playwright Automation

This project automates the testing of the **Swag Labs** e-commerce website using **Playwright**. It follows the **Page Object Model (POM)** design pattern for maintainability and scalability.

## 📑 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Implemented Tasks](#implemented-tasks)
- [Chosen Secondary Tasks](#chosen-secondary-tasks)
- [Additional Recommendations](#additional-recommendations)
- [Conclusion](#conclusion)

## 🔧 Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning the repository)

## 🚀 Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/swag-labs-playwright-tests.git
    cd swag-labs-playwright-tests
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

## ⚙️ Configuration

The Playwright configuration is defined in `playwright.config.ts`. It includes settings for:

- **Base URL**: `https://www.saucedemo.com`
- **Browser Support**: Chromium, Firefox, and Webkit
- **Timeouts**: Default timeout set to 30 seconds
- **Headless Mode**: Enabled by default
- **Viewport**: 1280x720
- **Retries**: 2 retries for failed tests
- **Reporting**: List and HTML reports

Environment variables for user credentials are managed via a `.env` file. Ensure the `.env` file is populated with the necessary credentials as shown below:


 ```
 STANDARD_USER_USERNAME=standard_user
 STANDARD_USER_PASSWORD=
 LOCKED_OUT_USER_USERNAME=locked_out_user
 LOCKED_OUT_USER_PASSWORD=
 PROBLEM_USER_USERNAME=problem_user
 PROBLEM_USER_PASSWORD=
 PERFORMANCE_GLITCH_USER_USERNAME=performance_glitch_user
 PERFORMANCE_GLITCH_USER_PASSWORD=
 ERROR_USER_USERNAME=error_user
 ERROR_USER_PASSWORD=
 VISUAL_USER_USERNAME=visual_user
 VISUAL_USER_PASSWORD=
 ```

 
## 🏃 Running Tests

1. **Execute All Tests**

    ```bash
    npx playwright test
    ```

2. **Run Tests in a Specific Browser**

    ```bash
    npx playwright test --project=Chromium
    npx playwright test --project=Firefox
    npx playwright test --project=Webkit
    ```

3. **Run a Specific Test File**

    ```bash
    npx playwright test tests/completePurchaseFlow.spec.ts
    ```

4. **Generate HTML Report**

    After running the tests, generate and open the HTML report:

    ```bash
    npx playwright show-report
    ```

## 🗂️ Test Structure

- **pages/**: Contains all Page Object Model classes.
  - `base.page.ts`: Encapsulates common elements and actions.
  - `login.page.ts`: Handles login-related interactions.
  - `inventory.page.ts`: Handles inventory page interactions.
  - `cart.page.ts`: Handles cart page interactions.
  - `checkout/checkout-one.page.ts`: Handles checkout information page.
  - `checkout/checkout-two.page.ts`: Handles checkout overview page.
  - `checkout/checkout-complete.page.ts`: Handles checkout completion page.
- **tests/**: Contains test scripts.
  - `completePurchaseFlow.spec.ts`: Tests the complete purchase flow including negative scenarios.
- **playwright.config.ts**: Playwright configuration file.
- **.env**: Environment variables for user credentials.
- **package.json**: Project dependencies and scripts.
- **README.md**: Project documentation.

## ✅ Implemented Tasks

### Primary Tasks

1. **🚀 Launch Browser and Navigate to URL**
   - Implemented in each page's `goto` method using the `BasePage`'s `goto` function.

2. **🔍 Search for a Product**
   - Implemented in `SwagLabsInventoryPage` with `searchProduct` and `verifySearchResults` methods.

3. **🛒 Add Product to Shopping Cart**
   - Implemented in `SwagLabsInventoryPage` and verified in `completePurchaseFlow.spec.ts`.

4. **💳 Proceed to Checkout and Fill Information**
   - Implemented in `SwagLabsCartPage` and `SwagLabsCheckoutInfoPage`.

5. **💰 Verify Payment Options**
   - Implemented in `SwagLabsCheckoutOverviewPage`.

6. **✅ Complete Purchase and Verify Confirmation**
   - Implemented in `SwagLabsCheckoutCompletePage`.

### Chosen Secondary Tasks

#### 🛠️ Framework and Configuration Setup

- **Page Object Model (POM)**: Implemented to encapsulate page-specific elements and actions, reducing code duplication.
- **Configuration File**: Managed via `playwright.config.ts` to handle base URLs, timeouts, browser drivers, and instances.

#### 🔄 Test Lifecycle Management

- **Playwright Hooks**: Utilizing `test.step` within page methods to outline high-level test actions.
- **Screenshot Capabilities**: Configured in `playwright.config.ts` to capture screenshots on test failures.

#### 🌐 Cross-Browser Compatibility and Test Suites

- **Multi-Browser Support**: Configured to run tests on Chromium, Firefox, and Webkit browsers.
- **Test Organization**: Organized test scripts into separate test cases for different users and scenarios.

## 💡 Additional Recommendations

- **🔧 Custom Assertions and Utilities**: Create utility functions for common assertions and UI interactions to further reduce code duplication.
- **🤖 Continuous Integration (CI) Integration**: Integrate with CI tools like GitHub Actions or Jenkins to automate test execution on code commits.
- **🌍 Environment Management**: Utilize environment variables or separate configuration files for different environments (e.g., staging, production).

## 📝 Conclusion

This setup provides a robust foundation for automating end-to-end tests for the **Swag Labs** e-commerce application using **Playwright**. By leveraging the **Page Object Model** and Playwright's powerful features, tests are maintainable, scalable, and efficient across multiple browsers.

Feel free to extend the page objects and test scripts to cover additional functionalities as needed. 🚀