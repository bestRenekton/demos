const puppeteer = require('puppeteer');



(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto("https://github.com/login");
    await page.waitFor(1000)   //延迟1秒输入
    await page.type("#login_field", "账号"); //立即输入
    await page.type("#password", "密码", { delay: 100 }) //模拟用户输入
    await page.click("input[type=submit]"); //点击登录按钮
})()