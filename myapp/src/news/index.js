const axios = require('axios');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const news = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    const url =
      'https://www.google.com/search?rlz=1C5CHFA_enKR998KR998&sxsrf=AB5stBgW6lb6tyPTKvmKiZo7U7RLKmk8TA:1691145140521&q=%EC%B9%BC%EB%B6%80%EB%A6%BC&tbm=nws&source=lnms&sa=X&ved=2ahUKEwiu3vTK5sKAAxVFqFYBHfZoDagQ0pQJegQICBAB&biw=1728&bih=905&dpr=2';

    await page.goto(url);

    const newses = await page.$$eval('a[jsname="YKoRaf"]', (links) =>
      links.map((link) => {
        return { link: link.href, text: link.textContent };
      })
    );
    console.log('뉴스링크', newses);

    console.log('크링스뉴');
    await browser.close();

    res.send({ data: newses });
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

module.exports = news;
