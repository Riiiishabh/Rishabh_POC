# Test Plan — Rishabh QA Assignment AI

**Project:** Rishabh QA Assignment AI  
**System Under Test:** Practice Software Testing Toolshop v5  
**UI:** https://practicesoftwaretesting.com  
**API:** https://api.practicesoftwaretesting.com  
**Date:** 2026-08-07  
**Author:** Rishabh Mishra  
**Last Execution:** 2026-08-07  
**Status:** ✅ All Automated Tests Passing

---

## 1. Scope

### In scope

| Area | Functionality |
|------|---------------|
| Product Discovery | Keyword search, category filter, price sort |
| Product Detail | Name and price accuracy, add-to-cart button state |
| Cart Management | Remove item from cart, preset quantity before add |
| User Profile | API profile update via PUT /users/me |
| API Catalogue | Products paginated listing, categories listing |
| API Filtering | Products filtered by category |
| Registration | Negative: duplicate email rejection |

### Out of scope

- Admin panel and admin-only API endpoints.
- Payment gateway integration beyond flow triggering.
- Multi-currency and internationalisation.
- Mobile or tablet viewports.
- Email delivery verification.

---

## 2. Test approach

### UI tests (Playwright, headed Chromium)

- Page Object Model with shared `AppShell`, `AuthPage`, `CatalogPage`, `CheckoutPage`.
- Runtime product selection via `getPurchasableProducts()` — no hard-coded IDs.
- One worker; `screenshot: 'on'`; `trace: 'retain-on-failure'`.

### API tests (Playwright APIRequestContext)

- Direct HTTP calls via `ToolshopApiClient`.
- One isolated customer per test via `authenticatedCustomer` fixture.
- Assertions on status codes, response structure, and field values.

---

## 3. Test types and tags

| Tag | Meaning | Count |
|-----|---------|-------|
| @smoke | Core happy-path coverage; must pass before regression | 6 |
| @regression | Boundary, detail, and negative scenarios | 6 |
| @nfr @performance | Manual performance measurement | 1 |
| @nfr @accessibility | Manual keyboard-only navigation | 1 |

---

## 4. Test environment

| Item | Value |
|------|-------|
| Node.js | 18 LTS or newer |
| Playwright | 1.62.1 |
| Browser | Chromium (Desktop Chrome profile) |
| OS | Windows 10+, macOS, or Ubuntu 22 |
| SUT state | Shared public system; no test data isolation at the server level |

---

## 5. Entry criteria

- `npm install` and `npm run install:browsers` complete without error.
- `GET /products` returns 200 and at least one in-stock, non-rental product.
- `GET /categories` returns 200 and at least one top-level category.
- Toolshop UI loads without a Cloudflare challenge block.

---

## 6. Exit criteria

- All 6 smoke tests pass in the same run.
- All 6 regression tests pass.
- No test reports a timeout on the Toolshop UI.
- Reports (HTML, JSON, JUnit) are present in `reports/`.

---

## 7. Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Cloudflare blocks headless Chromium | Medium | High | Retry logic (`retries: 1`); run headed if blocked |
| Product inventory changes | Low | Medium | Runtime product selection; filter in-stock only |
| API sort option values change | Low | High | Sort test uses known value `price,asc`; document in readme |
| Category sidebar selector changes | Medium | Medium | Use `getByRole('link', { name })` — text-based and resilient |
| DELETE returns 200 instead of 204 | Low | Low | Use `removeResponse.ok()` for API-SM-002; document variance |
| Profile update requires all fields | Low | Medium | `createProfileUpdate` includes dob, phone, address from existing user |

---

## 8. Defect taxonomy

| Severity | Definition |
|----------|------------|
| Critical | Test cannot execute; environment is blocked |
| High | Assertion fails on core happy path (smoke) |
| Medium | Assertion fails on regression scenario |
| Low | Cosmetic or non-blocking observation |

---

## 9. CI pipeline

