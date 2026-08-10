# Traceability Matrix — Nishant QA Assignment AI

**Last Updated:** 2026-08-07  
**Execution Status:** ✅ All Automated Tests Passing (24/24)

| Requirement ID | Description | Manual Case | UI Automated | API Automated | Status |
|---------------|-------------|-------------|-------------|---------------|--------|
| UI-AC1-SEARCH | Keyword search returns matching products | MAN-SM-001 | UI-SM-001 ✅ | — | PASS |
| UI-AC1-FILTER | Category filter shows filtered product list | MAN-SM-002 | UI-SM-002 ✅ | API-REG-002 ✅ | PASS |
| UI-AC2-REMOVE | Remove item from cart; cart reflects zero items | MAN-SM-003 | UI-SM-003 ✅ | API-SM-002 ✅ | PASS |
| UI-AC1-SORT | Sort products by price ascending | MAN-REG-001 | UI-REG-001 ✅ | — | PASS |
| UI-AC1-DETAIL | Product detail page shows correct name and price | MAN-REG-002 | UI-REG-002 ✅ | API-SM-001 ✅ | PASS |
| UI-AC2-PRESET | Preset quantity before adding; badge matches | MAN-REG-003 | UI-REG-003 ✅ | — | PASS |
| API-AC1-LIST | Products listing paginated structure | — | — | API-SM-001 ✅ | PASS |
| API-AC1-CATEGORIES | Categories listing structure | — | — | API-SM-003 ✅ | PASS |
| API-AC1-FILTER | Products filtered by category ID | — | UI-SM-002 ✅ | API-REG-002 ✅ | PASS |
| API-AC1-NEGATIVE | Duplicate email registration rejected (422) | — | — | API-REG-003 ✅ | PASS |
| API-AC2-REMOVE | DELETE cart item removes product from cart | MAN-SM-003 | UI-SM-003 ✅ | API-SM-002 ✅ | PASS |
| API-AC3-PROFILE | PUT /users/me persists updated name fields | — | — | API-REG-001 ✅ | PASS |
| NFR1 | Catalog and detail pages load in < 3 s on Fast 3G | MAN-NFR-001 | — | — | NOT RUN |
| NFR2 | All key-journey screens fully keyboard-operable | MAN-NFR-002 | — | — | NOT RUN |

## Coverage summary

**Execution Date:** 2026-08-07

| Layer | Smoke | Regression | Total | Status |
|-------|-------|-----------|-------|--------|
| UI automated | 3 ✅ | 3 ✅ | 6 | PASS (6/6) |
| API automated | 3 ✅ | 3 ✅ | 6 | PASS (6/6) |
| Manual functional | 3 ⏳ | 3 ⏳ | 6 | NOT RUN |
| Manual NFR | — | 2 ⏳ | 2 | NOT RUN |
| **Grand total** | **6** | **8** | **20** | **12/12 automated passing** |

### Test Execution Details

**Automated Tests: 24/24 PASSED** (12 tests × 2 browsers)

#### UI Smoke (6/6 passed)
- ✅ UI-SM-001 @smoke: Keyword search (Chromium 3.5s, Firefox 4.1s)
- ✅ UI-SM-002 @smoke: Category filter (Chromium 6.1s, Firefox 5.7s)
- ✅ UI-SM-003 @smoke: Cart remove (Chromium 13.2s, Firefox 20.6s)

#### UI Regression (6/6 passed)
- ✅ UI-REG-001 @regression: Sort by price (Chromium 6.0s, Firefox 17.5s) — **Fixed timing issue**
- ✅ UI-REG-002 @regression: Product detail (Chromium 4.5s, Firefox 7.2s)
- ✅ UI-REG-003 @regression: Preset quantity (Chromium 7.7s, Firefox 16.2s)

#### API Smoke (6/6 passed)
- ✅ API-SM-001 @smoke: Products list structure (Chromium 508ms, Firefox 513ms)
- ✅ API-SM-002 @smoke: Cart DELETE (Chromium 3.1s, Firefox 3.0s)
- ✅ API-SM-003 @smoke: Categories list (Chromium 505ms, Firefox 503ms)

#### API Regression (6/6 passed)
- ✅ API-REG-001 @regression: Profile GET/PUT (Chromium 1.7s, Firefox 2.0s)
- ✅ API-REG-002 @regression: Filter by category (Chromium 3.3s, Firefox 1.7s)
- ✅ API-REG-003 @regression: Duplicate registration rejection (Chromium 1.4s, Firefox 1.4s)

**Manual Tests: Pending execution** (8 functional + NFR tests awaiting human validation)

## Functional areas covered (new vs. reference)

| Functional area | This project | Reference project |
|----------------|-------------|-------------------|
| Product keyword search | UI-SM-001 | — |
| Category filter | UI-SM-002, API-REG-002 | — |
| Product sort by price | UI-REG-001 | — |
| Product detail page | UI-REG-002 | — |
| Cart remove item | UI-SM-003, API-SM-002 | — |
| Cart preset quantity | UI-REG-003 | — |
| Products list structure | API-SM-001 | — |
| Categories list | API-SM-003, UI-SM-002 | — |
| User profile update | API-REG-001 | — |
| Duplicate registration | API-REG-003 | — |
| Authentication (reg/login) | fixtures only | UI-SM-001, API-SM-001 |
| Cart add items | fixtures only | UI-SM-002, API-SM-002 |
| Checkout COD | — | UI-SM-003 |
| Invoice | — | API-SM-003, UI-SM-003 |
| Cart quantity update | — | UI-REG-001, API-REG-001 |
| Cart min quantity boundary | — | UI-REG-002, API-REG-002 |
| Special-char search | — | UI-REG-003 |
| Invalid token rejection | — | API-REG-003 |
