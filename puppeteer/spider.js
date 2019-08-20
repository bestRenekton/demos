const axios = require('axios');
const puppeteer = require('puppeteer');



//SPA拿不到实际的dom
// (async () => {
//     const res = await axios.get("https://www.baidu.com");
//     console.log(res.data);
//     await browser.close();
// })();
//puppeteer则可以
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://www.baidu.com");

    //可以获取实际浏览的dom
    console.log(await page.content());
    //遍历解析出title
    const titleArr = await page.evaluate(() => {
        const titleDom = document.querySelectorAll('.card_title');
        const title = [];
        titleDom.forEach((e, i) => {
            title.push(e.innerHTML)
        })
        return title
    });
    console.log(titleArr)

    await browser.close();
})();