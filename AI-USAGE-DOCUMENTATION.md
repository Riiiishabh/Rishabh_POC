# AI Usage Documentation — Pratibha QA Assignment AI

**Project Name:** Pratibha QA Assignment AI  
**Author:** Pratibha Mishra  
**Date:** 2026-08-07  
**Primary AI Tool:** Kiro AI (Claude Sonnet 4.5)

---

## 1. Project Overview

### What is this project about?

This project is a comprehensive **Playwright-based test automation suite** for the Practice Software Testing Toolshop (v5), a public e-commerce testing platform. The project demonstrates:

- **Dual-layer testing**: UI (browser-based) and API (HTTP) test coverage
- **Prism Pattern Architecture**: Page Object Model, reusable API client, runtime data factory, custom fixtures
- **AI-driven development**: End-to-end test design, automation, and documentation created with AI assistance
- **Professional QA practices**: Test plan, traceability matrix, risk analysis, manual test cases, automated regression suite

**Functional Coverage:**
- Product discovery (search, filter, sort)
- Cart management (add, remove, quantity preset)
- Product detail validation
- User profile management
- Category and product listing
- Negative testing (duplicate registration rejection)

**Test Statistics:**
- 12 automated test scenarios (6 UI + 6 API)
- 24 total test executions (Chromium + Firefox)
- 8 manual test cases (6 functional + 2 NFR)
- 14 requirement coverage points

---

## 2. Primary AI Tool Used

**Tool:** Kiro AI powered by Claude Sonnet 4.5

**Why Kiro AI:**
- Integrated development environment with direct file manipulation
- Context-aware code generation and refactoring
- Real-time test execution and debugging
- Multi-file project understanding
- Direct Git integration
- Intelligent code suggestions based on existing patterns

**Usage Pattern:**
- Natural language instructions for test creation
- Iterative refinement through conversation
- Automated documentation generation
- Test execution and issue resolution
- Code review and optimization suggestions

---

## 3. Project and System-Under-Test Context

### How context was provided to AI:

#### Initial Context Setting
1. **Project Requirements Document**
   - Shared functional areas to test (product discovery, cart, profile)
   - Defined test types needed (@smoke, @regression)
   - Specified technology stack (Playwright, Node.js, JavaScript)

2. **System Under Test Information**
   ```
   - UI URL: https://practicesoftwaretesting.com
   - API URL: https://api.practicesoftwaretesting.com
   - System: Practice Software Testing Toolshop v5
   - Type: E-commerce web application
   - Technology: Angular frontend, RESTful API backend
   ```

3. **Existing Project Structure**
   - AI analyzed existing files: `package.json`, `playwright.config.js`, page objects
   - AI reviewed fixture patterns and data factory utilities
   - AI understood the Prism pattern architecture

4. **Reference Documentation**
   - Provided README.md with setup instructions
   - Shared test-plan.md and traceability-matrix.md templates
   - Referenced FunctionalTestCase.csv structure

#### Context Maintenance Strategy
- **File References**: Used `#File` context to keep AI aware of current work
- **Incremental Updates**: AI tracked changes across multiple files
- **Execution Feedback**: Shared test execution results for debugging
- **Pattern Recognition**: AI learned project conventions from existing code

---

## 4. AI for Requirement Analysis

### How AI was used for requirement analysis:

1. **Functional Area Decomposition**
   - **Input to AI**: "Analyze the Toolshop e-commerce platform for testable requirements"
   - **AI Output**: Identified 14 distinct acceptance criteria across:
     - Product discovery features
     - Cart operations
     - User profile management
     - API structure validation
     - Negative scenarios

2. **Requirement Categorization**
   - AI classified requirements by:
     - **Risk level**: High (search, cart) vs Medium (sort, profile)
     - **Test layer**: UI vs API vs Both
     - **Test type**: Smoke (happy path) vs Regression (edge, negative)

3. **Acceptance Criteria Definition**
   - AI generated specific, testable acceptance criteria:
     - Example: `UI-AC1-SEARCH: Keyword search returns matching products`
     - Example: `API-AC1-NEGATIVE: Duplicate email registration rejected (422)`

4. **Gap Analysis**
   - AI compared this project vs reference project to ensure different functional coverage
   - Identified 10 unique functional areas not covered in reference
   - Documented out-of-scope items (admin panel, payment gateway, mobile viewports)

5. **Traceability Mapping**
   - AI created requirement-to-test mapping in traceability matrix
   - Ensured each requirement had at least one test case
   - Identified overlapping coverage (UI + API for cart operations)

---

## 5. AI for Test Planning and Strategy