Automated tests run via `.github/workflows/playwright.yml` on push to `main`, pull request to `main`, and on manual dispatch. Smoke tests run first; regression tests run only if smoke passes.

---

## 11. Test Execution Summary

**Execution Date:** 2026-08-07  
**Environment:** Windows, Playwright 1.62.1, Chromium & Firefox  
**Total Tests:** 12 automated (6 UI + 6 API)

### Execution Results

| Test Suite | Status | Passed | Failed | Duration |
|------------|--------|--------|--------|----------|
| **UI Smoke** | ✅ PASS | 6/6 | 0 | ~1.0m |
| **UI Regression** | ✅ PASS | 6/6 | 0 | ~1.1m |
| **API Smoke** | ✅ PASS | 6/6 | 0 | ~10.1s |
| **API Regression** | ✅ PASS | 6/6 | 0 | ~13.6s |
| **Overall** | ✅ PASS | **24/24** | **0** | ~2.2m |

### Test Details

#### UI Smoke Tests (6 passed)
- ✅ UI-SM-001: Keyword search returns matching products (Chromium: 3.5s, Firefox: 4.1s)
- ✅ UI-SM-002: Category filter shows filtered results (Chromium: 6.1s, Firefox: 5.7s)
- ✅ UI-SM-003: Add product then remove from cart (Chromium: 13.2s, Firefox: 20.6s)

#### UI Regression Tests (6 passed)
- ✅ UI-REG-001: Sort products by price low-to-high (Chromium: 6.0s, Firefox: 17.5s)
  - **Fixed:** Added network idle wait and DOM stabilization (1s timeout) to handle async sorting
- ✅ UI-REG-002: Product detail page displays correct data (Chromium: 4.5s, Firefox: 7.2s)
- ✅ UI-REG-003: Preset quantity three before adding to cart (Chromium: 7.7s, Firefox: 16.2s)

#### API Smoke Tests (6 passed)
- ✅ API-SM-001: List products returns valid paginated structure (Chromium: 508ms, Firefox: 513ms)
- ✅ API-SM-002: Add then DELETE cart item via API (Chromium: 3.1s, Firefox: 3.0s)
- ✅ API-SM-003: List categories returns valid structure (Chromium: 505ms, Firefox: 503ms)

#### API Regression Tests (6 passed)
- ✅ API-REG-001: GET /users/me returns registered user data (Chromium: 1.7s, Firefox: 2.0s)
- ✅ API-REG-002: Filter products by category returns matching set (Chromium: 3.3s, Firefox: 1.7s)
- ✅ API-REG-003: Reject duplicate email registration (Chromium: 1.4s, Firefox: 1.4s)

### Issues Resolved

1. **Browser Installation**
   - **Issue:** Chromium and Firefox browsers not installed, tests failing with "Executable doesn't exist"
   - **Resolution:** Executed `npx playwright install chromium firefox --with-deps`
   - **Status:** ✅ Resolved

2. **UI-REG-001 Timing Issue**
   - **Issue:** Price sorting test failing due to DOM not fully updated after sort selection
   - **Resolution:** 
     - Added `page.waitForLoadState('networkidle')` in test
     - Added 1s timeout + price element visibility check in `sortBy()` method
   - **Status:** ✅ Resolved

### Manual Test Status

Manual tests in `FunctionalTestCase.csv` remain **Not Run** pending human execution:
- MAN-SM-001, MAN-SM-002, MAN-SM-003 (smoke)
- MAN-REG-001, MAN-REG-002, MAN-REG-003 (regression)
- MAN-NFR-001 (performance), MAN-NFR-002 (accessibility)

### Recommendations

1. ✅ All automated test suites are now passing and stable
2. Schedule manual test execution for functional verification
3. Execute NFR tests (performance & accessibility) with appropriate tooling
4. Consider adding the fixed synchronization pattern to other page objects if similar timing issues occur
5. HTML reports available at: `PrismStructure/reports/html/index.html`


