import { Page } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import { landingPage } from "../pages/landingPage";

export class LoginSteps {
    constructor(public page: Page) {

    }

    async doLogin(email: string, pwd: string) {
        await this.page.locator(loginPage.userEmail).fill(email)
        await this.page.locator(loginPage.userPwd).fill(pwd)
        await this.page.locator(loginPage.loginButton).click()
        await this.page.locator(landingPage.menuHeaderItems).isVisible()
    }

     
}