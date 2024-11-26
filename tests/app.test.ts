import { test, expect, chromium } from '@playwright/test';

const prefList = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

const domain = 'http://localhost:3000/nishiumi-app/';

test(`初期表示`, async ({ page }) => {
  await page.goto(domain);
  await expect(page.getByText('都道府県別！ 総人口推移表示アプリ')).toBeVisible();
  await expect(page.getByText('都道府県', { exact: true })).toBeVisible();
  const options = page.locator('.home-select-value');
  const selectExists = await options.isVisible();
  expect(selectExists).toBe(true);
});

test(`単一：${prefList[0]}のグラフ表示テスト`, async () => {
  const browser = await chromium.launch({ slowMo: 500 });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(domain);

  // クリックしてグラフ表示
  await page.getByText(`${prefList[0]}`).click();
  const ele = page.locator(`[name="${prefList[0]}"]`);
  const lineExists = await ele.isVisible();
  expect(lineExists).toBe(true);

  // 再クリックでグラフ非表示
  await page.getByText(`${prefList[0]}`).click();
  const lineExists2 = await ele.isVisible();
  expect(lineExists2).toBe(false);
});

test(`プルダウン押下テスト`, async () => {
  const browser = await chromium.launch({ slowMo: 500 });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(domain);

  // クリックしてグラフ表示
  await page.getByText(`${prefList[0]}`).click();
  const ele = page.locator(`[name="${prefList[0]}"]`);
  const lineExists = await ele.isVisible();
  expect(lineExists).toBe(true);

  for (let i = 0; i <= 3; i++) {
    const initValue = ele.getAttribute('height');
    await page.waitForTimeout(3000);
    await page.getByRole('combobox').selectOption(String(i));
    await page.waitForTimeout(3000);
    const updateValue = page.locator(`[name="${prefList[0]}"]`).getAttribute('height');
    expect(initValue).not.toBe(updateValue);
  }
});

test.describe('全県分のグラフ表示テスト', () => {
  for (const pref of prefList) {
    test(`${pref}のグラフ表示テスト`, async () => {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(domain);

      await page.getByText(`${pref}`).click();
      const ele = page.locator(`[name="${pref}"]`);
      await page.waitForTimeout(3000);
      const lineExists = await ele.isVisible();
      expect(lineExists).toBe(true);
    });
  }
});
