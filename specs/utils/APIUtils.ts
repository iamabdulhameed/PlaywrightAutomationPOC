import { APIRequestContext, expect } from "@playwright/test"
import { payloads } from "./Payloads"
export class APIUtils {
    context: APIRequestContext

    constructor(context: APIRequestContext) {
        this.context = context

    }

    async getToken() {
        const response = await this.context.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: payloads.loginPayload })
        console.log('LOGIN RESPOSE', await response.json())
        expect(response.ok).toBeTruthy()
        const responseJson = await response.json()
        return await responseJson.token
    }

    async getOrderId(token: string) {
        const createOrderResponse = await this.context.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: payloads.createOrderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })
        console.log('CREATE ORDER RESPONSE', await createOrderResponse.json())
        expect(createOrderResponse.ok).toBeTruthy()
        const createOrderResponseJson = await createOrderResponse.json()
        return createOrderResponseJson.orders[0]
    }
}

module.exports = { APIUtils }