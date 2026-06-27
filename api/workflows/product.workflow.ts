import { expect } from "@playwright/test";
import { ProductService } from "../services/product.service";
import { error } from "node:console";

export class ProductWorklow {
    constructor(private productService: ProductService) {}

    async createProduct(
        id: string,
        title: string,
        price: Number, 
    ) {
        const response = await this.productService.addNewProduct({
            id,
            title,
            price

        })

        expect(response.status()).toBe(200)
        const body = await response.json()

        expect(body.title).toBe(title)
        expect(body.price).toBe(price)

        return {
            response
        }
    }
}