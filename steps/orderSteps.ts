import { Page } from '@playwright/test'
import { homePage } from '../pages/homePage'
import { BasePage } from '../support/basePage'

export class OrderSteps {
    private page: Page

    constructor(basePage: BasePage) {
        this.page = basePage.page
    }

    async navigateToOrdersTab() {

        await this.page.locator(homePage.orderTab).click()

    }
}
