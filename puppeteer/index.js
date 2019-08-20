const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];



(async () => {
    const browser = await puppeteer.launch({
        headless: false,//是否可视
        slowMo:250,//缓速操作
    });
    const page = await browser.newPage();
    //设置屏幕大小
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });
    //模拟手机
    // await page.emulate(iPhone);


    await page.goto('https://www.baidu.com', { timeout: 300000 });
    //截图
    await page.screenshot({ path: 'screenshots/example.png' });
    //pdf
    await page.pdf({
        displayHeaderFooter: true,
        path: 'pdf/example.pdf',
        format: 'A4',
        headerTemplate: '<b style="font-size: 30px">Hello world<b/>',
        footerTemplate: '<b style="font-size: 30px">Some text</b>',
        margin: {
            top: "100px",
            bottom: "200px",
            right: "30px",
            left: "30px",
        }
    });
    await browser.close();
})();
