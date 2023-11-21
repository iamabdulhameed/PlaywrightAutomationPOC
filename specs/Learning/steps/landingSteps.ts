import { Page, expect } from "@playwright/test";
import { landingPage } from "../pages/landingPage";
import { stringify } from "node:querystring";

export class LandingSteps {

    constructor(public page: Page) {
        this.page = page
    }

    async clickElementCard() {
        await this.page.locator(landingPage.buttonCard).click()
    }

    async getAllProducts() {
        let allProductsName: string[] = await this.page.locator(landingPage.productsName).allTextContents()
        for (let index = 0; index < allProductsName.length; index++) {
            console.log(allProductsName[index])
        }
    }

    async addProductToCart(productName: string) {
        await this.page.locator(landingPage.productsName).first().waitFor()
        let allProductsName: string[] = await this.page.locator(landingPage.productsName).allTextContents()
        for (let index = 0; index < allProductsName.length; index++) {
            console.log(allProductsName[index])
            if (allProductsName[index] === productName) {
                await this.page.locator(landingPage.addTocartButton).nth(Number(`${index}`)).click()
                break
            }
        }
    }

    async validateCartNo() {
        await this.page.locator(landingPage.noOfItemInCart).waitFor()
        const text = await this.page.locator(landingPage.noOfItemInCart).textContent()
        console.log(text)
        expect(text).toEqual('1')
    }
}