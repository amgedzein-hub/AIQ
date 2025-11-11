import { test, expect } from '@playwright/test';

test.describe('Arabic IQ Test Flow', () => {
  test('should navigate to home page', async ({ page }) => {
    await page.goto('/ar');
    expect(await page.title()).toContain('Arabic IQ Test');
  });

  test('should show login button for unauthenticated users', async ({
    page,
  }) => {
    await page.goto('/ar');
    const loginButton = page.getByRole('link', { name: /تسجيل الدخول/ });
    await expect(loginButton).toBeVisible();
  });

  test('should redirect to login when accessing test without auth', async ({
    page,
  }) => {
    await page.goto('/ar/test');
    // Should redirect to auth
    await expect(page).toHaveURL(/auth/);
  });

  test('login page should be accessible', async ({ page }) => {
    await page.goto('/ar/auth/login');
    const emailInput = page.getByLabel(/البريد الإلكتروني/);
    const passwordInput = page.getByLabel(/كلمة المرور/);
    const loginButton = page.getByRole('button', { name: /تسجيل الدخول/ });

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  test('signup page should be accessible', async ({ page }) => {
    await page.goto('/ar/auth/signup');
    const emailInput = page.getByLabel(/البريد الإلكتروني/);
    const passwordInput = page.getByLabel(/كلمة المرور/);
    const confirmPasswordInput = page.getByLabel(/تأكيد كلمة المرور/);
    const signupButton = page.getByRole('button', { name: /إنشاء حساب/ });

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(confirmPasswordInput).toBeVisible();
    await expect(signupButton).toBeVisible();
  });

  test('should support RTL layout', async ({ page }) => {
    await page.goto('/ar');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'rtl');
  });

  test('should support English language', async ({ page }) => {
    await page.goto('/en');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'ltr');
  });
});