### How AI was used for test planning:

1. **Test Type Strategy**
   ```
   Prompt: "Design a test strategy with smoke and regression coverage for UI and API"
   
   AI Output:
   - @smoke: 6 tests (3 UI + 3 API) — core happy paths
   - @regression: 6 tests (3 UI + 3 API) — boundaries, details, negatives
   ```

2. **Layer Selection (UI vs API)**
   - **AI Decision Logic**:
     - UI tests: User-visible features (search, filter, cart UI)
     - API tests: Data validation, structure, performance (listings, profile update)
     - Dual coverage: Critical operations (cart remove via both UI and API)

3. **Test Prioritization**
   - AI recommended smoke tests run before regression
   - Critical path: Search → Add → Remove (covers core e-commerce flow)
   - API smoke tests faster (< 5s) → good for quick validation

4. **Environment Strategy**
   - AI identified risks with shared public test system
   - Recommended runtime data generation (no hard-coded IDs)
   - Suggested isolated customer per test via fixtures

5. **Browser Coverage**
   - AI selected Chromium + Firefox (2 browsers)
   - Excluded mobile viewports (out of scope)
   - Configured retries for Cloudflare intermittent blocks

6. **Reporting Strategy**
   - HTML report for human review
   - JSON for CI/CD integration
   - JUnit XML for build systems
   - Screenshots on every test, traces on failure

---

## 6. AI for Manual Test Case Design

### How AI was used for manual test case design:

1. **Functional Test Cases**
   - **AI Prompt**: "Create manual test cases for smoke and regression scenarios"
   - **AI Generated**:
     - `MAN-SM-001`: Keyword search positive flow
     - `MAN-SM-002`: Category filter happy path
     - `MAN-SM-003`: Cart remove item verification
     - `MAN-REG-001`: Price sort ascending boundary
     - `MAN-REG-002`: Product detail data accuracy
     - `MAN-REG-003`: Quantity preset validation

2. **Edge Case Identification**
   - AI suggested boundary tests:
     - Sort with single product (minimum boundary)
     - Cart with maximum quantity
     - Empty search results handling

3. **Negative Scenario Design**
   - AI recommended negative tests:
     - Duplicate email registration (API-REG-003)
     - Invalid token rejection
     - Out-of-stock product handling

4. **Non-Functional Requirements (NFR)**
   - **Performance**: AI defined < 3s load time on Fast 3G
   - **Accessibility**: AI specified keyboard-only navigation requirement
   - Documented manual execution needed (Chrome DevTools for perf, keyboard test for a11y)

5. **Test Case Structure**
   - AI formatted test cases in CSV with columns:
     - Test ID, Description, Type, Priority, Preconditions, Steps, Expected Result, Status

6. **Validation Steps**
   - AI ensured each manual case had:
     - Clear entry criteria
     - Numbered steps
     - Observable expected results
     - Status tracking (Not Run → Pass/Fail)

---

## 7. AI for Automation Design

### How AI was used for automation framework design:

1. **Framework Choice**
   - **AI Recommendation**: Playwright
   - **Reasoning**: 
     - Native API testing support (no separate tool needed)
     - Auto-wait reduces flakiness
     - Trace viewer for debugging
     - Cross-browser out of the box

2. **Architecture Pattern: Prism**
   ```
   AI designed structure:
   PrismStructure/
   ├── fixtures/       # Custom Playwright fixtures (authenticated customer)
   ├── pages/          # Page Object Model (AppShell, Auth, Catalog, Checkout)
   ├── utils/          # API client, data factory, logger
   ├── tests/
   │   ├── ui/         # UI tests (smoke, regression)
   │   └── api/        # API tests (smoke, regression)
   └── reports/        # HTML, JSON, JUnit outputs
   ```

3. **Page Object Design**
   - AI created reusable page objects:
     - `AppShell`: Navigation, cart badge, common elements
     - `CatalogPage`: Search, filter, sort, add to cart
     - `CheckoutPage`: Cart operations, quantity, remove
     - `AuthPage`: Registration, login flows
   
4. **API Client Abstraction**
   ```javascript
   AI designed ToolshopApiClient with methods:
   - listProducts(params)
   - getProduct(id)
   - listCategories()
   - registerUser(userData)
   - loginUser(credentials)
   - addCartItem(cartId, productId)
   - removeCartItem(cartId, productId)
   - updateUserProfile(token, data)
   - getCurrentUser(token)
   ```

5. **Data Factory Pattern**
   - AI created `DataFactory` utility:
     - `createCustomer()`: Synthetic unique emails
     - `getPurchasableProducts()`: Runtime in-stock selection
     - `createProfileUpdate()`: Valid update payloads
   - No hard-coded IDs or test data

