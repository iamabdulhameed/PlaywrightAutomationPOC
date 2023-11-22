import { Page, chromium, firefox, webkit } from '@playwright/test'

export class BasePage {

    public page: Page

    async initializeBrowser(browserName: string = 'chrome') {
        if (browserName == 'chrome') {
            this.page = await (await chromium.launch()).newPage()
        } else if (browserName == 'firefox') {
            this.page = await (await firefox.launch()).newPage()
        } else if (browserName == 'safari') {
            this.page = await (await webkit.launch()).newPage()
        } else {
            throw new Error("Please mention the broswer name.")
        }
    }

    async closeBrowser() {
        this.page?.close()
    }
}
