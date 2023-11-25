import { Page, chromium, firefox, webkit } from '@playwright/test'

export class BasePage {

    public page: Page

    async initializeBrowser(browserName: string = 'chrome') {
        if (browserName == 'chrome') {
            this.page = await (await (await chromium.launch()).newContext()).newPage()
        } else if (browserName == 'firefox') {
            this.page = await (await (await firefox.launch()).newContext()).newPage()
        } else if (browserName == 'safari') {
            this.page = await (await (await webkit.launch()).newContext()).newPage()
        } else {
            throw new Error("Please mention the broswer name.")
        }
    }

    async closeBrowser() {
        this.page?.close()
    }
}
