import {chromium, test} from "@playwright/test"

test("launching a browser",async({page})=>{
    await page.goto("http://leaftaps.com/opentaps/control/main");
    page.locator('')
})