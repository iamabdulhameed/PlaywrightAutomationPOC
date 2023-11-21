import { Page } from "@playwright/test";
import { landingPage } from "../pages/landingPage";

export class LandingSteps {

    constructor(public page: Page) {
        this.page = page
    }

    async clickElementCard() {
        await this.page.locator(landingPage.buttonCard).click()
    }

    async getText() {
        const text = await this.page.locator(landingPage.buttonCard).textContent()
        console.log(text)
    }
}