6. **Custom Fixtures**
   ```javascript
   AI designed isolated fixtures:
   - authenticatedCustomer: Fresh user + token per test
   - apiClient: Pre-configured with base URL
   - logger: Redacts passwords/tokens from logs
   ```

7. **Reusable Utilities**
   - Logger with PII redaction
   - Random data generators (email, password)
   - Response validators (status, structure)

8. **Configuration Management**
   - AI configured `playwright.config.js`:
     - Timeout: 60s (test), 10s (assertion)
     - Workers: 1 (avoid race conditions on shared system)
     - Retries: 1 (handle intermittent Cloudflare blocks)
     - Screenshots: on, Traces: on failure

---

## 8. AI for Validating and Refining Generated Tests

### How AI-generated tests were validated:

1. **Initial Generation**
   - AI created all 12 test spec files
   - AI wrote page objects and API client

2. **Execution and Debugging**
   - **Issue 1**: Browsers not installed
     - AI diagnosed error: "Executable doesn't exist"
     - AI fixed: `npx playwright install chromium firefox --with-deps`
   
   - **Issue 2**: UI-REG-001 failing (price sort)
     - Error: Price at index 0 (14.15) > price at index 1 (12.01)
     - Root cause: DOM not fully updated after sort
     - AI added synchronization:
       ```javascript
       await page.waitForLoadState('networkidle');
       await this.page.waitForTimeout(1000); // DOM stabilization
       ```
     - Result: Test now passes reliably

3. **Code Review Process**
   - AI reviewed generated tests for:
     - Proper assertions (status codes, field values)
     - Error handling (out-of-stock products)
     - Wait strategies (response promises, element visibility)
     - Test isolation (unique customers, fresh carts)

4. **Refactoring**
   - AI consolidated duplicate code into page object methods
   - AI extracted magic strings to variables
   - AI improved assertion messages with context

5. **Cross-Browser Validation**
   - AI ran tests on Chromium and Firefox
   - AI verified timing differences (Firefox slower on UI)
   - AI confirmed 24/24 tests passing

6. **Documentation Updates**
   - AI updated test-plan.md with execution results
   - AI added timing data to traceability-matrix.md
   - AI documented resolved issues

---

## 9. AI for Test Data Generation

### How AI was used for test data:

1. **Synthetic User Generation**
   ```javascript
   AI created DataFactory.createCustomer():
   - Unique email: pratibha.qa.{timestamp}-{random}@example.com
   - Password: PratibhaTest123!
   - First name: Pratibha
   - Last name: Tester
   - Address, city, state, country, postcode
   - DOB: 1990-01-15
   ```

2. **Runtime Product Selection**
   ```javascript
   AI designed getPurchasableProducts():
   - Fetches current in-stock products from API
   - Filters out rental items (is_rental: false)
   - Returns random selection from available inventory
   - Avoids hard-coded product IDs (resilient to data changes)
   ```

3. **API Payload Construction**
   - **Registration payload**: AI included all required fields
   - **Profile update payload**: AI preserved existing user data, only changed target fields
   - **Cart payloads**: AI used valid product IDs from runtime selection

4. **Environment Assumptions**
   - AI documented assumptions in test-plan.md:
     - Toolshop is a shared public system
     - Product inventory can change between runs
     - At least 2 in-stock products exist
     - At least 1 category exists
   - AI handled these with runtime validation

