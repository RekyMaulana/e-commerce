import express from "express"

import { 
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
 } from "../controllers/Product.js";

 import {
    loginUser,
    register,
    deleteUser
} from "../controllers/Users.js"

const router = express.Router()

// Route get semua product
router.get('/products', getProducts);
// Route get product by id
router.get('/products/:id', getProductById);
// Route create product baru
router.post('/products', createProduct);
// Route update product by id
router.put('/products/:id', updateProduct);
// Route delete product by id
router.delete('/products/:id', deleteProduct);


router.post('/register', register)
router.post('/login', loginUser)
router.delete('/user', deleteUser)

export default router