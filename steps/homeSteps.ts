import { Page, expect } from "@playwright/test";
import { homePage } from "../pages/homePage";
import { BasePage } from "../support/basePage";

export class HomeSteps {

    private page: Page

    constructor(basePage: BasePage) {
        this.page = basePage.page
    }

    async clickElementCard() {
        await this.page.locator(homePage.buttonCard).click()
    }

    async getAllProducts() {
        let allProductsName: string[] = await this.page.locator(homePage.productsName).allTextContents()
        for (let index = 0; index < allProductsName.length; index++) {
            console.log(allProductsName[index])
        }
    }

    async addProductToCart(productName: string) {
        await this.page.locator(homePage.productsName).first().waitFor()
        let allProductsName: string[] = await this.page.locator(homePage.productsName).allTextContents()
        for (let index = 0; index < allProductsName.length; index++) {
            console.log(allProductsName[index])
            if (allProductsName[index] === productName) {
                await this.page.locator(homePage.addTocartButton).nth(Number(`${index}`)).click()
                break
            }
        }
    }

    async validateCartNo() {
        await this.page.locator(homePage.noOfItemInCart).waitFor()
        const text = await this.page.locator(homePage.noOfItemInCart).textContent()
        console.log(text)
        expect(text).toEqual('1')
    }
}