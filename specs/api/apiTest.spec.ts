import { test, request, expect, APIRequestContext } from '@playwright/test'
import { APIUtils } from '../utils/APIUtils'
import { describe } from 'node:test'

let token: string
let apiUtils: APIUtils

test.describe('TEST SUITE', () => {

    test.beforeAll(async () => {
        const apiContext = await request.newContext()
        apiUtils = new APIUtils(apiContext)
        token = await apiUtils.getToken()
        // console.log('TOKEN', token)
    })

    test('verify login with API', async ({ page }) => {
        await page.addInitScript((value) => {
            window.localStorage.setItem('token', value)
        }, token)
        await page.goto('https://rahulshettyacademy.com/client/')
        const url = page.url()
        expect(url).toContain("dash")
    })

    test('Place an order With API and verify country', async ({ page }) => {
        await page.addInitScript((value) => {
            window.localStorage.setItem('token', value)
        }, token)
        const orderId = await apiUtils.getOrderId(token)
        console.log(orderId)
        await page.goto('/client/')
        await page.locator('button[routerlink*="/dashboard/myorders"]').click()
        await page.locator('h1.ng-star-inserted').waitFor()
        const allOrders = await page.locator('table tbody tr th').allTextContents()
        for (let orderid in allOrders) {
            if (allOrders[orderid] === await orderId) {
                await page.locator(`table tbody tr td button[class*="primary"]`).nth(+orderid).click()
                break
            }
        }
        await page.locator('p[class="tagline"]').waitFor()
        expect(await page.getByText('Thank you for Shopping With Us').isVisible()).toBeTruthy()
        const address = await page.locator('div.address').first().locator('p').nth(1).textContent()
        expect(address).toContain('China')


    })
})
