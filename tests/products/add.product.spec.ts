import { expect } from "@playwright/test";
import { Assertions } from "../../utils/assertions";
import { authHeader } from "../../helpers/auth-case";
import { test } from '../fixtures/fixtures'
import { USERNAME, PASSWORD } from "../../helpers/dotenv-loader";
import { ProductService } from "../../api/services/product.service";
import { ProductWorklow } from "../../api/workflows/product.workflow";


test('add product', async ({ authWorkflow, baseClient}) => {
    console.log("here")
    const {token} = await authWorkflow.loginAndGetToken(
        USERNAME,
        PASSWORD
    )
    
    const productService = new ProductService(baseClient)
    const response = await productService.addNewProduct({
        id: crypto.randomUUID(),
        title: 'New Product',
        price: 29.99,
        headers: authHeader(token, 'bearer')
    })

    console.log(await response.json())
})