# Nishant QA Assignment AI

Playwright JavaScript automation suite for the Practice Software Testing Toolshop UI and API, following the Prism pattern: Page Object Model, reusable API client, runtime data factory, and custom fixtures.

This project covers a **different functional area** from the reference assessment, focusing on product discovery (search, filter, sort), cart item removal, product detail validation, user profile management, category listing, and duplicate-registration rejection.

## Coverage

- 8 manual cases in `FunctionalTestCase.csv` — 6 functional (`Not Run` until human execution) + 2 NFR (performance and accessibility).
- 6 UI tests: 3 `@smoke`, 3 `@regression`.
- 6 API tests: 3 `@smoke`, 3 `@regression`.
- Requirements, risk, test plan, test-data, traceability, and execution artifacts.

### Test case summary

| ID | Tag | Feature | Type |
|----|-----|---------|------|
| UI-SM-001 | @smoke | Keyword search returns matching products | UI |
| UI-SM-002 | @smoke | Category filter shows filtered results | UI |
| UI-SM-003 | @smoke | Add product then remove from cart | UI |
| UI-REG-001 | @regression | Sort products by price ascending | UI |
| UI-REG-002 | @regression | Product detail page shows correct data | UI |
| UI-REG-003 | @regression | Preset quantity before adding to cart | UI |
| API-SM-001 | @smoke | List products — paginated structure | API |
| API-SM-002 | @smoke | Add then DELETE cart item | API |
| API-SM-003 | @smoke | List categories — structure | API |
| API-REG-001 | @regression | Update user profile and verify via GET | API |
| API-REG-002 | @regression | Filter products by category | API |
| API-REG-003 | @regression | Reject duplicate email registration | API |

## Prerequisites

- Node.js 18 or newer.
- npm.
- Internet access to the Toolshop UI/API.
- Windows, macOS, or Linux capable of running Playwright Chromium.

## Setup

```bash
cd "Pratibha QA Assignment AI/PrismStructure"
npm install
npm run install:browsers
```

Optional local environment overrides:

```bash
copy .env.example .env
```

```text
BASE_URL=https://practicesoftwaretesting.com
API_URL=https://api.practicesoftwaretesting.com
```

Do not store credentials or tokens in `.env`. Tests generate synthetic users and tokens at runtime.

## Run tests

From `PrismStructure`:

```bash
npm test
npm run test:smoke
npm run test:regression
npm run test:ui
npm run test:ui:smoke
npm run test:ui:regression
npm run test:api
npm run test:api:smoke
npm run test:api:regression
npm run test:headed
```

List tests without executing:

```bash
npx playwright test --list --reporter=list
```

Open the latest HTML report:

```bash
npm run report
```

## Reports and debugging evidence

- HTML: `PrismStructure/reports/html/index.html`
- JSON: `PrismStructure/reports/results.json`
- JUnit: `PrismStructure/reports/junit.xml`
- Failure traces, screenshots, and videos: `PrismStructure/test-results`

Screenshots are captured for every test run (`screenshot: 'on'`) and embedded in the HTML report. Traces are retained for any failed test.

## Framework layout

```text
PrismStructure/
├── fixtures/       custom Playwright fixtures and isolated customer state
├── pages/          UI page objects (AppShell, Auth, Catalog, Checkout)
├── utils/          API client, data factory, redacting logger
├── tests/
│   ├── ui/         smoke and regression UI tests
│   └── api/        smoke and regression API tests
└── reports/        HTML, JSON, and JUnit evidence
```

Each test has its own spec file named `{feature}-{scenario-class}.spec.js`.

## New page object capabilities (vs. reference)

- `CatalogPage.filterByCategory(name)` — clicks a category sidebar link and waits for results.
- `CatalogPage.sortBy(value)` — selects a sort option (e.g., `price,asc`) and waits for reload.
- `CatalogPage.productPrice` — locator for all product price elements in the catalog list.
- `CheckoutPage.removeCartItem(name)` — clicks the delete button for a cart row and awaits the DELETE response.
- `ToolshopApiClient.listCategories()` — `GET /categories`.
- `ToolshopApiClient.getProduct(id)` — `GET /products/{id}`.
- `ToolshopApiClient.removeCartItem(cartId, productId)` — `DELETE /carts/{cartId}/product/{productId}`.
- `ToolshopApiClient.getCurrentUser(token)` — `GET /users/me`.
- `ToolshopApiClient.updateUserProfile(token, data)` — `PUT /users/me`.

## Test data

- Unique synthetic `Pratibha Tester` customer per mutating test.
- Runtime selection of current in-stock, non-rental products.
- New cart per lifecycle test.
- In-memory passwords and tokens; sensitive fields are redacted from logs.
- Profile update payloads generated from the registered user's existing address/phone.

## Manual testing

Open `FunctionalTestCase.csv`, execute each case against the stated environment, capture evidence, and change `Status` only from an observed result. Automated coverage does not justify setting a manual case to Passed.

## Known environment considerations

- Toolshop is a shared public test system and can be reset.
- Cloudflare can intermittently block headless UI execution.
- Product inventory and prices can change between runs.
- `data-test="sort"` select expects option values like `price,asc` and `name,desc`.
- Category sidebar links must match the exact category name returned by `GET /categories`.
- `DELETE /carts/{cartId}/product/{productId}` returns a 2xx status code; the exact code (200 or 204) may vary with API version.
