const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
let browser, page; // Declare reusable variables
describe('E2E tests', function () {

    before(async () => {
        browser = await chromium.launch();
       // browser = await chromium.launch({headless: false, slowMo: 500});
    });

    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });

    it('loads static page', async () => {
        await page.goto('http://localhost:3000');

        const content = await page.content();

        expect(content).to.contains('Scalable Vector Graphics');
        expect(content).to.contains('Open standard');
        expect(content).to.contains('Unix');
        expect(content).to.contains('ALGOL');
    });

    it('check textContent ', async () => {
        await page.goto('http://localhost:3000');

        const content = await page.textContent('.accordion .head span');
        expect(content).to.contains('Scalable Vector Graphics');
    });

    // it('check more button ', async () => {
    //     await page.goto('http://localhost:3000');
    //     await page.click('#main>.accordion:first-child >> text=More');

    //     await page.waitForSelector('#main>.accordion:first-child >> .extra p');

    //     const visible = await page.isVisible('#main>.accordion:first-child >> .extra p');
    //     expect(visible).to.be.true;
    // });

    it('check more button ', async () => {
        await page.goto('http://localhost:3000');
        await page.click('text=More');

        await page.waitForSelector('.extra p');

        const visible = await page.isVisible('.extra p');
        expect(visible).to.be.true;
    });

    it('check Less button ', async () => {
        await page.goto('http://localhost:3000');

        await page.click('text=More');
        await page.waitForSelector('.extra p');
        await page.click('text=Less')

      
        const visible = await page.isVisible('.extra p');
        expect(visible).to.be.false;
    });

    it.only('getting array of spans and checking', async () => {
        await page.goto('http://localhost:3000');

        const titles = await page.$$eval('.accordion .head span', (spans) => spans.map(s => s.textContent));
        expect(titles).includes('Scalable Vector Graphics');
        expect(titles).includes('Open standard');
        expect(titles).includes('Unix');
        expect(titles).includes('ALGOL');
    });
});


