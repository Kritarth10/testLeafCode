import test,{chromium} from "@playwright/test"

test("launching a browser",async()=>{
    const browser = await chromium.launch({headless:false});
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await page.goto("https://www.google.com");
})