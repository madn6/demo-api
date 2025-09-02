import { Router } from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controller/product.controller.js';


const productRouter = Router()


productRouter.get("/get-products", getProducts )
productRouter.post("/create-product", createProduct )
productRouter.put("/update-product/:id", updateProduct )
productRouter.delete("/delete-product/:id", deleteProduct)




export default productRouter;