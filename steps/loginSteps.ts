import { Page, expect } from "@playwright/test";
import { homePage } from "../pages/homePage";
import { loginPage } from "../pages/loginPage";
import { BasePage } from "../support/basePage";

export class LoginSteps {

    private page: Page

    constructor(basePage: BasePage) {
        this.page = basePage.page
    }

    public async doLogin(email: string, pwd: string) {
        await this.page.locator(loginPage.userEmail).fill(email)
        await this.page.locator(loginPage.userPwd).fill(pwd)
        await this.page.locator(loginPage.loginButton).click()
        await expect(this.page.locator(homePage.menuHeaderItems)).toBeVisible()
    }

}