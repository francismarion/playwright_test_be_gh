import { test } from "../fixtures/fixtures";
import { UserService } from "../../api/services/user.service";
import { authHeader } from "../../helpers/auth-case";
import { ProductService } from "../../api/services/product.service";

test("update single product", async ({ baseClient, createProduct, token }) => {
  // create a user first
  const createdProduct = await createProduct();

  const productService = new ProductService(baseClient);

  // update user by id
  const response = await productService.updateProduct({
    idParam: createdProduct.id,
    id: 21,
    title: "new product",
    price: 12,
    description: "new product",
    category: "electronics",
    image : "https://i.pravatar.cc",
    headers: authHeader(token, "bearer")
  }
  );

  const resTest = await response.text()
  console.log( resTest, "res")

});