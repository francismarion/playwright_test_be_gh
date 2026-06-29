import { BaseClient } from "../clients/base.client";
import { ENDPOINTS } from "../routes/endpoints";

export class ProductService {
    constructor(private client: BaseClient) {}

    addNewProduct(params: {
        id?: string,
        title: string,
        price: Number;
        // description: string;
        // category: string;
        // image: string;
        headers?: Record<string, string>
    }) {
        const {id, title, price, headers} =  params;
        
        return this.client.post(ENDPOINTS.ADD_PRODUCT, {
            data : {
                id, 
                title,
                price
            },
            headers
        });
    }

    getAllProducts(params: {
        title? : string,
        headers?: Record<string, string>
    }) {
        const { title, headers } = params;

        return this.client.get(ENDPOINTS.GET_ALL_PRODUCT, {
            data : {
                title
            },
            headers
        });
    }
}