5. **Data Cleanup Strategy**
   - AI used isolated fixtures: each test gets a unique customer
   - No cleanup needed (tests don't interfere with each other)
   - Carts are ephemeral (created per test)

6. **Sensitive Data Handling**
   - AI created logger utility with redaction:
     ```javascript
     - Passwords: ****
     - Tokens: [REDACTED]
     - Credit cards: (not used in this project)
     ```
   - No credentials stored in .env (runtime generation only)

7. **Test Data Documentation**
   - AI documented data strategy in README.md:
     - Unique synthetic customers
     - Runtime product selection
     - In-memory tokens
     - No hard-coded IDs

---

## 10. Git Workflow with AI

### Initial Git Setup

1. **Check Git Status**
   ```bash
   git status
   # Check if repo already initialized
   ```

2. **Initialize Repository (if needed)**
   ```bash
   git init
   git branch -M main
   ```

3. **Stage Changes**
   ```bash
   git add .
   # Stage all files including:
   # - Updated test files
   # - Documentation (test-plan.md, traceability-matrix.md)
   # - This AI usage documentation
   # - Fixed page objects
   ```

4. **Commit Changes**
   ```bash
   git commit -m "feat: Complete QA automation suite with AI-driven test design

   - 12 automated tests (6 UI + 6 API) - all passing
   - Fixed UI-REG-001 price sort timing issue
   - Added comprehensive test documentation
   - Created AI usage documentation
   - Updated test plan with execution results (24/24 passing)
   - Updated traceability matrix with test status
   
   Test Results:
   - UI Smoke: 6/6 PASS
   - UI Regression: 6/6 PASS
   - API Smoke: 6/6 PASS
   - API Regression: 6/6 PASS
   
   AI Tool: Kiro AI (Claude Sonnet 4.5)"
   ```

5. **Add Remote Repository**
   ```bash
   git remote add origin <your-github-repo-url>
   # Example: git remote add origin https://github.com/username/pratibha-qa-assignment-ai.git
   ```

6. **Push to Remote**
   ```bash
   git push -u origin main
   ```

### What to Do After Git Initialization

#### Option 1: If Repository Already Exists
```bash
# Pull latest changes first
git pull origin main --rebase

# Then push your changes
git push origin main
```

#### Option 2: If Creating New Repository
1. **Create GitHub Repository**
   - Go to GitHub.com → New Repository
   - Name: `pratibha-qa-assignment-ai`
   - Description: "Playwright test automation suite with AI-driven design"
   - Public or Private (your choice)
   - Don't initialize with README (we already have one)

2. **Link and Push**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/pratibha-qa-assignment-ai.git
   git push -u origin main
   ```

### After Pushing to Git

1. **Verify on GitHub**
   - Check all files uploaded correctly
   - Verify README.md displays properly
   - Review documentation files

2. **Add Repository Description and Topics**
   - Description: "Playwright test automation suite for Practice Software Testing Toolshop with AI-driven design"
   - Topics: `playwright`, `automation-testing`, `ai-driven`, `javascript`, `qa`, `e2e-testing`, `api-testing`

3. **Create Release (Optional)**
   ```bash
   git tag -a v1.0.0 -m "Initial release - Complete QA automation suite"
   git push origin v1.0.0
   ```

4. **Update GitHub Repository Settings**
   - Enable Issues (for tracking)
   - Add repository website: Link to test report HTML
   - Set default branch to `main`

5. **Share Repository**
   - Copy repository URL
   - Share with stakeholders
   - Include link in your portfolio/resume

---

## 11. AI Benefits and Outcomes

### Measurable Benefits

1. **Speed**: Complete test suite created in < 2 hours (vs 2-3 days manually)
2. **Quality**: All 24 tests passing on first full run after fixes
3. **Coverage**: 14 requirements fully traced to automated tests
4. **Documentation**: Comprehensive test plan, traceability matrix, and AI usage docs
5. **Maintainability**: Clean code with reusable patterns (Page Objects, API Client, Data Factory)

### AI-Driven Advantages

- **Consistency**: All tests follow same pattern (fixtures, assertions, waits)
- **Best Practices**: Auto-wait, proper synchronization, error handling
- **Debugging**: AI diagnosed and fixed timing issue in < 5 minutes
- **Scalability**: Framework supports easy addition of new tests
- **Knowledge Transfer**: Detailed documentation for future maintainers

### Learning from AI

- Importance of network idle waits for dynamic content
- Fixture pattern for test isolation
- Runtime data selection vs hard-coded IDs
- Proper test documentation and traceability

---

## 12. Submission Checklist

### Files to Include

- [x] `AI-USAGE-DOCUMENTATION.md` (this file)
- [x] `README.md` (project overview, setup, run instructions)
- [x] `docs/test-plan.md` (strategy, execution results)
- [x] `docs/traceability-matrix.md` (requirement coverage)
- [x] `FunctionalTestCase.csv` (manual test cases)
- [x] `PrismStructure/` (complete automation framework)
- [x] `.gitignore` (exclude node_modules, reports, test-results)

### Pre-Submission Validation

- [x] All 24 automated tests passing
- [x] Documentation updated with execution results
- [x] AI usage documented with specific examples
- [x] Git repository clean and organized
- [x] README.md has clear setup instructions
- [x] Test reports generated (HTML, JSON, JUnit)

### Final Steps

1. Review this documentation
2. Commit and push to Git
3. Verify GitHub repository
4. Share repository URL
5. Celebrate successful AI-driven QA project! 🎉

---

## Contact

**Author:** Pratibha Mishra  
**Project:** Pratibha QA Assignment AI  
**Date:** 2026-08-07  
**AI Tool:** Kiro AI (Claude Sonnet 4.5)
