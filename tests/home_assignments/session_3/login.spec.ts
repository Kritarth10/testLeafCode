import {test,chromium,expect} from "@playwright/test";

test("Login to salesforce without fixture",async()=>{

    const browser = await chromium.launch();
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await page.goto("https://login.salesforce.com");
    console.log(await page.url());
    await page.fill("#username","kannugovil@3logic.com");
    await page.fill("#password","Krit@rth_1");
    await page.click("#Login"); 
    await page.waitForLoadState('networkidle');
    expect(await page.title()).toBe("Home | Salesforce")
})