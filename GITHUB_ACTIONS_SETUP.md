# GitHub Actions Setup Guide

This repository is configured to run Playwright tests automatically on GitHub Actions with Allure reporting.

## Prerequisites

1. Push this repository to GitHub
2. Configure GitHub Secrets for the test environment

## Required GitHub Secrets

You need to add the following secrets to your GitHub repository:

### 1. Navigate to Repository Settings
- Go to your repository on GitHub
- Click **Settings** → **Secrets and variables** → **Actions**

### 2. Add These Secrets

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `API_BASE_URL` | Base URL of your API | `https://api.example.com` |
| `TEST_USERNAME` | Test user username | `test_user` |
| `TEST_PASSWORD` | Test user password | `your_secure_password` |

**Steps to add each secret:**
1. Click **New repository secret**
2. Enter the secret name
3. Enter the secret value
4. Click **Add secret**

## Workflow Features

The GitHub Actions workflow (`workfile.yaml`) includes:

✅ **Automated Testing**
- Runs on: push to `main`, pull requests to `main`, and manual trigger
- Installs Node.js 18
- Installs Playwright browsers with system dependencies

✅ **Test Execution**
- Runs Playwright tests with Allure reporter
- Uploads test artifacts for 30 days

✅ **Allure Reporting**
- Generates comprehensive test reports
- Deploys Allure reports to GitHub Pages
- Publishes results on every test run

✅ **Environment Management**
- Uses GitHub Secrets for sensitive credentials
- Creates `.env` file for test configuration
- Passes environment variables securely to test runner

## GitHub Pages Deployment

### Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **gh-pages**
   - Folder: **/ (root)**
3. Click **Save**

After the first workflow run, your Allure reports will be available at:
```
https://<username>.github.io/<repo-name>
```

## Usage

### Run Tests Manually
1. Go to **Actions** tab
2. Click **Playwright Tests with Allure**
3. Click **Run workflow** → **Run workflow**

### View Test Results
- Check the **Actions** tab for workflow runs
- Once completed, view Allure reports via GitHub Pages link

### Local Development

To run tests locally with the same configuration:

```bash
# Create .env file with your credentials
cat > .env << EOF
API_BASE_URL=https://your-api.com
TEST_USERNAME=your_username
TEST_PASSWORD=your_password
EOF

# Install dependencies
npm ci

# Install browsers
npx playwright install --with-deps

# Run tests
npm test

# View Allure report
npm run test:report
```

## Troubleshooting

### Tests failing in CI but passing locally
- Verify all secrets are correctly set in GitHub
- Check that `API_BASE_URL` is accessible from GitHub Actions runners
- Ensure firewall/IP whitelist allows GitHub Actions IPs

### Allure report not deploying
- Confirm GitHub Pages is enabled in repository settings
- Check that the `gh-pages` branch exists
- Verify workflow permissions include `pages: write`

### Authentication failures
- Verify test credentials are correct in GitHub Secrets
- Check if credentials are URL-encoded (they shouldn't be in secrets)
- Ensure the login endpoint is working in CI environment

## Security Notes

- ✅ Secrets are encrypted and never logged
- ✅ `auth.json` token is generated during setup and only used within the run
- ✅ Environment variables are only accessible to steps that need them
- Never commit `.env` or `auth.json` files to version control

## Next Steps

1. Add the secrets to your GitHub repository
2. Push the updated workflow to your `main` branch
3. Go to the **Actions** tab to monitor the first run
4. Configure GitHub Pages if you want to view Allure reports
